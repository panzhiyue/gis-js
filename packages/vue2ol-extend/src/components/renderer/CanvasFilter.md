## 基础用法

::: demo

```vue
<template>
    <div style="background-color:white;position:absolute;z-index:1000;">
      <input type="checkbox" v-model="isFilter" />启用
      
    </div>
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
      v-if="isFilter"
      :brightness="'0.8'"
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
        projection: "EPSG:4326", //坐标系
      },
      polygon: null,
      isFilter: true,
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
  },
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
        projection: "EPSG:4326", //坐标系
      },
      polygon: null,
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
  },
};
</script>
```

:::
