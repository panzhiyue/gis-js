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
export default{
  data(){
    return {
      zoom:6,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      coordinates:[[[[120,28],[121,28],[121,27],[120,27],[120,28]]],[[[123,28],[124,28],[124,27],[123,27],[123,28]]]]
    }
  }
}
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
export default{
  data(){
    return {
      zoom:6,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      coordinates:[[[[120,28],[121,28],[121,27],[120,27],[120,28]]],[[[123,28],[124,28],[124,27],[123,27],[123,28]]]]
    }
  },
  methods:{
    updateCoordinates(){
      this.coordinates=[[[[120.1,28],[121,28],[121,27],[120,27],[120.1,28]]],[[[123.1,28],[124,28],[124,27],[123,27],[123.1,28]]]]
    }
  }
}
</script>

```
:::
