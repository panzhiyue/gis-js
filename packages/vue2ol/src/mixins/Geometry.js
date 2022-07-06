import ObjectMixin from './Object'
import OptionsMixin from './Options'
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
  provide() {
    return {
      geometry: this,
    };
  },
  mixins: [ObjectMixin, OptionsMixin],
  props: {
    /**
     * 要素，如果为null则从parent中获取
     * @typeName {import('ol/Feature').default}
     */
    feature: {
      type: Object,
    },

    /**
     * 布局
     * @typeName {import('ol/geom/GeometryLayout').default}
     */
    opt_layout: {
      type: Object,
    },
  },
  mounted() {
    if (this.feature) {
      this.parent = this.feature
    } else {
      this.parent = findRealParent(this.$parent).mapObject
    }
  },
  destroyed() {
    this.parent.setGeometry(null)
    this.mapObject = null
  },
}