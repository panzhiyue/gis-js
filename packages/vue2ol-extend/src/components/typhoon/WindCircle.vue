<template>
  <vue2ol-feature :style-obj="style" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-polygon :coordinates="pointsArray"></vue2ol-geom-polygon>
  </vue2ol-feature>
</template>

<script>
import { Style, Fill, Stroke } from "ol/style";
import { parseWndRadius } from "../../utils/typhoon.js";
import { BaseObjectMixin } from "@gis-js/vue2ol";
import {Vue2olFeature,Vue2olGeomPolygon} from "@gis-js/vue2ol"

/**
 * 台风风圈
 */
export default {
  name: "Vue2olTyphoonWindcircle",
  mixins: [BaseObjectMixin],
  components:{
    Vue2olFeature,
    Vue2olGeomPolygon
  },
  data() {
    return {
      style: new Style({
        fill: new Fill({
          color: "rgba(255,175,96,0.3)",
        }),
        stroke: new Stroke({
          color: "rgba(255,175,96,1)",
          width: 1,
        }),
      }),
    };
  },
  props: {
    /**
     * 台风位置
     * @typeName ol/Coordinate
     */
    position: {
      type: Array,
    },
    /**
     * 台风四象限半径
     * @typeName [WndRadius](./Main.html#wndraiuds)
     */
    wndRadius: {
      type: Object,
    },
  },
  computed: {
    //台风坐标
    pointsArray() {
      return [parseWndRadius(this.wndRadius, this.position)];
    },
  },
};
</script>

<style></style>
