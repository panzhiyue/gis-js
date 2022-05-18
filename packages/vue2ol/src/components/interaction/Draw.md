## 基础用法

::: demo
```vue
<template>
<div>
  <select v-model="type" style="width:200px;">
    <option value=""></option>
    <option value="Point">点</option>
    <option value="LineString">线</option>
    <option value="Polygon">面</option>

  </select>
</div>
<vue2ol-map style="height:400px;">
  <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
  </vue2ol-view>
  <vue2ol-layer-tile>
    <vue2ol-source-osm></vue2ol-source-osm>
  </vue2ol-layer-tile>
  <vue2ol-layer-vector :zIndex="10">
    <vue2ol-source-vector >
        <vue2ol-interaction-draw v-if="type" :type="type" :active="true"></vue2ol-interaction-draw>
    </vue2ol-source-vector>
  </vue2ol-layer-vector>
</vue2ol-map>
</template>

<script>
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
export default{
  data(){
    return {
      zoom:10,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      features:[],
      type:"Point"
    }
  },
  mounted(){
  }
}
</script>
```
:::


