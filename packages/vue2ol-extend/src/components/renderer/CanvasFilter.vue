<template>
  <div></div>
</template>
<script>
import {
  findRealParent,
  findParentMap,
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners 
} from "@gis-js/vue2ol";
import * as utilsol from "@gis-js/utilsol";
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
  emits: ["init", "append", "ready"],
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
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findParentMap(this.$parent).mapObject;
    }

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
    console.log(options);
    //初始化view对象
    this.mapObject = new utilsol.renderer.CanvasFilter(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('utilsol/renderer/CanvasFilter').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.mapObject.setMap(this.parent);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('utilsol/renderer/CanvasFilter').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('utilsol/renderer/CanvasFilter').default} mapObject 地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.mapObject.setMap(null);
    this.mapObject = null;
  },
  unmounted() {
    this.mapObject.setMap(null);
    this.mapObject = null;
  },
  methods: {},
};

/**
 * @
 */
</script>
