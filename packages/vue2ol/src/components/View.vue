<!-- ol/View -->
<template>
  <div></div>
</template>
<script>
import View from "ol/View";
import {
  optionsMerger,
  findRealParent,
  bindListeners,
  propsBinder,
  getListeners,
} from "../utils/index";
import ObjectMixin from "../mixins/Object";
import OptionsMixin from "../mixins/Options";
/**
 * ol/View的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
 */
export default {
  name: "Vue2olView",
  mixins: [ObjectMixin, OptionsMixin],
  emits:["init","append","ready"],
  data() {
    return {
      mapObject: null, //ol/View对象
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
     * 地图中心点
     * @typeName {import('ol/coordinate').Coordinate}
     */
    center: {
      type: Array,
      // default: () => [0, 0],
    },

    /**
     * 如果为 true，则视图将始终在交互后动画到最接近的缩放级别；false 表示允许中间缩放级别
     */
    constrainResolution: {
      type: Boolean,
    },

    /**
     * 用于确定分辨率约束的最大缩放级别。它与minZoom(or maxResolution) 和zoomFactor一起使用。请注意，如果还提供了minResolution，它的优先级高于maxZoom.
     */
    maxZoom: {
      type: Number,
      //default: 20,
    },

    /**
     * 用于确定分辨率约束的最小缩放级别。它与maxZoom(or minResolution) 和zoomFactor一起使用。请注意，如果还提供了maxResolution，它的优先级高于minZoom.
     */
    minZoom: {
      type: Number,
      //default: 1,
    },

    /**
     * 视图的初始分辨率。单位是projection每像素的单位（例如，每像素米）。设置它的另一种方法是设置zoom。如果 this 也未定义，则不会获取层源zoom，但可以稍后使用#setZoom或#setResolution设置它们。
     */
    resolution: {
      type: Number,
    },

    /**
     * 视图的初始旋转以弧度为单位（顺时针正旋转，0 表示北）。
     */
    rotation: {
      type: Number,
    },

    /**
     * 仅在resolution未定义时使用。用于计算视图初始分辨率的缩放级别。
     */
    zoom: {
      type: Number,
      //default: 1,
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
        center: this.center,
        constrainResolution: this.constrainResolution,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        resolution: this.resolution,
        rotation: this.rotation,
        zoom: this.zoom,
      },
      this
    );

    //初始化view对象
    this.mapObject = new View(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/View').default} mapObject - openlayer瓦片图层
     */
    this.$emit("init", this.mapObject);

    this.parent.setView(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/Overlay').default} mapObject
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/View').default} mapObject - openlayer瓦片图层
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.parent.setView(null);
    this.mapObject = null;
  },
};
</script>
<style scoped></style>
