<template>
  <div class="vue2ol-control-resize" :class="classes" :style="styles">
    <slot></slot>
    <div
      v-if="helper && resizing"
      class="vue2ol-control-resize__helper"
      :style="helperStyle"
    ></div>
    <vue2ol-control-drag
      v-if="!disabled && (!axis || axis === 'h')"
      ref="ctrlH"
      class="vue2ol-control-resize__ctrl-h"
      axis="h"
      :origin="getOrigin"
      @start="handleStart"
      @drag="handleDragH"
      @stop="handleStop"
    >
    </vue2ol-control-drag>
    <vue2ol-control-drag
      v-if="!disabled && (!axis || axis === 'v')"
      ref="ctrlV"
      class="vue2ol-control-resize__ctrl-v"
      axis="v"
      :origin="getOrigin"
      @start="handleStart"
      @drag="handleDragV"
      @stop="handleStop"
    >
    </vue2ol-control-drag>
    <vue2ol-control-drag
      v-if="!disabled && !axis"
      ref="ctrl"
      class="vue2ol-control-resize__ctrl"
      :origin="getOrigin"
      @start="handleStart"
      @drag="handleDrag"
      @stop="handleStop"
    >
      <!-- 定义右下角的图标 -->
      <slot name="icon"></slot>
    </vue2ol-control-drag>
  </div>
</template>
<script>
import Vue2olControlDrag from "./Drag.vue";
import { setStyle } from "../../utils/dom";
export default {
  name: "Vue2olControlResize",
  components: {
    Vue2olControlDrag,
  },
  props: {
    /**
     * 限制拖拽方向可选: v 垂直、h 水平，默认不限制
     * @typeName ''|'v'|'h'
     */
    axis: {
      type: String,
      default: "",
      validator(val) {
        return ["", "v", "h"].includes(val);
      },
    },
    /**
     * 是否禁用
     * @typeName Boolean
     */
    disabled: Boolean,

    /**
     * 是否要动画, 建议在helper为true时开启
     * @typeName Boolean
     */
    animate: Boolean,

    /**
     * 显示临时辅助层
     * @typeName Boolean
     */
    helper: Boolean,

    /**
     * 最小宽度
     * @typeName Number
     */
    minWidth: {
      type: Number,
      default: 0,
    },
    /**
     * 最小高度
     * @typeName Number
     */
    minHeight: {
      type: Number,
      default: 0,
    },

    /**
     * 最大宽度
     * @typeName Number
     */
    maxWidth: {
      type: Number,
      default: Infinity,
    },

    /**
     * 最大高度
     * @typeName Number
     */
    maxHeight: {
      type: Number,
      default: Infinity,
    },
  },
  data() {
    return {
      width: null,
      height: null,
      helperWidth: null,
      helperHeight: null,
      resizing: false,
    };
  },
  computed: {
    classes() {
      return {
        "is-disabled": this.disabled,
        "is-resizing": this.resizing,
        "is-animate": this.animate,
        [`is-axis-${this.axis}`]: !!this.axis,
        "is-axis-both": !this.axis,
      };
    },
    helperStyle() {
      return {
        width: `${this.helperWidth}px`,
        height: `${this.helperHeight}px`,
      };
    },
    styles() {
      return {
        width: this.width ? `${this.width}px` : null,
        height: this.height ? `${this.height}px` : null,
      };
    },
  },
  methods: {
    getOrigin() {
      return this.$el;
    },
    lockSize(w, h) {
      if (w !== null) {
        if (w < this.minWidth) {
          this.helperWidth = this.minWidth;
        }
        if (w > this.maxWidth) {
          this.helperWidth = this.maxWidth;
        }
      }
      if (h !== null) {
        if (h < this.minHeight) {
          this.helperHeight = this.minHeight;
        }
        if (h > this.maxHeight) {
          this.helperHeight = this.maxHeight;
        }
      }
      if (!this.helper) {
        this.applySize();
      }
    },
    applySize() {
      this.width = this.helperWidth;
      this.height = this.helperHeight;
    },
    clearCtrlStyle() {
      if (this.$refs.ctrlH) {
        setStyle(this.$refs.ctrlH.$el, "left", "");
      }
      if (this.$refs.ctrlV) {
        setStyle(this.$refs.ctrlV.$el, "top", "");
      }
      if (this.$refs.ctrl) {
        setStyle(this.$refs.ctrl.$el, {
          left: "",
          top: "",
        });
      }
    },
    handleStart(vm) {
      this.resizing = true;
      /**
       * 开始拖拽时触发
       * @event start
       * @param {VueComponent} resize MyResize实例
       */
      this.$emit("start", this);
    },
    handleDrag(vm) {
      this.helperWidth = vm.x + 20;
      this.helperHeight = vm.y + 20;
      this.lockSize(this.helperWidth, this.helperHeight);
      /**
       * 正在改变尺寸时触发
       * @event resize
       * @param {VueComponent} resize MyResize实例
       */
      this.$emit("resize", this, vm);
    },
    handleDragH(vm) {
      this.helperWidth = vm.x + 10;
      this.lockSize(this.helperWidth, this.helperHeight);
      this.$emit("resize", this, vm);
    },
    handleDragV(vm) {
      this.helperHeight = vm.y + 10;
      this.lockSize(this.helperWidth, this.helperHeight);
      this.$emit("resize", this, vm);
    },
    handleStop(vm) {
      this.resizing = false;
      this.applySize();
      this.clearCtrlStyle();
      /**
       * 停止改变尺寸时触发
       * @event stop
       * @param {VueComponent} resize MyResize实例
       */
      this.$emit("stop", this);
    },
  },
};
</script>
<style scoped>
.vue2ol-control-resize {
  position: relative;
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.vue2ol-control-resize.is-animate {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.vue2ol-control-resize__ctrl-h {
  font-size: 0;
  position: absolute;
  width: 10px;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 2000;
}
.vue2ol-control-resize__ctrl-h.my-drag__handle {
  cursor: e-resize;
}
.vue2ol-control-resize__ctrl-v {
  font-size: 0;
  position: absolute;
  height: 10px;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 2000;
}
.vue2ol-control-resize__ctrl-v.my-drag__handle {
  cursor: s-resize;
}
.vue2ol-control-resize__ctrl {
  font-size: 0;
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0;
  bottom: 0;
  z-index: 2000;
}
.vue2ol-control-resize__ctrl.my-drag__handle {
  cursor: se-resize;
}
.vue2ol-control-resize__helper {
  position: absolute;
  z-index: 2000;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 2px dashed rgba(0, 0, 0, 0.15);
  background: rgba(0, 0, 0, 0.02);
}
</style>
