<template>
  <vue2ol-control-mousetips class="vue2ol-control-mouseinfo" :message="message">
  </vue2ol-control-mousetips>
</template>

<script>
import MouseTips from "./MouseTips.vue";
import { findRealParent } from "@gis-js/vue2ol";
/**
 * 鼠标移动提示信息控件
 * @since v1.0.0
 */
export default {
  name: "Vue2olControlMouseinfo",
  inheritAttrs: false,
  components: {
    Vue2olControlMousetips: MouseTips,
  },
  provide() {
    return {
      control: this,
    };
  },
  props: {
    /**
     * 字段模板
     */
    format: {
      type: String,
      default: "{x},{y},{z}",
    },
  },
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
    this.parent.on("pointermove", this.onPointerMove);
  },
  destory() {
    this.parent.un("pointermove", this.onPointerMove);
  },
  unmounted(){
    this.parent.un("pointermove", this.onPointerMove);
  },
  methods: {
    onPointerMove(event) {
      let position = this.parent.getCoordinateFromPixel([
        event.originalEvent.layerX,
        event.originalEvent.layerY,
      ]);
      this.message = this.format
        .replaceAll("{x}", position[0])
        .replaceAll("{y}", position[1])
        .replaceAll("{z}", this.parent.getView().getZoom());
    },
  },
};
</script>
<style>
.vue2ol-control-mousetips {
  background: #363636;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid transparent;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: #fff;
  font: 12px/18px "Helvetica Neue", Arial, Helvetica, sans-serif;
  margin-left: 20px;
  margin-top: -15px;
  padding: 4px 8px;
  position: absolute;
  visibility: inherit;
  white-space: nowrap;
  z-index: 1000;
  min-height: 20px;
}

.vue2ol-control-mousetips:before {
  border-right: 6px solid black;
  border-right-color: rgba(0, 0, 0, 0.5);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -6px;
  left: -7px;
}
</style>
