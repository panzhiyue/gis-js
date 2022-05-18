/**
 * html操作类 
 * @module utils-ol/plot/util/DomUtils
 */


import { trim, stamp } from "./Utils"


/**
 * 创建element
 * @param tagName 节点名称
 * @param className 样式名称
 * @param parent  父节点
 * @param id 
 * @return 创建的节点
 */
export function create(tagName: string, className: string, parent?: Node, id?: string): HTMLElement {
    let element: HTMLElement = document.createElement(tagName);
    element.className = className || '';
    if (id) {
        element.id = id;
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}

/**
 * 创建默认隐藏element
 * @param tagName
 * @param parent
 * @param id
 * @return 创建的节点
 */
export function createHidden(tagName: string, parent: Node, id: string): HTMLElement {
    var element = document.createElement(tagName);
    element.style.display = 'none';
    if (id) {
        element.id = id;
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}

/**
 * 删除element
 * @param element 要删除的节点
 * @param parent 父亲节点
 */
export function remove(element: HTMLElement, parent: Node) {
    if (parent && element) {
        parent.removeChild(element);
    }
}

/**
 * 获取指定id节点
 * @param id
 * @return 指定id的节点
 */
export function get(id: string): HTMLElement {
    return document.getElementById(id);
}

/**
 * 获取指定名称的style属性值
 * @param element 节点
 * @param name style属性名
 * @return 指定名称的style属性值
 */
export function getStyle(element: HTMLElement, name: string): any {
    let value: any = element.style[name];
    return value === 'auto' ? null : value;
}

/**
 * 判断节点是否有指定样式
 * @param element 节点
 * @param name className
 * @return true有，false无
 */
export function hasClass(element: HTMLElement, name: string): boolean {
    return (element.className.length > 0) &&
        new RegExp('(^|\\s)' + name + '(\\s|$)').test(element.className);
}

/**
 * 给节点添加样式
 * @param element 节点
 * @param name className
 */
export function addClass(element: HTMLElement, name: string) {
    if (this.hasClass(element, name)) {
        return;
    }
    if (element.className) {
        element.className += ' ';
    }
    element.className += name;
}

/**
 * 删除样式
 * @param element 节点
 * @param name className
 */
export function removeClass(element: HTMLElement, name: string) {
    element.className = trim((' ' + element.className + ' ').replace(' ' + name + ' ', ' '));
};

/**
 * 获取dom事件键值
 * @param type 事件类型
 * @param fn   方法
 * @param context 上下文
 * @return dom事件键值
 */
function getDomEventKey(type: string, fn: Function, context: any): string {
    return '_p_dom_event_' + type + '_' + stamp(fn) + (context ? '_' + stamp(context) : '');
};

/**
 * 添加DOM事件
 * @param element 节点
 * @param type 事件类型
 * @param fn  方法
 * @param context 上下文
 * @return 
 */
export function addListener(element: HTMLElement|EventTarget, type: string, fn: Function, context: any): any {
    var self = this,
        eventKey = getDomEventKey(type, fn, context),
        handler = element[eventKey];

    if (handler) {
        return self;
    }

    handler = function (e) {
        return fn.call(context || element, e);
    };

    element.addEventListener(type, handler, false);
    element[eventKey] = handler;
    return self;
};

/**
 * 删除事件
 * @param element 节点
 * @param type 事件类型
 * @param fn  方法
 * @param context 上下文
 * @return 
 */
export function removeListener(element: HTMLElement|EventTarget, type: string, fn: Function, context: any): any {
    var self = this,
        eventKey = getDomEventKey(type, fn, context),
        handler = element[eventKey];

    if (!handler) {
        return self;
    }

    element.removeEventListener(type, handler, false);
    element[eventKey] = null;

    return self;
};
