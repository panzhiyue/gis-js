---

title: Vue2olView

---

# Vue2olView

> ol/View 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html)

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
    <button @click="updateCenter">修改center</button>
    <button @click="updateMaxZoom">修改maxZoom</button>
    <button @click="updateMinZoom">修改minZoom</button>
    <button @click="updateRotation">修改rotation</button>
    <button @click="updateZoom">修改zoom</button>
    <button @click="updateProperties">修改properties</button>
    <button @click="print">打印</button>
  </div>
  <vue2ol-map style="height:400px;">
    <vue2ol-view
      :center="center"
      :maxZoom="maxZoom"
      :minZoom="minZoom"
      :rotation="rotation"
      :properties="properties"
      :zoom="zoom"
      :options="viewOptions"
      @ready="onReady"
    >
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      center: [120, 28], //中心点
      maxZoom: 20,
      minZoom: 0,
      rotation: 0,
      zoom: 10, //级别
      properties: {
        name: "test1"
      },
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      view: null
    };
  },
  methods: {
    onReady(mapObject) {
      this.view = mapObject;
    },
    print() {
      console.log(this.view);
    },
    updateCenter() {
      this.center = [121, 28];
    },
    updateMaxZoom() {
      this.maxZoom = 12;
    },
    updateMinZoom() {
      console.log(222);
      this.minZoom = 11;
    },
    updateRotation() {
      this.rotation = 2;
    },
    updateZoom() {
      this.zoom = 13;
    },
    updateProperties() {
      this.properties = {
        name: "test2"
      };
    }
  }
};
</script>
```

:::

## Props

| 名称                | 描述                                                                                                                                                                                           | 类型                                 | 取值范围 | 默认值 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ------ |
| properties          | 属性                                                                                                                                                                                           | object                               | -        |        |
| options             | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值                                          | object                               | -        | {}     |
| parentMap           | 地图,如果为 null 则从 parent 中获取                                                                                                                                                            | {import('ol/Map').default}           | -        |        |
| center              | 地图中心点                                                                                                                                                                                     | {import('ol/coordinate').Coordinate} | -        |        |
| constrainResolution | 如果为 true，则视图将始终在交互后动画到最接近的缩放级别；false 表示允许中间缩放级别                                                                                                            | boolean                              | -        |        |
| maxZoom             | 用于确定分辨率约束的最大缩放级别。它与 minZoom(or maxResolution) 和 zoomFactor 一起使用。请注意，如果还提供了 minResolution，它的优先级高于 maxZoom.                                           | number                               | -        |        |
| minZoom             | 用于确定分辨率约束的最小缩放级别。它与 maxZoom(or minResolution) 和 zoomFactor 一起使用。请注意，如果还提供了 maxResolution，它的优先级高于 minZoom.                                           | number                               | -        |        |
| resolution          | 视图的初始分辨率。单位是 projection 每像素的单位（例如，每像素米）。设置它的另一种方法是设置 zoom。如果 this 也未定义，则不会获取层源 zoom，但可以稍后使用#setZoom 或#setResolution 设置它们。 | number                               | -        |        |
| rotation            | 视图的初始旋转以弧度为单位（顺时针正旋转，0 表示北）。                                                                                                                                         | number                               | -        |        |
| zoom                | 仅在 resolution 未定义时使用。用于计算视图初始分辨率的缩放级别。                                                                                                                               | number                               | -        |        |

## Events

| 名称   | 属性                                                           | 描述                     |
| ------ | -------------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/View').default` - openlayer 瓦片图层 | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/Overlay').default` - undefined       | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/View').default` - openlayer 瓦片图层 | 组件就绪时触发           |
