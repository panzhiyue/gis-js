## ImageArcGISRest

::: demo
```vue
<template>
<vue2ol-map style="height:400px;">
  <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
  </vue2ol-view>
  <vue2ol-layer-tile>
    <vue2ol-source-osm></vue2ol-source-osm>
  </vue2ol-layer-tile>
  <vue2ol-layer-image>
    <vue2ol-source-imagearcgisrest :url="url" >

    </vue2ol-source-imagearcgisrest>
  </vue2ol-layer-image>
</vue2ol-map>
</template>

<script>
export default{
  data(){
    return {
      zoom:4,  //级别
      center:[-10997148, 4569099],  //中心点
      viewOptions:{
        projection:"EPSG:3857"  //坐标系
      },
      url:'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer'
    }
  }
}
</script>
```
:::
