import SourceMixin from './Source'

export default {
  mixins: [SourceMixin],
  mounted() {
    this.tileSourceOptions = this.sourceOptions
  }
}
