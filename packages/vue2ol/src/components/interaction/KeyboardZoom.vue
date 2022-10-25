<template>
  <div></div>
</template>
<script>
import { KeyboardZoom } from "ol/interaction";
import { InteractionMixin } from "../../mixins";
import {
  findRealParent,
  optionsMerger,
  bindListeners,
  getListeners,
  propsBinder,
  findParentMap,
} from "../../utils";
/**
 * [ol/interaction/KeyboardZoom](https://openlayers.org/en/latest/apidoc/module-ol_interaction_KeyboardZoom-KeyboardZoom.html)的vue组件
 * 
 * 允许用户使用键盘 + 和 - 缩放地图。需要指定Map的keyboardEventTarget参数，并且指定元素节点有tabindex属性
 * @since v1.0.0
 */
export default {
  name: "Vue2olInteractionKeyboardzoom",
  mixins: [InteractionMixin],
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findParentMap(this.$parent).mapObject;
    }
    this.initInteraction();
  },
  methods: {
    initInteraction() {
      this.ready = false;
      if (this.mapObject) {
        this.mapObject.setActive(false);
        this.parent.removeInteraction(this.mapObject);
        this.mapObject = null;
      }
      let options = optionsMerger({}, this);
      this.mapObject = new KeyboardZoom(options);
      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/KeyboardZoom').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.parent.addInteraction(this.mapObject);
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/KeyboardZoom').default} mapObject  地图元素
       */
      this.$emit("append", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/KeyboardZoom').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>