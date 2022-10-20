<template>
  <vue2ol-feature :style-obj="styleObj" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-linestring :coordinates="coordinates"></vue2ol-geom-linestring>
  </vue2ol-feature>
</template>

<script>
import { Style, Stroke, Text, Fill } from "ol/style";
import { BaseObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomLinestring } from "@gis-js/vue2ol";
import { LineString } from "ol/geom";

/**
 * 48小时警戒线
 */
export default {
  name: "Vue2olTyphoonPicketline48",
  mixins: [BaseObjectMixin],
  components: {
    Vue2olFeature,
    Vue2olGeomLinestring,
  },
  data() {
    return {};
  },
  props: {
    /**
     * 警戒线坐标集合
     * @typeName Array<ol/Coordinate>
     */
    coordinates: {
      type: Array,
      default: () => {
        return [
          [132, 33.651208],
          [132, 14.944785],
          [119.882812, 0],
          [105.029297, 0],
        ];
      },
    },
    /**
     * 样式
     * @typeName {ol/style/Style}
     */
    styleObj: {
      type: [Object, Function, Array],
      default: () => {
        return [
          new Style({
            stroke: new Stroke({
              color: "#838313",
              width: 1,
              lineDash: [5, 5],
            }),
          }),
          new Style({
            text: new Text({
              text: "48小时警戒线",
              placement: "line",
              textBaseline: "middle",
              justify: "center",
              fill: new Fill({
                color: "#4ab23c",
              }),
              font: "bold 14px serif",
            }),
            geometry: new LineString([
              [132, 33.651208],
              [132, 14.944785],
            ]),
          }),
        ];
      },
    },
  },
};
</script>

<style></style>
