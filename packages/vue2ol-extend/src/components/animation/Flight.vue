<template>
  <div></div>
</template>

<script>
import * as utilsol from "@gis-js/utilsol";
import {
  optionsMerger,
  findRealParent,
  bindListeners,
  propsBinder,
  getListeners,
} from "@gis-js/vue2ol";
import OptionsMixin from "@gis-js/vue2ol";
/**
 * utilsol/animation/Flight的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olAnimationFlight",
  components: {},
  mixins: [OptionsMixin],
  provide() {
    return {
      animation: this,
    };
  },
  props: {
    /**
     * 数据源,如果为null则从parent中获取
     * @typeName {import('ol/source/Vector').default}
     */
    parentSource: {
      type: Object,
    },

    /**
     * 起点坐标
     * @typeName {import('ol/coordinate').Coordinate}
     */
    from: {
      type: Array,
    },

    /**
     * 终点坐标
     * @typeName {import('ol/coordinate').Coordinate}
     */
    to: {
      type: Array,
    },

    /**
     * 曲线半径度数, 默认为0,直线
     */
    radius: {
      type: Number,
    },

    /**
     * 曲线角度，radius与 angle结合可定义曲线的形状
     */
    angle: {
      type: Number,
    },

    /**
     * 动画循环
     */
    loop: {
      type: Boolean,
      default: true,
    },

    /**
     * 分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快
     */
    space: {
      type: Number,
    },

    /**
     * 平滑度，越小线越平滑
     */
    smooth: {
      type: Number,
    },

    /**
     * 终点箭头
     */
    endArrow: {
      type: [Object, Boolean, Function],
      default: true,
    },

    /**
     * 动画箭头
     */
    animationArrow: {
      type: [Object, Boolean, Function],
      default: true,
    },

    /**
     * 固定航线线样式
     */
    lineStyle: {
      type: [Function, Array],
    },

    /**
     * 动画线样式
     */
    lineAnimationStyle: {
      type: [Function, Array],
    },

    /**
     * 动画点样式
     */
    pointAnimationStyle: {
      type: [Function, Array],
    },
  },
  data() {
    return {
      // parent: null,
      // mapObject: null,
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
        from: this.from,
        to: this.to,
        radius: this.radius,
        angle: this.angle,
        loop: this.loop,
        space: this.space,
        smooth: this.smooth,
        endArrow: this.endArrow,
        animationArrow: this.animationArrow,
        lineStyle: this.lineStyle,
        lineAnimationStyle: this.lineAnimationStyle,
        pointAnimationStyle: this.pointAnimationStyle,
        source: this.parent,
      },
      this
    );

    //初始化view对象
    this.mapObject = new utilsol.animation.Flight(options);

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
       * @property {import('utilsol/animation/Flight').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.mapObject.dispose();
  },
  unmounted() {
    this.mapObject.dispose();
  },
  methods: {
    setParentSource(newVal, oldVal) {
      this.mapObject.setSource(newVal);
    },
  },
};
</script>
<style scoped>
</style>
