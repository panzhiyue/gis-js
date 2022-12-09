<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap, optionsMerger } from "@gis-js/vue2ol";
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
      default: null,
    },
    sepia: {
      type: String,
      default: null,
    },
    saturate: {
      type: String,
      default: null,
    },
    hueRotate: {
      type: String,
      default: null,
    },
    invert: {
      type: String,
      default: null,
    },
    opacity: {
      type: String,
      default: null,
    },
    brightness: {
      type: String,
      default: null,
    },
    contrast: {
      type: String,
      default: null,
    },
    blur: {
      type: String,
      default: null,
    },
    dropShadow: {
      type: String,
      default: null,
    },
    options: {
      type: Object,
    },
    /**
     * 需要切割的图层className数组
     * @typeName {string[]}
     */
    classNameList: {
      type: Array,
      default: () => {
        return ["ol-layer"];
      },
    },
    /**
     * 顺序
     * @typeName {string[]}
     */
    sort: {
      type: Array,
      default: () => {
        return [
          "blur",
          "brightness",
          "contrast",
          "grayscale",
          "hue-rotate",
          "invert",
          "opacity",
          "saturate",
          "sepia",
        ];
      },
    },
  },

  data() {
    return {};
  },
  computed: {
    filter() {
      let options = optionsMerger(
        {
          grayscale: this.grayscale,
          sepia: this.sepia,
          saturate: this.saturate,
          hueRotate: this.hueRotate,
          invert: this.invert,
          opacity: this.opacity,
          brightness: this.brightness,
          contrast: this.contrast,
          blur: this.blur,
          dropShadow: this.dropShadow,
        },
        this
      );
      let filter = "";
      for (let i in this.sort) {
        let field = this.sort[i];
        filter += options[field] ? `${field}(${options[field]}) ` : "";
      }
      return filter;
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findParentMap(this.$parent).mapObject;
    }

    this.parent.on("postcompose", this.onPostRender);
  },
  beforeDestroy() {
    this.parent.un("postcompose", this.onPostRender);
  },
  methods: {
    onPostRender(e) {
      let map = e.target;
      let renderer = map.getRenderer();

      if (renderer && renderer.children_.length > 0) {
        renderer.children_.forEach((children, index) => {
          if (this.classNameList.indexOf(children.className) > -1) {
            const canvas = children.firstElementChild;
            let context = canvas.getContext("2d");
            context.filter = this.filter;
          }
        });
      }
    },
  },
};

/**
 * @
 */
</script>
