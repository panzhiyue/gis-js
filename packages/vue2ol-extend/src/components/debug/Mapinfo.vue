<template>
  <div></div>
</template>
<script>
import { ObjectMixin } from "@gis-js/vue2ol";

/**
 * 打印获取地图相关信息
 */
export default {
  name: "Vue2olDebugMapinfo",
  mixins: [ObjectMixin],
  inject: ["map"],
  props: {
    /**
     * 是否在点击时触发
     */
    triggerClick: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否在鼠标移动时触发
     */
    triggerMousemove: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    triggerClick() {
      this.bindListener();
    },
    triggerMousemove() {
      this.bindListener();
    },
  },
  data: () => {
    return {
      output: {
        map: null,
      },
    };
  },
  mounted() {
    this.print();
    this.bindListener();
  },
  methods: {
    bindListener() {
      if (this.triggerClick) {
        this.map.mapObject.on("singleclick", this.print);
      } else {
        this.map.mapObject.un("singleclick", this.print);
      }
      if (this.triggerMousemove) {
        this.map.mapObject.on("pointermove", this.print);
      } else {
        this.map.mapObject.un("pointermove", this.print);
      }
    },
    print(e) {
      this.output = {
        map: this.map.mapObject,
        layers: this.map.mapObject.getLayers().getArray(),
        extent: this.map.mapObject.getView().calculateExtent(),
        size: this.map.mapObject.getSize(),
        overlays: this.map.mapObject.getOverlays(),
        zoom: this.map.mapObject.getView().getZoom(),
        interactions: this.map.mapObject.getInteractions().getArray(),
      };
      if (e) {
        this.output.event = e;
        this.output.pixel = this.map.mapObject.getEventPixel(e.originalEvent);
        this.output.coordinate = this.map.mapObject.getEventCoordinate(
          e.originalEvent
        );
      }
      console.log(this.output);
    },
    dispose() {
      this.map.mapObject.un("singleclick", this.print);
      this.map.mapObject.un("pointermove", this.print);
    },
  },
  destory() {
    this.dispose();
  },
  unmounted() {
    this.dispose();
  },
};
</script>
