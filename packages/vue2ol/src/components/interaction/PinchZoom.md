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
  <vue2ol-interaction-pinchzoom  :active="active=='1'"></vue2ol-interaction-pinchzoom>
</vue2ol-map>
</template>

<script>
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
export default{
  data(){
    return {
      zoom:10,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      mapOptions:{
        interactions:[]
      },
      active:"0"
    }
  },
  mounted(){
  }
}
</script>
```
:::


