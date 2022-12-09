---

title: Vue2olRendererCanvasfilter

---

# Vue2olRendererCanvasfilter

> Canvas 滤镜

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt> </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-renderer-canvasfilter
      :grayscale="'50%'"
      :brightness="'50%'"
      :sort="['brightness', 'grayscale']"
    >
    </vue2ol-renderer-canvasfilter>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [119.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      polygon: null
    };
  },
  mounted() {
    this.polygon = new Polygon([
      [
        [118, 28],
        [120, 28],
        [120, 27],
        [119, 27],
        [118, 28]
      ]
    ]);
  }
};
</script>
```

:::

## 部分图层

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :options="{ className: 'ol-layer2' }">
      <vue2ol-source-tdt> </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-renderer-canvasfilter
      :classNameList="['ol-layer2']"
      :grayscale="'50%'"
      :brightness="'50%'"
      :sort="['brightness', 'grayscale']"
    >
    </vue2ol-renderer-canvasfilter>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [119.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      polygon: null
    };
  },
  mounted() {
    this.polygon = new Polygon([
      [
        [118, 28],
        [120, 28],
        [120, 27],
        [119, 27],
        [118, 28]
      ]
    ]);
  }
};
</script>
```

:::

## Props

| 名称          | 描述                          | 类型       | 取值范围 | 默认值                                                                                                                                                      |
| ------------- | ----------------------------- | ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| parentMap     | 父亲地图                      | null       | -        |                                                                                                                                                             |
| grayscale     |                               | string     | -        | null                                                                                                                                                        |
| sepia         |                               | string     | -        | null                                                                                                                                                        |
| saturate      |                               | string     | -        | null                                                                                                                                                        |
| hueRotate     |                               | string     | -        | null                                                                                                                                                        |
| invert        |                               | string     | -        | null                                                                                                                                                        |
| opacity       |                               | string     | -        | null                                                                                                                                                        |
| brightness    |                               | string     | -        | null                                                                                                                                                        |
| contrast      |                               | string     | -        | null                                                                                                                                                        |
| blur          |                               | string     | -        | null                                                                                                                                                        |
| dropShadow    |                               | string     | -        | null                                                                                                                                                        |
| options       |                               | object     | -        |                                                                                                                                                             |
| classNameList | 需要切割的图层 className 数组 | {string[]} | -        | ["ol-layer"]                                                                                                                                                |
| sort          | 顺序                          | {string[]} | -        | [<br/> "blur",<br/> "brightness",<br/> "contrast",<br/> "grayscale",<br/> "hue-rotate",<br/> "invert",<br/> "opacity",<br/> "saturate",<br/> "sepia",<br/>] |
