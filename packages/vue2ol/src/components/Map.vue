<template>
  <div class="vue2ol-map" v-bind="attrs">
    <!-- @slot default -->
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Map from "ol/Map";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
  getAttrs,
} from "../utils/index";
import ObjectMixin from "../mixins/Object";
import OptionsMixin from "../mixins/Options";
/**
 * ol/Map的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
 */
export default {
  name: "Vue2olMap",
  inheritAttrs: false,
  mixins: [ObjectMixin, OptionsMixin],
  emits: ["init", "ready"],
  data() {
    return {
      mapObject: null,
      ready: false, //是否加载完毕
      attrs: null,
    };
  },
  props: {
    /**
     * 地图的图层组
     * @typeName {import('ol/layer/Group').LayerGroup}
     */
    layerGroup: {
      type: Object,
    },

    /**
     * 图层数组。如果未定义，则将渲染没有图层的地图。请注意，图层是按照提供的顺序呈现的，因此，例如，如果您希望矢量图层出现在切片图层的顶部，则它必须位于切片图层之后。
     * @typeName {Array<import('ol/layer/Base').BaseLayer> | import('ol/Collection').Collection<import('ol/Base').BaseLayer>}
     */
    layers: {
      type: Array,
    },

    /**
     * 地图的大小
     * @typeName {import('ol/size').Size}
     */
    size: {
      type: Array,
    },

    /**
     * @typeName {import('ol/View').default}
     */
    view: {
      type: Object,
    },
  },
  beforeMount() {
    this.attrs = getAttrs(this);
  },
  mounted() {
    let options = optionsMerger(
      {
        layers: this.layers,
        view: this.view,
        target: this.$el,
      },
      this
    );
    //初始化view对象
    this.mapObject = new Map(options);
    this.layerGroup && this.mapObject.setLayerGroup(this.layerGroup);
    this.properties && this.mapObject.setProperties(this.properties);
    this.size && this.mapObject.setSize(this.size);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {Object}
     * @property {import('ol/Map')} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {Object}
       * @property {import('ol/Map')} mapObject 地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.mapObject.dispose();
    this.mapObject = null;
  },
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>

