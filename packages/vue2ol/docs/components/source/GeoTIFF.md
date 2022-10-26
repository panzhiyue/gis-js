---

title: Vue2olSourceGeotiff

---

# Vue2olSourceGeotiff

> [ol/source/GeoTIFF](https://openlayers.org/en/latest/apidoc/module-ol_source_GeoTIFF-GeoTIFFSource.html)的 vue 组件

Since: v1.0.0

---

## url

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
      options: null
    };
  },
  mounted() {
    this.options = {
      sources: [
        {
          url: "/gis-js/vue2ol/data/tif/example.tif"
        }
      ]
    };
  },
  methods: {
    handleInit(mapObject) {
      mapObject.getView().then(viewConfig => {
        viewConfig.showFullExtent = true;
        this.viewOptions = viewConfig;
      });
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

## Events

| 名称   | 属性                                                            | 描述                     |
| ------ | --------------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/source/GeoTIFF').default` - 地图元素  | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/source/GeoTIFF').default` - 地图元素  | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/source/GeoTIFF').default` - undefined | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
