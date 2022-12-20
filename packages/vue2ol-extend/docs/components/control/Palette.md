---

title: Vue2olControlPalette

---

# Vue2olControlPalette

> 调色板

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:600px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>

    <vue2ol-control-palette @change="change"></vue2ol-control-palette>
    <vue2ol-renderer-canvasfilter
      :options="model"
    ></vue2ol-renderer-canvasfilter>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      model: {}
    };
  },
  methods: {
    change(val) {
      this.model = val;
    }
  }
};
</script>
<style>
.vue2ol-control-panel {
  z-index: 1000;
}
</style>
```

:::

## Props

| 名称  | 描述 | 类型   | 取值范围 | 默认值 |
| ----- | ---- | ------ | -------- | ------ |
| value |      | object | -        |        |

## Events

| 名称   | 属性 | 描述 |
| ------ | ---- | ---- |
| change |      |
