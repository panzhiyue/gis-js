<!-- ol/source/Stamen -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Stamen from 'ol/source/Stamen'
import XYZSourceMixin from '../../mixins/XYZSource'
import { optionsMerger, bindListeners, propsBinder,getListeners } from '../../utils/index'
/**
 * ol/source/Stamen的vue组件
 * @since v1.0.0
 */
export default {
  name: 'Vue2olSourceStamen',
  mixins: [XYZSourceMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 图层名称
     * @values 'terrain'|'terrain-background'|'terrain-labels'|'terrain-lines'|'toner-background'|'toner'|'toner-hybrid'|'toner-labels'|'toner-lines'|'toner-lite'|'watercolor'
     */
    layer: {
      type: String,
      default: 'terrain',
    },
  },
  methods: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.XYZSourceMixin || {}),
        layer: this.layer,
      },
      this
    )
    //初始化view对象
    this.mapObject = new Stamen(options)

    //绑定事件
    bindListeners(this.mapObject, getListeners(this))
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props)

    this.parent.setSource(this.mapObject)

    this.ready = true
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/source/Stamen').default} mapObject
       */
      this.$emit('ready', this.mapObject)
    })
  },
}
</script>
<style scoped></style>
