## 基础用法

::: demo
```vue
<template>
<vue2ol-map style="height:400px;" >
  <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
  </vue2ol-view>
  <vue2ol-layer-tile>
    <vue2ol-source-osm></vue2ol-source-osm>
  </vue2ol-layer-tile>
  <vue2ol-control-overviewmap></vue2ol-control-overviewmap>
</vue2ol-map>
</template>

<script>
export default{
  data(){
    return {
      zoom:10,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326",  //坐标系
      },
      radius:0.1,
    }
  }
}
</script>
```
:::

