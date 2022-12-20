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
  },
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
        "right-bottom",
      ],
    };
  },
};
</script>
<style scoped></style>
```

:::
