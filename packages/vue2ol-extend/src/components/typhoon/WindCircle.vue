<template>
  <vue2ol-feature :style-obj="style" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-polygon :coordinates="pointsArray"></vue2ol-geom-polygon>
  </vue2ol-feature>
</template>

<script>
import { Style, Fill, Stroke } from "ol/style";
import { parseWndRadius } from "../../utils/typhoon.js";
import { ObjectMixin } from "@gis-js/vue2ol";
import {Vue2olFeature,Vue2olGeomPolygon} from "@gis-js/vue2ol"

/**
 * 台风风圈
 */
export default {
  name: "Vue2olTyphoonWindcircle",
  mixins: [ObjectMixin],
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
     * @typeName [x,y]坐标
     */
    position: {
      type: Array,
    },
    /**
     * 台风四象限半径
     * @typeName {es:Number,ne:Number,wn:Number,ws:Number}
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
