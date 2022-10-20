<template>
  <vue2ol-source-xyz :url="newUrl" :options="options">
    <slot></slot
  ></vue2ol-source-xyz>
</template>
<script>
import { Vue2olSourceXyz, ObjectMixin } from "@gis-js/vue2ol";
export default {
  name: "Vue2olSourceGaode",
  components: {
    Vue2olSourceXyz,
  },
  mixins: [ObjectMixin],
  data() {
    return {
      newUrl: "",
    };
  },
  props: {
    /**
     * 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion
     * @values "normal_map" | "satellite_map" | "satellite_annotion"
     *
     */
    layer: {
      type: String,
      default: "normal_map",
    },
    /**
     * ol/source/XYZ对应的实例化参数
     */
    options: {
      type: Object,
    },
  },
  mounted() {
    if (this.layer == "normal_map") {
      this.newUrl = `http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}`;
    } else if (this.layer == "satellite_map") {
      this.newUrl = `http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`;
    } else if (this.layer == "satellite_annotion") {
      this.newUrl = `http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}`;
    }
  },
};
</script>
