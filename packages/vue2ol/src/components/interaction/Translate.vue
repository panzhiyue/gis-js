<template>
  <div></div>
</template>
<script>
import { Translate } from "ol/interaction";
import { PointerInteractionMixin } from "../../mixins";
import {
  findParent,
  optionsMerger,
  bindListeners,
  getListeners,
  propsBinder,
  findParentMap,
} from "../../utils";
/**
 * [ol/interaction/Translate](https://openlayers.org/en/latest/apidoc/module-ol_interaction_Translate-Translate.html)的vue组件
 * 
 * 移动矢量元素
 * @since v1.0.0
 */
export default {
  name: "Vue2olInteractionTranslate",
  mixins: [PointerInteractionMixin],
  mounted() {
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
        },
        this
      );
      this.mapObject = new Translate(options);
      this.mapObject.setActive(this.active);
      this.properties && this.mapObject.setProperties(this.properties);
      //绑定事件
      bindListeners(this.mapObject, getListeners(this));
      //监听props属性
      propsBinder(this, this.mapObject, this.$options.props);
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Translate').default} mapObject  地图元素
       */
      this.$emit("init", this.mapObject);

      this.parent.addInteraction(this.mapObject);
      /**
       * 地图元素初始化完时触发
       * @type {object}
       * @property {import('ol/interaction/Translate').default} mapObject  地图元素
       */
      this.$emit("append", this.mapObject);

      this.ready = true;
      this.$nextTick(() => {
        /**
         * 地图元素初始化完时触发
         * @type {object}
         * @property {import('ol/interaction/Translate').default} mapObject  地图元素
         */
        this.$emit("ready", this.mapObject);
      });
    },
  },
};
</script>