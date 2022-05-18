
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
                <vue2ol-animation-flight :from="flightOptions.from" :to="flightOptions.to" :radius="flightOptions.radius" :angle="flightOptions.angle" :space="flightOptions.space" >
                </vue2ol-animation-flight>
            </vue2ol-source-vector>
        </vue2ol-layer-vector>
    </vue2ol-map>
</template>

<script>
export default{
  data(){
    return {
      zoom:8,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      show:true,
      flightOptions:{
          from:[120, 27.5],
          to:[120, 28.5],
          radius:0.5,
          angle:-120,
          space:0.01,
      }
    }
  },
  mounted(){
  }
}
</script>
```
:::
