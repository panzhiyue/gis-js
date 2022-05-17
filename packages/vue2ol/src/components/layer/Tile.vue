<!-- 瓦片图层 -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Tile from "ol/layer/Tile";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
import BaseTileLayerMixin from "../../mixins/BaseTileLayer";

/**
 * ol/layer/Tile的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olLayerTile",
  mixins: [BaseTileLayerMixin],
  emits:["init","append","ready"],
  data() {
    return {};
  },
  props: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.baseTileLayerOptions || {}),
      },
      this
    );
    this.mapObject = new Tile(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/layer/Tile').default} mapObject  地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.addLayer(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/layer/Tile').default} mapObject  地图元素
     */
    this.$emit("append", this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/layer/Tile').default} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>

