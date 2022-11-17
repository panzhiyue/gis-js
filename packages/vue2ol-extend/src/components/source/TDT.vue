<template>
  <vue2ol-source-xyz
    v-bind="attrs_"
    v-on="listeners_"
    :url="newUrl"
    :projection="projection"
    :options="options"
  >
  <slot></slot>
  </vue2ol-source-xyz>
</template>
<script>
import { Vue2olSourceXyz, ObjectMixin } from "@gis-js/vue2ol";
export default {
  name: "Vue2olSourceTdt",
  mixins: [ObjectMixin],
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
      default: () => "6703c18da8b111f1ac38fdcfc4a138d8",
    },
    /**
     * 坐标系
     * @typeName {import('ol/proj').ProjectionLike}
     */
    projection: {
      type: [String, Object],
      default: "EPSG:4326",
    },
    /**
     * ol/source/XYZ对应的实例化参数
     */
    options: {
      type: Object,
    },
  },
  mounted() {
    this.newUrl = `http://t{0-3}.tianditu.gov.cn/${this.layer}_c/wmts?layer=${this.layer}&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${this.tk}`;
  },
};
</script>
