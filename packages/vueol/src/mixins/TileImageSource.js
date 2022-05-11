import UrlTileSourceMixin from './UrlTileSource'

export default {
  mixins: [UrlTileSourceMixin],
  props: {
    /**
     * @typeName {import('ol/Tile').UrlFunction|undefined}
     */
    tileUrlFunction: {
      type: Function,
    },
  },
  mounted() {
    this.tileImageSourceOptions = {
      ...(this.urlTileSourceOptions || {}),
      tileUrlFunction: this.tileUrlFunction,
    }

  }
}