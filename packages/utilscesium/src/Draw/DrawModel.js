/**
 * @module utilscesium/Draw/DrawModel
 */

const drawStart_ = Symbol('drawStart_');
const drawEnd_ = Symbol('drawEnd_');
const activeEvent_ = Symbol('activeEvent_');
const deActiveEvent_ = Symbol('deActiveEvent_');

/**
 * @classdesc
 * 图形绘制模板
 * @api
 */
 class DrawModel {

    constructor(opt_options) {
        /**
         *  开始绘制事件
         *  @type {Cesium.Event}
         */
        this[drawStart_] = new Cesium.Event();

        /**
         * 绘制结束时间
         * @type {Cesium.Event}
         */
        this[drawEnd_] = new Cesium.Event();

        /**
        * 激活事件
        * @type {Cesium.Event}
        */
        this[activeEvent_] = new Cesium.Event();

        /**
         * 取消激活事件
         * @type {Cesium.Event}
         */
        this[deActiveEvent_] = new Cesium.Event();

        /**
         * 定义为私有事件
         */
        Object.defineProperties(this, {
            drawStart: {
                get: function () {
                    return this[drawStart_];
                }
            },
            drawEnd: {
                get: function () {
                    return this[drawEnd_];
                }
            },
            activeEvent: {
                get: function () {
                    return this[activeEvent_]
                }
            },
            deActiveEvent: {
                get: function () {
                    return this[deActiveEvent_]
                }
            }


        });
    }

    /**
     * 绑定viewer
     * @param {module:Cesium/Viewer} viewer
     */
    setViewer(viewer) {
        this.viewer_ = viewer;
    }

    /**
     * 绘图控件激活
     * @param {boolean} bool true:激活,false:取消
     */
    setActive(bool) {
        if (!this.handler_) {
            this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
        }
        if (bool) {

        } else {

        }
    }

    /**
     * 获取类型
     * @returns {PlotTypes}
     */
    getType(){
        return this.geometryType;
    }
    
    /**
     * 屏幕坐标转笛卡尔坐标
     * @param {Position} screenPosition 屏幕坐标 
     * @return {Position} 笛卡尔坐标
     */
    screenPositionToCartesian(screenPosition){
        let ray = this.viewer_.camera.getPickRay(screenPosition);
        let position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);
        return position;
    }
}

export default DrawModel;