<template> </template>
<script>
import { findRealParent } from "@gis-js/vue2ol";
import DrawTool from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as style from "ol/style";
import WKT from "ol/format/WKT";
import Feature from "ol/Feature";
import * as Extent from "ol/extent";

/**
 *
 */
export default {
  name: "Vue2olInteractionMeasure",
  components: {},
  provide() {
    return {
      interaction: this,
    };
  },
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @type {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },
  },
  data() {
    return {
      drawTool: null, //ol/interaction/Draw 对象
    };
  },
  watch: {},
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    //初始化并添加矢量图层
    this.layer = new VectorLayer({
      source: new VectorSource(),
      style: this.styleObj
        ? this.styleObj
        : new style.Style({
            image: new style.Circle({
              radius: 10,
              stroke: new style.Stroke({
                color: "#3399CC",
                width: 1.25,
              }),
              fill: new style.Fill({
                color: "rgba(255,255,255,0.4)",
              }),
            }),
            fill: new style.Fill({
              color: "rgba(255,255,255,0.4)",
            }),
            stroke: new style.Stroke({
              color: "#3399CC",
              width: 1.25,
            }),
          }),
    });
    this.parent.addLayer(this.layer);
    this.initTool("Point");
  },
  beforeDestroy() {},
  methods: {
    /**
     * 获取中心点
     */
    getCenter() {
      let centroid = [];
      let features = this.layer.getSource().getFeatures();
      if (features.length > 0) {
        centroid = Extent.getCenter(this.layer.getSource().getExtent());
      }
      return centroid;
    },
    initFeatures() {
      if (!this.layer) {
        return;
      }
      this.layer.getSource().clear();
      //添加几何
      if (this.geom) {
        let geom = this.format.readGeometry(this.geom);
        if (geom.getType() == "MultiPolygon") {
          let polygons = geom.getPolygons();
          for (let i = 0; i < polygons.length; i++) {
            this.layer.getSource().addFeature(
              new Feature({
                geometry: polygons[i],
              })
            );
          }
        } else {
          this.layer.getSource().addFeature(
            new Feature({
              geometry: geom,
            })
          );
        }
      }
    },
    /**
     * 初始化工具
     */
    initTool(type) {
      if (type == "Point" || type == "LineString" || type == "Polygon") {
        this.initDraw(type);
      } else {
        this.initDraw();
      }
    },
    initDraw(type) {
      if (this.drawTool) {
        this.drawTool.setActive(false);
        this.parent.removeInteraction(this.drawTool);
        this.drawTool = null;
      }

      if (type) {
        this.drawTool = new DrawTool({
          source: this.layer.getSource(),
          type: type,
        });

        this.drawTool.on("drawend", (e) => {
          //   this.removeGeometry();
          //   setTimeout(() => {
          //     this.refresh();
          //   }, 500);
        });

        this.parent.addInteraction(this.drawTool);
      }
    },
  },
};
</script>
<style lang="less" scoped></style>
