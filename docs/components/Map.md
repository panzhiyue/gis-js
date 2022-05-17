---

title: Vue2olMap

---

# Vue2olMap

> ol/Map 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html)

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
    <button @click="updateLayers">修改layers</button>
    <button @click="updateSize">修改size</button>
  </div>
  <vue2ol-map style="height:400px;" :layers="layers" :size="size">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
  </vue2ol-map>
</template>

<script>
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      layers: null,
      size: null
    };
  },
  mounted() {
    this.layers = [
      new TileLayer({
        source: new OSM()
      })
    ];
  },
  methods: {
    updateLayers() {
      this.layers = [
        new TileLayer({
          source: new Stamen({
            layer: "terrain-background"
          })
        })
      ];
    },
    updateSize() {
      this.size = [300, 300];
    }
  }
};
</script>
```

:::

## 绑定事件

::: demo

```vue
<template>
  <div>
    <button @click="updateLayers">修改layers</button>
    <button @click="updateSize">修改size</button>
  </div>
  <vue2ol-map
    style="height:400px;"
    :layers="layers"
    :size="size"
    @change="onChange"
    @change:size="onChangeSize"
    @click="onClick"
    @dblclick="onDblclick"
  >
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
  </vue2ol-map>
</template>

<script>
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      layers: null,
      size: null
    };
  },
  mounted() {
    this.layers = [
      new TileLayer({
        source: new OSM()
      })
    ];
  },
  methods: {
    updateLayers() {
      this.layers = [
        new TileLayer({
          source: new Stamen({
            layer: "terrain-background"
          })
        })
      ];
    },
    updateSize() {
      this.size = [300, 300];
    },
    onChange() {
      console.log("change", arguments);
    },
    onChangeSize() {
      console.log("change:size", arguments);
    },
    onClick() {
      console.log("click", arguments);
    },
    onDblclick() {
      console.log("dblclick", arguments);
    }
  }
};
</script>
```

:::

## Props

| 名称       | 描述                                                                                                                                                             | 类型                                                                                                          | 取值范围 | 默认值 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| properties | 属性                                                                                                                                                             | object                                                                                                        | -        |        |
| options    | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值            | object                                                                                                        | -        |        |
| layerGroup | 地图的图层组                                                                                                                                                     | {import('ol/layer/Group').LayerGroup}                                                                         | -        |        |
| layers     | 图层数组。如果未定义，则将渲染没有图层的地图。请注意，图层是按照提供的顺序呈现的，因此，例如，如果您希望矢量图层出现在切片图层的顶部，则它必须位于切片图层之后。 | {Array<import('ol/layer/Base').BaseLayer> \| import('ol/Collection').Collection<import('ol/Base').BaseLayer>} | -        |        |
| size       | 地图的大小                                                                                                                                                       | {import('ol/size').Size}                                                                                      | -        |        |
| view       |                                                                                                                                                                  | {import('ol/View').default}                                                                                   | -        |        |

## Events

| 名称  | 属性                                         | 描述           |
| ----- | -------------------------------------------- | -------------- |
| init  |                                              |
| ready | **mapObject** `import('ol/Map')` - undefined | 组件就绪时触发 |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default | default     |          |
