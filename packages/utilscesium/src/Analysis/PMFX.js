/**
 * @module utilscesium/Analysis/PMFX
 */

/**
 * @classdesc
 * 坡面分析
 * @api
 */
class PMFX {
    constructor(opt_options) {
        /**
         * 构造函数
         * @param {Object} opt_options
         * @param {module:Cesium/Cartesian3} [opt_options.startP]  起始点
         * @param {module:Cesium/Cartesian3} [opt_options.endP]  结束点
         * @param {number} [opt_options.count]  数量
         */
        let options = Object.assign({ startP: null, endP: null, count: 200 }, opt_options);
        /**
         * 起始点
         * @type {module:Cesium/Cartesian3}
         */
        this.startP_ = options.startP;

        /**
         * 结束点
         * @type {module:Cesium/Cartesian3}
         */
        this.endP_ = options.endP;

        /**
         * 数量
         * @type {number}
         */
        this.count_ = options.count;

    }


    /**
     * 绑定viewer
     * @param {module:Cesium/Viewer} viewer
     */
    setViewer(viewer) {
        this.viewer_ = viewer;
    }

    /**
     * 返回结果
     * @return  {Object} 结果
     * @example 
     * [{distance,x,y,z},.....,{distance,x,y,z}]
     */
    getResult() {
        let start = this.startP_;
        let end = this.endP_;

        let points = [];
        points.push(start);
        for (let i = 1; i < this.count_ - 1; i++) {
            var cart = Cesium.Cartesian3.lerp(start, end, i / this.count_, new Cesium.Cartesian3());

            points.push(cart);
        }
        points.push(end);

        let result = [];
        //得到当前三维场景
        let scene = this.viewer_.scene;
        //得到当前三维场景的椭球体
        let ellipsoid = scene.globe.ellipsoid;
        for (let i = 0; i < points.length; i++) {
            let point = points[i];

            let point1cartographic = Cesium.Cartographic.fromCartesian(point);
            let point2cartographic = Cesium.Cartographic.fromCartesian(points[0]);

            /**根据经纬度计算出距离**/
            let geodesic = new Cesium.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            let distance = geodesic.surfaceDistance;

            let cartesian = point;
            //将笛卡尔坐标转换为地理坐标
            let cartographic = ellipsoid.cartesianToCartographic(cartesian);

            //经度
            let longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            //纬度
            let latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            //海拔
            let h = this.viewer_.scene.globe.getHeight(cartographic);
            result.push({ distance: distance, x: longitudeString, y: latitudeString, z: h });
        }
        return result;
    }
}

export default PMFX;
