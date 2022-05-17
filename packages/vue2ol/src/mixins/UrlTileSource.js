import TileSourceMixin from './TileSource'

export default {
  mixins: [TileSourceMixin],
  props: {
    /**
     * @typeName {import('ol/Tile').LoadFunction|undefined}
     */
    tileLoadFunction: {
      type: Function,
    },

    /**
     * @typeName {import('ol/Tile').UrlFunction|undefined}
     */
    tileUrlFunction: {
      type: Function,
    },

    url: {
      type: String,
    },

    /**
     * @typeName {string[]}
     */
    urls: {
      type: Array,
    },
  },
  mounted() {
    this.urlTileSourceOptions = {
      ...(this.tileSourceOptions || {}),
      tileLoadFunction: this.tileLoadFunction,
      tileUrlFunction: this.tileUrlFunction,
      url: this.url,
      urls: this.urls,
    }
  }
}