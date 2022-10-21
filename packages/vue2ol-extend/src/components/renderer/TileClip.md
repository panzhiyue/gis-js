## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt
        :layer="'vec'"
        :options="{ devicePixelRatio: devicePixelRatio }"
      >
        <vue2ol-renderer-tileclip
          :geometry="polygon"
          mode="show"
        ></vue2ol-renderer-tileclip>
      </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="polygon"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import { Vue2olRendererTileclip } from "@gis-js/vue2ol-extend";
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [119.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
        zoomFactor: 2,
      },
      polygon: null,

      devicePixelRatio: global.devicePixelRatio,
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
    console.log(9999);
  },
};
</script>
```

:::

## 浙江省

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;" v-if="geometry">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt
        :layer="'vec'"
        :options="{ devicePixelRatio: devicePixelRatio }"
      >
        <vue2ol-renderer-tileclip
          :geometry="geometry"
          mode="show"
        ></vue2ol-renderer-tileclip>
      </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :geometry="geometry"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import { Vue2olRendererTileclip } from "@gis-js/vue2ol-extend";
import Polygon from "ol/geom/Polygon";
import { TopoJSON } from "ol/format";
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [119.5, 27.5], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
        zoomFactor: 2,
      },
      geometry: null,

      devicePixelRatio: global.devicePixelRatio,
    };
  },
  async mounted() {
    const response = await fetch("/data/ZJ.json");
    const body = await response.text();
    this.geometry = new TopoJSON().readFeatures(body)[0].getGeometry();
  },
};
</script>
```

:::
