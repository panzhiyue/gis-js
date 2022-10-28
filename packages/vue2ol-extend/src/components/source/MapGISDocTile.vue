<!--  -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import * as utilsol from "@gis-js/utilsol";
import { TileImageSourceMixin } from "@gis-js/vue2ol";

import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "@gis-js/vue2ol";
/**
 * MapGISDocTile
 * @since v1.0.0
 */
export default {
  name: "Vue2olSourceMapgisdoctile",
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
    this.mapObject = new utilsol.source.MapGISDocTile(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {utilsol.source.MapGISDocTile} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.setSource(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {utilsol.source.MapGISDocTile} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {utilsol.source.MapGISDocTile} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>
