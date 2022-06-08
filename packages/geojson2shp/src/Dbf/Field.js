/**
 * @module GeoJson2Shp/Dbf/Field
 */

import FieldSize from './FieldSize.js'
import FieldType from './FieldType.js'

/**
 * @typedef {Object} Field
 * @property {string} Field.name 字段名称
 * @property {module:GeoJson2Shp/Dbf/FieldType} Field.type 字段类型
 * @property {number} Field.size 字段大小
 */

/**
 * 属性数组所有字段定义
 * @param {Array.<Object>} features 属性数组
 * @return {Array.<module:GeoJson2Shp/Dbf/Field~Field>} 属性数组所有字段定义
 * 
 * @example 
 * var features=[{"NAME":"测试点","aa":"20"},{"NAME":"1","aa":"21"},{"NAME":"2","aa":"22"},{"NAME":"3","aa":"23"},{"NAME":"4","aa":"24"},{"NAME":"5","aa":"25"}];
 * multi(features)
 * //结果:[{"name":"NAME","type":"C","size":254},{"name":"aa","type":"C","size":254}]
 */
export function multi(features) {
    var fields = {};

    //合并属性对象对象
    features.forEach(collect);
    function collect(f) { inherit(fields, f); }

    return obj(fields);
}

/**
 * 合并对象a,b,类似jquery的extend
 * @param {Object} a
 * @param {Object} b
 * @returns {Object} 合并后的对象
 * 
 * @example 
 * var a={"T":""};
 * var b={"NAME":"测试点","aa":"20"};
 * inherit(a,b)
 * //结果:{"T":"","NAME":"测试点","aa":"20"}
 */
export function inherit(a, b) {
    for (var i in b) {
        var isDef = typeof b[i] !== 'undefined' && b[i] !== null;
        if (typeof a[i] === 'undefined' || isDef) {
            a[i] = b[i];
        }
    }
    return a;
}

/**
 * 属性对象转为字段定义
 * @param {Object} _ 属性对象
 * @return {Array.<module:GeoJson2Shp/Dbf/Field~Field>} 字段定义
 */
export function obj(_) {
    var fields = {}, o = [];
    for (var p in _) fields[p] = _[p] === null ? 'null' : typeof _[p];
    for (var n in fields) {
        var t = FieldType[fields[n]];
        if (t) {
            o.push({
                name: n,   //字段名称
                type: t,   //字段类型
                size: FieldSize[t]  //字段大小
            });
        }
    }
    return o;
}



export default undefined;
