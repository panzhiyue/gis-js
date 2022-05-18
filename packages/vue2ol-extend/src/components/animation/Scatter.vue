<template>
  <div></div>
</template>

<script>
import * as utilsol from "@gis-js/utilsol"
import { optionsMerger, findRealParent, bindListeners, propsBinder,getListeners } from '@gis-js/vue2ol'
import OptionsMixin from '@gis-js/vue2ol'
/**
 * utilsol/animation/Scatter的vue组件
 * @since v1.0.0
 */
export default {
  name: 'Vue2olAnimationScatter',
  components: {},
  mixins: [OptionsMixin],
  props: {
    /**
     * 数据源,如果为null则从parent中获取
     * @typeName {import('ol/source/Vector').default}
     */
    parentSource: {
      type: Object,
    },

    /**
     * 坐标点
     * @typeName {import('ol/coordinate').Coordinate}
     */
    coordinate: {
      type: Array,
    },

    /**
     * 散点内圈半径
     */
    innerRadius: {
      type: Number,
      default: 10,
    },

    /**
     * 散点外圈半径
     */
    outerRadius: {
      type: Number,
      default: 50,
    },

    /**
     * 散点内圈透明度
     */
    innerOpacity: {
      type: Number,
      default: 0,
    },

    /**
     * 散点外圈透明度
     */
    outerOpacity: {
      type: Number,
      default: 0.3,
    },

    /**
     * 是否循环
     */
    loop: {
      type: Boolean,
      default: true,
    },

    /**
     * 中心点样式
     * @typeName {Function|Object|import('ol/style/Style').default|Array<import('ol/style/Style').default>}
     */
    centerStyle: {
      type: [Function, Object, Array],
    },

    /**
     * 散点样式
     * @typeName {Function|Object|import('ol/style/Style').default|Array<import('ol/style/Style').default>}
     */
    rippleStyle: {
      type: [Function, Object, Array],
    },

    /**
     * 动画周期
     */
    period: {
      type: Number,
    },
  },
  data() {
    return {
      parent: null,
      mapObject: null,
    }
  },
  mounted() {
    if (this.parentSource) {
      this.parent = this.parentSource
    } else {
      this.parent = findRealParent(this.$parent).mapObject
    }

    let options = optionsMerger(
      {
        coordinate: this.coordinate,
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius,
        innerOpacity: this.innerOpacity,
        outerOpacity: this.outerOpacity,
        loop: this.loop,
        centerStyle: this.centerStyle,
        rippleStyle: this.rippleStyle,
        period: this.period,
        source: this.parent,
      },
      this
    )
    //初始化view对象
    this.mapObject = new utilsol.animation.Scatter(options)

    //绑定事件
    bindListeners(this.mapObject, getListeners(this))
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props)
    this.mapObject.start()
    this.ready = true
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('utilsol/animation/Scatter').default} mapObject
       */
      this.$emit('ready', this.mapObject)
    })
  },
  destroyed() {
    this.mapObject.dispose()
  },
  methods: {
    setParentSource(newVal, oldVal) {
      this.mapObject.setSource(newVal)
    },
  },
}
</script>
<style lang="less" scoped>

</style>
