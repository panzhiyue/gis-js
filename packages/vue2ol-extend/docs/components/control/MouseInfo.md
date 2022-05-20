---

title: Vue2olControlMouseinfo

---

# Vue2olControlMouseinfo

> 鼠标移动提示信息控件

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
    <vue2ol-control-mouseinfo> </vue2ol-control-mouseinfo>
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
      }
    };
  }
};
</script>
```

:::

## Props

| 名称   | 描述     | 类型   | 取值范围 | 默认值        |
| ------ | -------- | ------ | -------- | ------------- |
| format | 字段模板 | string | -        | "{x},{y},{z}" |
