import ControlMixin from './BaseLayer'

export default {
  mixins: [ControlMixin],
  props: {
    /**
     * 坐标格式
     * @typeName {import('ol/coordinate').CoordinateFormat|undefine}
     */
    coordinateFormat:{
    },

    /**
     * 投影
     * @typeName {import('ol/proj').ProjectionLike|undefine}
     */
    projection:{}
  },
  mounted() {
    this.mousePositionControlOptions = {
      ...(this.controlOptions || {})
    }
  }
}