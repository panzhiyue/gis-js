import CoorManager from "utilscesium/Manager/CoorManager"

/**
 * @module utilscesium/Analysis/CruiseModelGround
 */

/**
 * @classdesc
 * 轨迹漫游(贴地)
 * 关键在于Property的使用使用
 * @see https://www.cnblogs.com/cesium1/p/10062955.html
 * @example
 * 11
 * @api
 */
class CruiseModelGround {
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
         * @type {utilscesium/CruiseModelGround~Result}
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
        const numOforiPnt = this.positionArr_.length;
        //开始时间
        const start = Cesium.JulianDate.now();
        //过程秒数
        const seconds = (this.positionArr_.length - 1) * this.interval_;
        //结束时间
        const stop = Cesium.JulianDate.addSeconds(start, seconds, new Cesium.JulianDate());
        this.viewer_.clock.startTime = start.clone();
        this.viewer_.clock.stopTime = stop.clone();
        this.viewer_.clock.currentTime = start.clone();
        if(this.isLoop_)
        {
            this.viewer_.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 循环
        }else{
            this.viewer_.clock.clockRange = Cesium.ClockRange.CLAMPED; // 停止
        }
     
        this.viewer_.clock.multiplier = 1;

        /**
         * 地理坐标点集
         * @type {Array<Cesium/Cartesian3>}
         */
        const cartesianArr = [];
        for (let i = 0; i < this.positionArr_.length; i += 1) {
            cartesianArr.push(Cesium.Cartesian3.fromDegrees(this.positionArr_[i][0], this.positionArr_[i][1]));
        }

        //线段长度
        let len = 0;
        for (let j = 0; j < cartesianArr.length - 1; j += 1) {
            len += Math.sqrt((cartesianArr[j].x - cartesianArr[j + 1].x) ** 2 + (cartesianArr[j].y - cartesianArr[j + 1].y) ** 2);
        }
        //计算线段的线性插值
        const pnts = CoorManager.linearInterpolate3D(cartesianArr, len / 300);

        let cartographicsArr = this.viewer_.scene.globe.ellipsoid.cartesianArrayToCartographicArray(cartesianArr);

        cartographicsArr = cartographicsArr.concat(this.viewer_.scene.globe.ellipsoid.cartesianArrayToCartographicArray(pnts));

        Cesium.sampleTerrainMostDetailed(this.viewer_.terrainProvider, cartographicsArr).then((updatedPositions) => {
            const cartesianPositions = this.viewer_.scene.globe.ellipsoid.cartographicArrayToCartesianArray(updatedPositions);
            //原始顶点坐标数组
            const oriVertices = cartesianPositions.slice(0, numOforiPnt);
            //插值后的顶点坐标数组
            const samplePoints = cartesianPositions.slice(numOforiPnt);
            //添加路径节点
            for (let j = 0; j < oriVertices.length; j += 1) {
                const pntEntity = this.viewer_.entities.add({
                    position: oriVertices[j],
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
            const clockFrequencyTem = (this.interval_ * (oriVertices.length - 1)) / (samplePoints.length - 1);
            const position = calculatePositionSamplesGround(samplePoints, start, clockFrequencyTem);

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
                    show: this.isShowPath_,
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
        });
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
     * @return {module:utilscesium/CruiseModelGround~Result}
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
function calculatePositionSamplesGround(positions, startTime, multiplier) {
    if (positions !== undefined) {
        if (positions.constructor === Array) {
            const property = new Cesium.SampledPositionProperty();
            for (let since = 0; since < positions.length; since += 1) {
                property.addSample(Cesium.JulianDate.addSeconds(startTime, multiplier * since, new Cesium.JulianDate()), positions[since]);
            }
            return property;
        }
    }
    return undefined;
}
/**
 * CruiseModelGround的结果
 * @typedef {Object} Result
 * @property {Array<Cesium/Entity>} Result.nodeEntities  路线节点的entity集合
 * @property {Cesium/Entity} Result.entity  模型与路线的entity对象
 */

export default CruiseModelGround;