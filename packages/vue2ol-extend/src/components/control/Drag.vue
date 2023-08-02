<template>
  <div class="vue2ol-control-drag" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
import {
  on,
  off,
  once,
  addClass,
  removeClass,
  setStyle,
  getStyle,
} from "../../utils/dom";
import { throttle } from "../../utils/index";
// import bus from "../../utils/bus";

/**
 * 通过选择器、元素对象、函数获取元素对象
 * @private
 * @param {HTMLElement} el 容器元素
 * @param {HTMLElement|String|Function|*} selector
 * @return {HTMLElement}
 */
function getElement(el, selector) {
  const type = typeof selector;
  if (type === "function") {
    return selector();
  } else if (type === "string") {
    return el.querySelector(selector);
  } else if (selector instanceof HTMLElement) {
    return selector;
  }
  return null;
}
/**
 * 获取元素的尺寸宽高，支持对隐藏元素获取
 * @private
 * @param {HTMLElement} el
 * @return {{width: number, height: number}}
 */
function getDomSize(el) {
  const clone = el.cloneNode(true);
  setStyle(clone, {
    visibility: "hidden",
    display: "inline-block",
  });
  document.body.appendChild(clone);
  const rect = clone.getBoundingClientRect();
  clone.parentNode.removeChild(clone);
  return {
    width: rect.width,
    height: rect.height,
  };
}

/**
 *  获取拖拽元素相对位置参考元素
 */
function getRelativeEl(el) {
  let parent = el.parentNode;
  while (
    parent !== document.documentElement &&
    getStyle(parent, "position") === "static"
  ) {
    parent = parent.parentNode;
  }
  return parent;
}

// 默认拖拽范围设置
const DEFAULT_RANGE = {
  left: -10000,
  top: -10000,
  width: 20000,
  height: 20000,
};

// 拖拽句柄样式名
const HANDLE_CLASS = "vue2ol-control-drag__handle";

/**
 * 元素拖拽组件
 */
