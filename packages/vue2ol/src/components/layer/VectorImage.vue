
<!-- ol/layer/VectorImage -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import VectorImage from "ol/layer/VectorImage";
import VectorImageLayerMixin from "../../mixins/VectorImageLayer";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
/**
 * ol/layer/VectorImage的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olLayerVectorimage",
  mixins: [VectorImageLayerMixin],
  data() {
    return {};
  },
  props: {},
  watch: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.vectorImageLayerOptions || {}),
      },
      this
    );

    options.style = options.styleObj;
    this.mapObject = new VectorImage(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/layer/VectorImage').default} mapObject  地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.addLayer(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/layer/VectorImage').default} mapObject  地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/layer/VectorImage').default} mapObject  地图元素
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
