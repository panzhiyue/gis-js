---

title: Vue2olControlResize

---

# Vue2olControlResize

---

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

  mounted() {}
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

## Props

| 名称      | 描述                                         | 类型         | 取值范围 | 默认值   |
| --------- | -------------------------------------------- | ------------ | -------- | -------- |
| axis      | 限制拖拽方向可选: v 垂直、h 水平，默认不限制 | ''\|'v'\|'h' | `v`, `h` | ""       |
| disabled  | 是否禁用                                     | Boolean      | -        |          |
| animate   | 是否要动画, 建议在 helper 为 true 时开启     | Boolean      | -        |          |
| helper    | 显示临时辅助层                               | Boolean      | -        |          |
| minWidth  | 最小宽度                                     | Number       | -        | 0        |
| minHeight | 最小高度                                     | Number       | -        | 0        |
| maxWidth  | 最大宽度                                     | Number       | -        | Infinity |
| maxHeight | 最大高度                                     | Number       | -        | Infinity |

## Events

| 名称   | 属性                                      | 描述               |
| ------ | ----------------------------------------- | ------------------ |
| start  | **resize** `VueComponent` - MyResize 实例 | 开始拖拽时触发     |
| resize | **resize** `VueComponent` - MyResize 实例 | 正在改变尺寸时触发 |
| stop   | **resize** `VueComponent` - MyResize 实例 | 停止改变尺寸时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
| icon    |             |          |
