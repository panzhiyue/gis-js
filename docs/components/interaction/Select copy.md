---

title: Vue2olInteractionSelect

---

# Vue2olInteractionSelect

---

## Props

| 名称         | 描述     | 类型    | 取值范围 | 默认值 |
| ------------ | -------- | ------- | -------- | ------ |
| properties   | 属性     | object  | -        |        |
| parentMap    | 父地图   | object  | -        |        |
| parentLayers | 图层集合 | object  | -        |        |
| active       | 是否激活 | boolean | -        |        |
| hitTolerance |          | number  | -        |        |

## Events

| 名称  | 属性                                                               | 描述                   |
| ----- | ------------------------------------------------------------------ | ---------------------- |
| init  | **mapObject** `import('ol/interaction/Select').default` - 地图元素 | 地图元素初始化完时触发 |
| ready | **mapObject** `import('ol/interaction/Select').default` - 地图元素 | 地图元素初始化完时触发 |