export default {
  name: "Vue2olControlDrag",
  props: {
    /**
     * 拖拽句柄元素，不设置就是自身
     * @typeName String|HTMLElement|Function
     */
    handle: [String, Object, Function],
    /**
     * 限制拖拽方向可选: v 垂直、h 水平，默认不限制
     * @typeName String
     */
    axis: {
      type: String,
      default: "",
      validator(val) {
        return ["", "v", "h"].includes(val);
      },
    },
    /**
     * 延时开始拖拽
     * @typeName Number
     */
    delay: {
      type: Number,
      default: 100,
    },
    /**
     * 限制拖拽范围, 默认不限制
     * @typeName Object|Function
     */
    range: [Object, Function],

    /**
     * 在目标元素范围内
     * @typeName String|HTMLElement|Function
     */
    target: [String, Object, Function],
    /**
     * 是否克隆拖拽
     * @typeName Boolean|Function
     */
    clone: [Boolean, Function],
    /**
     * 拖拽放置后动画返回原来位置，clone为true时才有效
     * @typeName Boolean
     */
    revert: Boolean,
    /**
     * 分组名称， 与vue2ol-control-drop配合使用
     * @typeName String
     */
    group: String,
    /**
     * 是否禁用拖拽
     * @typeName Boolean
     */
    disabled: Boolean,
    /**
     * 附加数据
     * @typeName String|Number|Object|Array
     */
    data: [String, Number, Object, Array],
    /**
     * 克隆元素添加 className
     * @typeName String
     */
    cloneClass: String,
    /**
     * 相对坐标原点, 默认自动获取
     * @typeName String|HTMLElement|Function
     */
    origin: {
      type: [String, Object, Function],
      default() {
        return null;
      },
    },
    /**
     * 克隆元素是否追加到body
     * @typeName Boolean
     */
    appendBody: Boolean,
  },
  data() {
    // 非响应式数据定义
    this.handleEl = null;
    this.dragEl = null;
    this.cacheRange = null;
    this.cacheOrigin = null;
    return {
      // 是否正在拖拽
      dragging: false,
      // 是否拖动过
      dragged: false,
      // 拖拽元素相对原点的位置
      x: null,
      y: null,
      // 拖拽元素与鼠标的偏移位置
      offsetX: 0,
      offsetY: 0,
      // 开始拖拽时元素相对原点的位置
      startX: 0,
      startY: 0,
      // 拖拽鼠标坐标
      clientX: 0,
      clientY: 0,
      dropped: false,
    };
  },
  computed: {
    classes() {
      return {
        "is-clone": this.clone,
        "is-dragging": this.dragging,
        "is-disabled": this.disabled,
        "is-dragged": this.dragged,
        "vue2ol-control-drag__handle": this.$el === this.handleEl,
      };
    },
  },
  methods: {
    // 获取原点相对可视区位置
    getOrigin() {
      if (this.cacheOrigin) return this.cacheOrigin;
      // 如果设置了origin，按origin取，否则就从DOM树向上查找定位元素，如无，就取documentElement
      const el = this.origin
        ? getElement(this.document, this.origin)
        : getRelativeEl(this.$el);
      this.cacheOrigin = el.getBoundingClientRect();

      return this.cacheOrigin;
    },
    // 获取拖拽句柄
    getHandle() {
      if (!this.handle) {
        return this.$el;
      }
      return getElement(this.$el, this.handle) || this.$el;
    },
    // 获取拖拽范围目标元素
    getTarget() {
      if (!this.target) return null;
      return getElement(this.document, this.target);
    },
    // 获取拖拽范围 {left,top, width, height}
    getRange() {
      if (this.cacheRange) {
        return this.cacheRange;
      }
      const target = this.getTarget();

      if (target) {
        const rect = target.getBoundingClientRect();
        const elRect = this.$el.getBoundingClientRect();
        const origin = this.getOrigin();
        this.cacheRange = {
          left: rect.left - origin.left,
          top: rect.top - origin.top,
          width: rect.width - elRect.width,
          height: rect.height - elRect.height,
        };
      } else {
        this.cacheRange =
          typeof this.range === "function"
            ? this.range()
            : this.range || DEFAULT_RANGE;
      }

      return this.cacheRange;
    },
    // 创建拖拽元素
    createDragEl(e) {
      //  不设置克隆，拖拽元素就是组件根节点
      if (!this.clone) {
        this.dragEl = this.$el;
        return;
      }

      if (typeof this.clone === "function") {
        // 如果是函数，执行函数，返回元素对象
        this.dragEl = this.clone(this);
        if (!this.dragEl) {
          throw new Error("参数clone函数并没有返回正确的HTMLElement");
        }
      } else {
        // 克隆组件自己
        this.dragEl = this.$el.cloneNode(true);
      }
      addClass(this.dragEl, "vue2ol-control-drag__clone");
      if (this.cloneClass) {
        addClass(this.dragEl, this.cloneClass);
      }
      if (this.appendBody) {
        this.document.body.appendChild(this.dragEl);
      } else {
        this.$el.parentNode.appendChild(this.dragEl);
      }
    },
    // 设置拖拽元素的开始时样式
    setDragElStyle() {
      if (!this.clone) return;

      const style = {
        left: `${this.startX}px`,
        top: `${this.startY}px`,
        display: "inline-block",
      };
      if (typeof this.clone === "function") {
        style.display = "inline-block";
      }
      setStyle(this.dragEl, style);
    },
    // 当拖拽没有成功放置，克隆拖拽的元素自动复原位置
    revertDragEl() {
      // 这个功能自动对克隆元素有效
      if (this.dragEl && this.clone) {
        if (this.revert) {
          // 添加过渡动画样式
          addClass(this.dragEl, "is-revert");
          setStyle(this.dragEl, {
            left: `${this.startX}px`,
            top: `${this.startY}px`,
          });
          // 动画执行完成后，清除dom
          once(this.dragEl, "webkitTransitionEnd", this.clearDragEl);
          once(this.dragEl, "transitionend", this.clearDragEl);
          // 预防动画完成事件不触发，定时清除
          setTimeout(this.clearDragEl.bind(this), 300);
        } else {
          // 不设置克隆，立即清除dom
          this.clearDragEl();
        }
      }
    },
    // 清除克隆拖拽dom
    clearDragEl() {
      if (this.dragEl && this.clone) {
        removeClass(this.dragEl, "is-revert");
        this.dragEl.parentNode.removeChild(this.dragEl);
      }
      this.dragEl = null;
    },
    // 更新鼠标与拖拽元素的偏移值
    updateOffset({ clientX, clientY }) {
      // 自定义克隆拖拽元素
      if (this.clone && typeof this.clone === "function") {
        const size = getDomSize(this.dragEl);
        this.offsetX = size.width / 2;
        this.offsetY = size.height / 2;
      } else {
        const rect = this.$el.getBoundingClientRect();
        this.offsetX = clientX - rect.left;
        this.offsetY = clientY - rect.top;
      }
    },
    // 修正位置
    fixPosition(e) {
      const origin = this.getOrigin();
      if (this.appendBody) {
        return {
          x: e.pageX - this.offsetX,
          y: e.pageY - this.offsetY,
        };
      } else {
        return {
          x: e.clientX - this.offsetX - origin.left,
          y: e.clientY - this.offsetY - origin.top,
        };
      }
    },
    // 是否有vue2ol-control-resize子组件正在resizing
    isResizing() {
      return !!this.$children.find((item) => {
        if (item.$options && item.$options.name === "Vue2olControlResize") {
          return item.resizing;
        }
        return false;
      });
    },
    /**
     * 为了防止拖拽过程中鼠标选中了页面的文字导致 mouseup 事件不被触发，在开始拖拽时禁止页面选择文字，在停止拖拽后再恢复
     * @private
     * @param disabled 添加还是删除，true为添加
     */
    userSelect(disabled) {
      disabled
        ? addClass(this.document.body, "vue2ol-select-none")
        : removeClass(this.document.body, "vue2ol-select-none");
    },
    // 拖拽开始
    start(e) {
      this.cacheRange = null;
      // 标识正在拖拽
      this.dragging = true;
      // 初始化已放置，开始是未放置，这个属性的修改是在 vue2ol-control-drop 组件中修改为true
      this.dropped = false;
      this.createDragEl(e);
      this.updateOffset(e);
      const position = this.fixPosition(e);
      this.startX = position.x;
      this.startY = position.y;
      this.setDragElStyle();
      this.userSelect(true);
      /**
       * 开始拖拽时触发
       * @event start
       * @param {VueComponent} vm MyDrag实例
       */
      this.$emit("start", this);
      //   bus.$emit("vue2ol-control-drag:start", this);
    },
    // 锁定拖拽方向
    lockAxis(x, y) {
      switch (this.axis) {
        case "h":
          this.x = x;
          break;
        case "v":
          this.y = y;
          break;
        default:
          this.x = x;
          this.y = y;
          break;
      }
    },
    // 锁定拖拽范围
    lockRange(x, y) {
      const range = this.getRange();
      this.x = x;
      this.y = y;
      if (x < range.left) {
        this.x = range.left;
      }
      if (y < range.top) {
        this.y = range.top;
      }
      if (x > range.left + range.width) {
        this.x = range.left + range.width;
      }

      if (y > range.top + range.height) {
        this.y = range.top + range.height;
      }
    },
    // 拖拽
    move({ x, y }) {
      this.lockAxis(x, y);
      this.lockRange(this.x, this.y);
      setStyle(this.dragEl, {
        left: `${this.x}px`,
        top: `${this.y}px`,
      });
      this.dragged = true;
      /**
       * 拖拽中触发
       * @event drag
       * @param {VueComponent} vm MyDrag实例
       */
      this.$emit("drag", this);
      //   bus.$emit("vue2ol-control-drag:dragging", this);
    },
    // 停止拖拽
    stop() {
      /**
       * 结束拖拽时触发
       * @event stop
       * @param {VueComponent} vm MyDrag实例
       */
      this.$emit("stop", this);
      //   bus.$emit("vue2ol-control-drag:stop", this);
      // 已过成功放置，清除拖拽副本，否则就重置，dropped 在vue2ol-control-drop中更新，这行要放在触发stop事件之后
      this.dropped ? this.clearDragEl() : this.revertDragEl();
      // 清空缓存
      this.cacheRange = null;
      this.cacheOrigin = null;
      this.dragging = false;
      this.userSelect(false);
    },
    handleMouseDown(e) {
      console.log(333);
      // 禁用不触发
      if (this.disabled) return;
      // 为了防止点击的行为触发拖拽，加定时器
      this.timer = setTimeout(() => {
        // 如果有vue2ol-control-resize 子组件正在resizing， 禁止拖拽
        if (this.isResizing()) {
          return;
        }
        this.start(e);
        on(this.document, "mousemove", this.proxyMove);
      }, this.delay);

      once(this.document, "mouseup", this.handleMouseUp);
    },
    handleMouseMove(e) {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      const position = this.fixPosition(e);
      this.move(position);
    },
    handleMouseUp() {
      clearTimeout(this.timer);
      off(this.document, "mousemove", this.proxyMove);
      this.dragging && this.stop();
    },
    // 绑定拖拽句柄
    bindHandle() {
      const handle = this.getHandle();
      addClass(handle, HANDLE_CLASS);
      on(handle, "mousedown", this.handleMouseDown);
      this.handleEl = handle;
    },
    // 解绑拖拽句柄
    unbindHandle() {
      if (this.handleEl) {
        removeClass(this.handleEl, HANDLE_CLASS);
        off(this.handleEl, "mousedown", this.handleMouseDown);
        this.handleEl = null;
      }
    },
  },
  created() {
    // 节流
    this.proxyMove = throttle(this.handleMouseMove, this);
  },
  mounted() {
    this.document = window.document;
    this.bindHandle();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.unbindHandle();
    this.clearDragEl();
    this.document = null;
  },
  beforeUnmount() {
    clearTimeout(this.timer);
    this.unbindHandle();
    this.clearDragEl();
    this.document = null;
  },
};
</script>
<style>
.vue2ol-control-drag {
  display: inline-block;
  position: absolute;
}
.vue2ol-control-drag__handle {
  cursor: move;
}
.vue2ol-control-drag__handle.is-disabled {
  cursor: auto;
}
.vue2ol-control-drag__clone {
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  opacity: 0.6;
  z-index: 2000;
}
.vue2ol-control-drag__clone.is-clone {
  position: absolute !important;
}
.vue2ol-control-drag__clone.is-revert {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.vue2ol-control-drag.is-dragging {
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vue2ol-control-drag.is-disabled .vue2ol-control-drag__handle {
  cursor: auto;
}
.vue2ol-control-drag.is-clone {
  position: static;
}

.vue2ol-select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.vue2ol-select-none iframe {
  pointer-events: none;
}
</style>
