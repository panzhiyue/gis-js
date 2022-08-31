## 基础用法

::: demo
```vue
<template>
<vue2ol-map style="height:400px;">
  <vue2ol-view  :center="center" :options="{zoom:2,maxZoom:8,projection:'EPSG:3857'}">
  </vue2ol-view>
  <vue2ol-layer-tile>
    <vue2ol-source-osm></vue2ol-source-osm>
  </vue2ol-layer-tile>
  <vue2ol-layer-image>
    <vue2ol-source-imagewms :options="{
      url:'https://ahocevar.com/geoserver/wms',
      params:{
        'LAYERS': 'topp:states'
      },
       ratio: 1,
      serverType: 'geoserver',
    }">

    </vue2ol-source-imagewms>
  </vue2ol-layer-image>
</vue2ol-map>
</template>

<script>

export default{
  data(){
    return {
      center: [-10997148, 4569099],
    }
  }
}
</script>
```
:::
