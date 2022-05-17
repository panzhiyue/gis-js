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
  <vue2ol-overlay :position="center" >
  I an Overlay
  </vue2ol-overlay>
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
  <button @click="updatePosition">修改position</button>
  <button @click="updateOffset">修改offset</button>
  <button @click="updatePositioning">修改positioning</button>
  <button @click="updateProperties">修改properties</button>
  <button @click="print">打印</button>
</div>
<vue2ol-map style="height:400px;">
  <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
  </vue2ol-view>
  <vue2ol-layer-tile>
    <vue2ol-source-osm></vue2ol-source-osm>
  </vue2ol-layer-tile>
  <vue2ol-overlay  :position="position" :offset="offset" :positioning="positioning" :properties="properties" @ready="onReady"  >
  I an Overlay
  </vue2ol-overlay>
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
      },
      position:[120,28],
      offset:[0,0],
      positioning:'top-left',
      properties:{
        name:"testOverlaye1"
      },
      overlay:null
    }
  },
  methods:{
    onReady(mapObject){
      this.overlay=mapObject;
    },
    print(){
      console.log(this.overlay);
    },
    updatePosition(){
      this.position=[120.1,28];
    },
    updateOffset(){
      this.offset=[10,10];
    },
    updatePositioning(){
      this.positioning="bottom-right";
    },
    updateProperties(){
      this.properties={
        name:"testOverlaye2"
      }
    }
  }
}
</script>
```
:::
