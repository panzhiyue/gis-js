## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-cluster>
        <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
      </vue2ol-source-cluster>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      features: [],
    };
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        let feature = new Feature({
          geometry: new Point([120 + i * 0.001, 28 + j * 0.001]),
        });
        this.features.push(feature);
      }
    }
  },
};
</script>
```

:::

## 修改样式

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10" :style-obj="style">
      <vue2ol-source-cluster>
        <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
      </vue2ol-source-cluster>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
const styleCache = {};
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      features: [],
      style: (feature) => {
        const size = feature.get("features").length;
        let style = styleCache[size];
        if (!style) {
          style = new Style({
            image: new Circle({
              radius: 10,
              stroke: new Stroke({
                color: "#fff",
              }),
              fill: new Fill({
                color: "#3399CC",
              }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: "#fff",
              }),
            }),
          });
          styleCache[size] = style;
        }
        return style;
      },
    };
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        let feature = new Feature({
          geometry: new Point([120 + i * 0.001, 28 + j * 0.001]),
        });
        this.features.push(feature);
      }
    }
  },
};
</script>
```

:::
