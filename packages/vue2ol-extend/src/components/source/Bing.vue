<template>
  <vue2ol-source-xyz :tileUrlFunction="tileUrlFunction2" :options="options">
    <slot></slot
  ></vue2ol-source-xyz>
</template>
<script>
import { Vue2olSourceXyz, ObjectMixin } from "@gis-js/vue2ol";
export default {
  name: "Vue2olSourceBind",
  components: {
    Vue2olSourceXyz,
  },
  mixins: [ObjectMixin],
  data() {
    return {};
  },
  props: {
    /**
     * ol/source/XYZ对应的实例化参数
     */
    options: {
      type: Object,
    },
  },
  mounted() {},
  methods: {
    tileUrlFunction2(coord, params1, params2) {
      return this.getVETileUrl(
        "http://t0.dynamic.tiles.ditu.live.com/comp/ch/",
        coord[0],
        coord[1],
        coord[2] //5.1.3版本为 -coord[2] -1
      );
    },
    getVETileUrl(url, z, x, y) {
      for (var a = "", c = x, d = y, e = 0; e < z; e++) {
        a = ((c & 1) + 2 * (d & 1)).toString() + a;
        c >>= 1;
        d >>= 1;
      }
      return url + a + "?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=111&ur=CN";
    },
  },
};
</script>
