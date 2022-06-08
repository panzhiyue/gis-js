# EShapeFile

## 基础示例

::: demo
``` vue
<template>
  <div id="container">
    <div id="menu">
        <button type="button" @click="load">
          加载shp
        </button>
        
        <button type="button" @click="download">
          下载shp
        </button>
    </div>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import Stamen from "ol/source/Stamen";
import * as style from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol"

export default {
  data() {
    return {
      map: null,
      plotDraw: null,
      plotEdit: null,
      drawLayer: null,
    };
  },
  mounted() {
    var center = [37.41, 8.82];
    this.map = new Map({
      target: "container",
      controls:[],
      layers: [
        new Tile({
          //source: new ol.source.MapQuest({layer: 'sat'})
          source: new Stamen({
            layer: "watercolor",
          }),
        }),
      ],
      view: new View({
        center: center,
        zoom: 4,
        projection:"EPSG:4326"
      }),
    });

    this.vector = new VectorLayer({
      source: new VectorSource()
    })
    this.map.addLayer(this.vector);

  },
  methods: {
    load(){
      //加载shapefile文件
      this.getFile(true, (files) => {
        var eShapeFile = new utilsol.EShapeFile({
          projection: this.map.getView().getProjection(),
        });
        eShapeFile.on("loaded", () => {
          var features = eShapeFile.getFeatures();
          this.vector.getSource().addFeatures(features);
          this.map.getView().fit(this.vector.getSource().getExtent());
        });
        eShapeFile.readFile(files);
      });
    },
    download(){
      //下载为shapefile文件
      let features = this.vector.getSource().getFeatures();
      var eShapeFile = new utilsol.EShapeFile({
        projection: this.map.getView().getProjection(),
      });
      var options = {
        folder: "myshapes",
        types: {
          point: "mypoints",
          polygon: "mypolygons",
          line: "mylines",
        },
        successCalllback: () => {
          hide();
          message.info("下载完毕", 2.5);
        },
      };
      eShapeFile.setFeatures(features);
      eShapeFile.downLoadZip(options);
    },
        /**
     * 获取文件
     * @param {boolean} 是否选择多个文件
     * @param {Function} 回调函数
     */
    getFile(multiple, callback) {
      let file = document.createElement("input");
      file.type = "file";
      file.multiple = multiple;
      file.onchange = function (event) {
        if (typeof callback == "function") {
          callback(event.path[0].files);
        }
      };
      file.click();
    },
  },
};
</script>
<style>
#container {
  width: 100%;
  height: 500px;
  position: relative;
}

#menu {
  position: absolute;
  top: 20px;
  left: 10px;
  background: rgba(100, 100, 100, 0.85);
  padding: 10px;
  color: #cccccc;
  z-index: 1000;
}

button {
  font-family: "微软雅黑", sans-serif;
  opacity: 1;
  min-width: 55px;
  padding: 4px 6px;
}

#delete-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 8px;
}

#delete-wrapper #btn-delete {
  padding: 8px 16px;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  background: rgba(255, 8, 53, 0.85);
}

.p-helper-control-point-div {
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  background-color: #ff0;
  opacity: 0.8;
  cursor: move;
}
</style>
```
:::