---

title: Vue2olLayerVector

---

# Vue2olLayerVector

> ol/layer/Vector 的 vue 组件

Since: v1.0.0

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
  }
};
</script>
```

:::

## geojson

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-vector :options="sourceOptions"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [121, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      sourceOptions: {
        url: "../../../assets/data/geojson/point.json",
        format: new GeoJSON(),
        projection: "EPSG:4326"
      }
    };
  },
  mounted() {}
};
</script>
```

:::

## Props

| 名称          | 描述                                                                                                                                                                                                                                                                 | 类型                                                     | 取值范围 | 默认值 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------- | ------ |
| properties    | 属性                                                                                                                                                                                                                                                                 | object                                                   | -        |        |
| options       | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值                                                                                                                | object                                                   | -        | {}     |
| parentMap     | 地图,如果为 null 则从 parent 中获取                                                                                                                                                                                                                                  | {import('ol/Map').default}                               | -        |        |
| name          | 图层名称                                                                                                                                                                                                                                                             | string                                                   | -        |        |
| extent        | 图层渲染的边界范围。该层将不会在此范围之外渲染。                                                                                                                                                                                                                     | import('ol/extent').Extent                               | -        |        |
| maxResolution | 图层可见的最大分辨率（不包括）。                                                                                                                                                                                                                                     | number                                                   | -        |        |
| maxZoom       | 图层可见的最大缩放（不包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。                                                                                                                                                             | number                                                   | -        |        |
| minResolution | 图层可见的最小分辨率（包括）。                                                                                                                                                                                                                                       | number                                                   | -        |        |
| minZoom       | 图层可见的最小缩放（包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。                                                                                                                                                               | number                                                   | -        |        |
| opacity       | 图层的不透明度，允许值范围从 0 到 1。                                                                                                                                                                                                                                | number                                                   | -        |        |
| visible       | 图层可见性                                                                                                                                                                                                                                                           | boolean                                                  | -        | true   |
| zIndex        | 图层层级，值越大显示在上层                                                                                                                                                                                                                                           | number                                                   | -        |        |
| source        |                                                                                                                                                                                                                                                                      | object                                                   | -        |        |
| styleObj      | 特征的样式。这可以是单个样式对象、样式数组或采用特征和分辨率并返回样式数组的函数。如果设置为 null，则图层没有样式（null 样式），因此只有具有自己样式的要素才会在图层中呈现。不带参数调用 setStyle()以重置为默认样式。<br/>因为 style 是保留属性，因此改名为 styleObj | {import('ol/style/Style').StyleLike\| null \| undefined} | -        |        |

## Events

| 名称   | 属性                                                         | 描述                     |
| ------ | ------------------------------------------------------------ | ------------------------ |
| init   | **mapObject** `import('ol/layer/Vector').default` - 地图元素 | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/layer/Vector').default` - 地图元素 | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/layer/Vector').default` - 地图元素 | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
