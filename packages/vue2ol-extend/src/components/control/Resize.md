## 基础用法

::: demo

```vue
<template>
  <vue2ol-control-resize class="box"> </vue2ol-control-resize>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},
};
</script>
<style>
.box {
  height: 200px;
  width: 300px;
  background: #d9f7be;
}
</style>
```

:::

## 指定缩放方向

::: demo

```vue
<template>
  <div style="position: relative;box-sizing: border-box;padding:5px;">
    <div style="width:40%;box-sizing: border-box;display:inline-block;">
      <vue2ol-control-resize class="box" axis="v"> </vue2ol-control-resize>
    </div>
    <div
      style="width:40%;box-sizing: border-box;padding:5px;display:inline-block;"
    >
      <vue2ol-control-resize class="box" axis="h"> </vue2ol-control-resize>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},
};
</script>
<style>
.box {
  height: 200px;
  width: 300px;
  background: #d9f7be;
}
</style>
```

:::

## 辅助和动画

::: demo

```vue
<template>
  <vue2ol-control-resize class="box" helper animate> </vue2ol-control-resize>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},
};
</script>
<style>
.box {
  height: 200px;
  width: 300px;
  background: #d9f7be;
}
</style>
```

:::

## 最大值与最小值

::: demo

```vue
<template>
  <vue2ol-control-resize
    class="box"
    helper
    animate
    :min-width="100"
    :max-width="400"
    :min-height="100"
    :max-height="400"
  >
  </vue2ol-control-resize>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},
};
</script>
<style>
.box {
  height: 200px;
  width: 300px;
  background: #d9f7be;
}
</style>
```

:::
