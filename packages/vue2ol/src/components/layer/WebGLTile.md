## GeoTIFF

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;" @>
    <vue2ol-view v-if="viewOptions" :options="viewOptions"> </vue2ol-view>
    <vue2ol-layer-webgltile>
      <vue2ol-source-geotiff
        v-if="options"
        :options="options"
        @init="handleInit"
      >
      </vue2ol-source-geotiff>
    </vue2ol-layer-webgltile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      viewOptions: null,
      options: null,
    };
  },
  mounted() {
    this.options = {
      sources: [
        {
          url: "/gis-js/vue2ol/data/tif/example.tif",
        },
      ],
    };
  },
  methods: {
    handleInit(mapObject) {
      mapObject.getView().then((viewConfig) => {
        viewConfig.showFullExtent = true;
        this.viewOptions = viewConfig;
      });
    },
  },
};
</script>
```

:::
