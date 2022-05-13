---

title: Vue2olLayerTile

---

# Vue2olLayerTile

> ol/layer/Tile 的 vue 组件

Since: v1.0.0

---

## OSM

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
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
      }
    };
  }
};
</script>
```

:::

## XYZ

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-xyz
        url="http://t0.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=cc4ded9c8fa65c654611568acc889439"
        :options="sourceOptions"
      ></vue2ol-source-xyz>
    </vue2ol-layer-tile>
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
      sourceOptions: {
        projection: "EPSG:4326" //坐标系
      }
    };
  }
};
</script>
```

:::

## Props

| 名称                   | 描述                                                                                                                                                  | 类型                       | 取值范围 | 默认值 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------- | ------ |
| options                | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                     | -        |        |
| parentMap              | 地图,如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/Map').default}                                                                        | object                     | -        |        |
| name                   | 图层名称                                                                                                                                              | string                     | -        |        |
| extent                 | 图层渲染的边界范围。该层将不会在此范围之外渲染。                                                                                                      | import('ol/extent').Extent | -        |        |
| maxResolution          | 图层可见的最大分辨率（不包括）。                                                                                                                      | number                     | -        |        |
| maxZoom                | 图层可见的最大缩放（不包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。                                              | number                     | -        |        |
| minResolution          | 图层可见的最小分辨率（包括）。                                                                                                                        | number                     | -        |        |
| minZoom                | 图层可见的最小缩放（包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。                                                | number                     | -        |        |
| opacity                | 图层的不透明度，允许值范围从 0 到 1。                                                                                                                 | number                     | -        |        |
| visible                | 图层可见性                                                                                                                                            | boolean                    | -        | true   |
| zIndex                 | 图层层级，值越大显示在上层                                                                                                                            | number                     | -        |        |
| preload                | 将预加载瓦片的数量。                                                                                                                                  | number                     | -        |        |
| useInterimTilesOnError | 错误时使用临时瓷砖。                                                                                                                                  | boolean                    | -        |        |

## Events

| 名称  | 属性                                                                 | 描述           |
| ----- | -------------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/layer/Tile').default` - openlayer 瓦片图层 | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
