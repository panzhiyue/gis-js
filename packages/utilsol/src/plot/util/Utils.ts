/**
 * @module utils-ol/plot/util/Utils
 */

var _stampId:number = 0;

/**
 * 字符串去除空格
 * @param str 字符串
 * @return 去除空格后的字符串
 */
export function trim(str: string): string {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * 获取对象的_p_id_值，如果没有则创建
 * @param obj 传入对象
 * @return _p_id_值
 */
export function stamp(obj: Object): number {
    let key: string = '_p_id_';
    obj[key] = obj[key] || _stampId++;
    return obj[key];
}
