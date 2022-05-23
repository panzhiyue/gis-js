# 快速开始

## Hello Map!

vue2ol-extend 是vue2ol的扩展库。

封装了openlayers除基础模块之外的其他模块的vue组件

::: demo

``` vue 
<template>
    <vue2ol-map style="height:400px;">
        <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
        </vue2ol-view>
        <vue2ol-layer-tile>
            <vue2ol-source-osm></vue2ol-source-osm>
        </vue2ol-layer-tile>
        <vue2ol-control-mouseinfo></vue2ol-control-mouseinfo>
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





## 安装

### Npm

```sh
npm install ol @gis-js/vue2ol @gis-js/vue2ol-extend --save
```



### Yarn

```sh
yarn add ol @gis-js/vue2ol @gis-js/vue2ol-extend
```



### Pnpm

```sh
pnpm install ol @gis-js/vue2ol @gis-js/vue2ol-extend --save
```



## 用法

### 在 webpack / rollup 构建系统中

**全局安装**

```javascript
import Vue from 'vue'
import Vue2ol from "@gis-js/vue2ol"
import Vue2olExtend from "@gis-js/vue2ol-extend"

Vue.use(Vue2ol);
Vue.use(Vue2olExtend);
```

**组件内安装**

```vue
import {Vue2olControlMouseinfo} from "@gis-js/vue2ol-extend"
export default {
  name: 'MyAwesomeMap',
  components: {
	Vue2olControlMouseinfo
  },
};
```

