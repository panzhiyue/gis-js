<template>
  <div></div>
</template>
<script>
import { MouseWheelZoom } from "ol/interaction";
import { OptionsMixin, ObjectMixin } from "../../mixins";
import {
  findRealParent,
  optionsMerger,
  bindListeners,
  getListeners,
  propsBinder,
  findParentMap,
} from "../../utils";
export default {
  name: "Vue2olInteractionMousewheelzoom",
  mixins: [OptionsMixin, ObjectMixin],
  provide() {
    return {
      interaction: this.mapObject,
    };
  },
  data() {
    return {
      mapObject: null,
      parent: null,
      ready: false,
    };
  },
  props: {
    /**
     * 父地图
     */
    parentMap: {
      type: Object,
    },
    /**
     * 是否激活
     */
    active: {
      type: Boolean,
    },
    /**
     * useAnchor
     */
    mouseAnchor: {
      type: Boolean,
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findParentMap(this.$parent).mapObject;
    }
    this.initInteraction();
  },
  destroyed() {
    this.mapObject.setActive(false);
    this.parent.removeInteraction(this.mapObject);
  },
  methods: {
    initInteraction() {
      this.ready = false;
      if (this.mapObject) {
        this.mapObject.setActive(false);
        this.parent.removeInteraction(this.mapObject);
        this.mapObject = null;
      }
      let options = optionsMerger(
        {
          useAnchor: this.mouseAnchor,
        },
        this
      );
      this.mapObject = new MouseWheelZoom(options);
      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/MouseWheelZoom').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.parent.addInteraction(this.mapObject);
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/MouseWheelZoom').default} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/MouseWheelZoom').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>