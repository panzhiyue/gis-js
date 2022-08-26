---

title: Vue2olInteractionKeyboardpan

---

# Vue2olInteractionKeyboardpan

---

## Props

| 名称       | 描述                                                                                                                                                  | 类型    | 取值范围 | 默认值 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ------ |
| properties | 属性                                                                                                                                                  | object  | -        |        |
| options    | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object  | -        | {}     |
| parentMap  | 父地图                                                                                                                                                | object  | -        |        |
| active     | 是否激活                                                                                                                                              | boolean | -        |        |

## Events

| 名称  | 属性                                                                    | 描述                   |
| ----- | ----------------------------------------------------------------------- | ---------------------- |
| init  | **mapObject** `import('ol/interaction/KeyboardPan').default` - 地图元素 | 地图元素初始化完时触发 |
| ready | **mapObject** `import('ol/interaction/KeyboardPan').default` - 地图元素 | 地图元素初始化完时触发 |
