<!-- ol/source/TileJSON -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import TileJSON from "ol/source/TileJSON";
import TileImageSourceMixin from "../../mixins/TileImageSource";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
/**
 * [ol/source/TileJSON](https://openlayers.org/en/latest/apidoc/module-ol_source_TileJSON-TileJSON.html)的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olSourceTilejson",
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
    this.mapObject = new TileJSON(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/source/TileJSON').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.setSource(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/source/TileJSON').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/source/TileJSON').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>
