---

title: Vue2olSourceVector

---

# Vue2olSourceVector

> ol/source/Vector 的 vue 组件

Since: v1.0.0

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector :zIndex="10">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      features: []
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      let feature = new Feature({
        geometry: new Point([120 + i * 0.01, 28 + i * 0.01])
      });
      this.features.push(feature);
    }
  }
};
</script>
```

:::

## Props

| 名称        | 描述                                                                                                                                                  | 类型                                                    | 取值范围 | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ------ |
| options     | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -        |        |
| parentLayer | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -        |        |
| attributes  | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -        |        |
| projection  |                                                                                                                                                       | string\|object                                          | -        |        |
| loader      | 新加载器。下一个渲染周期将使用新的加载器                                                                                                              | {import('ol/featureloader').FeatureLoader}              | -        |        |
| url         | 新的 url。下一个渲染周期将使用新的 url。                                                                                                              | string                                                  | -        |        |
| features    |                                                                                                                                                       | {Array<import('ol/Feature').default>}                   | -        |        |

## Events

| 名称  | 属性                                                           | 描述           |
| ----- | -------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('ol/source/Vector').default` - undefined | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
