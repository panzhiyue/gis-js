---

title: Vue2olSourceImagestatic

---

# Vue2olSourceImagestatic

> ol/source/ImageStatic

Since: v1.0.0

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view
      :center="center"
      :options="{ zoom: 2, maxZoom: 8, projection: projection }"
    >
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-image>
      <vue2ol-source-imagestatic
        :options="{
          url: url,
          imageExtent: extent,
          projection: projection
        }"
      >
      </vue2ol-source-imagestatic>
    </vue2ol-layer-image>
  </vue2ol-map>
</template>

<script>
import { getCenter } from "ol/extent";
import Projection from "ol/proj/Projection";
const extent = [0, 0, 1024, 968];
export default {
  data() {
    return {
      url: "https://imgs.xkcd.com/comics/online_communities.png",
      zoom: 2,
      projection: new Projection({
        code: "xkcd-image",
        units: "pixels",
        extent: extent
      }),
      center: getCenter(extent),
      extent
    };
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

| 名称   | 属性                                                               | 描述                     |
| ------ | ------------------------------------------------------------------ | ------------------------ |
| init   | **mapObject** `import('ol/source/ImageStatic').default` - 地图元素 | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/source/ImageStatic').default` - 地图元素 | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/source/ImageStatic').default` - 地图元素 | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
