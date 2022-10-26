<!-- ol/source/ImageCanvas -->
<template>
    <div>
      <slot v-if="ready"></slot>
    </div>
  </template>
    <script>
  import ImageCanvas from "ol/source/ImageCanvas";
  import ImageSourceMixin from "../../mixins/ImageSource";
  import {
    optionsMerger,
    bindListeners,
    propsBinder,
    getListeners,
  } from "../../utils/index";
  /**
   * ol/source/ImageCanvas
   * @since v1.0.0
   */
  export default {
    name: "Vue2olSourceImagecanvas",
    mixins: [ImageSourceMixin],
    emits: ["init", "append", "ready"],
    data() {
      return {};
    },
    props: {
    },
    methods: {},
    mounted() {
      let options = optionsMerger(
        {
          ...(this.imageSourceOptions || {})
        },
        this
      );
      //初始化view对象
      this.mapObject = new ImageCanvas(options);
      this.properties && this.mapObject.setProperties(this.properties);
  
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);
  
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/source/ImageCanvas').default} mapObject 地图元素
       */
      this.$emit("init", this.mapObject);
  
      this.parent.setSource(this.mapObject);
  
      /**
       * 地图元素添加到地图时触发
       * @type {object}
       * @property {import('ol/source/ImageCanvas').default} mapObject 地图元素
       */
      this.$emit("append", this.mapObject);
  
      this.ready = true;
      this.$nextTick(() => {
        /**
         * 组件就绪时触发
         * @type {object}
         * @property {import('ol/source/ImageCanvas').default} mapObject 地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  };
  </script>
    <style scoped></style>
    