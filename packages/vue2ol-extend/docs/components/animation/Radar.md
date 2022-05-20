---

title: Vue2olAnimationRadar

---

# Vue2olAnimationRadar

> utilsol/animation/Radar 的 vue 组件

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
        <vue2ol-animation-radar :center="center" :radius="radius">
        </vue2ol-animation-radar>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      radius: 1
    };
  },
  mounted() {}
};
</script>
```

:::

## Props

| 名称         | 描述                                  | 类型                                 | 取值范围 | 默认值 |
| ------------ | ------------------------------------- | ------------------------------------ | -------- | ------ |
| parentSource | 数据源,如果为 null 则从 parent 中获取 | {import('ol/source/Vector').default} | -        |        |
| center       | 中心点                                | {import('ol/coordinate').Coordinate} | -        |        |
| radius       | 半径,单位为矢量数据单位               | number                               | -        |        |
| startAngle   | 起始角度                              | number                               | -        |        |
| arcAngle     | 弧角度                                | number                               | -        |        |
| period       | 动画周期,单位 s                       | number                               | -        | 10     |
| loop         | 动画循环                              | boolean                              | -        | true   |
| centerStyle  | 中心点样式                            | func\|object\|array                  | -        |        |
| circleStyle  | 圆样式                                | func\|object\|array                  | -        |        |
| arcStyle     | 弧样式                                | func\|object\|array                  | -        |        |

## Events

| 名称  | 属性                                                                  | 描述           |
| ----- | --------------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('utilsol/animation/Radar').default` - undefined | 组件就绪时触发 |
