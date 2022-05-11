import BaseLayerMixin from './BaseLayer'

export default {
  mixins: [BaseLayerMixin],
  mounted() {
    this.layerOptions = this.baseLayerOptions
  }
}
