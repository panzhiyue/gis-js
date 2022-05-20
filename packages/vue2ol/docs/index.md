<!-- ---
home: true
heroImage: /img/favicon.ico
heroText: vue2ol
tagline: openlayers的vue组件
actionText: 开始使用 →
actionLink: /guide/
features: # 可选的
  - title: 完整记录
    details: 我们所有的组件都有完整的文档记录并提供专门的示例
  - title: 简单至上
    details: 实现了最纯粹的openlayers功能，不做多余操作
  - title: 插件
    details: 提供了扩展插件相关的方法
footer: ISC Licensed
---
<span></span> -->


# @gis-js/vue2ol

@gis-js/vue2ol是一个用于vue框架的javascript库，它封装了openlayers,使创建响应式地图变得更容易

## 安装

```bash
npm install @gis-js/vue2ol ol --save
```

## 注册组件

**全局注册**

```javascript
import Vue from "vue"
import Vue2ol from "@gis-js/vue2ol"

Vue.use(Vue2ol)
```

**按需引入**

```javascript
import {Vue2olMap,Vue2olView,Vue2olFeature} from "@gis-js/vue2ol"
```



## 文档

[去这里](https://panzhiyue.github.io/gis-js/vue2ol/index.html)查看实时示例和文档
