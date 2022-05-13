

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

/**
 * ol/Feature的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html
 */
export default {
  name: "Vue2olFeature",
  data() {
    return {
      mapObject: null, //ol/Feature对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    };
  },
  props: {
    /**
     * @typeName {ol/layer/Vector').default}
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

    /**
     * ol/Feature 实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
     */
    options: {
      type: Object,
    },
  },
  methods: {
    setStyleObj(value) {
      this.mapObject.setStyle(value);
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
    this.geometryName && this.mapObject.setGeometryName(this.geometryName);
    this.id && this.mapObject.setId(this.id);
    this.styleObj && this.mapObject.setStyle(this.styleObj);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.addFeature(this.mapObject);
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
    console.log(1331);
    this.mapObject = null;
  },
};
</script>
<style scoped></style>
