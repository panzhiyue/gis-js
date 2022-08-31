---

title: Vue2olSourceRaster

---

# Vue2olSourceRaster

> ol/source/Raster

Since: v1.0.0

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view
      :center="center"
      :options="{ zoom: 13, maxZoom: 18, projection: 'EPSG:3857' }"
    >
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-xyz
        url="https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=xw7rrUg0eM03SMa19LGe"
        @init="handleInitSource"
        :options="{
          crossOrigin: ''
        }"
      ></vue2ol-source-xyz>
    </vue2ol-layer-tile>

    <vue2ol-layer-image>
      <vue2ol-source-raster
        v-if="options"
        :options="options"
        @beforeoperations="handleBeforeoperations"
      >
      </vue2ol-source-raster>
    </vue2ol-layer-image>
  </vue2ol-map>
</template>

<script>
const minVgi = 0;
const maxVgi = 0.5;
const bins = 10;

/**
 * Calculate the Vegetation Greenness Index (VGI) from an input pixel.  This
 * is a rough estimate assuming that pixel values correspond to reflectance.
 * @param {Array<number>} pixel An array of [R, G, B, A] values.
 * @return {number} The VGI value for the given pixel.
 */
function vgi(pixel) {
  const r = pixel[0] / 255;
  const g = pixel[1] / 255;
  const b = pixel[2] / 255;
  return (2 * g - r - b) / (2 * g + r + b);
}

/**
 * Summarize values for a histogram.
 * @param {numver} value A VGI value.
 * @param {Object} counts An object for keeping track of VGI counts.
 */
function summarize(value, counts) {
  const min = counts.min;
  const max = counts.max;
  const num = counts.values.length;
  if (value < min) {
    // do nothing
  } else if (value >= max) {
    counts.values[num - 1] += 1;
  } else {
    const index = Math.floor((value - min) / counts.delta);
    counts.values[index] += 1;
  }
}

export default {
  data() {
    return {
      center: [-9651695, 4937351],
      sources: null,
      timer: null,
      options: null
    };
  },
  mounted() {},
  methods: {
    handleInitSource(mapObject) {
      this.options = {
        sources: [mapObject],
        operation: function(pixels, data) {
          const pixel = pixels[0];
          const value = vgi(pixel);
          summarize(value, data.counts);
          if (value >= data.threshold) {
            pixel[0] = 0;
            pixel[1] = 255;
            pixel[2] = 0;
            pixel[3] = 128;
          } else {
            pixel[3] = 0;
          }
          return pixel;
        },
        lib: {
          vgi: vgi,
          summarize: summarize
        }
      };
    },
    handleBeforeoperations(event) {
      event.data.counts = this.createCounts(minVgi, maxVgi, bins);
      event.data.threshold = 0.15;
    },

    createCounts(min, max, num) {
      const values = new Array(num);
      for (let i = 0; i < num; ++i) {
        values[i] = 0;
      }
      return {
        min: min,
        max: max,
        values: values,
        delta: (max - min) / num
      };
    },
    /**
     * Run calculations on pixel data.
     * @param {Array} pixels List of pixels (one per source).
     * @param {Object} data User data object.
     * @return {Array} The output pixel.
     */
    operation(pixels, data) {
      const pixel = pixels[0];
      const value = this.vgi(pixel);
      this.summarize(value, data.counts);
      if (value >= data.threshold) {
        pixel[0] = 0;
        pixel[1] = 255;
        pixel[2] = 0;
        pixel[3] = 128;
      } else {
        pixel[3] = 0;
      }
      return pixel;
    }
  }
};
</script>
```

:::

## Props

| 名称        | 描述                                                                                                                                                  | 类型                                                    | 取值范围 | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ------ |
| properties  | 属性                                                                                                                                                  | object                                                  | -        |        |
| options     | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -        | {}     |
| parentLayer | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -        |        |
| attributes  | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -        |        |
| projection  |                                                                                                                                                       | string\|object                                          | -        |        |
| operation   |                                                                                                                                                       | object                                                  | -        |        |

## Events

| 名称   | 属性                                                          | 描述                     |
| ------ | ------------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/source/Raster').default` - 地图元素 | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/source/Raster').default` - 地图元素 | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/source/Raster').default` - 地图元素 | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
