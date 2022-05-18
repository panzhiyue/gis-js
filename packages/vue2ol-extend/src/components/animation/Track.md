## 基础用法

::: demo
``` vue
<template>
    <vue2ol-map style="height:400px;">
        <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
        </vue2ol-view>
        <vue2ol-layer-tile>
            <vue2ol-source-osm></vue2ol-source-osm>
        </vue2ol-layer-tile>
        <vue2ol-layer-vector>
            <vue2ol-source-vector>
                <vue2ol-animation-track :coordinates="coordinates" >
                </vue2ol-animation-track>
            </vue2ol-source-vector>
        </vue2ol-layer-vector>
    </vue2ol-map>
</template>

<script>
export default{
  data(){
    return {
      zoom:4,  //级别
      center:[37.41, 8.82],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      show:true,
      coordinates:[[37.41, 8.82],[37.41, 12.82],[46.41, 12.82],[42.41, 11.82],[41.41, 18.82]]
    }
  },
  mounted(){
  }
}
</script>
```
:::
