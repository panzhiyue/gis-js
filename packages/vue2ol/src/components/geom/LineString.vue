

<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import LineString from 'ol/geom/LineString'
import { bindListeners, propsBinder,getListeners } from '../../utils/index'
import SimpleGeometryMixin from '../../mixins/SimpleGeometry'
/**
 * ol/geom/LineString的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_LineString-LineString.html
 */
export default {
  name: 'Vue2olGeomLinestring',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 线串的坐标。
     * @typeName {Array<import('ol/coordinate').Coordinate>}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new LineString(this.coordinates, this.opt_layout)
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this))
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props)
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject)
    this.ready = true
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/LineString').default} mapObject -
       */
      this.$emit('ready', this.mapObject)
    })
  },
}
</script>
<style scoped></style>
