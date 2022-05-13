
<!-- ol/source/Vector -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Vector from "ol/source/Vector";
import SourceMixin from "../../mixins/Source";
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
  name: "vue2ol-source-vector",
  mixins: [SourceMixin],
  data() {
    return {};
  },
  props: {
    /**
     * 新加载器。下一个渲染周期将使用新的加载器
     * @typeName {import('ol/featureloader').FeatureLoader}
     */
    loader: {
      type: Object,
    },

    /**
     * 新的 url。下一个渲染周期将使用新的 url。
     */
    url: {
      type: String,
    },
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
        ...(this.sourceOptions || {}),
        attributes: this.attributes,
        loader: this.loader,
        url: this.url,
        features: this.features,
      },
      this
    );

    //初始化view对象
    this.mapObject = new Vector(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    this.parent.setSource(this.mapObject);

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
