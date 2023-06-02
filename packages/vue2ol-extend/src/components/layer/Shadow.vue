<template>
  <vue2ol-layer-vector :style-obj="style" :options="{ className: className }">
    <vue2ol-source-vector :features="features">
      <!-- @slot default -->
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
    /**
     * 阴影X轴偏移（正数向右，负数向左）
     */
    offsetX: {
      type: Number,
      default: 10,
    },
    /**
     * 阴影Y轴偏移（正数向下，负数向上）
     */
    offsetY: {
      type: Number,
      default: -11,
    },
    /**
     * 阴影颜色
     */
    color: {
      type: String,
      default: "rgba(104,117,124,1)",
    },
    /**
     * 画布名称
     */
    className: {
      type: String,
      default: "shadow",
    },
    /**
     * 矢量要素
     * @typeName ol/Feature
     */
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
