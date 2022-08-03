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
 * utilsol/animation/DynamicLine的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olAnimationDynamicline",
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
     * 外轨迹颜色
     */
    outlineColor: {
      type: String,
      default: "#ff0000",
    },

    /**
     * 外轨迹宽度
     */
    outlineWidth: {
      type: Number,
      default: 8,
    },

    /**
     * 内轨迹颜色
     */
    innerlineColor: {
      type: String,
      default: "#ffffff",
    },

    /**
     * 内轨迹宽度
     */
    innerlineWidth: {
      type: Number,
      default: 6,
    },

    /**
     * 内轨迹虚线数组
     */
    innerlineDash: {
      type: Array,
      default: () => [0, 12],
    },

    /**
     * 内轨迹虚线初始偏移
     */
    innerlineDashOffset: {
      type: Number,
      default: 0,
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
        coordinates: this.coordinates,
        outlineColor: this.outlineColor,
        outlineWidth: this.outlineWidth,
        innerlineColor: this.innerlineColor,
        innerlineWidth: this.innerlineWidth,
        innerlineDash: this.innerlineDash,
        innerlineDashOffset: this.innerlineDashOffset,
        source: this.parent,
      },
      this
    );

    //初始化view对象
    this.mapObject = new utilsol.animation.DynamicLine(options);
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
       * @property {import('utilsol/animation/DynamicLine').default} mapObject
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
<style  scoped>
</style>
