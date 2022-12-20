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
    /**
     * 灰度
     */
    grayscale: {
      type: Number | String,
      default: null,
    },
    /**
     * 深褐色
     */
    sepia: {
      type: Number | String,
      default: null,
    },
    /**
     * 饱和度
     */
    saturate: {
      type: Number | String,
      default: null,
    },
    /**
     * 色相
     */
    hueRotate: {
      type: Number | String,
      default: null,
    },
    /**
     * 反相
     */
    invert: {
      type: Number | String,
      default: null,
    },
    /**
     * 透明度
     */
    opacity: {
      type: Number | String,
      default: null,
    },
    /**
     * 亮度
     */
    brightness: {
      type: Number | String,
      default: null,
    },
    /**
     * 对比度
     */
    contrast: {
      type: Number | String,
      default: null,
    },
    blur: {
      type: Number | String,
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
          "hueRotate",
          "invert",
          "opacity",
          "saturate",
          "sepia",
          "dropShadow",
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
        if (options[field]) {
          if (field == "hueRotate") {
            filter += `hue-rotate(${options[field]}deg) `;
          } else {
            filter += `${field}(${options[field]}) `;
          }
        }
      }
      return filter;
    },
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        this.parent.render();
      },
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
            // this.filter = "brightness(0.5)";
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
