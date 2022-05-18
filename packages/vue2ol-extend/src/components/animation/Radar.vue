<template>
  <div></div>
</template>

<script>
import * as utilsol from "@panzhiyue/utilsol"
import {
  optionsMerger,
  findRealParent,
  bindListeners,
  propsBinder,
  getListeners
} from "@gis-js/vue2ol";
import OptionsMixin from "@gis-js/vue2ol";
/**
 * utilsol/animation/Radar的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olAnimationRadar",
  components: {},
  mixins: [OptionsMixin],
  props: {
    /**
     * 数据源,如果为null则从parent中获取
     * @typeName {import('ol/source/Vector').default}
     */
    parentSource: {
      type: Object,
    },

    /**
     * 中心点
     * @typeName {import('ol/coordinate').Coordinate}
     */
    center: {
      type: Array,
    },
    /**
     * 半径,单位为矢量数据单位
     */
    radius: {
      type: Number,
    },

    /**
     * 起始角度
     */
    startAngle: {
      type: Number,
    },

    /**
     * 弧角度
     */
    arcAngle: {
      type: Number,
    },

    /**
     * 动画周期,单位s
     */
    period: {
      type: Number,
      default: 10,
    },

    /**
     * 动画循环
     */
    loop: {
      type: Boolean,
      default: true,
    },

    /**
     * 中心点样式
     */
    centerStyle: {
      type: [Function, Object, Array],
    },

    /**
     * 圆样式
     */
    circleStyle: {
      type: [Function, Object, Array],
    },

    /**
     * 弧样式
     */
    arcStyle: {
      type: [Function, Object, Array],
    },
  },
  data() {
    return {
      parent: null,
      mapObject: null,
    };
  },
  mounted() {
    if (this.parentSource) {
      this.parent = this.parentSource;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    let options = optionsMerger(
      {
        center: this.center,
        radius: this.radius,
        startAngle: this.startAngle,
        period: this.period,
        loop: this.loop,
        centerStyle: this.centerStyle,
        circleStyle: this.circleStyle,
        arcStyle: this.arcStyle,
        arcAngle: this.arcAngle,
        source: this.parent,
      },
      this
    );

    //初始化view对象
    this.mapObject = new utilsol.animation.Radar(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    this.mapObject.start();
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('utilsol/animation/Radar').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.mapObject.dispose();
  },
  methods: {
    setParentSource(newVal, oldVal) {
      this.mapObject.setSource(newVal);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
