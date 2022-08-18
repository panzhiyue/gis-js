
/**
 * 绑定事件
 * @param {Object} mapObject 绑定事件的对象
 * @param {Object} listeners 事件键值对
 */
export const bindListeners = (mapObject, listeners) => {
  for (let name in listeners) {
    mapObject.on(name, listeners[name]);
  }
}

/**
 * 字符串首字母大写
 * @param {String} string 输入字符串
 * @return {String}
 */
export const capitalizeFirstLetter = (string) => {
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
export const propsBinder = (vueElement, openlayersElement, props) => {
  for (const key in props) {
    const setMethodName = 'set' + capitalizeFirstLetter(key);
    // const deepValue =
    //   props[key].type === Object ||
    //   props[key].type === Array ||
    //   Array.isArray(props[key].type);
    const deepValue = false;
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
export const findRealParent = (firstVueParent) => {
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
export const findParentMap = (firstVueParent) => {
  while (firstVueParent) {
    if (firstVueParent.mapObject !== undefined && firstVueParent.mapObject !== null && firstVueParent.name=="vue2ol-map") {
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
export function install(Mod) {

  Mod.install = Vue => {
    return Vue.component(Mod.name, Mod)
  }
  return Mod
}




/**
 * 清理options中值为null与undefined的项
 * @param {Object} options 传入的对象
 * @return {Object} 删除null与undefined后的对象
 */
export const collectionCleaner = (options) => {
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
export const optionsMerger = (props, instance) => {
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


export const getListeners = (instance) => {
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
}


export const getAttrs = (instance) => {
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
}