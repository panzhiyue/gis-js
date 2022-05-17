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
  mixins: [ObjectMixin,OptionsMixin],
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },

    /**
     * 图层名称
     */
    name: {
      type: String
    },

    /**
     * 图层渲染的边界范围。该层将不会在此范围之外渲染。
     * @type  {import('ol/extent').Extent}
     */
    extent: {
      type: Array,
    },

    /**
     * 图层可见的最大分辨率（不包括）。
     */
    maxResolution: {
      type: Number,
    },

    /**
     * 图层可见的最大缩放（不包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。
     */
    maxZoom: {
      type: Number,
    },

    /**
     * 图层可见的最小分辨率（包括）。
     */
    minResolution: {
      type: Number,
    },

    /**
     * 图层可见的最小缩放（包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。
     */
    minZoom: {
      type: Number,
    },

    /**
     * 图层的不透明度，允许值范围从 0 到 1。
     */
    opacity: {
      type: Number,
    },

    /**
     * 图层可见性
     */
    visible: {
      type: Boolean,
      default: true,
    },
    /**
     * 图层层级，值越大显示在上层
     */
    zIndex: {
      type: Number,
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap
    } else {
      this.parent = findRealParent(this.$parent).mapObject
    }
    this.baseLayerOptions = {
      extent: this.extent,
      maxResolution: this.maxResolution,
      maxZoom: this.maxZoom,
      minResolution: this.minResolution,
      minZoom: this.minZoom,
      opacity: this.opacity,
      visible: this.visible,
      zIndex: this.zIndex,
      name: this.name
    }
  },
  destroyed() {
    this.parent.removeLayer(this.mapObject)
    this.mapObject = null
  },
}