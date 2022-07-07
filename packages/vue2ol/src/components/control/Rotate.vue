<!-- ol/control/Rotate -->
<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
import Rotate from "ol/control/Rotate";
import {
  bindListeners,
  propsBinder,
  getListeners,
  optionsMerger,
} from "../../utils/index";
import RotateControlMixin from "../../mixins/RotateControl";
/**
 * ol/control/Rotate的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_control_Rotate-Rotate.html
 */
export default {
  name: "Vue2olControlRotate",
  mixins: [RotateControlMixin],
  emits: ["init", "append", "ready"],
  data() {
    return {};
  },
  props: {},
  watch: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.rotateControlOptions || {}),
      },
      this
    );
    this.mapObject = new Rotate(options);
    this.properties && this.mapObject.setProperties(this.properties);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    /**
     * 地图元素初始化完时触发
     * @type {object}
     * @property {import('ol/control/Rotate').default} mapObject 地图元素
     */
    this.$emit("init", this.mapObject);

    this.parent.addControl(this.mapObject);

    /**
     * 地图元素添加到地图时触发
     * @type {object}
     * @property {import('ol/control/Rotate').default} mapObject 地图元素
     */
    this.$emit("append", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/control/Rotate').default} mapObject 地图元素
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>
<style scoped></style>
