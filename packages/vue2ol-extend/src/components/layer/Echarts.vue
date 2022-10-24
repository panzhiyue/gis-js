<template>
  <div></div>
</template>
<script>
import EchartsLayer from "ol-echarts";
import { BaseObjectMixin, findParentMap } from "@gis-js/vue2ol";
import ImageLayer from "ol/layer/Image";
import ImageStaticSource from "ol/source/ImageStatic";
export default {
  name: "Vue2olLayerEcharts",
  mixins: [BaseObjectMixin],
  data() {
    return {
      moving: false,
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

    this.parent.on("pointerdown", this.handlePointerDown);

    this.parent.on("movestart", this.handleMoveStart);

    this.parent.on("moveend", this.handleMoveEnd);

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
      this.initImageLayer();
    },
    handleMoveStart(e) {
      if (this.imageLayer) {
        this.imageLayer.setOpacity(1);
      }
    },
    handleMoveEnd() {
      this.initImageLayer();
    },
    dispose() {
      this.mapObject.remove();
      this.mapObject = null;

      this.parent.un("pointerdown", this.handlePointerDown);

      this.parent.un("movestart", this.handleMoveStart);

      this.parent.un("moveend", this.handleMoveEnd);
    },
    initImageLayer() {
      this.url = this.mapObject.$chart.getDataURL("image/png");
      let image = new Image();
      image.onload = () => {
        if (this.imageLayer) {
          this.parent.removeLayer(this.imageLayer);
          this.imageLayer = null;
        }
        this.imageLayer = new ImageLayer({
          source: new ImageStaticSource({
            url: this.url,
            imageExtent: this.parent.getView().calculateExtent(),
            projection: this.parent.getView().getProjection(),
          }),
        });
        this.imageLayer.setOpacity(0);
        this.parent.addLayer(this.imageLayer);
        this.imageLayer.render();
        // this.imageLayer.getSource().refresh();
        // this.parent.renderSync();
      };
      image.src = this.url;
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
