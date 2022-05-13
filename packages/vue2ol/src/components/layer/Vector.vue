
<!-- ol/layer/Vector -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Vector from 'ol/layer/Vector'
import BaseVectorLayerMixin from '../../mixins/BaseVectorLayer'
import { optionsMerger, bindListeners, propsBinder,getListeners } from '../../utils/index'
/**
 * ol/layer/Vector的vue组件
 * @since v1.0.0
 */
export default {
  name: 'Vue2olLayerVector',
  mixins: [BaseVectorLayerMixin],
  data() {
    return {}
  },
  props: {},
  watch: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.baseVectorLayerOptions || {}),
      },
      this
    )

    options.style = options.styleObj
    this.mapObject = new Vector(options)

    //绑定事件
    bindListeners(this.mapObject, getListeners(this))
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props)

    this.parent.addLayer(this.mapObject)
    this.ready = true
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/layer/Vector').default} mapObject - openlayer瓦片图层
       */
      this.$emit('ready', this.mapObject)
    })
  },
  destroyed() {
    this.parent.removeLayer(this.mapObject)
    this.mapObject = null
  },
}
</script>
<style scoped></style>
