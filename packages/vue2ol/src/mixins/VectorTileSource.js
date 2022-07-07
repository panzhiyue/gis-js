import UrlTileSourceMixin from './UrlTileSource'

export default {
  mixins: [UrlTileSourceMixin],
  props: {},
  mounted() {
    this.vectorTileSourceOptions = {
      ...(this.urlTileSourceOptions || {})
    }

  }
}