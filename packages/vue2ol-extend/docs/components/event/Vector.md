---

title: vue2ol-event-vector

---

# vue2ol-event-vector

---

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
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
      <vue2ol-event-vector
        @on-singleclick="handleSingleClick"
        @on-pointermove="handlePointerMove"
      ></vue2ol-event-vector>
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
        projection: "EPSG:4326" //坐标系
      },
      features: []
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      let feature = new Feature({
        geometry: new Point([120 + i * 0.01, 28 + i * 0.01])
      });
      this.features.push(feature);
    }
  },
  methods: {
    handleSingleClick(result) {
      console.log("handleSingleClick", result);
    },
    handlePointerMove(result) {
      console.log("handlePointerMove", result);
    }
  }
};
</script>
```

:::

## Props

| 名称        | 描述 | 类型   | 取值范围 | 默认值 |
| ----------- | ---- | ------ | -------- | ------ |
| parentMap   |      | object | -        |        |
| parentLayer |      | object | -        |        |
| timeout     |      | number | -        | 0      |

## Events

| 名称           | 属性 | 描述 |
| -------------- | ---- | ---- |
| on-singleclick |      |
| on-pointermove |      |
