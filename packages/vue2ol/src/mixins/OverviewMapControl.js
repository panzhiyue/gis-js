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

    /**
     * 控制视图是否应与主地图视图一起旋转。
     */
    rotateWithView: {
      type: Boolean | undefined
    }
  },
  mounted() {
    this.overviewMapControlOptions = {
      ...(this.controlOptions || {}),
      collapsed: this.collapsed,
      collapsible: this.collapsible,
      rotateWithView: this.rotateWithView
    }
  }
}