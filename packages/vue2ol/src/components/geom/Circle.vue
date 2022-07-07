<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Circle from "ol/geom/Circle";
import { bindListeners, propsBinder, getListeners } from "../../utils/index";
import SimpleGeometryMixin from "../../mixins/SimpleGeometry";
/**
 * ol/geom/Circle的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_Circle-Circle.html
 */
export default {
  name: "Vue2olGeomCircle",
  mixins: [SimpleGeometryMixin],
  emits:["init","append","ready"],
  data() {
    return {};
  },
  props: {
    /**
     * 中心。
     * @typeName {import('ol/coordinate').Coordinate}
     */
    center: {
      require: true,
      type: Array,
    },

    /**
     * 半径。
     */
    radius: {
      type: Number,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new Circle(this.center, this.radius, this.opt_layout);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/geom/Circle').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/geom/Circle').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/Circle').default} mapObject 地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>
