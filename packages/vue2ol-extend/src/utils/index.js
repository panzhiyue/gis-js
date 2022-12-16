import * as typhoonUtil from "./typhoon.js";
import * as domUtil from "./dom.js";

export { typhoonUtil, domUtil };

// requestAnimationFrame 适配函数
const raFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

/**
 * 动画延时函数
 * @function
 * @param {function} callback 动画回调函数
 * @return {number} id 标识
 *
 * @example
 *
 * import {requestAnimationFrame} from '$ui/utils/util'
 * requestAnimationFrame(() => {
 *   // do sth ....
 *
 * })
 */
export const requestAnimationFrame = raFrame;

/**
 * 清除动画延时
 * @function
 * @param {number} id 标识
 *
 * @example
 *
 * import {requestAnimationFrame, cancelAnimationFrame} from '$ui/utils/util'
 * const id = requestAnimationFrame(()= > {
 *   // do sth
 * })
 * cancelAnimationFrame(id)
 */
export const cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  function(id) {
    window.clearTimeout(id);
  };

/**
 * 节流函数
 * @param {function} fn 事件处理函数
 * @param {object} [context=this] 上下文对象
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @returns {Function} 事件处理函数
 */
export function throttle(fn, context = this, isImmediate = false) {
  let isLocked;
  return function() {
    const _args = arguments;

    if (isLocked) return;

    isLocked = true;
    raFrame(function() {
      isLocked = false;
      fn.apply(context, _args);
    });

    isImmediate && fn.apply(context, _args);
  };
}

/**
 * 防抖函数
 * @param {function} fn 事件处理函数
 * @param {number} [delay=20] 延迟时间
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @param {object} [context=this] 上下文对象
 * @returns {Function} 事件处理函数
 */
export function debounce(fn, delay = 20, isImmediate = false, context = this) {
  // 使用闭包，保存执行状态，控制函数调用顺序
  let timer;

  return function() {
    const _args = [].slice.call(arguments);

    clearTimeout(timer);

    const _fn = function() {
      timer = null;
      if (!isImmediate) fn.apply(context, _args);
    };

    // 是否滚动时立刻执行
    const callNow = !timer && isImmediate;

    timer = setTimeout(_fn, delay);

    if (callNow) fn.apply(context, _args);
  };
}
