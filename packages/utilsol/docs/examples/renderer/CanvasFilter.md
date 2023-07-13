# utilsol/renderer/CanvasFilter

## 基础用法

::: demo

```vue
<template>
  <div id="container">
    <div
      class="palette"
      title="调色板"
      width="300px"
      resizable
      :draggable="{
        target: $parent.$el,
      }"
    >
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isBlur" />
        <div class="palette__title">模糊</div>
        <input type="range" :max="20" v-model="model.blur" />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isHueRotate" />
        <div class="palette__title">色相</div>
        <input type="range" :max="360" v-model="model.hueRotate" />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isBrightness" />
        <div class="palette__title">亮度</div>
        <input
          type="range"
          :max="200"
          :step="0.01"
          v-model="model.brightness"
        />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isContrast" />
        <div class="palette__title">对比度</div>
        <input type="range" :max="200" :step="0.01" v-model="model.contrast" />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isSaturate" />
        <div class="palette__title">饱和度</div>
        <input
          type="range"
          :max="100"
          :step="0.01"
          :min="1"
          v-model="model.saturate"
        />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isOpacity" />
        <div class="palette__title">透明度</div>
        <input type="range" :max="100" :step="0.01" v-model="model.opacity" />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isGrayscale" />
        <div class="palette__title">灰度</div>
        <input type="range" :max="100" :step="0.01" v-model="model.grayscale" />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isInvert" />
        <div class="palette__title">反相</div>
        <input type="range" :max="100" :step="0.01" v-model="model.invert" />
      </div>
      <div class="palette__item">
        <input type="checkbox" class="palette__chk" v-model="isSepia" />
        <div class="palette__title">深褐色</div>
        <input type="range" :max="100" :step="0.01" v-model="model.sepia" />
      </div>
    </div>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import * as style from "ol/style";
import * as utilsol from "@gis-js/utilsol";

export default {
  data() {
    return {
      map: null,
      canvasFilter: null,
      model: {
        blur: 0,
        brightness: 0,
        contrast: 0,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 0,
        saturate: 0,
        sepia: 0,
      },
      isBlur: false,
      isHueRotate: false,
      isBrightness: false,
      isContrast: false,
      isSaturate: false,
      isOpacity: false,
      isGrayscale: false,
      isInvert: false,
      isSepia: false,
    };
  },
  watch: {
    model: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.refresh();
        }, 100);
      },
    },
    isBlur(newValue) {
      console.log(newValue);
      if (newValue) {
        this.canvasFilter.setBlur(this.model.blur + "px");
      } else {
        this.canvasFilter.setBlur(null);
      }
      console.log(this.canvasFilter.getBlur());
    },
    isHueRotate() {
      this.refresh();
    },
    isBrightness() {
      this.refresh();
    },
    isContrast() {
      this.refresh();
    },
    isSaturate() {
      this.refresh();
    },
    isOpacity() {
      this.refresh();
    },
    isGrayscale() {
      this.refresh();
    },
    isInvert() {
      this.refresh();
    },
    isSepia() {
      this.refresh();
    },
  },
  mounted() {
    let center = [37.41, 8.82];
    this.map = new Map({
      target: "container",
      view: new View({
        center: center,
        zoom: 1,
        projection: "EPSG:4326",
      }),
    });

    let layer = new Tile({
      source: new utilsol.source.TDT({
        layer: "vec",
        tk: "6703c18da8b111f1ac38fdcfc4a138d8",
      }),
    });
    this.map.addLayer(layer);

    this.canvasFilter = new utilsol.renderer.CanvasFilter();
    this.canvasFilter.setMap(this.map);
  },
  methods: {
    refresh() {
      if (this.isBlur) {
        this.canvasFilter.setBlur(this.model.blur + "px");
      } else {
        this.canvasFilter.setBlur(null);
      }

      if (this.isBrightness) {
        this.canvasFilter.setBrightness(this.model.brightness + "%");
      } else {
        this.canvasFilter.setBrightness(null);
      }

      if (this.isContrast) {
        this.canvasFilter.setContrast(this.model.contrast + "%");
      } else {
        this.canvasFilter.setContrast(null);
      }

      if (this.isGrayscale) {
        this.canvasFilter.setGrayscale(this.model.grayscale + "%");
      } else {
        this.canvasFilter.setGrayscale(null);
      }
      if (this.isHueRotate) {
        this.canvasFilter.setHueRotate(this.model.hueRotate + "%");
      } else {
        this.canvasFilter.setHueRotate(null);
      }
      if (this.isInvert) {
        this.canvasFilter.setInvert(this.model.invert + "%");
      } else {
        this.canvasFilter.setInvert(null);
      }
      if (this.isOpacity) {
        this.canvasFilter.setOpacity(this.model.opacity + "%");
      } else {
        this.canvasFilter.setOpacity(null);
      }
      if (this.isSaturate) {
        this.canvasFilter.setSaturate(this.model.saturate + "%");
      } else {
        this.canvasFilter.setSaturate(null);
      }
      if (this.isSepia) {
        this.canvasFilter.setSepia(this.model.sepia + "%");
      } else {
        this.canvasFilter.setSepia(null);
      }

      this.canvasFilter.render();
    },
  },
};
</script>
<style>
#container {
  width: 100%;
  height: 500px;
  position: relative;
}

.palette {
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  top: 6px;
  left: 6px;
}

.palette__item {
  display: flex;
}
</style>
```

:::
