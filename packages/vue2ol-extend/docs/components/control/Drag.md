---

title: Vue2olControlDrag

---

# Vue2olControlDrag

> 元素拖拽组件

---

## 基础用法

::: demo

```vue
<template>
  <div class="wrapper1">
    <vue2ol-control-drag class="demo"> </vue2ol-control-drag>
  </div>
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
.wrapper1 {
  height: 200px;
}
.wrapper1 .demo {
  width: 80px;
  height: 80px;
  padding: 0;
  background: red;
}
</style>
```

:::

## 指定拖拽句柄

::: demo

```vue
<template>
  <div class="wrapper2">
    <vue2ol-control-drag class="demo" handle=".header">
      <div class="header">header</div>
      <div class="content">内容内容</div>
    </vue2ol-control-drag>
  </div>
</template>

<script></script>
<style>
.wrapper2 {
  height: 200px;
}
.wrapper2 .demo {
  width: 80px;
  height: 80px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.wrapper2 .header {
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.wrapper2 .content {
  height: 50px;
}
</style>
```

:::

## 限制拖拽方向

::: demo

```vue
<template>
  <div class="wrapper3">
    <vue2ol-control-drag class="demo" axis="h">
      <div class="header">header</div>
      <div class="content">水平方向</div>
    </vue2ol-control-drag>

    <vue2ol-control-drag class="demo" axis="v">
      <div class="header">header</div>
      <div class="content">垂直方向</div>
    </vue2ol-control-drag>
  </div>
</template>

<script></script>
<style>
.wrapper3 {
  height: 200px;
}
.wrapper3 .demo {
  width: 80px;
  height: 80px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.wrapper3 .header {
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.wrapper3 .content {
  height: 50px;
}
</style>
```

:::

## 限制范围

::: demo

```vue
<template>
  <div class="wrapper4" id="target">
    <vue2ol-control-drag class="demo" target="#target">
      <div class="header">header</div>
      <div class="content">内容内容</div>
    </vue2ol-control-drag>
  </div>
</template>

<script></script>
<style>
.wrapper4 {
  height: 200px;
  border: 2px solid #0c5cb3;
}
.wrapper4 .demo {
  width: 80px;
  height: 80px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.wrapper4 .header {
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.wrapper4 .content {
  height: 50px;
}
</style>
```

:::

## 克隆与复原

::: demo

```vue
<template>
  <div class="wrapper5" id="target">
    <vue2ol-control-drag class="demo" clone revert cloneClass="demo">
      <div class="header">header</div>
      <div class="content">克隆自己</div>
    </vue2ol-control-drag>
  </div>
</template>

<script></script>
<style>
.wrapper5 {
  height: 200px;
  border: 2px solid #0c5cb3;
}
.wrapper5 .demo {
  width: 80px;
  height: 80px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.wrapper5 .header {
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.wrapper5 .content {
  height: 50px;
}
</style>
```

:::

## Props

| 名称       | 描述                                               | 类型                          | 取值范围 | 默认值                               |
| ---------- | -------------------------------------------------- | ----------------------------- | -------- | ------------------------------------ |
| handle     | 拖拽句柄元素，不设置就是自身                       | String\|HTMLElement\|Function | -        |                                      |
| axis       | 限制拖拽方向可选: v 垂直、h 水平，默认不限制       | String                        | `v`, `h` | ""                                   |
| delay      | 延时开始拖拽                                       | Number                        | -        | 100                                  |
| range      | 限制拖拽范围, 默认不限制                           | Object\|Function              | -        |                                      |
| target     | 在目标元素范围内                                   | String\|HTMLElement\|Function | -        |                                      |
| clone      | 是否克隆拖拽                                       | Boolean\|Function             | -        |                                      |
| revert     | 拖拽放置后动画返回原来位置，clone 为 true 时才有效 | Boolean                       | -        |                                      |
| group      | 分组名称， 与 my-drop 配合使用                     | String                        | -        |                                      |
| disabled   | 是否禁用拖拽                                       | Boolean                       | -        |                                      |
| data       | 附加数据                                           | String\|Number\|Object\|Array | -        |                                      |
| cloneClass | 克隆元素添加 className                             | String                        | -        |                                      |
| origin     | 相对坐标原点, 默认自动获取                         | String\|HTMLElement\|Function | -        | function() {<br/> return null;<br/>} |
| appendBody | 克隆元素是否追加到 body                            | Boolean                       | -        |                                      |

## Events

| 名称  | 属性                                | 描述           |
| ----- | ----------------------------------- | -------------- |
| start | **vm** `VueComponent` - MyDrag 实例 | 开始拖拽时触发 |
| drag  | **vm** `VueComponent` - MyDrag 实例 | 拖拽中触发     |
| stop  | **vm** `VueComponent` - MyDrag 实例 | 结束拖拽时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
