<!-- ol/layer/Heatmap -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Heatmap from "ol/layer/Heatmap";
import BaseVectorLayerMixin from "../../mixins/BaseVectorLayer";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
/**
 * ol/layer/Heatmap的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olLayerHeatmap",
  mixins: [BaseVectorLayerMixin],
  data() {
    return {};
  },
  props: {
    blur: {
      type: Number,
    },
    /**
     * @typeName string[]
     */
    gradient: {
      type: Array,
    },
    radius: {
      type: Number,
    },
  },
  watch: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.baseVectorLayerOptions || {}),
        blur: this.blur,
        gradient: this.gradient,
        radius: this.radius,
      },
      this
    );

    options.style = options.styleObj;
    this.mapObject = new Heatmap(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/layer/Heatmap').default} mapObject  地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.addLayer(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/layer/Heatmap').default} mapObject  地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/layer/Heatmap').default} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style></style>
