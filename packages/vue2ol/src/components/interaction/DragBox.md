## 基础用法

::: demo

```vue
<template>
  <div>
    <select v-model="active" style="width:200px;">
      <option value="1">激活</option>
      <option value="0">取消</option>
    </select>
  </div>
  <vue2ol-map style="height:400px;" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-vector>
        <vue2ol-feature :options="options"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-interaction-dragbox
      :active="active == '1'"
    ></vue2ol-interaction-dragbox>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      mapOptions: {
        interactions: [],
      },
      active: "0",
      options: {
        geometry: new Polygon([
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28],
          ],
        ]),
        name: "testFeature",
      },
    };
  },
  mounted() {},
};
</script>
```

:::

## 添加条件，需要安置 shift 键

::: demo

```vue
<template>
  <div>
    <select v-model="active" style="width:200px;">
      <option value="1">激活</option>
      <option value="0">取消</option>
    </select>
  </div>
  <vue2ol-map style="height:400px;" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-vector>
        <vue2ol-feature :options="options"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-interaction-dragbox
      :active="active == '1'"
      :options="interactionOptions"
    ></vue2ol-interaction-dragbox>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      mapOptions: {
        interactions: [],
      },
      active: "0",
      options: {
        geometry: new Polygon([
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28],
          ],
        ]),
        name: "testFeature",
      },
      interactionOptions: {
        condition: (e) => {
          return e.originalEvent.shiftKey;
        },
      },
    };
  },
  mounted() {},
};
</script>
```

:::

## 绘制结束放大到指定区域

::: demo

```vue
<template>
  <div>
    <select v-model="active" style="width:200px;">
      <option value="1">激活</option>
      <option value="0">取消</option>
    </select>
  </div>
  <vue2ol-map style="height:400px;" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-vector>
        <vue2ol-feature :options="options"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-interaction-dragbox
      :active="active == '1'"
      :options="interactionOptions"
      @boxend="handleBoxend"
    ></vue2ol-interaction-dragbox>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import { easeOut } from "ol/easing.js";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      mapOptions: {
        interactions: [],
      },
      active: "0",
      options: {
        geometry: new Polygon([
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28],
          ],
        ]),
        name: "testFeature",
      },
      interactionOptions: {
        condition: (e) => {
          return e.originalEvent.shiftKey;
        },
      },
      interaction: null,
    };
  },
  mounted() {},
  methods: {
    handleBoxend(e) {
      let geometry = e.target.getGeometry();
      let map = e.mapBrowserEvent.target;
      const view = /** @type {!import("../View.js").default} */ (map.getView());
      view.fitInternal(geometry, {
        duration: 1000,
        easing: easeOut,
      });
    },
  },
};
</script>
```

:::
