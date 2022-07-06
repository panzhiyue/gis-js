# @gis-js/vue2ol-extend

[@gis-js/vue2ol-extend](https://www.npmjs.com/package/@gis-js/vue2ol-extend) 是[@gis-js/vue2ol](https://www.npmjs.com/package/@gis-js/vue2ol)的扩展库。

封装了[openlayers](https://openlayers.org/)除基础模块之外的其他模块的[vue](https://cn.vuejs.org/index.html)组件


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

``` javascript
import {Vue2olControlMouseinfo} from "@gis-js/vue2ol-extend"
export default {
  name: 'MyAwesomeMap',
  components: {
	Vue2olControlMouseinfo
  },
};
```

## 文档

[去这里](https://panzhiyue.github.io/gis-js/vue2ol-extend/index.html)查看实时示例和文档

## 常见问题
1.在vite中
```
npm install @originjs/vite-plugin-commonjs --save-dev
```

```
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default {
    plugins: [
        viteCommonjs()
    ]
}
```

## 计划
1.解决CanvasClip在缩放浏览器时与部分电脑错乱的问题

