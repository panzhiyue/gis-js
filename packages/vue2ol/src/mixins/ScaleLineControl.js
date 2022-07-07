import ControlMixin from './BaseLayer'

export default {
  mixins: [ControlMixin],
  props: {
    /**
     * 打印机等输出设备的 dpi。
     */
    dpi: {
      type: Number
    },
    /**
     * 单位
     * @typeName {import('ol/control/ScaleLine').Units}
     */
    units: {

    }
  },
  mounted() {
    this.scaleLineControlOptions = {
      ...(this.controlOptions || {}),
      dpi: this.dpi,
      units: this.units
    }
  }
}