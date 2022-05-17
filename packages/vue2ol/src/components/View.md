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
  <button @click="updateCenter">修改center</button>
  <button @click="updateMaxZoom">修改maxZoom</button>
  <button @click="updateMinZoom">修改minZoom</button>
  <button @click="updateRotation">修改rotation</button>
  <button @click="updateZoom">修改zoom</button>
  <button @click="updateProperties">修改properties</button>
  <button @click="print">打印</button>
</div>
<vue2ol-map style="height:400px;">
  <vue2ol-view  :center="center" :maxZoom="maxZoom" :minZoom="minZoom" :rotation="rotation" :properties="properties"   :zoom="zoom"  :options="viewOptions" @ready="onReady">
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
      center:[120,28],  //中心点
      maxZoom:20,
      minZoom:0,
      rotation:0,
      zoom:10,  //级别
      properties:{
        name:"test1"
      },
      viewOptions:{
        projection:"EPSG:4326"  //坐标系
      },
      view:null
    }
  },
  methods:{
    onReady(mapObject){
      this.view = mapObject;
    },
    print(){
      console.log(this.view);
    },
    updateCenter(){
      this.center=[121,28];
    },
    updateMaxZoom(){
      this.maxZoom=12;
    },
    updateMinZoom(){
      console.log(222);
      this.minZoom=11;
    },
    updateRotation(){
      this.rotation=2;
    },
    updateZoom(){
      this.zoom=13;
    },
    updateProperties(){
      this.properties={
        name:"test2"
      };
    }
  }
}
</script>
```
:::