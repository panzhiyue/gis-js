<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap } from "@gis-js/vue2ol";
/**
 * Canvas滤镜
 */
export default {
  name: "Vue2olRendererCanvasfilter",
  provide() {
    return {
      renderer: this,
    };
  },
  props: {
    /**
     * 父亲地图
     */
    parentMap: null,
    grayscale: {
      type: String,
      default: 0,
    },
    sepia: {
      type: String,
      default: 0,
    },
    saturate: {
      type: String,
      default: 0,
    },
    hueRotate: {
      type: String,
      default: 0,
    },
    invert: {
      type: String,
      default: 0,
    },
    opacity: {
      type: String,
      default: 0,
    },
    brightness: {
      type: String,
      default: 0,
    },
    contrast: {
      type: String,
      default: 0,
    },
    blur: {
      type: String,
      default: 0,
    },
    dropShadow: {
      type: String,
      default: 0,
    },
    options: {
      type: Object,
    },
  },

  data() {
    return {};
  },
  computed: {
    filter() {
      let options = optionsMerger({}, this);
      let filter = "";
      for (let field in options) {
        if (
          [
            "blur",
            "brightness",
            "contrast",
            "grayscale",
            "hue-rotate",
            "invert",
            "opacity",
            "saturate",
            "sepia",
          ].indexOf(filed) > -1
        ) {
          filter += options[field] ? "" : `${field}(${options[field]}) `;
        }
      }

      // filter += !options.blur ? "" : "blur(" + options.blur + "px)";

      // filter += !options.brightness
      //   ? ""
      //   : " brightness(" + options.brightness + "%)";
      // filter += !options.contrast ? "" : "contrast(" + options.contrast + "%)";

      // filter += !options.grayscale
      //   ? ""
      //   : "grayscale(" + options.grayscale + "%)";
      // filter += !options.hueRotate
      //   ? ""
      //   : " hue-rotate(" + options.hueRotate + "deg)";
      // filter += !options.invert ? "" : " invert(" + options.invert + "%)";
      // filter += !options.opacity ? "" : " opacity(" + options.opacity + "%)";
      // filter += !options.saturate ? "" : " saturate(" + options.saturate + "%)";
      // filter += !options.sepia ? "" : " sepia(" + options.sepia + "%)";
      return filter;
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    this.parent.on("postcompose", this.onPostRender);
  },
  beforeDestroy() {
    this.parent.un("postcompose", this.onPostRender);
  },
  methods: {
    onPostRender(e) {
      console.log(e.target.getRenderer());
      e.context.filter = this.filter;
    },
  },
};

/**
 * @
 */
</script>
