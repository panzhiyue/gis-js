/**
 * @module GeoJson2Shp/Dbf/FieldSize
 */

/**
 * dbf中各种数据格式的大小 
 * @enum {number}
 */
const FieldSize = {
    /**
     * 字符串
     */
    C: 254,
    /**
     * 布尔
     */
    L: 1,
    /**
     * 日期时间
     */
    D: 8,
    /**
     * 数值
     */
    N: 18,
    /**
     * 数值
     */
    M: 18,
    /**
     * 数值,浮点数
     */
    F: 18,
    /**
     * 数值
     */
    B: 8
};

export default FieldSize;
