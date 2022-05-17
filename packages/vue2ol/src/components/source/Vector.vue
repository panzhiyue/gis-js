
<!-- ol/source/Vector -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Vector from "ol/source/Vector";
import VectorSourceMixin from "../../mixins/VectorSource";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
/**
 * ol/source/Vector的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olSourceVector",
  mixins: [VectorSourceMixin],
  data() {
    return {};
  },
  props: {
    /**
     * @typeName {Array<import('ol/Feature').default>}
     */
    features: {
      type: Array,
      custom: true,
    },
  },
  methods: {
    // setLayer(newLayer, oldLayer) {
    //   this.parent.setSource(null)
    //   if (newLayer) {
    //     this.parent = newLayer
    //   } else {
    //     this.parent = findRealParent(this.$parent).mapObject
    //   }
    //   this.parent.setSource(this.mapObject)
    // },
    setFeatures(newValue, oldValue) {
      this.mapObject.clear();
      this.mapObject.addFeatures(newValue);
    },
  },
  mounted() {
    let options = optionsMerger(
      {
        ...(this.vectorSourceOptions || {}),
        features: this.features,
      },
      this
    );

    //初始化view对象
    this.mapObject = new Vector(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/source/Vector').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.setSource(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/source/Vector').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/source/Vector').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>
