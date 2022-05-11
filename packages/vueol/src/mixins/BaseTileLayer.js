import LayerMixin from './Layer'

export default {
  mixins: [LayerMixin],
  props: {
    /**
     * 将预加载瓦片的数量。
     */
    preload: {
      type: Number,
    },

    /**
     * 错误时使用临时瓷砖。
     */
    useInterimTilesOnError: {
      type: Boolean,
    },
  },
  mounted() {
    this.baseTileLayerOptions = {
      ...(this.layerOptions || {}),
      preload: this.preload,
      useInterimTilesOnError: this.useInterimTilesOnError,
    }
  }
}
