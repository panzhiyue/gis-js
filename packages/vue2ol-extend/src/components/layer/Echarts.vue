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
    return {
      isMoving: false,
    };
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
      hideOnMoving: true,
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
    this.parent.on("pointerdown", this.handlePointerDown);
    this.parent.on("movestart", this.handleMoveStart);

    this.parent.on("moveend", this.handleMoveEnd);
    this.parent.on("postcompose", this.handlePostcompose);

    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {ol-echarts} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
  methods: {
    handlePointerDown() {
      this.extent = this.parent.getView().calculateExtent();
      this.zoom = this.parent.getView().getZoom();
    },
    handleMoveStart(e) {
      this.isMoving = true;
    },

    handleMoveEnd() {
      this.isMoving = false;
      this.parent.render();
      this.extent = null;
      this.zoom = null;
    },
    handlePostcompose() {
      if (
        !this.mapObject ||
        this.isMoving == false ||
        this.extent == null ||
        this.hideOnMoving == true
      ) {
        return;
      }
      let topLeft = [this.extent[0], this.extent[3]];
      let pixelCoor = this.parent.getPixelFromCoordinate(topLeft);
      this.parent.renderer_.children_.forEach((children, index) => {
        let canvasArr = children.getElementsByTagName("canvas");
        for (let i = 0; i < canvasArr.length; i++) {
          let canvas = canvasArr[i];
          let context = canvas.getContext("2d");
          context.drawImage(
            this.mapObject.$chart.getRenderedCanvas(),
            pixelCoor[0],
            pixelCoor[1],
            canvas.width,
            canvas.height
          );
        }
      });
    },
    dispose() {
      this.mapObject.remove();
      this.mapObject = null;
      this.parent.un("pointerdown", this.handlePointerDown);
      this.parent.un("movestart", this.handleMoveStart);

      this.parent.un("moveend", this.handleMoveEnd);
      this.parent.un("postcompose", this.handlePostcompose);
    },
  },
  destroyed() {
    this.dispose();
  },
  unmounted() {
    this.dispose();
  },
};
</script>
