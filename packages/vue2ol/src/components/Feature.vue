

<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Feature from "ol/Feature";
import {
  optionsMerger,
  findRealParent,
  bindListeners,
  propsBinder,
  getListeners,
} from "../utils/index";

import ObjectMixin from "../mixins/Object";
import OptionsMixin from "../mixins/Options";

/**
 * ol/Feature的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html
 */
export default {
  name: "Vue2olFeature",
  mixins: [ObjectMixin, OptionsMixin],
  data() {
    return {
      mapObject: null, //ol/Feature对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    };
  },
  emits: ["init", "append", "ready"],
  props: {
    /**
     * @typeName {import('ol/layer/Vector').default}
     */
    parentLayer: {
      type: Object,
    },

    /**
     * 几何图形
     * @typeName {import('ol/geom/Geometry').default}
     */
    geometry: {
      type: Object,
    },

    /**
     * 要素几何图形的属性名称。调用[ol/Feature~Feature#getGeometry](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html#getGeometry)时，将返回具有该名称的属性的值。
     */
    geometryName: {
      type: String,
      custom: true,
    },

    /**
     * feature的ID
     */
    id: {
      type: [Number, String],
    },

    /**
     * 特征的样式。
     * 因为style是保留属性，因此改名为styleObj
     * @typeName {import('ol/style/Style').StyleLike}
     */
    styleObj: {
      type: Object,
      custom: true,
    },
  },
  methods: {
    /**
     * 设置几何样式(替代setStyle方法，因为在vue中,style是保留属性)
     * @param {Object|function} value 样式
     */
    setStyleObj(value) {
      this.mapObject.setStyle(value);
    },
    /**
     * 设置几何名称方法(覆盖openlayers原生方法，解决设置几何名称之后几何图形没有赋值的Bug)
     * @param {string} name 几何名称
     */
    setGeometryName(name) {
      let geometry = this.mapObject.getGeometry();
      this.mapObject.setGeometryName(name);
      this.mapObject.setGeometry(geometry);
    },
  },
  mounted() {
    if (this.parentLayer) {
      this.parent = this.parentLayer;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
    let options = optionsMerger(
      {
        geometry: this.geometry,
      },
      this
    );
    this.mapObject = new Feature(options);
    this.geometryName && this.setGeometryName(this.geometryName);
    this.id && this.mapObject.setId(this.id);
    this.styleObj && this.mapObject.setStyle(this.styleObj);
    this.properties && this.mapObject.setProperties(this.properties);
    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/Feature').default} mapObject -
     */
    this.$emit("init", this.mapObject);
    // 将feature层添加到layer当中
    this.parent.addFeature(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/Feature').default} mapObject -
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/Feature').default} mapObject -
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.parent.removeFeature(this.mapObject);
    this.mapObject = null;
  },
};
</script>
<style scoped></style>
