---

title: Vue2olSourceImagecanvas

---

# Vue2olSourceImagecanvas

> ol/source/ImageCanvas

Since: v1.0.0

---

## Props

| 名称        | 描述                                                                                                                                                  | 类型                                                    | 取值范围 | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ------ |
| properties  | 属性                                                                                                                                                  | object                                                  | -        |        |
| options     | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                  | -        | {}     |
| parentLayer | 图层,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/layer/BaseLayer').default}                  | -        |        |
| attributes  | 属性                                                                                                                                                  | {import('ol/source/Source').AttributionLike\|undefined} | -        |        |
| projection  |                                                                                                                                                       | string\|object                                          | -        |        |

## Events

| 名称   | 属性                                                               | 描述                     |
| ------ | ------------------------------------------------------------------ | ------------------------ |
| init   | **mapObject** `import('ol/source/ImageCanvas').default` - 地图元素 | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/source/ImageCanvas').default` - 地图元素 | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/source/ImageCanvas').default` - 地图元素 | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
