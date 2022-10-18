---

title: Vue2olTyphoonPicketline24

---

# Vue2olTyphoonPicketline24

> 24 小时警戒线

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
        <vue2ol-typhoon-picketline24></vue2ol-typhoon-picketline24>
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
        <vue2ol-typhoon-picketline24
          :style-obj="style"
        ></vue2ol-typhoon-picketline24>
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

| 名称          | 描述           | 类型                          | 取值范围 | 默认值                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | -------------- | ----------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| properties    | 属性           | object                        | -        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| coordinates   | 警戒线坐标集合 | Array<ol/Coordinate> 坐标集合 | -        | [<br/> [126.914062, 34.161818],<br/> [127.001953, 21.963425],<br/> [119.003906, 17.895114],<br/> [118.916016, 11.178402],<br/> [113.027344, 4.565474],<br/> [105.029297, 0],<br/>]                                                                                                                                                                                                                                                                                           |
| labelPosition |                | array                         | -        | [126.914062, 34.161818]                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| styleObj      | 样式           | {ol/style/Style}              | -        | () => {<br/> return [<br/> new Style({<br/> stroke: new Stroke({<br/> color: "#eed139",<br/> width: 1,<br/> }),<br/> }),<br/> new Style({<br/> text: new Text({<br/> text: "24 小时警戒线",<br/> placement: "line",<br/> // textAlign: "left",<br/> textBaseline: "middle",<br/> justify: "center",<br/> padding: [100, 100, 100, 100],<br/> }),<br/> geometry: new LineString([<br/> [126.914062, 34.161818],<br/> [127.001953, 21.963425],<br/> ]),<br/> }),<br/> ];<br/>} |
