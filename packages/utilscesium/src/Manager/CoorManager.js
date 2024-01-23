/**
 * @module utilscesium/Manager/CoorManager 
 */


/**
 * @classdesc
 * 坐标管理类
 * @api
 */
 class CoorManager {
    /**
     * 构造函数
     * @param {Object} opt_options 
     * @param {module:Cesium/Viewer} 查看器
     */
    constructor(opt_options) {
        let options = Object.assign({ viewer: undefined }, opt_options);
        this.viewer_ = options.viewer;
    }


    /**
     * 屏幕坐标转为弧度坐标
     * @param {Position} position 屏幕坐标点
     * @returns {Position} 三维弧度坐标点
     * @example
     * let result = screenPositionToCartographic(position);
     * let lng=Cesium.Math.toDegrees(result.longitude);//转为经度值
     * let lat=Cesium.Math.toDegrees(result.latitude);//转为纬度值
     */
    screenPositionToCartographic(position) {
        let cartesianPosition;
        let cartographicPosition = null;
        if (position) {
            if (this.viewer_.scene._mode === Cesium.SceneMode.SCENE3D) {
                const ray = this.viewer_.camera.getPickRay(position);
                cartesianPosition = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);
            } else {
                cartesianPosition = this.viewer_.camera.pickEllipsoid(position, this.viewer_.scene.globe.ellipsoid);
            }
            if (Cesium.defined(cartesianPosition)) {
                cartographicPosition = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(cartesianPosition);
            }
        }
        return cartographicPosition;
    }

    /**
     * 三维弧度坐标转三维经纬度坐标
     * @param {Position} position 三维弧度坐标点
     * @returns {Position} 三维经纬度坐标点
     */
    cartographicToDegree(position) {
        position.longitude = Cesium.Math.toDegrees(position.longitude);
        position.latitude = Cesium.Math.toDegrees(position.latitude);
        return position;
    }

    /**
     * 屏幕坐标转为三维经纬度坐标
     * @param {Position} position 屏幕坐标点
     * @returns {Position} 三维经纬度坐标点
     * @example
     * let result = screenPositionToDegree(position);
     */
    screenPositionToDegree(position) {
        return this.cartographicToDegree(this.screenPositionToCartographic(position));
    }


    /**
     * 屏幕坐标转为笛卡尔坐标
     * @param {Position} position 屏幕坐标点
     * @returns {Position} 三维笛卡尔坐标点
     * @example
     * let result = screenPositionToCartesian(movement.position);
     */
    screenPositionToCartesian(position) {
        let cartesianPosition = null;
        if (position) {
            if (this.viewer_.scene._mode === Cesium.SceneMode.SCENE3D) {
                const ray = this.viewer_.camera.getPickRay(position);
                cartesianPosition = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);
            } else {
                cartesianPosition = this.viewer_.camera.pickEllipsoid(position, this.viewer_.scene.globe.ellipsoid);
            }
        }
        return cartesianPosition;
    }

    /**
     * 笛卡尔坐标转为场景坐标
     * @param {Position} position 
     * @param {Array} exclude 不计算在内的模型数组
     */
    cartesianToScenePosition(position, exclude = []) {
        return this.viewer_.scene.clampToHeight(position, exclude);
    }

    /**
     * 笛卡尔坐标转弧度坐标
     * @param {Position} position 笛卡尔坐标
     * @returns  {Position} 弧度坐标
     */
    cartesianToCartographic(position) {
        var ellipsoid = this.viewer_.scene.globe.ellipsoid;
        var cartographic = ellipsoid.cartesianToCartographic(position);
        return cartographic;
    }


    /**
     * 根据经纬度计算高度值
     * @function module:客户端公共方法.CommonFuncManager.prototype.getHeightFromDegrees
     * @param {Number} longitude 经度值
     * @param {Number} latitude 纬度值
     * @returns {Number} 计算的高度值
     * @example
     * let res = commfun.getHeightFromDegrees(120.0,23.0)
     */
    getHeightFromDegrees(longitude, latitude) {
        let position;
        let height = 0;
        if (longitude && latitude) {
            position = Cesium.Cartographic.fromDegrees(longitude, latitude);
            height = this.viewer.scene.globe.getHeight(position);
        }
        return height;
    }

    /**
     * 线性插值（二维坐标）,每隔一段长度插值
     * @param {Array<Cartesian2>} positions 坐标点序列
     * @param {Number} step 插值的长度
     * @returns {Array<Cartesian2>} 插值后的坐标点序列
     */
    static linearInterpolate(positions, step) {
        const pnts = [];
        const len = positions.length - 1;
        for (let m = 0; m < len; m += 1) {
            const pntS = positions[m];
            const pntE = positions[m + 1];
            if (m === 0) {
                pnts.push(pntS);
            }
            const dis = Math.sqrt((pntE.x - pntS.x) ** 2 + (pntE.y - pntS.y) ** 2);
            if (dis > step) {
                const n = dis / step;
                for (let i = 1; i < n; i += 1) {
                    const x = (pntE.x - pntS.x) * ((i * step) / dis) + pntS.x;
                    const y = (pntE.y - pntS.y) * ((i * step) / dis) + pntS.y;
                    pnts.push(new Cesium.Cartesian2(x, y));
                }
            }
            pnts.push(pntE);
        }
        return pnts;
    }

    /**
     * 线性插值(三维坐标)，每隔一段长度插值
     * @param {Array<Cartesian3>} positions 坐标点序列
     * @param {Number} step 插值的长度
     * @returns {Array<Cartesian3>} 插值后的坐标点序列
     */
    static linearInterpolate3D(positions, step) {
        const pnts = [];
        for (let m = 0; m < positions.length - 1; m += 1) {
            const pntS = positions[m];
            const pntE = positions[m + 1];
            if (m === 0) {
                pnts.push(pntS);
            }
            const dis = Math.sqrt((pntE.x - pntS.x) ** 2 + (pntE.y - pntS.y) ** 2);
            if (dis > step) {
                const n = dis / step;
                for (let i = 1; i < n; i += 1) {
                    const x = (pntE.x - pntS.x) * ((i * step) / dis) + pntS.x;
                    const y = (pntE.y - pntS.y) * ((i * step) / dis) + pntS.y;
                    const z = (pntE.z - pntS.z) * ((i * step) / dis) + pntS.z;
                    pnts.push(new Cesium.Cartesian3(x, y, z));
                }
            }
            pnts.push(pntE);
        }
        return pnts;
    }
}

export default CoorManager;