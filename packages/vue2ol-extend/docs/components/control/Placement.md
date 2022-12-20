---

title: Vue2olControlPlacement

---

# Vue2olControlPlacement

> 定位日期

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-control-placement>
      <div>内容</div>
    </vue2ol-control-placement>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped></style>
```

:::

## 指定位置

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-control-placement
      v-for="item in placements"
      :key="item"
      :placement="item"
    >
      <div>{{ item }}</div>
    </vue2ol-control-placement>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      placements: [
        "left-top",
        "center-top",
        "right-top",
        "left-center",
        "center-center",
        "right-center",
        "left-bottom",
        "center-bottom",
        "right-bottom"
      ]
    };
  }
};
</script>
<style scoped></style>
```

:::

## Props

| 名称      | 描述                                                                                                                                                | 类型          | 取值范围                                                                                                                              | 默认值        |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| placement | 停泊位置，可选值'left-top', 'center-top', 'right-top'，'left-center', 'center-center', 'right-center''left-bottom', 'center-bottom', 'right-bottom' | String        | `left-top`, `center-top`, `right-top`, `left-center`, `center-center`, `right-center`, `left-bottom`, `center-bottom`, `right-bottom` | "left-bottom" |
| zIndex    | 层级                                                                                                                                                | number        | -                                                                                                                                     | 1             |
| margin    | 外边距                                                                                                                                              | array\|number | -                                                                                                                                     | 10            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
