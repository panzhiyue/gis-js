<template>
  <vue2ol-feature :style-obj="styleObj" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-linestring :coordinates="coordinates"></vue2ol-geom-linestring>
  </vue2ol-feature>
</template>

<script>
import { Style, Stroke } from "ol/style";
import { ObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomLinestring } from "@gis-js/vue2ol";

/**
 * 24小时警戒线
 */
export default {
  name: "Vue2olTyphoonPicketline24",
  mixins: [ObjectMixin],
  components: {
    Vue2olFeature,
    Vue2olGeomLinestring,
  },
  data() {
    return {
    };
  },
  props: {
    /**
     * 台风位置
     * @typeName Array<ol/Coordinate> 坐标集合
     */
    coordinates: {
      type: Array,
      default: () => {
        return [
          [127, 34],
          [127, 21],
          [110, 15],
        ];
      },
    },
    /**
     * 样式
     * @typeName {ol/style/Style}
     */
    styleObj: {
      type: Object,
      default: () => {
        return new Style({
          stroke: new Stroke({
            color: "#ff0000",
            width: 1,
          }),
        });
      },
    },
  },
};
</script>

<style></style>
