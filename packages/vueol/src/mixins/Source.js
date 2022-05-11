import ObjectMixin from './Object'
import {
  findRealParent
} from '../utils/index'


export default {
  data() {
    return {
      mapObject: null, //对应的openlayers对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    }
  },
  mixins: [ObjectMixin],
  props: {
    /**
     * 图层,如果为null则从parent中获取
     * @typeName {import('ol/layer/BaseLayer').default}
     */
    parentLayer: {
      type: Object,
    },

    /**
     * 属性
     * @typeName {import('ol/source/Source').AttributionLike|undefined}
     */
    attributes: {
      type: Object,
    },

    /**
     *
     */
    projection: {
      type: [String, Object]
    },
  },
  mounted() {
    if (this.parentLayer) {
      this.parent = this.parentLayer
    } else {
      this.parent = findRealParent(this.$parent).mapObject
    }
    this.sourceOptions = {
      attributes: this.attributes,
      projection: this.projection
    }
  },
  destroyed() {
    this.parent.setSource(null)
    this.mapObject = null
  },
}