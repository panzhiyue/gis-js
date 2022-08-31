import LayerMixin from './Layer'

export default {
  mixins: [LayerMixin],
  props: {
  },
  mounted() {
    this.baseImageLayerOptions = {
      ...(this.layerOptions || {}),
    }
  }
}
