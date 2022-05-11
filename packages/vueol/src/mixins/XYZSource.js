import TileImageSourceMixin from './TileImageSource'

export default {
  mixins: [TileImageSourceMixin],
  mounted() {
    this.xyzSourceOptions = this.tileImageSourceOptions
  }
}
