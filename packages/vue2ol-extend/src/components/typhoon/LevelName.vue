<template>
  <span
    class="vue2ol-typhoon-levelname"
    :style="{ backgroundColor: color }"
    v-bind="attrs_"
    v-on="listeners_"
    >{{ levelName }}</span
  >
</template>
<script>
import { BaseObjectMixin } from "@gis-js/vue2ol";
import { levelTable, colorTable } from "../../utils/typhoon.js";
export default {
  name: "Vue2olTyphoonLevelname",
  mixins: [BaseObjectMixin],
  props: {
    /**
     * 台风级别
     */
    level: {
      type: String,
    },
  },
  computed: {
    levelName() {
      return levelTable[this.level];
    },
    color() {
      return colorTable[this.level];
    },
  },
};
</script>
<style scoped>
.vue2ol-typhoon-levelname {
  padding: 2px;
  color: white;
}
</style>
