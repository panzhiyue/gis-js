import { Vue2olOverlay, findRealParent, TileImageSourceMixin, optionsMerger, bindListeners, getListeners, propsBinder, XYZSourceMixin, Vue2olSourceXyz } from '@gis-js/vue2ol';
import TileImage from 'ol/source/TileImage';
import TileGrid from 'ol/tilegrid/TileGrid';

//

/**
 * 鼠标移动提示信息控件
 * @since v1.0.0
 */
var script$6 = {
  name: 'Vue2olControlMousetips',
  inheritAttrs: false,
  components: {
    Vue2olOverlay,
  },
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },

    /**
     * 显示信息
     */
    message: {
      type: String,
    },
  },
  data() {
    return {
      parent: null,
      position: undefined,
    }
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
    this.parent.on('pointermove', this.onPointerMove);
  },
  destory() {
    this.parent.un('pointermove', this.onPointerMove);
  },
  methods: {
    onPointerMove(event) {
      this.position = this.parent.getCoordinateFromPixel([
        event.originalEvent.layerX,
        event.originalEvent.layerY,
      ]);
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue2ol-overlay',_vm._b({staticClass:"vue2ol-control-mousetips",attrs:{"position":_vm.position}},'vue2ol-overlay',_vm.$attrs,false),[_vm._v("\n  "+_vm._s(_vm.message)+"\n")])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-49f44fc0_0", { source: ".vue2ol-control-mousetips[data-v-49f44fc0]{background:#363636;background:rgba(0,0,0,.5);border:1px solid transparent;-webkit-border-radius:4px;border-radius:4px;color:#fff;font:12px/18px 'Helvetica Neue',Arial,Helvetica,sans-serif;margin-left:20px;margin-top:-15px;padding:4px 8px;position:absolute;visibility:inherit;white-space:nowrap;z-index:1000;min-height:20px}.vue2ol-control-mousetips[data-v-49f44fc0]:before{border-right:6px solid #000;border-right-color:rgba(0,0,0,.5);border-top:6px solid transparent;border-bottom:6px solid transparent;content:'';position:absolute;top:50%;margin-top:-6px;left:-7px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = "data-v-49f44fc0";
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

//
/**
 * 鼠标移动提示信息控件
 * @since v1.0.0
 */
var script$5 = {
  name: "Vue2olControlMouseinfo",
  inheritAttrs: false,
  components: {
    Vue2olControlMousetips: __vue_component__$6,
  },
  props: {
    /**
     * 字段模板
     */
    format: {
      type: String,
      default: "{x},{y},{z}",
    },
  },
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
    this.parent.on("pointermove", this.onPointerMove);
  },
  destory() {
    this.parent.un("pointermove", this.onPointerMove);
  },
  methods: {
    onPointerMove(event) {
      let position = this.parent.getCoordinateFromPixel([
        event.originalEvent.layerX,
        event.originalEvent.layerY,
      ]);
      this.message = this.format
        .replaceAll("{x}", position[0])
        .replaceAll("{y}", position[1])
        .replaceAll("{z}", this.parent.getView().getZoom());
    },
  },
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue2ol-control-mousetips',{staticClass:"vue2ol-control-mouseinfo",attrs:{"message":_vm.message}})};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-30fa6d52_0", { source: ".vue2ol-mousetips[data-v-30fa6d52]{background:#363636;background:rgba(0,0,0,.5);border:1px solid transparent;-webkit-border-radius:4px;border-radius:4px;color:#fff;font:12px/18px \"Helvetica Neue\",Arial,Helvetica,sans-serif;margin-left:20px;margin-top:-15px;padding:4px 8px;position:absolute;visibility:inherit;white-space:nowrap;z-index:1000;min-height:20px}.vue2ol-mousetips[data-v-30fa6d52]:before{border-right:6px solid #000;border-right-color:rgba(0,0,0,.5);border-top:6px solid transparent;border-bottom:6px solid transparent;content:\"\";position:absolute;top:50%;margin-top:-6px;left:-7px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-30fa6d52";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//

/**
 * 弹框
 * @since v1.0.0
 */
var script$4 = {
  name: "Vue2olControlPopup",
  inheritAttrs: false,
  components: {
    Vue2olOverlay
  },
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },
    /**
     * 弹框显示位置
     * @values "left"|"right"|"top"|"bottom"
     */
    direction: {
      type: String,
      default: "top",
    },
    /**
     * 弹框位置
     * @typeName {import('ol/coordinate').Coordinate}
     */
    position: {
      type: Array,
    },
    /**
     * 是否显示关闭按钮
     */
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      parent: null,
      visible: false,
    };
  },
  watch: {
    position() {
      this.visible = true;
    },
  },
  computed: {
    positioning() {
      if (this.direction == "top") {
        return "bottom-center";
      } else if (this.direction == "bottom") {
        return "top-center";
      } else if (this.direction == "left") {
        return "center-right";
      } else if (this.direction == "right") {
        return "center-left";
      }
    },
    offset() {
      if (this.direction == "top") {
        return [0, -10];
      } else if (this.direction == "bottom") {
        return [0, 10];
      } else if (this.direction == "left") {
        return [-10, 0];
      } else if (this.direction == "right") {
        return [10, 0];
      }
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
  },
  methods: {
    close() {
      this.visible = false;
    },
  },
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue2ol-overlay',_vm._b({directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"vue2ol-control-popup",class:['vue2ol-control-popup-' + _vm.direction],attrs:{"position":_vm.position,"positioning":_vm.positioning,"offset":_vm.offset}},'vue2ol-overlay',_vm.$attrs,false),[_c('div',{staticClass:"vue2ol-control-popup-content-wrapper"},[_c('div',{staticClass:"vue2ol-control-popup-content"},[_vm._t("default")],2)]),_vm._v(" "),_c('div',{staticClass:"vue2ol-control-popup-tip-container"},[_c('div',{staticClass:"vue2ol-control-popup-tip"})]),_vm._v(" "),(_vm.showClose)?_c('span',{staticClass:"vue2ol-control-popup-close-button",on:{"click":_vm.close}},[_vm._v("×")]):_vm._e()])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-39fcdc2f_0", { source: ".vue2ol-control-popup .vue2ol-control-popup-content-wrapper[data-v-39fcdc2f]{background:#fff;color:#333;box-shadow:0 3px 14px #000;padding:1px;text-align:left;border-radius:12px}.vue2ol-control-popup .vue2ol-control-popup-content-wrapper .vue2ol-control-popup-content[data-v-39fcdc2f]{margin:13px 19px;line-height:1.4;min-width:100px;min-height:20px}.vue2ol-control-popup .vue2ol-control-popup-tip-container[data-v-39fcdc2f]{width:40px;height:10px;position:absolute;left:50%;margin-left:-20px;overflow:hidden;pointer-events:none}.vue2ol-control-popup .vue2ol-control-popup-tip-container .vue2ol-control-popup-tip[data-v-39fcdc2f]{background:#fff;color:#333;width:17px;height:17px;padding:1px;margin:-10px auto 0;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.vue2ol-control-popup .vue2ol-control-popup-close-button[data-v-39fcdc2f]{position:absolute;top:0;right:0;padding:4px 4px 0 0;border:none;text-align:center;width:18px;height:14px;font:16px/14px Tahoma,Verdana,sans-serif;color:#c3c3c3;text-decoration:none;font-weight:700;background:0 0;cursor:pointer}.vue2ol-control-popup-bottom .vue2ol-control-popup-tip-container[data-v-39fcdc2f]{top:-10px}.vue2ol-control-popup-bottom .vue2ol-control-popup-tip-container .vue2ol-control-popup-tip[data-v-39fcdc2f]{margin-top:1px}.vue2ol-control-popup-left .vue2ol-control-popup-tip-container[data-v-39fcdc2f]{width:10px;height:40px;left:100%;top:50%;margin-left:0;margin-top:-20px}.vue2ol-control-popup-left .vue2ol-control-popup-tip-container .vue2ol-control-popup-tip[data-v-39fcdc2f]{margin-top:10px;margin-left:-10px}.vue2ol-control-popup-right .vue2ol-control-popup-tip-container[data-v-39fcdc2f]{width:10px;height:40px;left:-10px;top:50%;margin-left:0;margin-top:-20px}.vue2ol-control-popup-right .vue2ol-control-popup-tip-container .vue2ol-control-popup-tip[data-v-39fcdc2f]{margin-top:10px;margin-left:3px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-39fcdc2f";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

//
/**
 * 百度地图
 * @see https://blog.csdn.net/u013594477/article/details/83988055
 */
var script$3 = {
  name: "Vue2olSourceBaidu",
  mixins: [TileImageSourceMixin],
  data() {
    return {
      newUrl: "",
    };
  },
  props: {
    /**
     * 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion
     * @values "normal_map" | "satellite_map" | "satellite_annotion"
     *
     */
    layer: {
      type: String,
      default: "normal_map",
    },
    /**
     * 坐标系
     * @typeName {import('ol/proj').ProjectionLike}
     */
    projection: {
      type: [String, Object],
      default: "EPSG:3857",
    },
  },
  mounted() {
    if (this.layer == "normal_map") {
      this.newUrl = `http://online0.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1`;
    } else if (this.layer == "satellite_map") {
      this.newUrl = `http://shangetu0.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46`;
    } else if (this.layer == "satellite_annotion") {
      this.newUrl = `http://online0.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020`;
    }

    //分辨率
    var resolutions = [];
    for (var i = 0; i < 19; i++) {
      resolutions[i] = Math.pow(2, 18 - i);
    }

    var tileGrid = new TileGrid({
      origin: [0, 0],
      resolutions: resolutions,
    });
    let options = optionsMerger(
      {
        ...(this.tileImageSourceOptions || {}),
        tileGrid,
        projection: this.projection,
        tileUrlFunction: (tileCoord, pixelRatio, proj) => {
          if (!tileCoord) {
            return "";
          }
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;

          if (x < 0) {
            x = "M" + -x;
          }
          if (y < 0) {
            y = "M" + -y;
          }
          return this.newUrl
            .replace("{x}", x)
            .replace("{y}", y)
            .replace("{z}", z);
        },
      },
      this
    );

    //初始化view对象
    this.mapObject = new TileImage(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    this.parent.setSource(this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/source/TileImage').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$2 = {
  name: "vue2ol-source-bind",
  mixins: [XYZSourceMixin],
  components: {
    Vue2olSourceXyz,
  },
  data() {
    return {};
  },
  props: {
    
  },
  mounted() {},
  methods: {
    tileUrlFunction2(coord, params1, params2) {
      return this.getVETileUrl(
        "http://t0.dynamic.tiles.ditu.live.com/comp/ch/",
        coord[0],
        coord[1],
        coord[2] //5.1.3版本为 -coord[2] -1
      );
    },
    getVETileUrl(url, z, x, y) {
      for (var a = "", c = x, d = y, e = 0; e < z; e++) {
        a = ((c & 1) + 2 * (d & 1)).toString() + a;
        c >>= 1;
        d >>= 1;
      }
      return url + a + "?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=111&ur=CN";
    },
  },
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue2ol-source-xyz',{attrs:{"tileUrlFunction":_vm.tileUrlFunction2}})};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1 = {
  name: "vue2ol-source-gaode",
  mixins: [XYZSourceMixin],
  components: {
    Vue2olSourceXyz
  },
  data() {
    return {
      newUrl: "",
    };
  },
  props: {
    /**
     * 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion
     * @values "normal_map" | "satellite_map" | "satellite_annotion"
     *
     */
    layer: {
      type: String,
      default: "normal_map",
    },
  },
  mounted() {
    if (this.layer == "normal_map") {
      this.newUrl = `http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}`;
    } else if (this.layer == "satellite_map") {
      this.newUrl = `http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`;
    } else if (this.layer == "satellite_annotion") {
      this.newUrl = `http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}`;
    }
  },
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue2ol-source-xyz',{attrs:{"url":_vm.newUrl}})};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * 智图
 */
var script = {
  name: "Vue2olSourceGeoq",
  mixins: [XYZSourceMixin],
  components: {
    Vue2olSourceXyz
  },
  data() {
    return {
      newUrl: "",
    };
  },
  props: {
    /**
     * 矢量地图:normal_map,午夜蓝:normal_purplishblue,灰色:normal_gray,暖色:normal_warm,水系:theme_hydro
     * @values "normal_map" | "normal_purplishblue" | "normal_gray"|"normal_warm"|"theme_hydro"
     *
     */
    layer: {
      type: String,
      default: "normal_map",
    },
    /**
     * 坐标系
     * @typeName {import('ol/proj').ProjectionLike}
     */
    projection: {
      type: [String, Object],
      default: "EPSG:3857",
    },
  },
  mounted() {
    if (this.layer == "normal_map") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "normal_purplishblue") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "normal_gray") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "normal_warm") {
      this.newUrl = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}`;
    } else if (this.layer == "theme_hydro") {
      this.newUrl = `http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}`;
    }
   
  },
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue2ol-source-xyz',{attrs:{"url":_vm.newUrl}})};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//control

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Vue2olControlMouseinfo: __vue_component__$5,
  Vue2olControlMousetips: __vue_component__$6,
  Vue2olControlPopup: __vue_component__$4,
  Vue2olSourceBaidu: __vue_component__$3,
  Vue2olSourceBing: __vue_component__$2,
  Vue2olSourceGaoDe: __vue_component__$1,
  Vue2olSourceGeoQ: __vue_component__
});

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, (components)[key]);
  });
};

if (typeof window !== 'undefined' && (window).Vue) {
  install((window).Vue);
}

const API = {
  install
};

export { __vue_component__$5 as Vue2olControlMouseinfo, __vue_component__$6 as Vue2olControlMousetips, __vue_component__$4 as Vue2olControlPopup, __vue_component__$3 as Vue2olSourceBaidu, __vue_component__$2 as Vue2olSourceBing, __vue_component__$1 as Vue2olSourceGaoDe, __vue_component__ as Vue2olSourceGeoQ, API as default };
