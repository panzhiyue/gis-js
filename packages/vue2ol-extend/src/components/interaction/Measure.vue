<template>
  <div></div>
</template>
<script>
import { InteractionMixin } from "@gis-js/vue2ol";
import {
  optionsMerger,
  bindListeners,
  getListeners,
  propsBinder,
} from "@gis-js/vue2ol";
import * as utilsol from "@gis-js/utilsol";
/**
 * 量算
 */
export default {
  name: "Vue2olInteractionMeasure",
  mixins: [InteractionMixin],
  components: {},
  provide() {
    return {
      interaction: this,
    };
  },
  inject: {
    map: {
      from: "map",
      default: null,
    },
    layer: {
      from: "layer",
      default: null,
    },
  },
  props: {
    type: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = this.map.mapObject;
    }

    this.initInteraction();
  },
  beforeDestroy() {},
  methods: {
    initInteraction() {
      let options = optionsMerger(
        {
          type: this.type,
          layer: this.layer ? this.layer.mapObject : null,
          classPrefix: "vue2ol",
        },
        this
      );

      this.mapObject = new utilsol.interaction.Measure(options);
      this.mapObject.setActive(this.active);

      this.properties && this.mapObject.setProperties(this.properties);
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.parent.addInteraction(this.mapObject);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {} mapObject  地图元素
       */
      this.$emit("append", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
