<template>
  <div></div>
</template>
<script>
import EchartsLayer from "ol-echarts";
import { BaseObjectMixin, findParentMap } from "@gis-js/vue2ol";
export default {
  name: "Vue2olLayerEcharts",
  mixins: [BaseObjectMixin],
  data() {
    return {};
  },
  props: {
    /**
     * echarts参数
     */
    echartsOption: {
      type: Object,
    },
    /**
     * 源坐标系
     */
    source: {
      type: String,
    },
    /**
     * 目标坐标系
     */
    destination: {
      type: String,
    },
    /**
     * 地图移动时隐藏图层
     */
    hideOnMoving: {
      type: Boolean,
      default: true,
    },
    forcedRerender: {
      type: Boolean,
      default: false,
    },
    forcedPrecomposeRerender: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.parent = findParentMap(this).mapObject;

    this.mapObject = new EchartsLayer(this.echartsOption, {
      source: this.source,
      destination: this.destination,
      hideOnMoving: this.hideOnMoving,
      forcedRerender: this.forcedRerender,
      forcedPrecomposeRerender: this.forcedPrecomposeRerender,
    });
    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {ol-echarts} mapObject  地图元素
     */
    this.$emit("init", this.mapObject);

    this.mapObject.appendTo(this.parent);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {ol-echarts} mapObject  地图元素
     */
    this.$emit("append", this.mapObject);

    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {ol-echarts} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.mapObject.remove();
    this.mapObject = null;
  },
  unmounted() {
    this.mapObject.remove();
    this.mapObject = null;
  },
};
</script>
