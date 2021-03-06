import ControlMixin from './BaseLayer'

export default {
  mixins: [ControlMixin],
  props: {
    /**
     * 控件是否应该开始折叠（展开）
     */
    collapsed: {
      type: Boolean | undefined,
    },

    /**
     * 控件是否可以折叠。
     */
    collapsible: {
      type: Boolean | undefined
    },
  },
  mounted() {
    this.attributionControlOptions = {
      ...(this.controlOptions || {}),
      collapsed: this.collapsed,
      collapsible: this.collapsible
    }
  }
}