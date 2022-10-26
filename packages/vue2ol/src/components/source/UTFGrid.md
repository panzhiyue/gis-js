## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;" @pointermove="handlePointerMove">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm> </vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tilejson :options="options"> </vue2ol-source-tilejson>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-utfgrid :options="options2" @ready="handleGridReady">
      </vue2ol-source-utfgrid>
    </vue2ol-layer-tile>
    <vue2ol-overlay v-if="data" :position="position">
      <div id="country-info">
        <div id="country-name">{{ data["admin"] }}</div>
        <img
          id="country-flag"
          :src="`data:image/png;base64,${data['flag_png']}`"
        />
      </div>
    </vue2ol-overlay>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 1, //级别
      center: [-10997148, 4569099], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      options: {
        url:
          "https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=sk.eyJ1IjoicGFuemhpeXVlIiwiYSI6ImNsOXA4b2gyYTAyMGQ0MHFtYTNsZmZ6emEifQ.PSU_edcZjq8tUsJJULc64w",
        crossOrigin: "anonymous",
      },
      options2: {
        url:
          "https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=sk.eyJ1IjoicGFuemhpeXVlIiwiYSI6ImNsOXA4b2gyYTAyMGQ0MHFtYTNsZmZ6emEifQ.PSU_edcZjq8tUsJJULc64w",
        crossOrigin: "anonymous",
      },
      gridSource: null,
      position: null,
      data: null,
    };
  },
  mounted() {},
  methods: {
    handlePointerMove(e) {
      if (e.dragging) {
        return;
      }
      const coordinate = e.target.getEventCoordinate(e.originalEvent);

      const viewResolution = /** @type {number} */ (e.target
        .getView()
        .getResolution());
      this.gridSource.forDataAtCoordinateAndResolution(
        coordinate,
        viewResolution,
        (data) => {
          if (data) {
            this.data = data;
            this.position = coordinate;
          } else {
            this.data = null;
            this.position = null;
          }
        }
      );
    },
    handleGridReady(mapObject) {
      this.gridSource = mapObject;
    },
  },
};
</script>
```

:::
