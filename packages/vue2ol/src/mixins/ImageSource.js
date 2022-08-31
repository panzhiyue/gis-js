import SourceMixin from './Source'

export default {
  mixins: [SourceMixin],
  mounted() {
    this.imageSourceOptions = this.sourceOptions
  }
}
