/**
 * @module GeoJson2Shp/Dbf/FieldType
 */

/**
 * 字段类型
 * @enum {string}
 */
var FieldType = {
    /**
     * 字符串
     */
    string: 'C',

    /**
     * 数值
     */
    number: 'N',

    /**
     * 布尔
     */
    boolean: 'L',

    /**
     * 字段的所有值都为null时要使用的类型
     */
    null: 'C'
};

export default FieldType;
