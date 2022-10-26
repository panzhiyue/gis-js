<!-- ol/source/GeoTIFF -->
<template>
    <div>
      <slot v-if="ready"></slot>
    </div>
  </template>
  <script>
  import GeoTIFF from "ol/source/GeoTIFF";
  import DataTileSourceMixin from "../../mixins/DataTileSource";
  import {
    optionsMerger,
    bindListeners,
    propsBinder,
    getListeners,
  } from "../../utils/index";
  /**
   * [ol/source/GeoTIFF](https://openlayers.org/en/latest/apidoc/module-ol_source_GeoTIFF-GeoTIFFSource.html)的vue组件
   * @since v1.0.0
   */
  export default {
    name: "Vue2olSourceGeotiff",
    mixins: [DataTileSourceMixin],
    emits: ["init", "append", "ready"],
    data() {
      return {};
    },
    props: {},
    methods: {},
    mounted() {
      let options = optionsMerger(this.dataTileSourceOptions, this);
      //初始化openlayers对象
      this.mapObject = new GeoTIFF(options);
      this.properties && this.mapObject.setProperties(this.properties);
  
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);
  
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/source/GeoTIFF').default} mapObject 地图元素
       */
      this.$emit("init", this.mapObject);
  
      this.parent.setSource(this.mapObject);
  
      /**
       * 地图元素添加到地图时触发
       * @type {object}
       * @property {import('ol/source/GeoTIFF').default} mapObject 地图元素
       */
      this.$emit("append", this.mapObject);
  
      this.ready = true;
      this.$nextTick(() => {
        /**
         * 组件就绪时触发
         * @type {object}
         * @property {import('ol/source/GeoTIFF').default} mapObject
         */
        this.$emit("ready", this.mapObject);
      });
    },
  };
  </script>
  <style scoped></style>
  