---

title: Vue2olAnimationDynamicline

---

# Vue2olAnimationDynamicline

> utilsol/animation/DynamicLine 的 vue 组件

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
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-animation-dynamicline :coordinates="coordinates">
        </vue2ol-animation-dynamicline>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 4, //级别
      center: [37.41, 8.82], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      coordinates: [
        [37.41, 8.82],
        [37.41, 12.82],
        [46.41, 12.82],
        [42.41, 11.82],
        [41.41, 18.82]
      ]
    };
  },
  mounted() {}
};
</script>
```

:::

## Props

| 名称                | 描述                                  | 类型                                        | 取值范围 | 默认值    |
| ------------------- | ------------------------------------- | ------------------------------------------- | -------- | --------- |
| parentSource        | 数据源,如果为 null 则从 parent 中获取 | {import('ol/source/Vector').default}        | -        |           |
| coordinates         | 轨迹坐标                              | {Array<import('ol/coordinate').Coordinate>} | -        |           |
| outlineColor        | 外轨迹颜色                            | string                                      | -        | '#ff0000' |
| outlineWidth        | 外轨迹宽度                            | number                                      | -        | 8         |
| innerlineColor      | 内轨迹颜色                            | string                                      | -        | '#ffffff' |
| innerlineWidth      | 内轨迹宽度                            | number                                      | -        | 6         |
| innerlineDash       | 内轨迹虚线数组                        | array                                       | -        | [0, 12]   |
| innerlineDashOffset | 内轨迹虚线初始偏移                    | number                                      | -        | 0         |

## Events

| 名称  | 属性                                                                        | 描述           |
| ----- | --------------------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('utilsol/animation/DynamicLine').default` - undefined | 组件就绪时触发 |
