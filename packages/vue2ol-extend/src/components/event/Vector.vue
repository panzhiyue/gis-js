<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap } from "@gis-js/vue2ol";
export default {
  name: "Vue2olEventVector",
  data() {
    return {
      //   parent: null,
      //   map: null,
    };
  },
  props: {
    parentMap: {
      type: Object,
    },
    parentLayer: {
      type: Object,
    },
    timeout: {
      type: Number,
      default: 0,
    },
  },
  emits: ["on-singleclick", "on-pointermove"],
  mounted() {
    if (this.parentLayer) {
      this.parent = this.parentLayer;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    if (this.parentMap) {
      this.map = this.parentMap;
    } else {
      this.map = findParentMap(this.$parent).mapObject;
    }

    this.map.on("singleclick", this.handleSingleClick);

    this.map.on("pointermove", this.handlePointerMove);
  },
  beforeDestroy() {
    this.map.un("singleclick", this.handleSingleClick);

    this.map.un("pointermove", this.handlePointerMove);
  },
  beforeUnmount() {
    this.map.un("singleclick", this.handleSingleClick);

    this.map.un("pointermove", this.handlePointerMove);
  },
  methods: {
    handleSingleClick(event) {
      let result = this.handleMouseEvent(event);
      setTimeout(() => {
        this.$emit("on-singleclick", result);
      }, this.timeout);
    },
    handlePointerMove(event) {
      let result = this.handleMouseEvent(event);
      setTimeout(() => {
        this.$emit("on-pointermove", result);
      }, this.timeout);
    },
    handleMouseEvent(event) {
      let pixel = this.map.getEventPixel(event.originalEvent);
      let index = 0;
      let features = [];
      this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
        if (this.parent == layer) {
          feature.vue2ol_index = index;
          features.push(feature);
        }
        index++;
      });
      let result = {};
      result.event = event;
      result.features = features;
      result.layer = this.parent;

      return result;
    },
  },
};
</script>
