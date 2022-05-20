<template>
  <vue2ol-source-xyz :url="newUrl" :projection="projection" ></vue2ol-source-xyz>
</template>
<script>
import {Vue2olSourceXyz,XYZSourceMixin} from "@gis-js/vue2ol";
export default {
  name: "vue2ol-source-tdt",
  mixins: [XYZSourceMixin],
  components: {
    Vue2olSourceXyz,
  },
  data() {
    return {
      newUrl: "",
    };
  },
  props: {
    /**
     * 矢量地图:vec,矢量注记:cva,矢量英文注记:eva,影像地图:img,影像注记:cia,影像英文注记:eia,地形地图:ter,地形注记:cta,全球境界:ibo
     * @values "vec" | "cva" | "eva" | "img" | "cia" | "eia" | "ter" | "cta" | "ibo"
     *
     */
    layer: {
      type: String,
      default: "img",
    },

    //天地图秘钥
    tk: {
      type: String,
      default: () => "cc4ded9c8fa65c654611568acc889439",
    },
    /**
     * 坐标系
     * @typeName {import('ol/proj').ProjectionLike}
     */
    projection: {
      type: [String, Object],
      default: "EPSG:4326",
    },
  },
  mounted() {
    this.newUrl = `http://t0.tianditu.gov.cn/${this.layer}_c/wmts?layer=${this.layer}&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${this.tk}`;
  },
};
</script>