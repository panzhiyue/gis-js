## 基础用法

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
        projection: "EPSG:3857", //坐标系
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
          matrixIds: matrixIds,
        }),
        style: "default",
        wrapX: true,
      },
      osmSourceOptions: {
        projection: "EPSG:3857", //坐标系
      },
    };
  },
};
</script>
```

:::
