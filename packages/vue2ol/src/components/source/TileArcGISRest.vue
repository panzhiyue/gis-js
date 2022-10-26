<!-- ol/source/TileArcGISRest -->
<template>
    <div>
      <slot v-if="ready"></slot>
    </div>
  </template>
  <script>
  import TileArcGISRest from "ol/source/TileArcGISRest";
  import TileImageSourceMixin from "../../mixins/TileImageSource";
  import {
    optionsMerger,
    bindListeners,
    propsBinder,
    getListeners,
  } from "../../utils/index";
  /**
   * [ol/source/TileArcGISRest](https://openlayers.org/en/latest/apidoc/module-ol_source_TileArcGISRest-TileArcGISRest.html)的vue组件
   * @since v1.0.0
   */
  export default {
    name: "Vue2olSourceTilearcgisrest",
    mixins: [TileImageSourceMixin],
    emits: ["init", "append", "ready"],
    data() {
      return {};
    },
    props: {},
    methods: {},
    mounted() {
      let options = optionsMerger(this.tileImageSourceOptions, this);
      //初始化view对象
      this.mapObject = new TileArcGISRest(options);
      this.properties && this.mapObject.setProperties(this.properties);
  
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);
  
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/source/TileArcGISRest').default} mapObject 地图元素
       */
      this.$emit("init", this.mapObject);
  
      this.parent.setSource(this.mapObject);
  
      /**
       * 地图元素添加到地图时触发
       * @type {object}
       * @property {import('ol/source/TileArcGISRest').default} mapObject 地图元素
       */
      this.$emit("append", this.mapObject);
  
      this.ready = true;
      this.$nextTick(() => {
        /**
         * 组件就绪时触发
         * @type {object}
         * @property {import('ol/source/TileArcGISRest').default} mapObject
         */
        this.$emit("ready", this.mapObject);
      });
    },
  };
  </script>
  <style scoped></style>
  