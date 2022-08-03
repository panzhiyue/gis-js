
<!-- ol/layer/VectorTile -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import VectorTile from "ol/layer/VectorTile";
import VectorTileLayerMixin from "../../mixins/VectorTileLayer";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
/**
 * ol/layer/VectorTile的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olLayerVectortile",
  mixins: [VectorTileLayerMixin],
  data() {
    return {};
  },
  props: {},
  watch: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.vectorTileLayerOptions || {}),
      },
      this
    );

    options.style = options.styleObj;
    this.mapObject = new VectorTile(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/layer/VectorTile').default} mapObject  地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.addLayer(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/layer/VectorTile').default} mapObject  地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/layer/VectorTile').default} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.parent.removeLayer(this.mapObject);
    this.mapObject = null;
  },
  unmounted() {
    this.parent.removeLayer(this.mapObject);
    this.mapObject = null;
  },
};
</script>
<style scoped></style>
