<template>
  <vue2ol-overlay
    class="vue2ol-typhoon-currentinfo"
    v-bind="attrs_"
    v-on="listeners_"
    :position="position"
  >
    {{ message }}333
  </vue2ol-overlay>
</template>

<script>
import { Style, Fill, Stroke } from "ol/style";
import { Vue2olOverlay } from "@gis-js/vue2ol";
import { ObjectMixin } from "@gis-js/vue2ol";

/**
 * 当前节点信息
 */
export default {
  name: "Vue2olTyphoonCurrentinfo",
  mixins: [ObjectMixin],
  components: {
    Vue2olOverlay,
  },
  data() {
    return {
    };
  },
  props: {
    /**
     * 位置
     * @typeName [x,y]坐标
     */
    position: {
      type: Array,
    },
    /**
     * 信息
     */
     message: {
      type: String,
    },
  },
  computed: {
  },
};
</script>

<style scoped>
.vue2ol-typhoon-currentinfo {
  background: #363636;
  background: rgba(255, 255, 255, 1);
  border: 1px solid transparent;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: black;
  font: 12px/18px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  margin-left: 20px;
  margin-top: -15px;
  padding: 4px 8px;
  position: absolute;
  visibility: inherit;
  white-space: nowrap;
  z-index: 200;
  min-height: 20px;
}

.vue2ol-typhoon-currentinfo:before {
  border-right: 6px solid black;
  border-right-color: rgba(255, 255, 255, 1);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  content: '';
  position: absolute;
  top: 50%;
  margin-top: -6px;
  left: -7px;
}
</style>
