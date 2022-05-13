<template>
  <vue2ol-source-xyz :tileUrlFunction="tileUrlFunction"></vue2ol-source-xyz>
</template>
<script>
import { XYZSourceMixin, Vue2olSourceXyz } from "@gis-js/vue2ol";
export default {
  name: "vue2ol-source-bind",
  mixins: [XYZSourceMixin],
  components: {
    Vue2olSourceXyz,
  },
  data() {
    return {};
  },
  props: {},
  mounted() {},
  methods: {
    tileUrlFunction(coord, params1, params2) {
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