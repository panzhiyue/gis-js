<template>
  <div></div>
</template>
<script>
import { Select } from "ol/interaction";
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
  name: "Vue2olInteractionSelect",
  mixins: [OptionsMixin, ObjectMixin],
  provide() {
    return {
      interaction: this,
    };
  },
  data() {
    return {
      mapObject: null,
      parent: null,
      ready: false,
      map: null,
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
     * 图层集合
     */
    parentLayers: {
      type: Object,
    },
    /**
     * 是否激活
     */
    active: {
      type: Boolean,
    },
    hitTolerance: {
      type: Number,
    },
  },
  mounted() {
    if (this.parentLayers) {
      this.parent = this.parentLayers;
    } else {
      this.parent = [findRealParent(this.$parent).mapObject];
    }

    if (this.parentMap) {
      this.map = this.parentMap;
    } else {
      this.map = findParentMap(this.$parent).mapObject;
    }
    this.initInteraction();
  },
  destroyed() {
    this.mapObject.setActive(false);
    this.map.removeInteraction(this.mapObject);
  },
  methods: {
    initInteraction() {
      this.ready = false;
      if (this.mapObject) {
        this.mapObject.setActive(false);
        this.map.removeInteraction(this.mapObject);
        this.mapObject = null;
      }
      let options = optionsMerger(
        {
          layers: this.parent,
          hitTolerance: this.hitTolerance,
        },
        this
      );
      this.mapObject = new Select(options);
      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);

      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Select').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.map.addInteraction(this.mapObject);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Select').default} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/Select').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>