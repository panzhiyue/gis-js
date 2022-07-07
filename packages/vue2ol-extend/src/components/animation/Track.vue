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
 * utilsol/animation/Track的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olAnimationTrack",
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
     * 轨迹坐标
     * @typeName {Array<import('ol/coordinate').Coordinate>}
     */
    coordinates: {
      type: Array,
    },

    /**
     * 动画循环
     */
    loop: {
      type: Boolean,
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
      parent: null,
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
        coordinates: this.coordinates,
        loop: this.loop,
        lineStyle: this.lineStyle,
        lineAnimationStyle: this.lineAnimationStyle,
        pointAnimationStyle: this.pointAnimationStyle,
        source: this.parent,
      },
      this
    );

    //初始化view对象
    this.mapObject = new utilsol.animation.Track(options);

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
       * @property {import('utilsol/animation/Track').default} mapObject
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
<style scoped>
</style>
