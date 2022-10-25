---

title: Vue2olSourceWmts

---

# Vue2olSourceWmts

> [ol/source/WMTS](https://openlayers.org/en/latest/apidoc/module-ol_source_WMTS-WMTS.html)的 vue 组件

Since: v1.0.0

---

## XYZ

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm :options="osmSourceOptions"></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-wmts :options="sourceOptions"></vue2ol-source-wmts>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { getTopLeft, getWidth } from "ol/extent";
import { get } from "ol/proj";

const projection = get("EPSG:3857");
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = new Array(19);
const matrixIds = new Array(19);
for (let z = 0; z < 19; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}
export default {
  data() {
    return {
      zoom: 1, //级别
      center: [0, 0], //中心点
      viewOptions: {
        projection: "EPSG:3857" //坐标系
      },
      sourceOptions: {
        projection: "EPSG:3857", //坐标系
        attributions:
          'Tiles © <a href="https://mrdata.usgs.gov/geology/state/"' +
          ' target="_blank">USGS</a>',
        url: "https://mrdata.usgs.gov/mapcache/wmts",
        layer: "sgmc2",
        matrixSet: "GoogleMapsCompatible",
        format: "image/png",
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        style: "default",
        wrapX: true
      },
      osmSourceOptions: {
        projection: "EPSG:3857" //坐标系
      }
    };
  }
};
</script>
```

:::

## Props

| 名称             | 描述                                                                                                                                                  | 类型                                                    | 取值范围 | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ------ |
| properties       | 属性                                                                                                                                                  | object                                                  | -        |        |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -        | {}     |
| parentLayer      | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -        |        |
| attributes       | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -        |        |
| projection       |                                                                                                                                                       | string\|object                                          | -        |        |
| tileLoadFunction |                                                                                                                                                       | {import('ol/Tile').LoadFunction\|undefined}             | -        |        |
| tileUrlFunction  |                                                                                                                                                       | {import('ol/Tile').UrlFunction\|undefined}              | -        |        |
| url              |                                                                                                                                                       | string                                                  | -        |        |
| urls             |                                                                                                                                                       | {string[]}                                              | -        |        |

## Events

| 名称   | 属性                                                         | 描述                     |
| ------ | ------------------------------------------------------------ | ------------------------ |
| init   | **mapObject** `import('ol/source/WMTS').default` - 地图元素  | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/source/WMTS').default` - 地图元素  | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/source/WMTS').default` - undefined | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
