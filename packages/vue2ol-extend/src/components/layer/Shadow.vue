<template>
  <vue2ol-layer-vector :style-obj="style" :options="{ className: className }">
    <vue2ol-source-vector :features="features">
      <slot></slot>
    </vue2ol-source-vector>
  </vue2ol-layer-vector>
</template>
<script>
import { Style, Stroke, Fill } from "ol/style";
import { BaseObjectMixin, findParentMap } from "@gis-js/vue2ol";
export default {
  name: "Vue2olLayerShadow",
  mixins: [BaseObjectMixin],
  data() {
    return {
      style: null,
    };
  },
  props: {
    offsetX: {
      type: Number,
      default: 10,
    },
    offsetY: {
      type: Number,
      default: -11,
    },
    color: {
      type: String,
      default: "rgba(104,117,124,1)",
    },
    className: {
      type: String,
      default: "shadow",
    },
    features: {},
  },
  mounted() {
    this.parent = findParentMap(this).mapObject;

    this.parent.on("postcompose", this.handlePostcompose);
    this.parent.on("change:size", this.handleChangeSize);

    this.style = new Style({
      stroke: new Stroke({ color: "rgba(1,1,1,0)", width: 1 }),
      fill: new Fill({
        color: this.color,
      }),
    });
  },
  methods: {
    handlePostcompose() {
      this.render();
    },
    handleChangeSize() {
      setTimeout(() => {
        this.parent.render();
      });
    },
    render() {
      let renderer = this.parent.getRenderer();
      if (renderer && renderer.children_.length > 0) {
        renderer.children_.forEach((children, index) => {
          if (children.className == this.className) {
            const canvas = children.firstElementChild;
            let context = canvas.getContext("2d");
            context.shadowColor = this.color;
            context.shadowOffsetX = this.offsetX;
            context.shadowOffsetY = this.offsetY;
          }
        });
      }
    },
    dispose() {
      this.parent.un("postcompose", this.handlePostcompose);
      this.parent.un("change:size", this.handleChangeSize);
    },
  },
  destroyed() {
    this.dispose();
  },
  unmounted() {
    this.dispose();
  },
};
</script>
