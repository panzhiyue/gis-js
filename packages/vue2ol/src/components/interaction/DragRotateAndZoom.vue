<template>
  <div></div>
</template>
<script>
import { DragRotateAndZoom } from "ol/interaction";
import { PointerInteractionMixin } from "../../mixins";
import {
  findRealParent,
  optionsMerger,
  bindListeners,
  getListeners,
  propsBinder,
  findParentMap,
} from "../../utils";
/**
 * [ol/interaction/DragRotateAndZoom](https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragRotateAndZoom-DragRotateAndZoom.html)的vue组件
 * 
 * 允许用户通过在地图上单击和拖动来缩放和旋转地图。默认情况下，此交互仅限于按住 shift 键时。
 * @since v1.0.0
 */
export default {
  name: "Vue2olInteractionDragrotateandzoom",
  mixins: [PointerInteractionMixin],
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

      this.mapObject = new DragRotateAndZoom(options);

      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/DragRotateAndZoom').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.parent.addInteraction(this.mapObject);
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/DragRotateAndZoom').default} mapObject  地图元素
       */
      this.$emit("append", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/DragRotateAndZoom').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>