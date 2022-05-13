<template>
  <vue2ol-source-xyz :url="newUrl"></vue2ol-source-xyz>
</template>
<script>
import { XYZSourceMixin, Vue2olSourceXyz } from "@gis-js/vue2ol";
export default {
  name: "vue2ol-source-gaode",
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
     * 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion
     * @values "normal_map" | "satellite_map" | "satellite_annotion"
     *
     */
    layer: {
      type: String,
      default: "normal_map",
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

    let options = {
      ...(this.xyzSourceOptions || {}),
    };
  },
};
</script>