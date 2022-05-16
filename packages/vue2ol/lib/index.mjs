import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import Tile from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import Vector$1 from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';

var ObjectMixin = {
  data() {
    return {
      // mapObject: null, //对应的openlayers对象
      // ready: false, //是否加载完毕
      // parent: null, //openlayers父对象
      // parentContainer: null //父组件
    }
  },
  props: {
    /**
     * 对应openlayers对象的实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
     */
    options: {
      type: Object,
      default: () => ({})
    }
  }

};

/**
 * 绑定事件
 * @param {Object} mapObject 绑定事件的对象
 * @param {Object} listeners 事件键值对
 */
const bindListeners = (mapObject, listeners) => {
  for (let name in listeners) {
    mapObject.on(name, listeners[name]);
  }
};

/**
 * 字符串首字母大写
 * @param {String} string 输入字符串
 * @return {String}
 */
const capitalizeFirstLetter = (string) => {
  if (!string || typeof string.charAt !== 'function') {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * 绑定props对应的监听事件
 * @param {any} vueElement vue组件
 * @param {any} openlayersElement openlayers元素
 * @param {any} props vue的props数组
 */
const propsBinder = (vueElement, openlayersElement, props) => {
  for (const key in props) {
    const setMethodName = 'set' + capitalizeFirstLetter(key);
    // const deepValue =
    //   props[key].type === Object ||
    //   props[key].type === Array ||
    //   Array.isArray(props[key].type);
    const deepValue=false;
    if (props[key].custom && vueElement[setMethodName]) {
      vueElement.$watch(
        key,
        (newVal, oldVal) => {
          vueElement[setMethodName](newVal, oldVal);
        }, {
          deep: deepValue,
        }
      );
    } else if (openlayersElement[setMethodName]) {
      vueElement.$watch(
        key,
        (newVal, oldVal) => {
          openlayersElement[setMethodName](newVal);
        }, {
          deep: deepValue,
        }
      );
    }
  }
};


/**
 * 找到真实的父组件
 * 一直往上找，直到父对象有mapObject对象
 */
const findRealParent = (firstVueParent) => {
  let found = false;
  while (firstVueParent && !found) {
    if (firstVueParent.mapObject === undefined || firstVueParent.mapObject === null) {
      firstVueParent = firstVueParent.$parent;
    } else {
      found = true;
    }
  }
  return firstVueParent;
};


/**
 * 找到真实的地图组件
 * 一直往上找，直到父对象有mapObject对象并且是ol/Map
 */
const findParentMap = (firstVueParent) => {
  while (firstVueParent) {
    if (firstVueParent.mapObject !== undefined && firstVueParent.mapObject !== null && firstVueParent.mapObject instanceof Map) {
      return firstVueParent;
    } else {
      firstVueParent = firstVueParent.$parent;
    }
  }
};


/**
 * 为组件添加安装方法
 * @param {Object} Mod Vue组件
 * @return {Object}
 */
function install$1(Mod) {

  Mod.install = Vue => {
    return Vue.component(Mod.name, Mod)
  };
  return Mod
}




/**
 * 清理options中值为null与undefined的项
 * @param {Object} options 传入的对象
 * @return {Object} 删除null与undefined后的对象
 */
const collectionCleaner = (options) => {
  const result = {};
  for (const key in options) {
    const value = options[key];
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};


/**
 * 获取真实的options参数
 * 最终值为:props中与defaultProps中不同的项->options的其他项->props中与defaultProps中相同的项
 * @param {Object} props 手动构建的options
 * @param {Object} instance vue组件
 * @return {Object} 新的options参数对象
 */
const optionsMerger = (props, instance) => {
  //传入的options参数
  // console.log(instance.options);
  // console.log("instanceof Object:", instance.options instanceof Object);
  // console.log("typeof：" + typeof (instance.options));
  // const options =
  //   instance.options && instance.options.constructor === Object ?
  //   instance.options : {};
  const options =
    instance.options ?
    instance.options : {};
  const result = collectionCleaner(options);
  //手动构建的的options
  props = props && props.constructor === Object ? props : {};
  props = collectionCleaner(props);
  //组件中的props对象
  const defaultProps = instance.$options.props;

  //循环手动构建的options项
  for (const key in props) {
    //props中对应项的默认值
    const def = defaultProps[key] ?
      defaultProps[key].default &&
      typeof defaultProps[key].default === 'function' ?
      defaultProps[key].default.call() :
      defaultProps[key].default :
      Symbol('unique');
    //props与手动构建对象的值是否相同
    let isEqual = false;
    if (Array.isArray(def)) {
      isEqual = JSON.stringify(def) === JSON.stringify(props[key]);
    } else {
      isEqual = def === props[key];
    }
    //传入的options有值，并且props与传入options的值不相等
    if (result[key] && !isEqual) {
      console.warn(
        `${key} props is overriding the value passed in the options props`
      );
      result[key] = props[key];
    } else if (!result[key]) { //传入的options没有对应的值
      result[key] = props[key];
    }
  }
  return Object.assign({}, options, result);
};


const getListeners = (instance) => {
  if (instance.$listeners) {
    return instance.$listeners;
  } else {
    let listeners = {};
    for (let i in instance.$attrs) {
      if (i.startsWith("on") && instance.$attrs[i] instanceof Function) {
        let name = i.substring(2);
        name = name.substring(0, 1).toLowerCase() + name.substring(1);
        listeners[name] = instance.$attrs[i];
      }
    }
    return listeners;
  }
};


const getAttrs = (instance) => {
  if (instance.$listeners) {
    return instance.$attrs;
  } else {
    let attrs = Object.assign({}, instance.$attrs);
    for (let i in attrs) {
      if (i.startsWith("on") && instance.$attrs[i] instanceof Function) {
        delete attrs[i];
      }
    }
    return attrs;
  }
};

var BaseLayerMixin = {
  data() {
    return {
      mapObject: null, //对应的openlayers对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    }
  },
  mixins: [ObjectMixin],
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },

    /**
     * 图层名称
     */
    name: {
      type: String
    },

    /**
     * 图层渲染的边界范围。该层将不会在此范围之外渲染。
     * @type  {import('ol/extent').Extent}
     */
    extent: {
      type: Array,
    },

    /**
     * 图层可见的最大分辨率（不包括）。
     */
    maxResolution: {
      type: Number,
    },

    /**
     * 图层可见的最大缩放（不包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。
     */
    maxZoom: {
      type: Number,
    },

    /**
     * 图层可见的最小分辨率（包括）。
     */
    minResolution: {
      type: Number,
    },

    /**
     * 图层可见的最小缩放（包括）。请注意，图层可见性的缩放级别基于视图缩放级别，这可能与平铺源缩放级别不同。
     */
    minZoom: {
      type: Number,
    },

    /**
     * 图层的不透明度，允许值范围从 0 到 1。
     */
    opacity: {
      type: Number,
    },

    /**
     * 图层可见性
     */
    visible: {
      type: Boolean,
      default: true,
    },
    /**
     * 图层层级，值越大显示在上层
     */
    zIndex: {
      type: Number,
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
    this.baseLayerOptions = {
      extent: this.extent,
      maxResolution: this.maxResolution,
      maxZoom: this.maxZoom,
      minResolution: this.minResolution,
      minZoom: this.minZoom,
      opacity: this.opacity,
      visible: this.visible,
      zIndex: this.zIndex,
      name: this.name
    };
  },
  destroyed() {
    this.parent.removeLayer(this.mapObject);
    this.mapObject = null;
  },
};

var LayerMixin = {
  mixins: [BaseLayerMixin],
  mounted() {
    this.layerOptions = this.baseLayerOptions;
  }
};

var BaseTileLayerMixin = {
  mixins: [LayerMixin],
  props: {
    /**
     * 将预加载瓦片的数量。
     */
    preload: {
      type: Number,
    },

    /**
     * 错误时使用临时瓷砖。
     */
    useInterimTilesOnError: {
      type: Boolean,
    },
  },
  mounted() {
    this.baseTileLayerOptions = {
      ...(this.layerOptions || {}),
      preload: this.preload,
      useInterimTilesOnError: this.useInterimTilesOnError,
    };
  }
};

var BaseVectorLayerMixin = {
  mixins: [LayerMixin],
  props: {
    /**
     * 特征的样式。这可以是单个样式对象、样式数组或采用特征和分辨率并返回样式数组的函数。如果设置为null，则图层没有样式（null样式），因此只有具有自己样式的要素才会在图层中呈现。不带参数调用 setStyle()以重置为默认样式。
     * 因为style是保留属性，因此改名为styleObj
     * @typeName {import('ol/style/Style').StyleLike| null | undefined}
     */
    styleObj: {
      type: [Object, Function],
      custom:true
    },
  },
  mounted() {
    this.baseVectorLayerOptions = {
      ...(this.layerOptions || {}),
      styleObj: this.styleObj,
    };
  },
  methods: {
    setStyleObj(newVal, oldVal) {
      this.mapObject.setStyle(newVal);
    },
  }
};

var GeometryMixin = {
  data() {
    return {
      mapObject: null, //对应的openlayers对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    }
  },
  mixins: [ObjectMixin],
  props: {
    /**
     * 要素，如果为null则从parent中获取
     * @typeName {import('ol/Feature').default}
     */
    feature: {
      type: Object,
    },

    /**
     * 布局
     * @typeName {import('ol/geom/GeometryLayout').default}
     */
    opt_layout: {
      type: Object,
    },
  },
  mounted() {
    if (this.feature) {
      this.parent = this.feature;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
  },
  destroyed() {
    this.parent.setGeometry(null);
    this.mapObject = null;
  },
};

var SimpleGeometryMixin = {
  mixins: [GeometryMixin],
  mounted() {
  }
};

var SourceMixin = {
  data() {
    return {
      mapObject: null, //对应的openlayers对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    }
  },
  mixins: [ObjectMixin],
  props: {
    /**
     * 图层,如果为null则从parent中获取
     * @typeName {import('ol/layer/BaseLayer').default}
     */
    parentLayer: {
      type: Object,
    },

    /**
     * 属性
     * @typeName {import('ol/source/Source').AttributionLike|undefined}
     */
    attributes: {
      type: Object,
    },

    /**
     *
     */
    projection: {
      type: [String, Object]
    },
  },
  mounted() {
    if (this.parentLayer) {
      this.parent = this.parentLayer;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
    this.sourceOptions = {
      attributes: this.attributes,
      projection: this.projection
    };
  },
  destroyed() {
    this.parent.setSource(null);
    this.mapObject = null;
  },
};

var TileSourceMixin = {
  mixins: [SourceMixin],
  mounted() {
    this.tileSourceOptions = this.sourceOptions;
  }
};

var UrlTileSourceMixin = {
  mixins: [TileSourceMixin],
  props: {
    /**
     * @typeName {import('ol/Tile').LoadFunction|undefined}
     */
    tileLoadFunction: {
      type: Function,
    },

    url: {
      type: String,
    },

    /**
     * @typeName {string[]}
     */
    urls: {
      type: Array,
    },
  },
  mounted() {
    this.urlTileSourceOptions = {
      ...(this.tileSourceOptions || {}),
      tileLoadFunction: this.tileLoadFunction,
      url: this.url,
      urls: this.urls,
    };
  }
};

var TileImageSourceMixin = {
  mixins: [UrlTileSourceMixin],
  props: {
    /**
     * @typeName {import('ol/Tile').UrlFunction|undefined}
     */
    tileUrlFunction: {
      type: Function,
    },
  },
  mounted() {
    this.tileImageSourceOptions = {
      ...(this.urlTileSourceOptions || {}),
      tileUrlFunction: this.tileUrlFunction,
    };

  }
};

var XYZSourceMixin = {
  mixins: [TileImageSourceMixin],
  mounted() {
    this.xyzSourceOptions = this.tileImageSourceOptions;
  }
};

//
/**
 * ol/Map的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
 */
var script$g = {
  name: "Vue2olMap",
  inheritAttrs: false,
  data() {
    return {
      mapObject: null,
      ready: false, //是否加载完毕
      attrs: null,
    };
  },
  props: {
    /**
     * 地图的图层组
     * @typeName {import('ol/layer/Group').LayerGroup}
     */
    layerGroup: {
      type: Object,
    },

    /**
     * 图层数组。如果未定义，则将渲染没有图层的地图。请注意，图层是按照提供的顺序呈现的，因此，例如，如果您希望矢量图层出现在切片图层的顶部，则它必须位于切片图层之后。
     * @typeName {Array<import('ol/layer/Base').BaseLayer> | import('ol/Collection').Collection<import('ol/Base').BaseLayer>}
     */
    layers: {
      type: Array,
    },

    /**
     * 地图的大小
     * @typeName {import('ol/size').Size}
     */
    size: {
      type: Array,
    },

    /**
     * ol/Map 实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
     */
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  beforeMount() {
    this.attrs = getAttrs(this);
  },
  mounted() {
    let options = optionsMerger(
      {
        controls: [],
        layers: this.layers,
        target: this.$el,
      },
      this
    );
    //初始化view对象
    this.mapObject = new Map(options);
    this.layerGroup && this.mapObject.setLayerGroup(this.layerGroup);
    this.size && this.mapObject.setSize(this.size);
    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    this.$emit("init", this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {Object}
       * @property {import('ol/Map')} mapObject -
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.mapObject.dispose();
    this.mapObject = null;
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
const __vue_script__$g = script$g;

/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._b({staticClass:"vue2ol-map"},'div',_vm.attrs,false),[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$g = [];

  /* style */
  const __vue_inject_styles__$g = function (inject) {
    if (!inject) return
    inject("data-v-2f7c8e52_0", { source: ".vue2ol-map[data-v-2f7c8e52]{width:100%;height:100%;margin:0;padding:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$g = "data-v-2f7c8e52";
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    createInjector,
    undefined,
    undefined
  );

//
/**
 * ol/View的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
 */
var script$f = {
  name: "Vue2olView",
  data() {
    return {
      mapObject: null, //ol/source/XYZ对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    };
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
     * 地图中心点
     * @typeName {import('ol/coordinate').Coordinate}
     */
    center: {
      type: Array,
      // default: () => [0, 0],
    },

    /**
     * 如果为 true，则视图将始终在交互后动画到最接近的缩放级别；false 表示允许中间缩放级别
     */
    constrainResolution: {
      type: Boolean,
    },
    /**
     * 用于确定分辨率约束的最小缩放级别。它与maxZoom(or minResolution) 和zoomFactor一起使用。请注意，如果还提供了maxResolution，它的优先级高于minZoom.
     */
    minZoom: {
      type: Number,
      //default: 1,
    },

    /**
     * 用于确定分辨率约束的最大缩放级别。它与minZoom(or maxResolution) 和zoomFactor一起使用。请注意，如果还提供了minResolution，它的优先级高于maxZoom.
     */
    maxZoom: {
      type: Number,
      //default: 20,
    },

    /**
     * 视图的初始分辨率。单位是projection每像素的单位（例如，每像素米）。设置它的另一种方法是设置zoom。如果 this 也未定义，则不会获取层源zoom，但可以稍后使用#setZoom或#setResolution设置它们。
     */
    resolution: {
      type: Number,
    },

    /**
     * 视图的初始旋转以弧度为单位（顺时针正旋转，0 表示北）。
     */
    rotation: {
      type: Number,
    },

    /**
     * 仅在resolution未定义时使用。用于计算视图初始分辨率的缩放级别。
     */
    zoom: {
      type: Number,
      //default: 1,
    },

    //ol/View 实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    let options = optionsMerger(
      {
        center: this.center,
        constrainResolution: this.constrainResolution,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        resolution: this.resolution,
        rotation: this.rotation,
        zoom: this.zoom,
      },
      this
    );

    //初始化view对象
    this.mapObject = new View(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    this.parent.setView(this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/View').default} mapObject - openlayer瓦片图层
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.parent.setView(null);
    this.mapObject = null;
  },
};

/* script */
const __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$f = [];

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = "data-v-7ea40d44";
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/Overlay的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html
 */
var script$e = {
  name: "Vue2olOverlay",
  data() {
    return {
      mapObject: null, //ol/layer/Vector对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    };
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
     * 定位叠加层时使用的像素偏移量。数组中的第一个元素是水平偏移量。正值将覆盖向右移动。数组中的第二个元素是垂直偏移量。正值会使叠加层向下移动。
     * @typeName {number[]}
     */
    offset: {
      type: Array,
    },

    /**
     * 显示在地图上的位置
     * @typeName {import('ol/coordinate').Coordinate}
     */
    position: {
      type: Array,
    },

    /**
     * 定义叠加层相对于其position属性的实际定位方式。
     * @typeName {import('ol/OverlayPositioning').default}
     * @values "bottom-left"| "bottom-center"| "bottom-right"| "center-left"| "center-center"| "center-right"| "top-left"| "top-center"| "top-right";
     */
    positioning: {
      type: String,
    },

    /**
     * ol/Overlay 实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
     */
    options: {
      type: Object,
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    let options = optionsMerger(
      {
        element: this.$refs.element,
        positioning: this.positioning,
        position: this.position,
        offset: this.offset,
      },
      this
    );

    this.mapObject = new Overlay(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将overlayer层添加到map当中
    this.parent.addOverlay(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/Overlay').default} mapObject -
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.parent.removeOverlay(this.mapObject);
    this.mapObject = null;
  },
};

/* script */
const __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:'element',staticClass:"vue2ol-overlay"},[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$e = [];

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = "data-v-4f0b7d06";
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );

//

/**
 * ol/Feature的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html
 */
var script$d = {
  name: "Vue2olFeature",
  data() {
    return {
      mapObject: null, //ol/Feature对象
      ready: false, //是否加载完毕
      parent: null, //openlayers父对象
    };
  },
  props: {
    /**
     * @typeName {ol/layer/Vector').default}
     */
    parentLayer: {
      type: Object,
    },

    /**
     * 几何图形
     * @typeName {import('ol/geom/Geometry').default}
     */
    geometry: {
      type: Object,
    },

    /**
     * 要素几何图形的属性名称。调用[ol/Feature~Feature#getGeometry](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html#getGeometry)时，将返回具有该名称的属性的值。
     */
    geometryName: {
      type: String,
    },

    /**
     * feature的ID
     */
    id: {
      type: [Number, String],
    },

    /**
     * 特征的样式。
     * 因为style是保留属性，因此改名为styleObj
     * @typeName {import('ol/style/Style').StyleLike}
     */
    styleObj: {
      type: Object,
      custom: true,
    },

    /**
     * ol/Feature 实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
     */
    options: {
      type: Object,
    },
  },
  methods: {
    setStyleObj(value) {
      this.mapObject.setStyle(value);
    },
  },
  mounted() {
    if (this.parentLayer) {
      this.parent = this.parentLayer;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
    let options = optionsMerger(
      {
        geometry: this.geometry,
      },
      this
    );
    this.mapObject = new Feature(options);
    this.geometryName && this.mapObject.setGeometryName(this.geometryName);
    this.id && this.mapObject.setId(this.id);
    this.styleObj && this.mapObject.setStyle(this.styleObj);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.addFeature(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/Feature').default} mapObject -
       */
      this.$emit("ready", this.mapObject);
    });
  },
  destroyed() {
    this.parent.removeFeature(this.mapObject);
    console.log(1331);
    this.mapObject = null;
  },
};

/* script */
const __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$d = [];

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = "data-v-4ba54507";
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/geom/Point的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_Circle-Circle.html
 */
var script$c = {
  name: 'Vue2olGeomCircle',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 中心。
     * @typeName {import('ol/coordinate').Coordinate}
     */
    center: {
      require: true,
      type: Array,
    },

    /**
     * 半径。
     */
    radius: {
      type: Number,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new Circle(this.center, this.radius, this.opt_layout);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/Circle').default} mapObject -
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$c = [];

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = "data-v-1a657fac";
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/geom/LineString的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_LineString-LineString.html
 */
var script$b = {
  name: 'Vue2olGeomLinestring',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 线串的坐标。
     * @typeName {Array<import('ol/coordinate').Coordinate>}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new LineString(this.coordinates, this.opt_layout);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/LineString').default} mapObject -
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$b = [];

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = "data-v-0569edc0";
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$b = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

//

/**
 * ol/geom/MultiLineString的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiLineString-MultiLineString.html
 */
var script$a = {
  name: 'Vue2olGeomMultilinestring',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 坐标或 LineString 几何图形。
     * @typeName {Array<Array<import('ol/coordinate').Coordinate>|import('ol/geom/LineString').default>}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new MultiLineString(this.coordinates, this.opt_layout);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/MultiLineString').default} mapObject -
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$a = [];

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = "data-v-a178be9a";
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/geom/Point的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiPoint-MultiPoint.html
 */
var script$9 = {
  name: 'Vue2olGeomMultipoint',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 坐标。
     * @typeName {Array<import('ol/coordinate').Coordinate>}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new MultiPoint(this.coordinates, this.opt_layout);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/MultiPoint').default} mapObject -
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = "data-v-1f902fb6";
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/geom/MultiPolygon的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_MultiPolygon-MultiPolygon.html
 */
var script$8 = {
  name: 'Vue2olGeomMultipolygon',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 坐标。
     * @typeName {Array<Array<Array<import('ol/coordinate').Coordinate>>>}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new MultiPolygon(this.coordinates, this.opt_layout);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/MultiPolygon').default} mapObject -
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = "data-v-95225f3a";
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/geom/Point的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_Point-Point.html
 */
var script$7 = {
  name: 'Vue2olGeomPoint',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 坐标
     * @typeName {import('ol/coordinate').Coordinate}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new Point(this.coordinates, this.opt_layout);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/Point').default} mapObject -
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = "data-v-24832165";
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/geom/Polygon的vue组件
 * @since v1.0.0
 * @link https://openlayers.org/en/latest/apidoc/module-ol_geom_Polygon-Polygon.html
 */
var script$6 = {
  name: 'Vue2olGeomPolygon',
  mixins: [SimpleGeometryMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 坐标
     * @typeName {Array<Array<import('ol/coordinate').Coordinate>>}
     */
    coordinates: {
      require: true,
      type: Array,
    },
  },
  watch: {},
  mounted() {
    this.mapObject = new Polygon(this.coordinates, this.opt_layout);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);
    // 将feature层添加到layer当中
    this.parent.setGeometry(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/geom/Polygon').default} mapObject -
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = "data-v-c3a7adfe";
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

//

/**
 * ol/layer/Tile的vue组件
 * @since v1.0.0
 */
var script$5 = {
  name: 'Vue2olLayerTile',
  mixins: [BaseTileLayerMixin],
  data() {
    return {}
  },
  props: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.baseTileLayerOptions || {}),
      },
      this
    );
    this.mapObject = new Tile(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    this.parent.addLayer(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/layer/Tile').default} mapObject - openlayer瓦片图层
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = "data-v-d820da6a";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/layer/Vector的vue组件
 * @since v1.0.0
 */
var script$4 = {
  name: 'Vue2olLayerVector',
  mixins: [BaseVectorLayerMixin],
  data() {
    return {}
  },
  props: {},
  watch: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.baseVectorLayerOptions || {}),
      },
      this
    );

    options.style = options.styleObj;
    this.mapObject = new Vector(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    this.parent.addLayer(this.mapObject);
    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/layer/Vector').default} mapObject - openlayer瓦片图层
       */
      this.$emit('ready', this.mapObject);
    });
  },
  destroyed() {
    this.parent.removeLayer(this.mapObject);
    this.mapObject = null;
  },
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = "data-v-494b9793";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

//
/**
 * ol/source/OSM的vue组件
 * @since v1.0.0
 */
var script$3 = {
  name: 'Vue2olSourceOsm',
  mixins: [XYZSourceMixin],
  data() {
    return {}
  },
  props: {},
  methods: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.XYZSourceMixin || {}),
      },
      this
    );
    //初始化view对象
    this.mapObject = new OSM(options);

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
       * @property {import('ol/source/OSM').default} mapObject
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = "data-v-99d4a9b6";
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
/**
 * ol/source/Stamen的vue组件
 * @since v1.0.0
 */
var script$2 = {
  name: 'Vue2olSourceStamen',
  mixins: [XYZSourceMixin],
  data() {
    return {}
  },
  props: {
    /**
     * 图层名称
     * @values 'terrain'|'terrain-background'|'terrain-labels'|'terrain-lines'|'toner-background'|'toner'|'toner-hybrid'|'toner-labels'|'toner-lines'|'toner-lite'|'watercolor'
     */
    layer: {
      type: String,
      default: 'terrain',
    },
  },
  methods: {},
  mounted() {
    let options = optionsMerger(
      {
        ...(this.XYZSourceMixin || {}),
        layer: this.layer,
      },
      this
    );
    //初始化view对象
    this.mapObject = new Stamen(options);

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
       * @property {import('ol/source/Stamen').default} mapObject
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = "data-v-c01bc738";
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
/**
 * ol/source/Vector的vue组件
 * @since v1.0.0
 */
var script$1 = {
  name: "Vue2olSourceVector",
  mixins: [SourceMixin],
  data() {
    return {};
  },
  props: {
    /**
     * 新加载器。下一个渲染周期将使用新的加载器
     * @typeName {import('ol/featureloader').FeatureLoader}
     */
    loader: {
      type: Object,
    },

    /**
     * 新的 url。下一个渲染周期将使用新的 url。
     */
    url: {
      type: String,
    },
    /**
     * @typeName {Array<import('ol/Feature').default>}
     */
    features: {
      type: Array,
      custom: true,
    },
  },
  methods: {
    // setLayer(newLayer, oldLayer) {
    //   this.parent.setSource(null)
    //   if (newLayer) {
    //     this.parent = newLayer
    //   } else {
    //     this.parent = findRealParent(this.$parent).mapObject
    //   }
    //   this.parent.setSource(this.mapObject)
    // },
    setFeatures(newValue, oldValue) {
      this.mapObject.clear();
      this.mapObject.addFeatures(newValue);
    },
  },
  mounted() {
    let options = optionsMerger(
      {
        ...(this.sourceOptions || {}),
        attributes: this.attributes,
        loader: this.loader,
        url: this.url,
        features: this.features,
      },
      this
    );

    //初始化view对象
    this.mapObject = new Vector$1(options);

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
       * @property {import('ol/source/Vector').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = "data-v-609a2022";
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
 * ol/source/XYZ的vue组件
 * @since v1.0.0
 */
var script = {
  name: 'Vue2olSourceXyz',
  mixins: [XYZSourceMixin],
  data() {
    return {}
  },
  props: {},
  methods: {},
  mounted() {
    let options = optionsMerger(this.xyzSourceOptions, this);
    //初始化view对象
    this.mapObject = new XYZ(options);

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
       * @property {import('ol/source/XYZ').default} mapObject
       */
      this.$emit('ready', this.mapObject);
    });
  },
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.ready)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-8dd383c4";
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

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Vue2olMap: __vue_component__$g,
  Vue2olView: __vue_component__$f,
  Vue2olOverlay: __vue_component__$e,
  Vue2olFeature: __vue_component__$d,
  Vue2olGeomCircle: __vue_component__$c,
  Vue2olGeomLinestring: __vue_component__$b,
  Vue2olGeomMultilinestring: __vue_component__$a,
  Vue2olGeomMultipoint: __vue_component__$9,
  Vue2olGeomMultipolygon: __vue_component__$8,
  Vue2olGeomPoint: __vue_component__$7,
  Vue2olGeomPolygon: __vue_component__$6,
  Vue2olLayerTile: __vue_component__$5,
  Vue2olLayerVector: __vue_component__$4,
  Vue2olSourceOsm: __vue_component__$3,
  Vue2olSourceStamen: __vue_component__$2,
  Vue2olSourceVector: __vue_component__$1,
  Vue2olSourceXyz: __vue_component__
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

export { BaseLayerMixin, BaseTileLayerMixin, BaseVectorLayerMixin, GeometryMixin, LayerMixin, ObjectMixin, SimpleGeometryMixin, SourceMixin, TileImageSourceMixin, TileSourceMixin, UrlTileSourceMixin, __vue_component__$d as Vue2olFeature, __vue_component__$c as Vue2olGeomCircle, __vue_component__$b as Vue2olGeomLinestring, __vue_component__$a as Vue2olGeomMultilinestring, __vue_component__$9 as Vue2olGeomMultipoint, __vue_component__$8 as Vue2olGeomMultipolygon, __vue_component__$7 as Vue2olGeomPoint, __vue_component__$6 as Vue2olGeomPolygon, __vue_component__$5 as Vue2olLayerTile, __vue_component__$4 as Vue2olLayerVector, __vue_component__$g as Vue2olMap, __vue_component__$e as Vue2olOverlay, __vue_component__$3 as Vue2olSourceOsm, __vue_component__$2 as Vue2olSourceStamen, __vue_component__$1 as Vue2olSourceVector, __vue_component__ as Vue2olSourceXyz, __vue_component__$f as Vue2olView, XYZSourceMixin, bindListeners, capitalizeFirstLetter, collectionCleaner, API as default, findParentMap, findRealParent, getAttrs, getListeners, install$1 as install, optionsMerger, propsBinder };
