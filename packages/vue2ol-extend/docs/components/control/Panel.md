---

title: Vue2olControlPanel

---

# Vue2olControlPanel

> 面板组件

---

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
  }
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
      visible: true
    };
  }
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
      visible: true
    };
  }
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
      visible: true
    };
  }
};
</script>
```

:::

## Props

| 名称        | 描述                                        | 类型                      | 取值范围                  | 默认值 |
| ----------- | ------------------------------------------- | ------------------------- | ------------------------- | ------ |
| width       | 宽度                                        | string                    | -                         |        |
| height      | 高度                                        | string                    | -                         |        |
| draggable   | 拖拽配置，参考 Vue2olControlDrag 组件       | boolean\|object           | -                         |        |
| resizable   | resize 配置,参考 Vue2olControlResize 组件   | boolean\|object           | -                         |        |
| title       | 标题文本，可以用插槽定义                    | string                    | -                         |        |
| closable    | 是否显示关闭按钮,visible 需要加 sync 才有效 | boolean                   | -                         |        |
| visible     | 是否可见                                    | boolean                   | -                         | true   |
| footerAlign | 底部对齐方式                                | 'left'\|'right'\|'center' | `left`, `right`, `center` |        |

## Events

| 名称           | 属性 | 描述             |
| -------------- | ---- | ---------------- |
| update:visible |      |
| close          |      | 点击关闭按钮触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| title   |             |          |
| toolbar |             |          |
| default |             |          |
| footer  |             |          |
| append  |             |          |
