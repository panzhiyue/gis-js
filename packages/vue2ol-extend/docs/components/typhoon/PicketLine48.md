---

title: Vue2olTyphoonPicketline48

---

# Vue2olTyphoonPicketline48

> 48 小时警戒线

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
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-typhoon-picketline48></vue2ol-typhoon-picketline48>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 4, //级别
      center: [124.7, 26.6], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      }
    };
  },
  computed: {},
  mounted() {}
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
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-typhoon-picketline48
          :style-obj="style"
        ></vue2ol-typhoon-picketline48>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import { Style, Stroke } from "ol/style";

export default {
  data() {
    return {
      zoom: 4, //级别
      center: [124.7, 26.6], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      style: new Style({
        stroke: new Stroke({
          color: "#ffff00",
          width: 1
        })
      })
    };
  }
};
</script>
```

:::

## Props

| 名称        | 描述           | 类型                 | 取值范围 | 默认值                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------- | -------------- | -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coordinates | 警戒线坐标集合 | Array<ol/Coordinate> | -        | [<br/> [132, 33.651208],<br/> [132, 14.944785],<br/> [119.882812, 0],<br/> [105.029297, 0],<br/>]                                                                                                                                                                                                                                                                                                                                                                                                          |
| styleObj    | 样式           | {ol/style/Style}     | -        | () => {<br/> return [<br/> new Style({<br/> stroke: new Stroke({<br/> color: "#838313",<br/> width: 1,<br/> lineDash: [5, 5],<br/> }),<br/> }),<br/> new Style({<br/> text: new Text({<br/> text: "48 小时警戒线",<br/> placement: "line",<br/> textBaseline: "middle",<br/> justify: "center",<br/> fill: new Fill({<br/> color: "#4ab23c",<br/> }),<br/> font: "bold 14px serif",<br/> }),<br/> geometry: new LineString([<br/> [132, 33.651208],<br/> [132, 14.944785],<br/> ]),<br/> }),<br/> ];<br/>} |
