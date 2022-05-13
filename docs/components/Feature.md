---

title: Vue2olFeature

---

# Vue2olFeature

> ol/Feature 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)

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
        <vue2ol-feature>
          <vue2ol-geom-polygon :coordinates="coordinates">
          </vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      coordinates: [
        [
          [120, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [120, 28]
        ]
      ]
    };
  }
};
</script>
```

:::

## Props

| 名称         | 描述                                                                                                                                                                             | 类型           | 取值范围 | 默认值 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- | ------ |
| parentLayer  | <br/>`@typeName` {ol/layer/Vector').default}                                                                                                                                     | object         | -        |        |
| geometry     | 几何图形<br/>`@typeName` {import('ol/geom/Geometry').default}                                                                                                                    | object         | -        |        |
| geometryName | 要素几何图形的属性名称。调用[ol/Feature~Feature#getGeometry](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html#getGeometry)时，将返回具有该名称的属性的值。 | string         | -        |        |
| id           | feature 的 ID                                                                                                                                                                    | number\|string | -        |        |
| styleObj     | 特征的样式。<br/>因为 style 是保留属性，因此改名为 styleObj<br/>`@typeName` {import('ol/style/Style').StyleLike}                                                                 | object         | -        |        |
| options      | ol/Feature 实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值                                       | object         | -        |        |

## Events

| 名称  | 属性                                                     | 描述           |
| ----- | -------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/Feature').default` - undefined | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
