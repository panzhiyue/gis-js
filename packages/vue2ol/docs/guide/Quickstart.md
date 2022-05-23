# 快速开始

## Hello Map!

[@gis-js/vue2ol](https://www.npmjs.com/package/@gis-js/vue2ol-extend)为[Openlayers](https://openlayers.org/)提供了[vue](https://cn.vuejs.org/index.html)映射组件，允许以简单地声明式映射构造。

::: demo

``` vue 
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





## 安装

### Npm

```sh
npm install ol @gis-js/vue2ol --save
```



### Yarn

```sh
yarn add ol @gis-js/vue2ol
```



### Pnpm

```sh
pnpm install ol @gis-js/vue2ol --save
```



## 用法

### 在 webpack / rollup 构建系统中

**全局安装**

```javascript
import Vue from 'vue'
import Vue2ol from "@gis-js/vue2ol"

Vue.use(Vue2ol);
```

**组件内安装**

```vue
import {Vue2olMap,Vue2olLayerVector,Vue2olSourceVector} from "@gis-js/vue2ol"
export default {
  name: 'MyAwesomeMap',
  components: {
    Vue2olMap,
    Vue2olLayerVector,
    Vue2olSourceVector,
  },
};
```

