## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view
      :center="center"
      :options="{ zoom: 2, maxZoom: 8, projection: 'EPSG:3857' }"
    >
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-image>
      <vue2ol-source-imagecanvas :options="sourceOptions">
      </vue2ol-source-imagecanvas>
    </vue2ol-layer-image>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      center: [-10997148, 4569099],
      sourceOptions: {
        canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
          console.log(extent, resolution, pixelRatio, size, projection);
          let canvas = document.createElement("canvas");
          canvas.width = size[0];
          canvas.height = size[1];

          let ctx = canvas.getContext("2d");
          ctx.rect(300, 300, 100, 100);
          ctx.fillStyle = "#f00";
          ctx.fill();
          return canvas;
        },
      },
    };
  },
};
</script>
```

:::
