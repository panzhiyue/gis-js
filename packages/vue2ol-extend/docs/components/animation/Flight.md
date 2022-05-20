---

title: Vue2olAnimationFlight

---

# Vue2olAnimationFlight

> utilsol/animation/Flight 的 vue 组件

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
        <vue2ol-animation-flight
          :from="flightOptions.from"
          :to="flightOptions.to"
          :radius="flightOptions.radius"
          :angle="flightOptions.angle"
          :space="flightOptions.space"
        >
        </vue2ol-animation-flight>
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
      show: true,
      flightOptions: {
        from: [120, 27.5],
        to: [120, 28.5],
        radius: 0.5,
        angle: -120,
        space: 0.01
      }
    };
  },
  mounted() {}
};
</script>
```

:::

## Props

| 名称                | 描述                                                         | 类型                                 | 取值范围 | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------------------------------------ | -------- | ------ |
| parentSource        | 数据源,如果为 null 则从 parent 中获取                        | {import('ol/source/Vector').default} | -        |        |
| from                | 起点坐标                                                     | {import('ol/coordinate').Coordinate} | -        |        |
| to                  | 终点坐标                                                     | {import('ol/coordinate').Coordinate} | -        |        |
| radius              | 曲线半径度数, 默认为 0,直线                                  | number                               | -        |        |
| angle               | 曲线角度，radius 与 angle 结合可定义曲线的形状               | number                               | -        |        |
| loop                | 动画循环                                                     | boolean                              | -        | true   |
| space               | 分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快 | number                               | -        |        |
| smooth              | 平滑度，越小线越平滑                                         | number                               | -        |        |
| endArrow            | 终点箭头                                                     | object\|boolean\|func                | -        | true   |
| animationArrow      | 动画箭头                                                     | object\|boolean\|func                | -        | true   |
| lineStyle           | 固定航线线样式                                               | func\|array                          | -        |        |
| lineAnimationStyle  | 动画线样式                                                   | func\|array                          | -        |        |
| pointAnimationStyle | 动画点样式                                                   | func\|array                          | -        |        |

## Events

| 名称  | 属性                                                                   | 描述           |
| ----- | ---------------------------------------------------------------------- | -------------- |
| ready | **mapObject** `import('utilsol/animation/Flight').default` - undefined | 组件就绪时触发 |
