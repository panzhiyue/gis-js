<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap } from "@gis-js/vue2ol";
import { create as createTransform, scale as scaleTransform } from 'ol/transform.js'
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
        map.renderer_.children_.forEach((children, index) => {
          let canvasArr = children.getElementsByTagName("canvas");
          for (let i = 0; i < canvasArr.length; i++) {
            let canvas = canvasArr[i];
            let context = canvas.getContext("2d");
            this.createclip(context, this.geometry, map);
          }
        });
      }
    },
    transform2D(coordinates, transform) {
      const dest = [];
      var i = 0;
      for (; i < coordinates.length; i++) {
        var x = coordinates[i][0];
        var y = coordinates[i][1];
        x = transform[0] * x + transform[2] * y + transform[4];
        y = transform[1] * x + transform[3] * y + transform[5];
        var coordinate = [x, y];
        dest[i] = coordinate;
      }
      dest.length = i;
      return dest;
    },
    createclip(context, boundPolygon, map) {
      //裁剪
      context.save();
      const pixelRatio = window.devicePixelRatio || 1;
      let transform;
      transform = scaleTransform(createTransform(), pixelRatio, pixelRatio);
      let coors = boundPolygon.getCoordinates();

      let pointArr = [];
      for (let i = 0; i < coors.length; i++) {
        let coorTmp = coors[i];
        let pointTmp = [];
        for (let j = 0; j < coorTmp.length; j++) {
          pointTmp.push(map.getPixelFromCoordinate(coorTmp[j]));
        }
        pointArr.push(this.transform2D(pointTmp, transform));
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
      context.fill();

      context.restore();
    },
  },
};
</script>


