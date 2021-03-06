---

title: Vue2olOverlay

---

# Vue2olOverlay

> ol/Overlay 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html)

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
    <vue2ol-overlay :position="center">
      I an Overlay
    </vue2ol-overlay>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      }
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
    <button @click="updatePosition">修改position</button>
    <button @click="updateOffset">修改offset</button>
    <button @click="updatePositioning">修改positioning</button>
    <button @click="updateProperties">修改properties</button>
    <button @click="print">打印</button>
  </div>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-overlay
      :position="position"
      :offset="offset"
      :positioning="positioning"
      :properties="properties"
      @ready="onReady"
    >
      I an Overlay
    </vue2ol-overlay>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      position: [120, 28],
      offset: [0, 0],
      positioning: "top-left",
      properties: {
        name: "testOverlaye1"
      },
      overlay: null
    };
  },
  methods: {
    onReady(mapObject) {
      this.overlay = mapObject;
    },
    print() {
      console.log(this.overlay);
    },
    updatePosition() {
      this.position = [120.1, 28];
    },
    updateOffset() {
      this.offset = [10, 10];
    },
    updatePositioning() {
      this.positioning = "bottom-right";
    },
    updateProperties() {
      this.properties = {
        name: "testOverlaye2"
      };
    }
  }
};
</script>
```

:::

## Props

| 名称        | 描述                                                                                                                                                  | 类型                                      | 取值范围                                                                                                                                         | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| properties  | 属性                                                                                                                                                  | object                                    | -                                                                                                                                                |        |
| options     | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object                                    | -                                                                                                                                                |        |
| parentMap   | 地图,如果为 null 则从 parent 中获取                                                                                                                   | {import('ol/Map').default}                | -                                                                                                                                                |        |
| offset      | 定位叠加层时使用的像素偏移量。数组中的第一个元素是水平偏移量。正值将覆盖向右移动。数组中的第二个元素是垂直偏移量。正值会使叠加层向下移动。            | {number[]}                                | -                                                                                                                                                |        |
| position    | 显示在地图上的位置                                                                                                                                    | {import('ol/coordinate').Coordinate}      | -                                                                                                                                                |        |
| positioning | 定义叠加层相对于其 position 属性的实际定位方式。                                                                                                      | {import('ol/OverlayPositioning').default} | `"bottom-left"\| "bottom-center"\| "bottom-right"\| "center-left"\| "center-center"\| "center-right"\| "top-left"\| "top-center"\| "top-right";` |        |

## Events

| 名称   | 属性                                                     | 描述                     |
| ------ | -------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/Overlay').default` - undefined | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/Overlay').default` - undefined | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/Overlay').default` - undefined | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default | default     |          |
