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
  <vue2ol-layer-image>
    <vue2ol-source-imagemapguide :options="options" >

    </vue2ol-source-imagemapguide>
  </vue2ol-layer-image>
</vue2ol-map>
</template>

<script>
export default{
  data(){
    return {
      zoom:12,  //级别
      center:[-87.7302542509315, 43.744459064634],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      options:{
        projection: 'EPSG:4326',
        url: 'https://mikenunn.net/mapguide/mapagent/mapagent.fcgi?',
        useOverlay: false,
        metersPerUnit: 111319.4908, //value returned from mapguide
        params: {
          MAPDEFINITION: 'Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition',
          FORMAT: 'PNG',
          VERSION: '3.0.0',
          USERNAME: 'OLGuest',
          PASSWORD: 'olguest',
        },
        ratio: 2,
      }
    }
  }
}
</script>
```
:::
