<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap } from "@gis-js/vue2ol";
import {
  create as createTransform,
  scale as scaleTransform,
} from "ol/transform.js";
/**
 * Canvas滤镜
 */
export default {
  name: "Vue2olRendererCanvasfilter",
  provide() {
    return {
      renderer: this,
    };
  },
  props: {
    /**
     * 父亲地图
     */
    parentMap: null,
  },

  data() {
    return {};
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    this.parent.on("postcompose", this.onPostRender);
  },
  beforeDestroy() {
    this.parent.un("postcompose", this.onPostRender);
  },
  methods: {
    onPostRender(e) {

      console.log(this.parent.getRenderer());
    },
  },
};
</script>
