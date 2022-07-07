import ControlMixin from './BaseLayer'

export default {
  mixins: [ControlMixin],
  props: {},
  mounted() {
    this.zoomToExtentControlOptions = {
      ...(this.controlOptions || {})
    }
  }
}