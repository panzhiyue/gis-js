// import Vue from "vue"

import "ol/ol.css"

// (window)['global'] = window;
// import Vue2OL from "@gis-js/vue2ol"
// Vue.use(Vue2OL);

// import Vue2olExtend from "@gis-js/vue2ol-extend"
// Vue.use(Vue2olExtend);

/**
 * to主题使用者：你可以去掉本文件的所有代码
 */
export default async ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // 用于监控在路由变化时检查广告拦截器 (to主题使用者：你可以去掉本文件的所有代码)
  if (!isServer) {
    (window)['global'] = window;

    await import('@gis-js/vue2ol' /* webpackChunkName: "notification" */).then((module) => {
      Vue.use(module.default)
    })
    await import('@gis-js/vue2ol-extend' /* webpackChunkName: "notification" */).then((module) => {
      Vue.use(module.default)
    })
  }
}