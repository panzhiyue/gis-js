import BaseLayerMixin from './BaseLayer'

export default {
  mixins: [BaseLayerMixin],
  props: {
    /**
     * 
     */
    source: {
      type: Object,
    },
  },
  mounted() {
    this.layerOptions = {
      ...(this.baseLayerOptions || {}),
      source: this.source,
    }
  }
}