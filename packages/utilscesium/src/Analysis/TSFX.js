/**
 * @module utilscesium/Analysis/TSFX
 */


/**
 * @classdesc
 * 通视分析
 * @api
 */
class TSFX {
    constructor(opt_options) {
        let options = Object.assign({ startP: null, endP: null, visualPolyline: null, invisiblePolyline: null, exclude: null }, opt_options);

        /**
         * 起点
         * @type {module:Cesium/Cartesian3}
         */
        this.startP_ = options.startP;

        /**
         * 终点 
         * @type {module:Cesium/Cartesian3}
         */
        this.endP_ = options.endP;

        this.exclude_ = options.exclude;
        /**
         * 可视区域线样式 
         * @type {Cesium.PolylineGraphics}
         */
        this.visualPolyline_ = options.visualPolyline;

        if (!Cesium.defined(this.visualPolyline_)) {
            this.visualPolyline_ = {
                arcType: Cesium.ArcType.NONE,
                width: 5,
                material: Cesium.Color.GREEN
                ,
                depthFailMaterial: Cesium.Color.GREEN
            }
        }
        /**
         * 可视区域线样式
         * @type {Cesium.PolylineGraphics}
         */
        this.invisiblePolyline_ = options.invisiblePolyline;

        if (!Cesium.defined(this.invisiblePolyline_)) {
            this.invisiblePolyline_ = {
                arcType: Cesium.ArcType.NONE,
                width: 5,
                material: Cesium.Color.RED
                ,
                depthFailMaterial: Cesium.Color.RED
            }
        }

        this.entities_ = new Cesium.EntityCollection();

        this.completeEvent_ = new Cesium.Event();
        /**
         * 定义为私有事件
         */
        Object.defineProperties(this, {
            completeEvent: {
                get: function () {
                    return this.completeEvent_;
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
     * 分析 
     */
    analysis() {
        //#region

        let sub = Cesium.Cartesian3.subtract(this.endP_, this.startP_, new Cesium.Cartesian3());
        let direction = Cesium.Cartesian3.normalize(sub, new Cesium.Cartesian3());
        //let direction = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(this.endP_, this.startP_, new Cesium.Cartesian3()), new Cesium.Cartesian3());
        //#endregion
        // 建立射线
        let ray = new Cesium.Ray(this.startP_, direction);
        //let entities = this.viewer_.entities.values;
        let result = this.viewer_.scene.pickFromRay(ray, this.exclude_); // 计算交互点，返回第一个
        this.showIntersection(result, this.startP_, this.endP_);
        this.completeEvent.raiseEvent({ type: "completeEvent", result: result, startP: this.startP_, endP: this.endP_ });
    }


    /**
     * 处理交互点
     * @param {any} result 交互点计算结果
     * @param {module:Cesium/Cartesian3} startP 起始点
     * @param {module:Cesium/Cartesian3} endP  结束点
     */
    showIntersection(result, startP, endP) {
        // 如果是场景模型的交互点，排除交互点是地球表面
        if (Cesium.defined(result)) {

            let position;
            if (Cesium.defined(result.position)) {
                position = result.position;
            } else if (Cesium.defined(result.object)) {
                position = result.object.primitive.position;
            }
            if (!Cesium.defined(position)) {
                console.error("position is error:" + position);
                return;
            }
            this.visualPolyline_.positions = [position, startP];
            this.entities_.add(this.viewer_.entities.add({
                polyline: this.visualPolyline_
            }));

            this.invisiblePolyline_.positions = [position, endP];
            this.entities_.add(this.viewer_.entities.add({
                polyline: this.invisiblePolyline_
            }));
        }
        else {
            this.visualPolyline_.positions = [startP, endP];
            this.entities_.add(this.viewer_.entities.add({
                polyline: this.visualPolyline_
            }));
        }
    }
    /**
     * 清除 
     */
    clear() {
        if (this.entities_) {
            for (let i = 0; i < this.entities_.values.length; i++) {
                this.viewer_.entities.remove(this.entities_.values[i]);
            }
        }
    }

    /**
     * 销毁 
     */
    destroy() {
        this.clear();
        this.startP_ = undefined;
        this.endP_ = undefined;
        this.visualPolyline_ = undefined;
        this.invisiblePolyline_ = undefined;
    }
}


export default TSFX;
