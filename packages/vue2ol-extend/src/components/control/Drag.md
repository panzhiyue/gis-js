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

  mounted() {},
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
    <vue2ol-control-drag class="demo" clone revert  cloneClass="demo">
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
