---

title: vue2ol-control-popup

---

# vue2ol-control-popup

> 弹框

Since: v1.0.0

---

## 基础用法

::: demo
vue2ol/control/Popup/basic
:::

## Props

| 名称      | 描述                                                                           | 类型    | 取值范围                           | 默认值 |
| --------- | ------------------------------------------------------------------------------ | ------- | ---------------------------------- | ------ |
| parentMap | 地图,如果为 null 则从 parent 中获取<br/>`@typeName` {import('ol/Map').default} | object  | -                                  |        |
| direction | 弹框显示位置                                                                   | string  | `"left"\|"right"\|"top"\|"bottom"` | "top"  |
| position  | 弹框位置<br/>`@typeName` {import('ol/coordinate').Coordinate}                  | array   | -                                  |        |
| showClose | 是否显示关闭按钮                                                               | boolean | -                                  | true   |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
