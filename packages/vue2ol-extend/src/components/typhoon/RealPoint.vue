<template>
  <vue2ol-feature :style-obj="style" v-bind="attrs_" v-on="listeners_">
    <vue2ol-geom-point
      :coordinates="[data.longitude, data.latitude]"
    ></vue2ol-geom-point>
  </vue2ol-feature>
</template>

<script>
import { Style, Circle, Fill } from "ol/style";
import { ObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomLinestring } from "@gis-js/vue2ol";
import { colorTable } from "../../utils/typhoon";

/**
 * 实际路线节点
 */
export default {
  name: "Vue2olTyphoonRealpoint",
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
     * 节点数据
     * @typeName [PathData](./Main.html#pathdata)
     */
    data: {
      type: Object,
    },
  },
  computed: {
    style() {
      return new Style({
        image: new Circle({
          fill: new Fill({
            color: colorTable[this.data.level],
          }),
          radius: 4,
        }),
      });
    },
  },
};
</script>

<style></style>
