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
      <vue2ol-interaction-draganddrop v-if="options"  :active="active=='1'" :options="options" @addfeatures="handleAddFeatures"></vue2ol-interaction-draganddrop>
    </vue2ol-source-vector>
  </vue2ol-layer-vector>
</vue2ol-map>
</template>

<script>
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import GeoJSON from "ol/format/GeoJSON"
export default{
  data(){
    return {
      zoom:3,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      mapOptions:{
        interactions:[]
      },
      active:"0",
      options:null
    }
  },
  mounted(){
     this.options={
        formatConstructors:[GeoJSON],
        projection:"EPSG:4326",
        target:this.$el
      }
  },
  methods:{
    handleAddFeatures(a){
      console.log(a);
    }
  }
}
</script>
```
:::


