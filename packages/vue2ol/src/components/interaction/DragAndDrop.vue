<template>
  <div></div>
</template>
<script>
import { DragAndDrop } from "ol/interaction";
import { InteractionMixin } from "../../mixins";
import {
  findRealParent,
  optionsMerger,
  bindListeners,
  getListeners,
  propsBinder,
  findParentMap,
} from "../../utils";
/**
 * [ol/interaction/DragAndDrop](https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragAndDrop-DragAndDrop.html)的vue组件
 * 
 * 通过拖放处​​理矢量数据的输入。
 * @since v1.0.0
 */
export default {
  name: "Vue2olInteractionDraganddrop",
  mixins: [InteractionMixin],
  props: {
    /**
     * 数据源
     */
    parentSource: {
      type: Object,
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findParentMap(this.$parent).mapObject;
    }

    if (this.parentSource) {
      this.source = this.parentSource;
    } else {
      this.source = findRealParent(this.$parent).mapObject;
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
      this.mapObject = new DragAndDrop(options);
      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);

      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);

      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/DragAndDrop').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.parent.addInteraction(this.mapObject);
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/DragAndDrop').default} mapObject  地图元素
       */
      this.$emit("append", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/DragAndDrop').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>