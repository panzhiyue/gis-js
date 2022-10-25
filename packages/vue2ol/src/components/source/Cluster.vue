<!-- ol/source/Cluster -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Cluster from "ol/source/Cluster";
import VectorSourceMixin from "../../mixins/VectorSource";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
/**
 * ol/source/Cluster的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olSourceCluster",
  mixins: [VectorSourceMixin],
  data() {
    return {};
  },
  props: {
    distance: {
      type: Number,
    },
    minDistance: {
      type: Number,
    },
    /**
     * @typeName [ol/source/Vector](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html)
     */
    source: {
      type: Object,
    },
  },
  methods: {
  },
  mounted() {
    let options = optionsMerger(
      {
        ...(this.vectorSourceOptions || {}),
        source: this.source,
        distance: this.distance,
        minDistance: this.minDistance,
      },
      this
    );

    //初始化view对象
    this.mapObject = new Cluster(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/source/Cluster').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.setSource(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/source/Cluster').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/source/Cluster').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>
