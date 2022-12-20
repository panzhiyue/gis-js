## 基础用法

::: demo

```vue
<template>
  <div style="height:400px;">
    <vue2ol-control-panel
      title="标题文本"
      placement="center-center"
      width="300px"
      height="200px"
      >画板占位内容
    </vue2ol-control-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
```

:::

## 可关闭

::: demo

```vue
<template>
  <div style="height:400px;">
    <vue2ol-control-panel
      title="标题文本"
      placement="center-center"
      width="300px"
      height="200px"
      closable
      :visible.sync="visible"
      >画板占位内容
    </vue2ol-control-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
};
</script>
```

:::

## 拖拽与 Resize

::: demo

```vue
<template>
  <div style="height:400px;">
    <vue2ol-control-panel
      title="标题文本"
      placement="center-center"
      width="300px"
      height="200px"
      draggable
      resizable
      >画板占位内容
    </vue2ol-control-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
};
</script>
```

:::

## 定义工具栏

::: demo

```vue
<template>
  <div style="height:400px;">
    <vue2ol-control-panel
      title="标题文本"
      placement="center-center"
      width="300px"
      height="200px"
    >
      <template #toolbar>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </template>
      画板占位内容
    </vue2ol-control-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
};
</script>
```

:::
