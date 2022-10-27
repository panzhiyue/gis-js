---

title: Vue2olSourceTileimage

---

# Vue2olSourceTileimage

> [ol/source/TileImage](https://openlayers.org/en/latest/apidoc/module-ol_source_TileImage-TileImage.html)的 vue 组件

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
      <vue2ol-source-tileimage
        :options="options"
        :tileUrlFunction="handleTileUrlFunction"
      >
      </vue2ol-source-tileimage>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 1, //级别
      center: [-10997148, 4569099], //中心点
      viewOptions: {
        projection: "EPSG:3857" //坐标系
      },
      options: {
        projection: "EPSG:3857"
      }
    };
  },
  mounted() {},
  methods: {
    handleTileUrlFunction(coor) {
      return `https://b.tile.openstreetmap.org/${coor[0]}/${coor[1]}/${coor[2]}.png`;
    }
  }
};
</script>
```

:::

## Props

| 名称             | 描述                                                                                                                                                  | 类型                                                    | 取值范围 | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ------ |
| properties       | 属性                                                                                                                                                  | object                                                  | -        |        |
| options          | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -        | {}     |
| parentLayer      | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -        |        |
| attributes       | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -        |        |
| projection       |                                                                                                                                                       | string\|object                                          | -        |        |
| tileLoadFunction |                                                                                                                                                       | {import('ol/Tile').LoadFunction\|undefined}             | -        |        |
| tileUrlFunction  |                                                                                                                                                       | {import('ol/Tile').UrlFunction\|undefined}              | -        |        |
| url              |                                                                                                                                                       | string                                                  | -        |        |
| urls             |                                                                                                                                                       | {string[]}                                              | -        |        |

## Events

| 名称   | 属性                                                              | 描述                     |
| ------ | ----------------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/source/TileImage').default` - 地图元素  | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/source/TileImage').default` - 地图元素  | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/source/TileImage').default` - undefined | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
