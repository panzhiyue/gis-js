import ControlMixin from './BaseLayer'

export default {
  mixins: [ControlMixin],
  props: {
    collapsed: {
      type: Boolean|undefined,
    },
    collapsible: {
      type: Boolean|undefined
    }
  },
  mounted() {
    this.attributionControlOptions = {
      ...(this.controlOptions || {}),
      collapsed: this.collapsed,
      collapsible: this.collapsible
    }
  }
}