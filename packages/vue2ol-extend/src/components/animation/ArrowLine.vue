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
 * @gis-js/utilsol/animation/ArrowLine的vue组件
 * @since v1.0.0
 * @see https://panzhiyue.github.io/gis-js/utilsol/
 */
export default {
  name: "Vue2olAnimationArrowline",
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
     * 轨迹线样式
     */
    lineStyle: {
      type: Object | Function,
    },

    /**
     * 箭头样式
     */
    arrowStyle: {
      type: Object | Function,
    },

    /**
     * 速度倍率(默认速度的多少倍)
     */
    speed: {
      type: Number,
      default: 1,
    },

    /**
     * 箭头间隔（像素）
     */
    interval: {
      type: Number,
      default: 20,
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
        coordinates: this.coordinates,
        lineStyle: this.lineStyle,
        arrowStyle: this.arrowStyle,
        interval: this.interval,
        speed: this.speed,
        source: this.parent,
      },
      this
    );
    //初始化view对象
    this.mapObject = new utilsol.animation.ArrowLine(options);
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
       * @property {import('utilsol/animation/ArrowLine').default} mapObject
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
