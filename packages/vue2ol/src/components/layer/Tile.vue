<!-- 瓦片图层 -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Tile from 'ol/layer/Tile'
import { optionsMerger, bindListeners, propsBinder,getListeners } from '../../utils/index'
import BaseTileLayerMixin from '../../mixins/BaseTileLayer'

/**
 * ol/layer/Tile的vue组件
 * @since v1.0.0
 */
export default {
  name: 'Vue2olLayerTile',
  mixins: [BaseTileLayerMixin],
  data() {
    return {}
  },
  props: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.baseTileLayerOptions || {}),
      },
      this
    )
    this.mapObject = new Tile(options)

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
       * @property {import('ol/layer/Tile').default} mapObject - openlayer瓦片图层
       */
      this.$emit('ready', this.mapObject)
    })
  },
}
</script>
<style scoped></style>

