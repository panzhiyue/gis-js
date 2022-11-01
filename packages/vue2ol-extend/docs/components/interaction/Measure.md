---

title: Vue2olInteractionMeasure

---

# Vue2olInteractionMeasure

> 量算

---

## 基础用法

::: demo

```vue
<template>
  <select v-model="active" style="width:200px;">
    <option value="1">激活</option>
    <option value="0">取消</option>
  </select>
  <select v-model="type">
    <option value="LineString">LineString</option>
    <option value="Polygon">Polygon</option>
  </select>
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="img"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="cva"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-interaction-measure
      :type="type"
      :active="active == '1'"
    ></vue2ol-interaction-measure>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      type: "LineString",
      active: "0"
    };
  },
  watch: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  position: relative;
}
</style>
```

:::

## Props

| 名称       | 描述                                                                                                                                                  | 类型    | 取值范围 | 默认值 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ------ |
| properties | 属性                                                                                                                                                  | object  | -        |        |
| options    | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object  | -        | {}     |
| parentMap  | 父地图                                                                                                                                                | object  | -        |        |
| active     | 是否激活                                                                                                                                              | boolean | -        |        |
| type       |                                                                                                                                                       | string  | -        |        |

## Events

| 名称   | 属性                             | 描述                   |
| ------ | -------------------------------- | ---------------------- |
| init   | **mapObject** `mixed` - 地图元素 | 地图元素初始化完时触发 |
| append | **mapObject** `mixed` - 地图元素 | 地图元素初始化完时触发 |
| ready  | **mapObject** `mixed` - 地图元素 | 地图元素初始化完时触发 |
