

<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import MultiLineString from 'ol/geom/MultiLineString'
import { bindListeners, propsBinder,getListeners } from '../../utils/index'
import SimpleGeometryMixin from '../../mixins/SimpleGeometry'

/**
 * ol/geom/MultiLineString的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiLineString-MultiLineString.html
 */
export default {
  name: 'Vue2olGeomMultilinestring',
  mixins: [SimpleGeometryMixin],
  emits:["init","append","ready"],
  data() {
    return {}
  },
  props: {
    /**
     * 坐标或 LineString 几何图形。
     * @typeName {Array<Array<import('ol/coordinate').Coordinate>|import('ol/geom/LineString').default>}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new MultiLineString(this.coordinates, this.opt_layout)
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this))
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props)
    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/geom/MultiLineString').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.setGeometry(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/geom/MultiLineString').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);
    this.ready = true
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/MultiLineString').default} mapObject -
       */
      this.$emit('ready', this.mapObject)
    })
  },
}
</script>
<style></style>
