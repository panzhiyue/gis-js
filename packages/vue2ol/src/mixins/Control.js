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
      control: this,
    };
  },
  mixins: [ObjectMixin, OptionsMixin],
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },

  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap
    } else {
      this.parent = findRealParent(this.$parent).mapObject
    }
    this.controlOptions = {}
  },
  destroyed() {
    this.parent.removeControl(null)
    this.mapObject = null
  },
}