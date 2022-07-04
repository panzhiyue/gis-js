
<template>
  <div></div>
</template>
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
  name: "Vue2olInteractionPickup",
  components: {},
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @type {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },
    /**
     * 几何对象（自定义）
     */
    geom: {
      type: [String, Object, Array],
    },
    /**
     * 样式
     * @type {import('ol/style/Style').default}
     */
    styleObj: {
      type: [Object, Function],
    },
    /**
     * 格式
     *
     */
    format: {
      default: () => {
        return new WKT();
      },
    },
  },
  data() {
    return {
      parent: null,
      drawTool: null, //ol/interaction/Draw 对象
      layer: null, //矢量图层
    };
  },
  watch: {
    geom() {
      this.initFeatures();
    },
    styleObj() {
      this.layer.setStyle(this.styleObj);
    },
  },
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
    this.initFeatures();
    if (this.layer.getSource().getFeatures().length > 0) {
      this.parent.getView().setCenter(this.getCenter());
    }
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
     * 获取几何
     * @public
     * @returns {any} 几何
     */
    getGeom() {
      let features = this.layer.getSource().getFeatures();
      if (features.length == 0) {
        return "";
      }
      return this.format.writeGeometry(features[0].getGeometry());
    },
    refresh() {
      let str = this.getGeom();
      if (this.geom != str) {
        this.$emit("update:geom", str);
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
          this.removeGeometry();

          setTimeout(() => {
            this.refresh();
          }, 500);
        });

        this.parent.addInteraction(this.drawTool);
      }
    },
    /**
     * 删除几何
     * @param {String} type 几何类型(Point：点,LineString:线,Polygon:面)
     */
    removeGeometry(type) {
      let features = this.layer.getSource().getFeatures();

      for (let i = features.length - 1; i >= 0; i--) {
        let feature = features[i];
        let geomType = feature.getGeometry().getType();
        if (!type) {
          this.layer.getSource().removeFeature(feature);
        } else if (geomType == type) {
          this.layer.getSource().removeFeature(feature);
        }
      }
    },
    getCenter() {
      let centroid = [];
      let features = this.layer.getSource().getFeatures();
      if (features.length > 0) {
        centroid = Extent.getCenter(this.layer.getSource().getExtent());
      }
      return centroid;
    },
    getCenterObj() {
      let center = this.getCenter();
      if (center.length == 2) {
        return {
          lng: center[0],
          lat: center[1],
        };
      } else {
        return null;
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>
