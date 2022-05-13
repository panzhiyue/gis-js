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
      url: this.url,
      urls: this.urls,
    }
  }
}
