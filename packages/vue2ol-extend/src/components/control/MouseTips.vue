<template>
  <vue2ol-overlay
    class="vue2ol-control-mousetips"
    v-bind="$attrs"
    :position="position"
  >
    {{ message }}
  </vue2ol-overlay>
</template>

<script>
import { findRealParent, Vue2olOverlay } from "@gis-js/vue2ol";

/**
 * 鼠标移动提示信息控件
 * @since v1.0.0
 */
export default {
  name: "Vue2olControlMousetips",
  inheritAttrs: false,
  components: {
    Vue2olOverlay,
  },
  provide() {
    return {
      control: this,
    };
  },
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },

    /**
     * 显示信息
     */
    message: {
      type: String,
    },
  },
  data() {
    return {
      // parent: null,
      position: undefined,
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
  unmounted() {
    this.parent.un("pointermove", this.onPointerMove);
  },
  methods: {
    onPointerMove(event) {
      this.position = this.parent.getCoordinateFromPixel([
        event.originalEvent.layerX,
        event.originalEvent.layerY,
      ]);
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
