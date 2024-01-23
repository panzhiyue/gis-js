/**
 * @module utilscesium/Analysis/CruiseModel
 */

/**
 * @classdesc
 * 轨迹漫游
 * 关键在于Property的使用使用
 * @see https://www.cnblogs.com/cesium1/p/10062955.html
 * @example
 * import CruiseModel from "utilscesium/Analysis/CruiseModel"
 * let cruiseModel = new CruiseModel({
        viewer: viewer,
        positionArr: [[120,28],[121,28]],
        isShowPath: true,
        isShowNode:false,
        clockFrequency: 20
    });
    //修改模型样式
    let result = cruiseModel.getResult();
    result.entity.point.outlineColor = Cesium.Color.GREEN;
 *  cruiseModel.start();
 * @api
 */
class CruiseModel {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {module:Cesium/Viewer} [opt_options.viewer]
     * @param {Array<module:utilscesium/Coordinate~Coordinate>} [opt_options.positionArr]  漫游线路节点坐标数组 Array<[x,y]>
     * @param {Boolean} [opt_options.isShowPath]  是否显示线路
     * @param {Boolean} [opt_options.isShowNode]  是否显示节点
     * @param {Boolean} [opt_options.isLoop]  是否循环
     * @param {String} [opt_options.pathModel]  路径模式 lead:经过的路径,trail:未经过的路径,leadAndTrail:全部路径
     * @param {Number} [opt_options.interval]  2点间隔(s),表示从1个点到另一个点的时间
     * @param {Function} [opt_options.callback]  回调函数
     */
    constructor(opt_options) {
        let options = Object.assign({
            viewer: null,
            modelURL: "",
            positionArr: null,
            isShowPath: true,
            isLoop: false,
            pathModel: "leadAndTrail",
            interval: 10,
            callback: null
        }, opt_options);

        /**
         * viewer
         * @type {module:Cesium/Viewer}
         */
        this.viewer_ = options.viewer;

        /**
         * 漫游线路节点坐标数组 
         * @type {Array<module:utilscesium/Coordinate~Coordinate>}
         */
        this.positionArr_ = options.positionArr;

        /**
         * 是否显示线路
         * @type {Boolean}
         */
        this.isShowPath_ = options.isShowPath;

        /**
         * 是否显示节点
         * @type {Boolean}
         */
        this.isShowNode_ = options.isShowNode;

        /**
         * 是否循环
         * @type {Boolean}
         */
        this.isLoop_ = options.isLoop;


        /**
         * 漫游时钟频率
         * @type {Number} 
         */
        this.interval_ = options.interval;


        /**
         * 路径模式 lead:经过的路径,trail:未经过的路径,leadAndTrail:全部路径
         * @type {String}
         */
        this.pathModel_ = options.pathModel;

        /**
         * 回调函数
         * @type {Function}
         */
        this.callback_ = options.callback;

        /**
         * 分析结果
         * @type {utilscesium/CruiseModel~Result}
         */
        this.result_ = {
            nodesEntities: [], //路线节点
            entity: null
        };

        if (options.viewer) {
            this.setViewer(options.viewer);
        }
    }

    /**
     * 绑定viewer
     * @param {module:Cesium/Viewer} viewer
     */
    setViewer(viewer) {
        this.viewer_ = viewer;
        this.init_();
    }
    init_() {
        //开始时间
        const start = Cesium.JulianDate.now();
        //过程秒数
        const seconds = (this.positionArr_.length - 1) * this.interval_;
        //结束时间
        const stop = Cesium.JulianDate.addSeconds(start, seconds, new Cesium.JulianDate());
        this.viewer_.clock.startTime = start.clone();
        this.viewer_.clock.stopTime = stop.clone();
        this.viewer_.clock.currentTime = start.clone();
        if (this.isLoop_) {
            this.viewer_.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 循环
        } else {
            this.viewer_.clock.clockRange = Cesium.ClockRange.CLAMPED; // 停止
        }
        this.viewer_.clock.multiplier = 1;

        //循环坐标点
        for (let i = 0; i < this.positionArr_.length; i += 1) {

            //坐标的Cartesian3
            const positionT = Cesium.Cartesian3.fromDegrees(this.positionArr_[i][0], this.positionArr_[i][1]);
            //路径节点
            const pntEntity = this.viewer_.entities.add({
                position: positionT,
                point: {
                    pixelSize: 8,
                    color: Cesium.Color.TRANSPARENT,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 3
                },
                show: this.isShowNode_
            });
            this.result_.nodesEntities.push(pntEntity);
        }
        const position = calculatePositionSamples(this.positionArr_, start, this.interval_);
        const modelEntity = this.viewer_.entities.add({
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start,
                    stop
                })
            ]),
            position,
            orientation: new Cesium.VelocityOrientationProperty(position),
            point: {
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                pixelSize: 15,
            },
            // model: {
            //     uri: this.modelURL_,
            //     minimumPixelSize: 64
            // },
            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.YELLOW
                }),
                width: 10,
                show: this.isShowPath_
            }
        });

        //显示经过的路径
        if (this.pathModel_ == "lead") {
            modelEntity.path.leadTime = 0;
        }
        //显示未经过的路径
        if (this.pathModel_ == "trail") {
            modelEntity.path.trailTime = 0;
        }
        this.result_.entity = modelEntity;

        if (this.callback_ instanceof Function) {
            this.callback_(this.result_);
        }
    }
    /**
     * 开始漫游
     */
    start() {
        this.viewer_.clock.shouldAnimate = true;
    }
    /**
     * 停止
     */
    stop() {
        this.viewer_.clock.shouldAnimate = false;
    }

    /**
     * 清除上一次的分析结果
     */
    clear() {
        this.viewer_.entities.remove(this.result_.entity);
        for (let i = 0; i < this.result_.nodesEntities.length; i++) {
            this.viewer_.entities.remove(this.result_.nodesEntities[i]);
        }
        this.result_ = {
            nodesEntities: [], //路线节点
            entity: null
        };
    }

    /**
     * 销毁 
     */
    destroy() {
        this.clear();
        this.viewer_ = undefined;
    }

    /**
     * 获取分析结果
     * @return {module:utilscesium/CruiseModel~Result}
     */
    getResult() {
        return this.result_;
    }
}


/**
 * 创建SampledPositionProperty
 * @param {Array<module:utilscesium/Coordinate~Coordinate>} positions 经纬度坐标集合[[120,28],[121,28],......，[122,28]]
 * @param {Cesium/JulianDate} startTime 开始时间
 * @param {Number} multiplier 2点之间的秒数
 */
function calculatePositionSamples(positions, startTime, multiplier) {
    if (positions !== undefined) {
        if (positions.constructor === Array) {
            const property = new Cesium.SampledPositionProperty();
            for (let since = 0; since < positions.length; since += 1) {
                property.addSample(Cesium.JulianDate.addSeconds(startTime, multiplier * since, new Cesium.JulianDate()), Cesium.Cartesian3.fromDegrees(positions[since][0], positions[since][1]));
            }
            return property;
        }
    }
    return undefined;
}

/**
 * CruiseModel的结果
 * @typedef {Object} Result
 * @property {Array<Cesium/Entity>} Result.nodeEntities  路线节点的entity集合
 * @property {Cesium/Entity} Result.entity  模型与路线的entity对象
 */

export default CruiseModel;