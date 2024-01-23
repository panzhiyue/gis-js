/**
 * @module utilscesium/Analysis/YMFX
 */



const startEvent = Symbol('startEvent');
const continuteEvent = Symbol('continuteEvent');
const suspendEvent = Symbol('suspendEvent');
const stopEvent = Symbol('stopEvent');
const completeEvent = Symbol('completeEvent');
const analysisEvent = Symbol('analysisEvent');
const clearEvent = Symbol('clearEvent');

/**
 * @author 潘知悦
 * @classdesc
 * 淹没分析
 * @api
 */
class YMFX {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {module:Cesium/EntityCollection} [opt_options.entities] 分析区域
     * @param {number} [opt_options.startH] 起始海拔
     * @param {number} [opt_options.endH] 结束海拔
     * @param {number} [opt_options.scope] 涨幅,每次增长的海拔高度 米/次
     * @param {number} [opt_options.speed] 频率 次/秒
     */
    constructor(opt_options) {
        let options = Object.assign({ entities: null, startH: 100, endH: 1500, scope: 10, speed: 10 }, opt_options);
        /**
         * 分析区域
         * @type {module:Cesium/EntityCollection}
         */
        this.entities_ = options.entities;
        /**
         * 初始设定的水位高度
         * @type {number}
         */
        this.startH_ = options.startH;

        /**
         * 最终水位
         * @type {number}
         */
        this.endH_ = options.endH;

        /**
         * 涨幅,每次增长的海拔高度 米/次
         * @type {number}
         */
        this.scope_ = options.scope;


        /**
         * 频率 次/秒
         * @type {number}
         */
        this.speed_ = options.speed;

        /**
         * 是否启动分析 
         * @type {Boolean}
         */
        this.IsStart_ = true;

        /**
         * 当前水位 
         * @type {number}
         */
        this.waterHeight_ = 0;


        /**
         *  开始事件
         *  @type {Cesium.Event}
         */
        this[startEvent] = new Cesium.Event();

        /**
         * 继续事件
         * @type {Cesium.Event}
         */
        this[continuteEvent] = new Cesium.Event();

        /**
         * 暂停事件
         * @type {Cesium.Event}
         */
        this[suspendEvent] = new Cesium.Event();

        /**
         * 停止事件
         * @type {Cesium.Event}
         */
        this[stopEvent] = new Cesium.Event();

        /**
         * 完成事件
         * @type {Cesium.Event}
         */
        this[completeEvent] = new Cesium.Event();

        /**
         * 分析执行事件
         * @type {Cesium.Event}
         */
        this[analysisEvent] = new Cesium.Event();


        /**
         * 清除事件
         * @type {Cesium.Event}
         */
        this[clearEvent] = new Cesium.Event();

        /**
         * 定义为私有事件
         */
        Object.defineProperties(this, {
            startEvent: {
                get: function () {
                    return this[startEvent];
                }
            },
            continuteEvent: {
                get: function () {
                    return this[continuteEvent];
                }
            },
            suspendEvent: {
                get: function () {
                    return this[suspendEvent];
                }
            },
            stopEvent: {
                get: function () {
                    return this[stopEvent];
                }
            },
            completeEvent: {
                get: function () {
                    return this[completeEvent];
                }
            },
            analysisEvent: {
                get: function () {
                    return this[analysisEvent];
                }
            }
            ,
            clearEvent: {
                get: function () {
                    return this[clearEvent];
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
     * 开始分析 
     */
    start() {
        this.startEvent.raiseEvent({ type: "startEvent" });
        this.IsStart_ = true;
        this.waterHeight_ = this.startH_;
        for (let i = 0; i < this.entities_.values.length; i++) {
            let entity = this.entities_.values[i];
            entity.polygon.extrudedHeight = this.waterHeight_;
            entity.polygon.perPositionHeight = false;
            this.viewer_.entities.add(entity);
        }



        this.timer_ = setInterval(function () {
            if (this.IsStart_ == false) {
                return;
            }
            if (this.waterHeight_ < this.endH_) {
                this.waterHeight_ += this.scope_;
                if (this.waterHeight_ > this.endH_) {
                    this.waterHeight_ = this.endH_;
                }
                for (let i = 0; i < this.entities_.values.length; i++) {
                    let entity = this.entities_.values[i];
                    entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function () {
                        return this.waterHeight_;
                    }.bind(this), false);
                }

                this.analysisEvent.raiseEvent({ type: "analysisEvent" });
                if (this.waterHeight_ == this.endH_) {
                    this.complete();
                }
            }
        }.bind(this), 1000 / this.speed_);
    }
    /**
    * 继续
    */
    continue() {
        this.IsStart_ = true;
        //触发结束绘制事件
        this.continuteEvent.raiseEvent({ type: "continuteEvent" });
    }
    /**
     * 暂停 
     */
    suspend() {
        this.IsStart_ = false;
        this.suspendEvent.raiseEvent({ type: "suspendEvent" });
    }

    /**
     * 停止
     */
    stop() {
        if (this.timer_) {
            clearInterval(this.timer_);

        }
        this.stopEvent.raiseEvent({ type: "stopEvent" });
    }
    /**
     * 完成
     */
    complete() {
        if (this.timer_) {
            clearInterval(this.timer_);
        }
        this.completeEvent.raiseEvent({ type: "completeEvent" });
    }

    /**
     * 清除 
     */
    clear() {
        if (this.timer_) {
            clearInterval(this.timer_);
        }
        if (this.entities_) {
            for (let i = 0; i < this.entities_.values.length; i++) {
                this.viewer_.entities.remove(this.entities_.values[i]);
            }

        }
        this.clearEvent.raiseEvent({ type: "clearEvent" });
    }
}
export default YMFX;
