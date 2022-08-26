---

title: Vue2olInteractionDraganddrop

---

# Vue2olInteractionDraganddrop

---

## 基础用法

::: demo

```vue
<template>
  <div>
    <select v-model="active" style="width:200px;">
      <option value="1">激活</option>
      <option value="0">取消</option>
    </select>
  </div>
  <vue2ol-map style="height:400px;" :options="mapOptions">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draganddrop
          v-if="options"
          :active="active == '1'"
          :options="options"
          @addfeatures="handleAddFeatures"
        ></vue2ol-interaction-draganddrop>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon";
import GeoJSON from "ol/format/GeoJSON";
export default {
  data() {
    return {
      zoom: 3, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      mapOptions: {
        interactions: []
      },
      active: "0",
      options: null
    };
  },
  mounted() {
    this.options = {
      formatConstructors: [GeoJSON],
      projection: "EPSG:4326",
      target: this.$el
    };
  },
  methods: {
    handleAddFeatures(a) {
      console.log(a);
    }
  }
};
</script>
```

:::

## Props

| 名称         | 描述                                                                                                                                                  | 类型    | 取值范围 | 默认值 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ------ |
| properties   | 属性                                                                                                                                                  | object  | -        |        |
| options      | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值 | object  | -        | {}     |
| parentMap    | 父地图                                                                                                                                                | object  | -        |        |
| active       | 是否激活                                                                                                                                              | boolean | -        |        |
| parentSource | 数据源                                                                                                                                                | object  | -        |        |

## Events

| 名称  | 属性                                                                    | 描述                   |
| ----- | ----------------------------------------------------------------------- | ---------------------- |
| init  | **mapObject** `import('ol/interaction/DragAndDrop').default` - 地图元素 | 地图元素初始化完时触发 |
| ready | **mapObject** `import('ol/interaction/DragAndDrop').default` - 地图元素 | 地图元素初始化完时触发 |
