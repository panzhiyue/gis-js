<template>
  <div></div>
</template>
<script>
import { Modify } from "ol/interaction";
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
 * [ol/interaction/Modify](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Modify-Modify.html)的vue组件
 * 
 * 用于修改特征几何的交互。要修改已添加到现有源的功能，请使用该 source选项构建修改交互。如果要修改集合中的特征（例如，选择交互使用的集合），请使用features选项构造交互。必须使用 a source或features选项构建交互。
 * @since v1.0.0
 */
export default {
  name: "Vue2olInteractionModify",
  mixins: [PointerInteractionMixin],

  props: {
    /**
     * 父数据源
     */
    parentSource: {
      type: Object,
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
    initInteraction() {
      this.ready = false;
      if (this.mapObject) {
        this.mapObject.setActive(false);
        this.parent.removeInteraction(this.mapObject);
        this.mapObject = null;
      }
      let options = optionsMerger(
        {
          source: this.source,
        },
        this
      );
      this.mapObject = new Modify(options);
      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);

      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Modify').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.parent.addInteraction(this.mapObject);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Modify').default} mapObject  地图元素
       */
      this.$emit("append", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/Modify').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>