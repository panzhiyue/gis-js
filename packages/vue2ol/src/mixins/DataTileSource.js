import TileSourceMixin from "./TileSource";

export default {
  mixins: [TileSourceMixin],
  props: {},
  mounted() {
    this.dataTileSourceOptions = {
      ...(this.tileSourceOptions || {}),
    };
  },
};
