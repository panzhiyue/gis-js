---

title: Vue2olGeomMultipolygon

---

# Vue2olGeomMultipolygon

> ol/geom/MultiPolygon 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiPolygon-MultiPolygon.html)

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-multipolygon :coordinates="coordinates">
          </vue2ol-geom-multipolygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      coordinates: [
        [
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28]
          ]
        ],
        [
          [
            [123, 28],
            [124, 28],
            [124, 27],
            [123, 27],
            [123, 28]
          ]
        ]
      ]
    };
  }
};
</script>
```

:::

## 监听属性

::: demo

```vue
<template>
  <div>
    <button @click="updateCoordinates">修改Coordinates</button>
  </div>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-multipolygon :coordinates="coordinates">
          </vue2ol-geom-multipolygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      coordinates: [
        [
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28]
          ]
        ],
        [
          [
            [123, 28],
            [124, 28],
            [124, 27],
            [123, 27],
            [123, 28]
          ]
        ]
      ]
    };
  },
  methods: {
    updateCoordinates() {
      this.coordinates = [
        [
          [
            [120.1, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120.1, 28]
          ]
        ],
        [
          [
            [123.1, 28],
            [124, 28],
            [124, 27],
            [123, 27],
            [123.1, 28]
          ]
        ]
      ];
    }
  }
};
</script>
```

:::

## Props

| 名称        | 描述                                                                                                                                                  | 类型                                                      | 取值范围 | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- | ------ |
| properties  | 属性                                                                                                                                                  | object                                                    | -        |        |
| options     | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                                    | -        |        |
| feature     | 要素，如果为 null 则从 parent 中获取                                                                                                                  | {import('ol/Feature').default}                            | -        |        |
| opt_layout  | 布局                                                                                                                                                  | {import('ol/geom/GeometryLayout').default}                | -        |        |
| coordinates | 坐标。                                                                                                                                                | {Array<Array<Array<import('ol/coordinate').Coordinate>>>} | -        |        |

## Events

| 名称   | 属性                                                              | 描述                     |
| ------ | ----------------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/geom/MultiPoint').default` - 地图元素   | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/geom/MultiPoint').default` - 地图元素   | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/geom/MultiPolygon').default` - 地图元素 | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
