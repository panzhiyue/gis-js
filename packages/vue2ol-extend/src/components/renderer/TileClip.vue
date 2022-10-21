<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap } from "@gis-js/vue2ol";
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import {
  apply as applyTransform,
  compose as composeTransform,
} from "ol/transform";

/**
 * Tile图层裁切(根据传入的面几何裁切地图)
 */
export default {
  name: "Vue2olRendererTileclip",
  props: {
    /**
     * 父亲数据源
     */
    parentSource: null,

    /**
     * 裁切面几何
     * @typeNaem ol/geom/Polygon
     */
    geometry: {
      require: true,
    },
    /**
     * 裁切模式（show显示区域内，裁切区域内）
     */
    mode: {
      type: String,
      default: "show",
    },
    /**
     * 是否缓存切片
     */
    cache: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      coordinateToPixelTransform: [1, 0, 0, 1, 0, 0],
      tileCache: {},
    };
  },
  mounted() {
    if (this.parentSource) {
      this.parent = this.parentSource;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    if (this.parentMap) {
      this.map = this.parentMap;
    } else {
      this.map = findParentMap(this.$parent).mapObject;
    }
    this.parent.setTileLoadFunction((tile, src) => {
      if (this.cache && this.tileCache[tile.tileCoord]) {
        tile.getImage().src = this.tileCache[tile.tileCoord];
        return;
      }
      let tileGrid = this.parent.getTileGrid();

      let tileExtent = tileGrid.getTileCoordExtent(tile.tileCoord, []);

      const canvas = document.createElement("canvas");
      canvas.width = this.parent.tmpSize[0];
      canvas.height = this.parent.tmpSize[1];
      const ctx = canvas.getContext("2d");

      let state = this.getClippedGeometry(this.geometry, tileExtent);
      if (
        (this.mode == "show" && state.isOut == true) ||
        (this.mode == "clip" && state.isIn == true)
      ) {
        this.tileCache[tile.tileCoord] = canvas.toDataURL("image/png");
        tile.getImage().src = this.tileCache[tile.tileCoord];
      }
      if (
        (this.mode == "show" && state.isIn == true) ||
        (this.mode == "clip" && state.isOut == true)
      ) {
        this.tileCache[tile.tileCoord] = src;

        tile.getImage().src = this.tileCache[tile.tileCoord];
      }
      if (state.isInteract == true) {
        const imageObj = new Image();
        imageObj.crossOrigin = "*";
        ctx.save();
        this.createclip(
          ctx,
          tileExtent,
          state.geometry,
          this.map,
          tile.tileCoord
        );

        imageObj.onload = () => {
          let pattern = ctx.createPattern(imageObj, "repeat");
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = pattern;
          ctx.fill();

          ctx.restore();

          this.tileCache[tile.tileCoord] = canvas.toDataURL("image/png");

          tile.getImage().src = this.tileCache[tile.tileCoord];
        };

        imageObj.src = src;
      }
    });
  },
  methods: {
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
    createclip(context, tileExtent, boundPolygon, map, tileCoord) {
      this.coordinateToPixelTransform = [1, 0, 0, 1, 0, 0];

      composeTransform(
        this.coordinateToPixelTransform,
        256 / 2,
        256 / 2,
        1 / map.getView().getResolutionForZoom(tileCoord[0]),
        -1 / map.getView().getResolutionForZoom(tileCoord[0]),
        -map.getView().getRotation(),
        -(tileExtent[0] + tileExtent[2]) / 2,
        -(tileExtent[1] + tileExtent[3]) / 2
      );

      //裁剪

      let coors = boundPolygon.getCoordinates();

      let pointArr = [];
      for (let i = 0; i < coors.length; i++) {
        let coorTmp = coors[i];
        let pointTmp = [];
        for (let j = 0; j < coorTmp.length; j++) {
          pointTmp.push(
            applyTransform(this.coordinateToPixelTransform, coorTmp[j])
          );
        }
        pointArr.push(pointTmp);
      }
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
      if (this.mode == "clip") {
        context.fillStyle = "rgba(0,0,0,1)";
        context.fill();
        context.globalCompositeOperation = "source-out";
      } else {
        context.clip();
      }
    },

    /**
     * 获取被瓦片裁切后的几何图形,提高效率
     * @param {}
     */
    getClippedGeometry: function(geom, bounds) {
      let geom1 = JSON.parse(new GeoJSON().writeGeometry(geom));
      let geom2 = turf.bboxPolygon(bounds).geometry;
      //不相交
      if (turf.booleanDisjoint(geom1, geom2)) {
        return { isOut: true };
      } else if (turf.booleanContains(geom1, geom2)) {
        return { isIn: true };
      } else {
        return {
          isInteract: true,
          geometry: new GeoJSON().readGeometry(
            turf.intersect(geom1, geom2).geometry
          ),
        };
      }
    },
  },
  beforeDestroy() {},
};
</script>
