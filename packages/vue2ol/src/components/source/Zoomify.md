## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :center="center" :zoom="zoom" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-zoomify :options="sourceOptions"></vue2ol-source-zoomify>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
import Zoomify from "ol/source/Zoomify";
const imgWidth = 4000;
const imgHeight = 3000;

const zoomifyUrl = "https://ol-zoomify.surge.sh/zoomify/";

export default {
  data() {
    return {
      zoom: 1,
      center: [imgWidth / 2, -imgHeight / 2],
      viewOptions: {
        resolutions: [16, 8, 4, 2, 1, 0.5, 0.25, 0.125],
        // projection: "EPSG:3857", //坐标系
        extent: [0, -imgHeight, imgWidth, 0],
        constrainOnlyCenter: true,
      },
      sourceOptions: {
        url: zoomifyUrl,
        size: [imgWidth, imgHeight],
        crossOrigin: "anonymous",
        zDirection: -1, // Ensure we get a tile with the screen resolution or higher
      },
    };
  },
};
</script>
```

:::
