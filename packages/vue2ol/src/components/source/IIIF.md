## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;" @init="handleMapInit">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-iiif
        v-if="iifOptions"
        :options="iifOptions"
        @init="handleInit"
      >
      </vue2ol-source-iiif>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
import View from "ol/View";
import IIIFInfo from "ol/format/IIIFInfo";
let url =
  "https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0107/0000010732/00000072.jpx/info.json";

export default {
  data() {
    return {
      zoom: 4, //级别
      center: [-10997148, 4569099], //中心点
      viewOptions: {
        projection: "EPSG:3857", //坐标系
      },
      iifOptions: null,
      map: null,
    };
  },
  mounted() {
    fetch(url).then((response) => {
      response.json().then((imageInfo) => {
        const options = new IIIFInfo(imageInfo).getTileSourceOptions();
        if (options === undefined || options.version === undefined) {
          return;
        }
        options.zDirection = -1;
        this.iifOptions = options;
      });
    });
  },
  methods: {
    handleInit(iiifTileSource) {
      this.map.setView(
        new View({
          resolutions: iiifTileSource.getTileGrid().getResolutions(),
          extent: iiifTileSource.getTileGrid().getExtent(),
          constrainOnlyCenter: true,
        })
      );
      this.map.getView().fit(iiifTileSource.getTileGrid().getExtent());
    },
    handleMapInit(map) {
      this.map = map;
    },
  },
};
</script>
```

:::
