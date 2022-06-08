/**
 * GeoJson2Shp/Shp/Extent
 */


/**
 * 表示范围的对象
 * @typedef {Object} Extent
 * @property {number} Extent.xmin x最小值
 * @property {number} Extent.ymin y最小值
 * @property {number} Extent.xmax x最大值
 * @property {number} Extent.maxy y最大值
 * @api
 */

/**
 * 构建包含所有给定坐标的范围。
 * @param {Array.<module:GeoJson2Shp/Shp/Geometry~Coordinate>} 坐标数组
 * @return {module:GeoJson2Shp/Shp/Extent~Extent} 范围
 */
export function boundingExtent(coordinates) {
    const extent = createEmpty();
    for (let i = 0, ii = coordinates.length; i < ii; ++i) {
        extendCoordinate(extent, coordinates[i]);
    }
    return extent;
}

/**
 * 扩展范围包含指定坐标
 * @param {module:GeoJson2Shp/Shp/Extent~Extent} extent 范围
 * @param {module:GeoJson2Shp/Shp/Geom~Coordinate} pt 坐标
 * @return {module:GeoJson2Shp/Shp/Extent~Extent}  合并后的范围
 */
export function extendCoordinate(extent, pt) {
    if (pt[0] < extent.xmin) extent.xmin = pt[0];
    if (pt[0] > extent.xmax) extent.xmax = pt[0];
    if (pt[1] < extent.ymin) extent.ymin = pt[1];
    if (pt[1] > extent.ymax) extent.ymax = pt[1];
    return extent;
};

/**
 * 修改范围,使范围包含指定坐标集
 * @param {module:GeoJson2Shp/Shp/Extent~Extent} extent 范围.
 * @param {Array.<module:GeoJson2Shp/Shp/Geometry~Coordinate>} 坐标数组
 * @return {module:GeoJson2Shp/Shp/Extent~Extent} 修改后的范围.
 */
export function extendCoordinates(extent, coordinates) {
    for (let i = 0, ii = coordinates.length; i < ii; ++i) {
        extendCoordinate(extent, coordinates[i]);
    }
    return extent;
}


/**
 * 合并2个范围
 * @param {module:GeoJson2Shp/Shp/Extent~Extent} extent1 范围1
 * @param {module:GeoJson2Shp/Shp/Extent~Extent} extent2  范围2
 * @return {module:GeoJson2Shp/Shp/Extent~Extent}  合并后的范围
 */
export function extendExtent(extent1, extent2) {
    if (extent2.xmax > extent1.xmax) extent1.xmax = extent2.xmax;
    if (extent2.xmin < extent1.xmin) extent1.xmin = extent2.xmin;
    if (extent2.ymax > extent1.ymax) extent1.ymax = extent2.ymax;
    if (extent2.ymin < extent1.ymin) extent1.ymin = extent2.ymin;
    return extent1;
};


/**
 * 创建空范围
 * @return {module:GeoJson2Shp/Shp/Extent~Extent}  最小范围
 */
export function createEmpty() {
    return {
        xmin: Number.MAX_VALUE,
        ymin: Number.MAX_VALUE,
        xmax: -Number.MAX_VALUE,
        ymax: -Number.MAX_VALUE
    };
};
