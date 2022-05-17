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
    </vue2ol-map>
</template>

<script>
export default{
  data(){
    return {
      zoom:10,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      }
    }
  }
}
</script>
```
:::


## 监听属性

::: demo
```vue
<template>
  <div>
    <button @click="updateLayers">修改layers</button>
    <button @click="updateSize">修改size</button>
  </div>
  <vue2ol-map style="height:400px;" :layers="layers" :size="size">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
  </vue2ol-map>
</template>

<script>
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import Stamen from "ol/source/Stamen"
export default{
  data(){
    return {
      zoom:10,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      layers:null,
      size:null
    }
  },
  mounted(){
    this.layers=[new TileLayer({
      source:new OSM()
    })]
  },
  methods:{
    updateLayers(){
      this.layers=[new TileLayer({
        source:new Stamen({
          layer:'terrain-background'
        })
      })];
    },
    updateSize(){
      this.size=[300,300];
    }
  }
}
</script>
```
:::


## 绑定事件

::: demo
```vue
<template>
  <div>
    <button @click="updateLayers">修改layers</button>
    <button @click="updateSize">修改size</button>
  </div>
  <vue2ol-map style="height:400px;" :layers="layers" :size="size" @change="onChange" @change:size="onChangeSize" @click="onClick" @dblclick="onDblclick">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
  </vue2ol-map>
</template>

<script>
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import Stamen from "ol/source/Stamen"
export default{
  data(){
    return {
      zoom:10,  //级别
      center:[120,28],  //中心点
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      layers:null,
      size:null
    }
  },
  mounted(){
    this.layers=[new TileLayer({
      source:new OSM()
    })]
  },
  methods:{
    updateLayers(){
      this.layers=[new TileLayer({
        source:new Stamen({
          layer:'terrain-background'
        })
      })];
    },
    updateSize(){
      this.size=[300,300];
    },
    onChange(){
      console.log("change",arguments);
    },
    onChangeSize(){
      console.log("change:size",arguments);
    },
    onClick(){
      console.log("click",arguments);
    },
    onDblclick(){
      console.log("dblclick",arguments);
    }
  }
}
</script>
```
:::