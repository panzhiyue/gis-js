/**
 * @module GeoJson2Shp/Shp/GeometryType 
 */

/**
 * 图形类型在shp文件中的值
 * @enum {number}
 */
var geometryType = {
    NULL: 0,
    POINT: 1,
    POLYLINE: 3,
    POLYGON: 5,
    MULTIPOINT: 8,
    POINTZ: 11,
    POLYLINEZ: 13,
    POLYGONZ: 15,
    MULTIPOINTZ: 18,
    POINTM: 21,
    POLYLINEM: 23,
    POLYGONM: 25,
    MULTIPOINTM: 28,
    MULTIPATCH: 31,
};

export default geometryType;
