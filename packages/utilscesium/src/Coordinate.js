/**
 * @module utilscesium/Coordinate
 */

/**
 * 表示xy坐标的数字数组. 例如: `[16, 48]`.
 * @typedef {Array<number>} Coordinate
 * @api
 */

/**
 * cartesian3转为[x,y]
 * @param {module:Cesium/Cartesian3} cartesian3
 */
export function fromCartesian3(cartesian3) {
    let ellipsoid = Cesium.Ellipsoid.WGS84;
    let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
    let lon = Cesium.Math.toDegrees(cartographic.longitude);
    let lat = Cesium.Math.toDegrees(cartographic.latitude);
    return [lon, lat];
}

/**
 * cartesian3数组转为[x,y]数组
 * @param {Array.<module:Cesium.Cartesian3>} cartesian3Array 
 */
export function fromCartesian3Array(cartesian3Array) {
    let ellipsoid = Cesium.Ellipsoid.WGS84;
    let coordinates = [];
    for (let i = 0; i < cartesian3Array.length; i++) {
        let cartesian3 = cartesian3Array[i];
        let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
        let lon = Cesium.Math.toDegrees(cartographic.longitude);
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        coordinates.push([lon, lat]);
    }
    return coordinates;
}