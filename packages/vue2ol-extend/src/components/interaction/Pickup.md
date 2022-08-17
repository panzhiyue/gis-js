## 基础用法

::: demo
```vue
<template>
<input v-model="geom" style="width:500px;"  />
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="img"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="cva"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-interaction-pickup :geom.sync="geom"></vue2ol-interaction-pickup>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      geom:'POINT(120 30)'
    };
  },
  watch: {
  },
  mounted(){

  }
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  position: relative;
}
</style>
```
:::



## 修改样式

::: demo
```vue
<template>
<input v-model="geom" style="width:500px;"  />
  <vue2ol-map style="height: 400px">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="img"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt layer="cva"></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-interaction-pickup :geom.sync="geom" :style-obj="styleObj"></vue2ol-interaction-pickup>
  </vue2ol-map>
</template>

<script>
import {Style,Circle,Stroke,Fill,Icon} from "ol/style"
export default {
  data() {
    return {
      zoom: 6, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      geom:'POINT(120 30)',
      styleObj:null
    };
  },
  watch: {
  },
  mounted(){
    this.styleObj=new Style({
      image: new Icon({
        anchor: [0.5, 1],
        scale: 1,
        src: "../../img/marker.png"
      })
    })
  }
};
</script>
<style lang="less" scoped>
.vue2ol-map {
  position: relative;
}
</style>
```
:::

