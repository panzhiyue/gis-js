<template>
  <vue2ol-overlay
    class="vue2ol-typhoon-name"
    v-bind="attrs_"
    v-on="listeners_"
    :position="position"
    positioning="center-left"
    :offset="[10,0]"
    :options="{stopEvent:true}"
  >
    {{ name }}
  </vue2ol-overlay>
</template>

<script>
import { Style, Fill, Stroke } from "ol/style";
import { Vue2olOverlay } from "@gis-js/vue2ol";
import { BaseObjectMixin } from "@gis-js/vue2ol";

/**
 * 台风名称
 */
export default {
  name: "Vue2olTyphoonName",
  mixins: [BaseObjectMixin],
  components: {
    Vue2olOverlay,
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
     * 台风名称
     */
    name: {
      type: String,
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

<style scoped>
.vue2ol-typhoon-name {
  background: #363636;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid transparent;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: black;
  font: 12px/18px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 4px 8px;
  visibility: inherit;
  white-space: nowrap;
  z-index: 200;
}

.vue2ol-typhoon-name:before {
  border-right: 6px solid black;
  border-right-color: rgba(255, 255, 255, 0.5);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -6px;
  left: -6px;
}
</style>
