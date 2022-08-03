<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap } from "@gis-js/vue2ol";
/**
 * Canvas裁切(根据传入的面几何裁切地图)
 */
export default {
  name: "Vue2olRendererCanvasclip",
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

    /**
     * 裁切面几何
     * @typeNaem {import('ol/geom/Polygon').default}
     */
    geometry: {
      require: true,
    },
  },

  data() {
    return {
      // parent: null,
    };
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
      if (!this.geometry) {
        return;
      }
      let map = e.target;
      if (map.renderer_ && map.renderer_.children_.length > 0) {
        map.renderer_.children_.forEach((children) => {
          let canvasArr = children.getElementsByTagName("canvas");
          for (let i = 0; i < canvasArr.length; i++) {
            let canvas = canvasArr[i];
            let context = canvas.getContext("2d");
            this.createclip(context, this.geometry, map);
          }
        });
      }
    },
    createclip(context, boundPolygon, map) {
      //裁剪
      context.save();
      let coors = boundPolygon.getCoordinates();
      let pointArr = [];
      for (let i = 0; i < coors.length; i++) {
        let coorTmp = coors[i];
        let pointTmp = [];
        for (let j = 0; j < coorTmp.length; j++) {
          pointTmp.push(map.getPixelFromCoordinate(coorTmp[j]));
        }
        pointArr.push(pointTmp);
      }
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      for (let i = 0; i < pointArr.length; i++) {
        let pointTmp = pointArr[i];
        for (let j = 0; j < pointTmp.length; j++) {
          if (j == 0) {
            context.moveTo(pointTmp[j][0], pointTmp[j][1]);
          } else {
            context.lineTo(pointTmp[j][0], pointTmp[j][1]);
          }
        }
      }
      context.closePath();
      context.fillStyle = "#ff0000ff";
      context.fill();
      context.restore();
    },
  },
};
</script>


