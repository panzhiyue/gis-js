<template>
  <div></div>
</template>
<script>
import { Draw } from "ol/interaction";
import { PointerInteractionMixin } from "../../mixins";
import {
  findRealParent,
  optionsMerger,
  bindListeners,
  getListeners,
  propsBinder,
  findParentMap,
} from "../../utils";
/**
 * [ol/interaction/Draw](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html)的vue组件
 * @since v1.0.0
 */
export default {
  name: "Vue2olInteractionDraw",
  mixins: [PointerInteractionMixin],

  props: {
    /**
     * 父数据源
     */
    parentSource: {
      type: Object,
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
      this.source = this.parentSource;
    } else {
      this.source = findRealParent(this.$parent).mapObject;
    }

    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findParentMap(this.$parent).mapObject;
    }
    this.initInteraction();
  },
  methods: {
    setType() {
      this.initInteraction();
    },
    initInteraction() {
      if (this.mapObject) {
        this.mapObject.setActive(false);
        this.parent.removeInteraction(this.mapObject);
        this.mapObject = null;
      }
      let options = optionsMerger(
        {
          source: this.source,
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

      this.parent.addInteraction(this.mapObject);

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