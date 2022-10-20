<template>
  <div></div>
</template>
<script>
import { findRealParent, findParentMap } from "@gis-js/vue2ol";
import {
  create as createTransform,
  scale as scaleTransform,
} from "ol/transform.js";
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { fromUserCoordinate } from "ol/proj";
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
      console.log(this.map.getView().getZoom());
      let tileGrid = this.parent.getTileGrid();

      let tileExtent = tileGrid.getTileCoordExtent(tile.tileCoord, []);

      const canvas = document.createElement("canvas");
      canvas.width = this.parent.tmpSize[0];
      canvas.height = this.parent.tmpSize[1];
      const ctx = canvas.getContext("2d");

      let state = this.getClippedGeometry(this.geometry, tileExtent);
      if (state.isOut == true) {
        tile.getImage().src = canvas.toDataURL("image/png");
      } else if (state.isIn == true) {
        tile.getImage().src = src;
      } else {
        const imageObj = new Image();
        imageObj.crossOrigin = "*";
        ctx.save();
        this.createclip(ctx, tileExtent, state.geometry, this.map);

        imageObj.onload = () => {
          let pattern = ctx.createPattern(imageObj, "repeat");
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = pattern;
          ctx.fill();

          if (!this.tileCache[tile.tileCoord]) {
            this.tileCache[tile.tileCoord] = canvas.toDataURL("image/png");
          }

          tile.getImage().src = this.tileCache[tile.tileCoord];
          ctx.restore();
        };

        imageObj.src = src;
      }
    });

    // this.parent.on("tileloadstart", (e) => {
    //   console.log(e);
    //   let tileGrid = e.target.getTileGrid();
    //   let tileExtent = tileGrid.getTileCoordExtent(e.tile.tileCoord, []);
    //   const tile = e.tile;
    //   const src = tile.src_;

    //   const canvas = document.createElement("canvas");
    //   canvas.width = canvas.height = 256;
    //   const ctx = canvas.getContext("2d");

    //   var image = new Image();
    //   tile.setImage(image);
    //   image.src = canvas.toDataURL("image/png");

    //   // let state = this.getClippedGeometry(this.geometry, tileExtent);
    //   // if (state.isOut == true) {
    //   //   image.src = "";
    //   // } else {
    //   //   const imageObj = new Image();
    //   //   imageObj.crossOrigin = "*";

    //   //   imageObj.onload = () => {
    //   //     const canvas = document.createElement("canvas");
    //   //     canvas.width = canvas.height = 256;
    //   //     const ctx = canvas.getContext("2d");

    //   //     this.createclip(ctx, tileExtent, this.geometry, this.map);
    //   //     const pattern = ctx.createPattern(imageObj, "repeat");

    //   //     ctx.beginPath();
    //   //     ctx.rect(0, 0, canvas.width, canvas.height);
    //   //     ctx.fillStyle = pattern;
    //   //     ctx.fill();
    //   //     // this.createclip(ctx, tileExtent, this.geometry, this.map);

    //   //     image.src = canvas.toDataURL("image/png");
    //   //   };

    //   //   imageObj.src = src;
    //   // }
    // });
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
    createclip(context, tileExtent, boundPolygon, map) {
      console.log([tileExtent[0], tileExtent[1]]);
      console.log(
        fromUserCoordinate(
          [tileExtent[0], tileExtent[1]],
          map.getView().getProjection()
        )
      );

      this.coordinateToPixelTransform = [1, 0, 0, 1, 0, 0];
      // composeTransform(
      //   coordinateToPixelTransform,
      //   this.map.getSize()[0] / 2,
      //   this.map.getSize()[1] / 2,
      //   1 / viewState.resolution,
      //   -1 / viewState.resolution,
      //   -viewState.rotation,
      //   -viewState.center[0],
      //   -viewState.center[1]
      // );

      composeTransform(
        this.coordinateToPixelTransform,
        this.map.getSize()[0] / 2,
        this.map.getSize()[1] / 2,
        1 /
          map
            .getView()
            .getResolutionForZoom(Math.floor(map.getView().getZoom())),
        -1 /
          map
            .getView()
            .getResolutionForZoom(Math.floor(map.getView().getZoom())),
        -map.getView().getRotation(),
        -map.getView().getCenter()[0],
        -map.getView().getCenter()[1]
      );

      console.log(
        applyTransform(this.coordinateToPixelTransform, [
          tileExtent[0],
          tileExtent[1],
        ])
      );
      // console.log(map.getView().getResolutionForZoom(8));
      // console.log(map.getView().getResolutionForZoom(8.2));
      // let cst =
      //   map.getView().getResolutionForZoom(8) /
      //   map.getView().getResolutionForZoom(8.2);

      // cst = 1.2;
      const pixelExtent = this.getPixelExtent(map, tileExtent);
      //裁剪
      // context.save();
      let pixelRatio = window.devicePixelRatio || 1;
      let transform;
      transform = scaleTransform(createTransform(), pixelRatio, pixelRatio);
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
        pointArr.push(this.transform2D(pointTmp, transform));
      }
      // context.globalCompositeOperation = "destination-in";
      context.beginPath();
      for (let i = 0; i < pointArr.length; i++) {
        let pointTmp = pointArr[i];
        for (let j = 0; j < pointTmp.length; j++) {
          if (j == 0) {
            context.moveTo(
              pointTmp[j][0] - pixelExtent[0],
              pointTmp[j][1] - pixelExtent[1]
            );
          } else {
            context.lineTo(
              pointTmp[j][0] - pixelExtent[0],
              pointTmp[j][1] - pixelExtent[1]
            );
          }
          console.log(
            pointTmp[j][0] - pixelExtent[0],
            pointTmp[j][1] - pixelExtent[1]
          );
        }
      }
      context.clip();
    },
    getPixelExtent(map, extent) {
      let pixelRatio = window.devicePixelRatio || 1;
      let transform;
      transform = scaleTransform(createTransform(), pixelRatio, pixelRatio);

      const leftTop = [extent[0], extent[3]];
      const rightBottom = [extent[2], extent[1]];
      const leftTopPixel = this.transform2D(
        [applyTransform(this.coordinateToPixelTransform, leftTop)],
        transform
      )[0];
      const rightBottomPixel = this.transform2D(
        [applyTransform(this.coordinateToPixelTransform, rightBottom)],
        transform
      )[0];

      return [
        leftTopPixel[0],
        leftTopPixel[1],
        rightBottomPixel[0],
        rightBottomPixel[1],
      ];
    },

    /**
     * 获取被瓦片裁切后的几何图形,提高效率
     * @param {}
     */
    getClippedGeometry: function(geom, bounds) {
      // console.log(geom);
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
