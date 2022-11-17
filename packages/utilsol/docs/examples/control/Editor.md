# Editor

## 基础用法

::: demo

```vue
<template>
  <div
    id="container1"
    style="width: 100%; height: 500px; position: relative"
    ref="map"
  ></div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Stamen from "ol/source/Stamen";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol";
import Tile from "ol/layer/Tile";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import * as style from "ol/style";
export default {
  data() {
    return {
      map: null,
      animation: null,
      type: "Polygon",
      measure: null,
    };
  },
  watch: {
    type() {
      this.measure.setType(this.type);
    },
  },
  mounted() {
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

    this.map = new Map({
      target: this.$refs["map"],
      layers: [
        new Tile({
          source: new Stamen({
            layer: "watercolor",
          }),
        }),
      ],
      view: new View({
        center: center,
        zoom: 4,
      }),
    });

    var layer = new VectorLayer({
      source: new VectorSource(),
    });
    layer.setStyle(
      new style.Style({
        stroke: new style.Stroke({
          color: "rgba(0, 0, 0, 0.5)",
          width: 2,
        }),
        image: new style.Circle({
          radius: 5,
          stroke: new style.Stroke({
            color: "#000000",
          }),
          fill: new style.Fill({
            color: "rgba(255,255, 255, 0.001)",
          }),
        }),
      })
    );
    this.map.addLayer(layer);

    var editor = new utilsol.control.Editor({ layer: layer });

    var itemInfos = [
      {
        id: "1",
        parentId: "0",
        isLine: true,
      },
      {
        id: "2",
        parentId: "0",
        isLine: true,
      },
      {
        id: "3",
        parentId: "0",
        isLine: false,
      },
      {
        id: "4",
        parentId: "1",
        disableTitle: "开始编辑",
        enableTitle: "开始编辑",
        selectedTitle: "开始编辑",
        type: utilsol.editor.EditorType.START,
        cannotSel: false,
        state: utilsol.editor.EditorState.ENABLE,
      },
      {
        id: "14",
        parentId: "1",
        disableTitle: "结束编辑",
        enableTitle: "结束编辑",
        selectedTitle: "结束编辑",
        type: utilsol.editor.EditorType.STOP,
        cannotSel: false,
        state: utilsol.editor.EditorState.HIDE,
      },
      {
        id: "5",
        parentId: "1",
        disableTitle: "选取图斑",
        enableTitle: "选取图斑",
        selectedTitle: "选取图斑",
        type: utilsol.editor.EditorType.SELECT,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },
      {
        id: "14",
        parentId: "1",
        disableTitle: "创建图斑",
        enableTitle: "创建图斑",
        selectedTitle: "创建图斑",
        type: utilsol.editor.EditorType.CREATE,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },
      {
        id: "6",
        parentId: "1",
        disableTitle: "切割图斑",
        enableTitle: "切割图斑",
        selectedTitle: "切割图斑",
        type: utilsol.editor.EditorType.CUTTING,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },
      {
        id: "7",
        parentId: "1",
        disableTitle: "编辑图斑",
        enableTitle: "编辑图斑",
        selectedTitle: "编辑图斑",
        type: utilsol.editor.EditorType.EDIT,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },

      {
        id: "10",
        parentId: "2",
        disableTitle: "合并图斑",
        enableTitle: "合并图斑",
        selectedTitle: "合并图斑",
        type: utilsol.editor.EditorType.MERGE,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },
      {
        id: "11",
        parentId: "2",
        disableTitle: "删除图斑",
        enableTitle: "删除图斑",
        selectedTitle: "删除图斑",
        type: utilsol.editor.EditorType.DELETE,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },
      {
        id: "12",
        parentId: "2",
        disableTitle: "取消选择",
        enableTitle: "取消选择",
        selectedTitle: "取消选择",
        type: utilsol.editor.EditorType.CANCEL,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },
      {
        id: "13",
        parentId: "3",
        disableTitle: "保存图斑",
        enableTitle: "保存图斑",
        selectedTitle: "保存图斑",
        type: utilsol.editor.EditorType.SAVE,
        cannotSel: false,
        state: utilsol.editor.EditorState.DISABLE,
      },
    ];
    editor.setItemInfos(itemInfos);
    

    this.map.addControl(editor);
  },
  methods: {},
};
</script>
<style></style>
```

:::
