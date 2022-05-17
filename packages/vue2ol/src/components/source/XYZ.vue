<!-- ol/source/XYZ -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import XYZ from 'ol/source/XYZ'
import XYZSourceMixin from '../../mixins/XYZSource'
import { optionsMerger, bindListeners, propsBinder,getListeners } from '../../utils/index'
/**
 * ol/source/XYZ的vue组件
 * @since v1.0.0
 */
export default {
  name: 'Vue2olSourceXyz',
  mixins: [XYZSourceMixin],
  data() {
    return {}
  },
  props: {},
  methods: {},
  mounted() {
    let options = optionsMerger(this.xyzSourceOptions, this)
    //初始化view对象
    this.mapObject = new XYZ(options)
    this.properties && this.mapObject.setProperties(this.properties);

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
       * @property {import('ol/source/XYZ').default} mapObject
       */
      this.$emit('ready', this.mapObject)
    })
  },
}
</script>
<style scoped></style>
