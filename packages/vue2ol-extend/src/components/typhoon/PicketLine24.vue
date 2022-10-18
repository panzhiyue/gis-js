<template>
  <vue2ol-feature :style-obj="styleObj" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-linestring :coordinates="coordinates"></vue2ol-geom-linestring>
  </vue2ol-feature>
</template>

<script>
import { Style, Stroke, Text, Fill } from "ol/style";
import { ObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomLinestring } from "@gis-js/vue2ol";
import { LineString } from "ol/geom";

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
    return {};
  },
  props: {
    /**
     * 警戒线坐标集合
     * @typeName Array<ol/Coordinate> 坐标集合
     */
    coordinates: {
      type: Array,
      default: () => {
        return [
          [126.914062, 34.161818],
          [127.001953, 21.963425],
          [119.003906, 17.895114],
          [118.916016, 11.178402],
          [113.027344, 4.565474],
          [105.029297, 0],
        ];
      },
    },
    labelPosition: {
      type: Array,
      default: () => {
        return [126.914062, 34.161818];
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
              color: "#eed139",
              width: 1,
            }),
          }),
          new Style({
            text: new Text({
              text: "24小时警戒线",
              placement: "line",
              textBaseline: "middle",
              justify: "center",
              fill: new Fill({
                color: "#e68707",
              }),
              font: "bold 14px serif",
            }),
            geometry: new LineString([
              [126.914062, 34.161818],
              [127.001953, 21.963425],
            ]),
          }),
        ];
      },
    },
  },
};
</script>

<style></style>
