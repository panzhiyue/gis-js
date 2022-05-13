
<!-- ol/Overlay -->
<template>
  <div class="vue2ol-overlay" :ref="'element'">
    <!-- @slot default -->
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Overlay from "ol/Overlay";
import {
  optionsMerger,
  findRealParent,
  bindListeners,
  propsBinder,
  getListeners,
} from "../utils/index";
/**
 * ol/Overlay的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html
 */
export default {
  name: "Vue2olOverlay",
  data() {
    return {
      mapObject: null, //ol/layer/Vector对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    };
  },
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },

    /**
     * 定位叠加层时使用的像素偏移量。数组中的第一个元素是水平偏移量。正值将覆盖向右移动。数组中的第二个元素是垂直偏移量。正值会使叠加层向下移动。
     * @typeName {number[]}
     */
    offset: {
      type: Array,
    },

    /**
     * 显示在地图上的位置
     * @typeName {import('ol/coordinate').Coordinate}
     */
    position: {
      type: Array,
    },

    /**
     * 定义叠加层相对于其position属性的实际定位方式。
     * @typeName {import('ol/OverlayPositioning').default}
     * @values "bottom-left"| "bottom-center"| "bottom-right"| "center-left"| "center-center"| "center-right"| "top-left"| "top-center"| "top-right";
     */
    positioning: {
      type: String,
    },

    /**
     * ol/Overlay 实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
     */
    options: {
      type: Object,
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    let options = optionsMerger(
      {
        element: this.$refs.element,
        positioning: this.positioning,
        position: this.position,
        offset: this.offset,
      },
      this
    );

    this.mapObject = new Overlay(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将overlayer层添加到map当中
    this.parent.addOverlay(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/Overlay').default} mapObject -
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.parent.removeOverlay(this.mapObject);
    this.mapObject = null;
  },
};
</script>
<style scoped></style>
