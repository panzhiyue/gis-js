## 注意

ol/source/Tile 需要传入参数`tilePixelRatio:window.devicePixelRatio`

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt :options="{ devicePixelRatio: devicePixelRatio }">
      </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector key="vector1">
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector key="vector2">
      <vue2ol-source-vector>
        <vue2ol-feature v-for="(coordinate, index) in coordinates">
          <vue2ol-geom-point :coordinates="coordinate"> </vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-renderer-canvasclip :geometry="polygon">
    </vue2ol-renderer-canvasclip>
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
        projection: "EPSG:4326", //坐标系
      },
      polygon: null,
      devicePixelRatio: global.devicePixelRatio,
      coordinates: [],
    };
  },
  mounted() {
    this.polygon = new Polygon([
      [
        [118, 28],
        [120, 28],
        [120, 27],
        [119, 27],
        [118, 28],
      ],
    ]);

    let coordinates = [];
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        coordinates.push([117.5 + i * 0.1, 26.5 + j * 0.1]);
      }
    }
    this.coordinates = coordinates;
  },
};
</script>
```

:::

## 切割部分图层

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :options="{ className: 'ol-layer2' }">
      <vue2ol-source-tdt :options="{ devicePixelRatio: devicePixelRatio }">
      </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector key="vector2">
      <vue2ol-source-vector>
        <vue2ol-feature v-for="(coordinate, index) in coordinates">
          <vue2ol-geom-point :coordinates="coordinate"> </vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-renderer-canvasclip
      :geometry="polygon"
      :classNameList="['ol-layer2']"
    >
    </vue2ol-renderer-canvasclip>
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
        projection: "EPSG:4326", //坐标系
      },
      polygon: null,
      devicePixelRatio: global.devicePixelRatio,
      coordinates: [],
    };
  },
  mounted() {
    this.polygon = new Polygon([
      [
        [118, 28],
        [120, 28],
        [120, 27],
        [119, 27],
        [118, 28],
      ],
    ]);

    let coordinates = [];
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        coordinates.push([117.5 + i * 0.1, 26.5 + j * 0.1]);
      }
    }
    this.coordinates = coordinates;
  },
};
</script>
```

:::
