<template>
  <vue2ol-source-xyz :url="newUrl"></vue2ol-source-xyz>
</template>
<script>
import { XYZSourceMixin, Vue2olSourceXyz } from "@gis-js/vue2ol";
/**
 * 智图
 */
export default {
  name: "Vue2olSourceGeoq",
  mixins: [XYZSourceMixin],
  components: {
    Vue2olSourceXyz
  },
  data() {
    return {
      newUrl: "",
    };
  },
  props: {
    /**
     * 矢量地图:normal_map,午夜蓝:normal_purplishblue,灰色:normal_gray,暖色:normal_warm,水系:theme_hydro
     * @values "normal_map" | "normal_purplishblue" | "normal_gray"|"normal_warm"|"theme_hydro"
     *
     */
    layer: {
      type: String,
      default: "normal_map",
    },
    /**
     * 坐标系
     * @typeName {import('ol/proj').ProjectionLike}
     */
    projection: {
      type: [String, Object],
      default: "EPSG:3857",
    },
  },
  mounted() {
    if (this.layer == "normal_map") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "normal_purplishblue") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "normal_gray") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "normal_warm") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "theme_hydro") {
      this.newUrl = `http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}`;
    }
   
    let options = {
      ...(this.xyzSourceOptions || {}),
      projection: this.projection,
    };
  },
};
</script>