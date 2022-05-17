import UrlTileSourceMixin from './UrlTileSource'

export default {
  mixins: [UrlTileSourceMixin],
  props: {
  },
  mounted() {
    this.tileImageSourceOptions = {
      ...(this.urlTileSourceOptions || {})
    }

  }
}