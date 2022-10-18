<template>
  <vue2ol-feature :style-obj="style" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-point :coordinates="position"></vue2ol-geom-point>
  </vue2ol-feature>
</template>

<script>
import { Style, Icon } from "ol/style";
import { ObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomPoint } from "@gis-js/vue2ol";
import icon from "./typhoon.png";

/**
 * 台风点
 */
export default {
  name: "Vue2olTyphoonMarker",
  mixins: [ObjectMixin],
  components: {
    Vue2olFeature,
    Vue2olGeomPoint,
  },
  data() {
    return {
      rotation: 0,
    };
  },
  computed: {
    style() {
      return new Style({
        image: new Icon({
          src: icon,
          rotation: this.rotation,
        }),
      });
    },
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
     * 动画周期(毫秒)
     */
    duration: {
      type: Number,
    },
    /**
     * 是否顺时针
     */
    clockwise: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    console.log(this.duration);
    if (this.duration) {
      // let id = window.requestAnimationFrame((diffTime) => {
      //   console.log(diffTime);
      // });
      this.animation();
    }
  },
  methods: {
    animation() {
      window.requestAnimationFrame((diffTime) => {
        let t = diffTime % this.duration;
        this.rotation =
          (this.clockwise ? 1 : -1) * (t / this.duration) * Math.PI * 2;
        this.animation();
      });
    },
  },
};
</script>

<style></style>
