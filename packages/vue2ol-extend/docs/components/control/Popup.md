---

title: Vue2olControlPopup

---

# Vue2olControlPopup

> 弹框

Since: v1.0.0

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height: 400px" @click="onMapClick" @ready="onMapReady">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile :name="'osm'">
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-control-popup :position="position" direction="top">
      <div>I'm a bullet box</div>
    </vue2ol-control-popup>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      position: null
    };
  },
  methods: {
    onMapClick(event) {
      let pixel = this.map.getEventPixel(event.originalEvent);
      this.position = this.map.getCoordinateFromPixel(pixel);
    },
    onMapReady(map) {
      this.map = map;
    }
  }
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  position: relative;
}
</style>
```

:::

## Props

| 名称      | 描述                                | 类型                                 | 取值范围                           | 默认值 |
| --------- | ----------------------------------- | ------------------------------------ | ---------------------------------- | ------ |
| parentMap | 地图,如果为 null 则从 parent 中获取 | {import('ol/Map').default}           | -                                  |        |
| direction | 弹框显示位置                        | string                               | `"left"\|"right"\|"top"\|"bottom"` | "top"  |
| position  | 弹框位置                            | {import('ol/coordinate').Coordinate} | -                                  |        |
| showClose | 是否显示关闭按钮                    | boolean                              | -                                  | true   |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
