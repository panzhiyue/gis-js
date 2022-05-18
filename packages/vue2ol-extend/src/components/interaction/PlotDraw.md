## 基础用法

::: demo
```vue
<template>
<div>
  <select v-model="type" style="width:200px;">
    <option value="arc">弧线</option>
    <option value="assaultdirection">直箭头</option>
    <option value="attackarrow">进攻箭头</option>
    <option value="circle">圆</option>
    <option value="closedcurve">曲线面</option>
    <option value="curve">曲线</option>
    <option value="diamond">菱形</option>
    <option value="doublearrow">钳击双箭头</option>
    <option value="ellipse">椭圆</option>
    <option value="finearrow">细直箭头</option>
    <option value="freehandline">自由线</option>
    <option value="freehandpolygon">自由面</option>
    <option value="gatheringplace">聚集地</option>
    <option value="lune">弓形</option>
    <option value="point">点</option>
    <option value="polyline">折线</option>
    <option value="polygon">多边形</option>
    <option value="rectangle">矩形</option>
    <option value="sector">扇形面</option>
    <option value="squadcombat">斜箭头</option>
    <option value="straightarrow">直线箭头</option>
    <option value="tailedattackarrow">燕尾进攻箭头</option>
    <option value="tailedsquadcombat">燕尾斜箭头</option>
    <option value="triangle">三角形</option>
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
        <vue2ol-interaction-plotdraw :type="type"></vue2ol-interaction-plotdraw>
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
      type:"arc"
    }
  },
  mounted(){
  }
}
</script>
```
:::


## 样式

::: demo
```vue
<template>
<div>
  <select v-model="type" style="width:200px;">
    <option value="arc">弧线</option>
    <option value="assaultdirection">直箭头</option>
    <option value="attackarrow">进攻箭头</option>
    <option value="circle">圆</option>
    <option value="closedcurve">曲线面</option>
    <option value="curve">曲线</option>
    <option value="diamond">菱形</option>
    <option value="doublearrow">钳击双箭头</option>
    <option value="ellipse">椭圆</option>
    <option value="finearrow">细直箭头</option>
    <option value="freehandline">自由线</option>
    <option value="freehandpolygon">自由面</option>
    <option value="gatheringplace">聚集地</option>
    <option value="lune">弓形</option>
    <option value="point">点</option>
    <option value="polyline">折线</option>
    <option value="polygon">多边形</option>
    <option value="rectangle">矩形</option>
    <option value="sector">扇形面</option>
    <option value="squadcombat">斜箭头</option>
    <option value="straightarrow">直线箭头</option>
    <option value="tailedattackarrow">燕尾进攻箭头</option>
    <option value="tailedsquadcombat">燕尾斜箭头</option>
    <option value="triangle">三角形</option>
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
        <vue2ol-interaction-plotdraw :type="type" :style-obj="style"></vue2ol-interaction-plotdraw>
    </vue2ol-source-vector>
  </vue2ol-layer-vector>
</vue2ol-map>
</template>

<script>
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {Style,Fill,Stroke} from "ol/style"
export default{
  data(){
    return {
      zoom:10,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      type:"arc",
      style:null
    }
  },
  mounted(){
    this.style=new Style({
      stroke:new Stroke({
        color:"#ff0000"
      }),
      fill:new Fill({
        color:"rgba(255,0,0,0.4)",
      })
    })
    
  }
}
</script>
```
:::
