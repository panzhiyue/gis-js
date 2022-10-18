<template>
  <vue2ol-feature :style-obj="style" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-point :coordinates="position"></vue2ol-geom-point>
  </vue2ol-feature>
</template>

<script>
import { Style, Circle, Fill } from "ol/style";
import { ObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomLinestring } from "@gis-js/vue2ol";
import {
  getTyphoonLevel,
  colorTable,
  findRadiusBySpeed,
} from "../../utils/typhoon";

/**
 * 预测路线节点
 */
export default {
  name: "Vue2olTyphoonForecastpoint",
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
     * 坐标
     * @typeName ol/Coordinate
     */
    position: {
      type: Array,
    },
    /**
     * 风速
     */
    speed: {
      type: Number,
    },
  },
  computed: {
    style() {
      return new Style({
        image: new Circle({
          fill: new Fill({
            color: colorTable[getTyphoonLevel(this.speed)],
          }),
          radius: findRadiusBySpeed(this.speed).radius,
        }),
      });
    },
  },
};
</script>

<style></style>
