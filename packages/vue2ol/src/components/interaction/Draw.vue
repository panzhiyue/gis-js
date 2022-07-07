<template>
  <div></div>
</template>
<script>
import { Draw } from "ol/interaction";
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
  name: "Vue2olInteractionDraw",
  mixins: [OptionsMixin, ObjectMixin],
  provide() {
    return {
      interaction: this,
    };
  },
  data() {
    return {
      // mapObject: null,
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
     * 父数据源
     */
    parentSource: {
      type: Object,
    },
    /**
     * 是否激活
     */
    active: {
      type: Boolean,
    },
    /**
     * 几何类型
     */
    type: {
      type: String,
      custom: true,
    },
  },
  mounted() {
    if (this.parentSource) {
      this.parent = this.parentSource;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
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
    setType() {
      this.initInteraction();
    },
    initInteraction() {
      if (this.mapObject) {
        this.mapObject.setActive(false);
        this.map.removeInteraction(this.mapObject);
        this.mapObject = null;
      }
      let options = optionsMerger(
        {
          source: this.parent,
          type: this.type,
        },
        this
      );
      this.mapObject = new Draw(options);
      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);

      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Draw').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.map.addInteraction(this.mapObject);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Draw').default} mapObject  地图元素
       */
      this.$emit("ready", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/Draw').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>