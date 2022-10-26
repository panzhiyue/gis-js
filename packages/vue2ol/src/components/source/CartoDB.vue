<!-- ol/source/CartoDB -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import CartoDB from "ol/source/CartoDB";
import XYZSourceMixin from "../../mixins/XYZSource";
import {
  optionsMerger,
  bindListeners,
  propsBinder,
  getListeners,
} from "../../utils/index";
/**
 * ol/source/CartoDB的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olSourceCartodb",
  mixins: [XYZSourceMixin],
  emits: ["init", "append", "ready"],
  data() {
    return {};
  },
  props: {
    config: {
      type: Object,
    },
  },
  methods: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.xyzSourceOptions || {}),
        config: this.config,
      },
      this
    );
    //初始化view对象
    this.mapObject = new CartoDB(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/source/CartoDB').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.setSource(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/source/CartoDB').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/source/CartoDB').default} mapObject 地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>
