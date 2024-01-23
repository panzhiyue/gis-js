import CoorManager from "../Manager/CoorManager"

/**
 * @module utilscesium/Analysis/Cruise
 */

/**
 * @classdesc
 * 轨迹漫游(贴地)
 * 关键在于Property的使用使用
 * @see https://www.cnblogs.com/cesium1/p/10062955.html
 * @example
 *  let cruise = new Cruise({
        viewer: viewer,
        positionArr: points,
        isShowPath: true,
        isShowNode: false,
        isLoop: false,
        sumTime: 10,
        pathModel: "lead",
        clampToGround: false,
        callback: (result) => {
            cruise.start();
        }
    });
 * @api
 */
class Cruise {
  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {module:Cesium/Viewer} [opt_options.viewer]
   * @param {Array<module:utilscesium/Coordinate~Coordinate>} [opt_options.positionArr]  漫游线路节点坐标数组 Array<[x,y]>
   * @param {Boolean} [opt_options.isShowPath]  是否显示线路
   * @param {Boolean} [opt_options.isShowNode]  是否显示节点
   * @param {Boolean} [opt_options.isLoop]  是否循环
   * @param {String} [opt_options.pathModel]  路径模式 lead:经过的路径,trail:未经过的路径,leadAndTrail:全部路径
   * @param {Number} [opt_options.sumTime]  动画总时间
   * @param {Boolean} [opt_options.clampToGround]  是否贴地
   * @param {Number} [opt_options.heightOffset]  高度偏移
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
      sumTime: 10,
      callback: null,
      clampToGround: false,
      heightOffset: 0

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
     * 是否贴地
     * @type {Boolean}
     */
    this.clampToGround_ = options.clampToGround;

    /**
     * 总时间
     * @type {Number}
     */
    this.sumTime_ = options.sumTime;

    /**
     * 高度偏移
     * @type {Number}
     */
    this.heightOffset_ = options.heightOffset;

    /**
     * 分析结果
     * @type {utilscesium/Cruise~Result}
     */
    this.result_ = {
      nodesEntities: [], //路线节点
      entity: null
    };

    this.startTime_ = null;
    this.stopTime_ = null;
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
    if (this.clampToGround_) {
      this.init_();

    } else {
      this.init2_();
    }

  }

  //贴地
  init_() {
    const numOforiPnt = this.positionArr_.length;
    this.initTime_();

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
    const pnts = CoorManager.linearInterpolate3D(cartesianArr, len / 3);

    let cartographicsArr = this.viewer_.scene.globe.ellipsoid.cartesianArrayToCartographicArray(cartesianArr);

    cartographicsArr = cartographicsArr.concat(this.viewer_.scene.globe.ellipsoid.cartesianArrayToCartographicArray(pnts));

    this.viewer_.scene.sampleHeightMostDetailed(cartographicsArr).then((updatedPositions) => {

      for (let i = 0; i < updatedPositions.length; i++) {
        // console.log(updatedPositions[i]);
        updatedPositions[i].height = updatedPositions[i].height + this.heightOffset_;
      }
      const cartesianPositions = this.viewer_.scene.globe.ellipsoid.cartographicArrayToCartesianArray(updatedPositions);
      //原始顶点坐标数组
      const oriVertices = cartesianPositions.slice(0, numOforiPnt);
      //插值后的顶点坐标数组
      const samplePoints = cartesianPositions.slice(numOforiPnt);

      this.initNode_(oriVertices);

      const position = this.calculatePositionSamples_(samplePoints);

      const modelEntity = this.viewer_.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: this.startTime_,
            stop: this.stopTime_
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

  //不贴地
  init2_() {
    this.initTime_();

    this.initNode_(this.positionArr_);

    let points = Cesium.Cartesian3.fromDegreesArray(this.positionArr_.flat());
    const position = this.calculatePositionSamples_(points);

    const modelEntity = this.viewer_.entities.add({
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: this.startTime_,
          stop: this.stopTime_
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
    //模拟异步，否则在回调函数中无法访问实例化的对象
    setTimeout(() => {
      if (this.callback_ instanceof Function) {
        this.callback_(this.result_);
      }
    }, 100);
  }

  /**
   * 初始化时间配置
   */
  initTime_() {
    //开始时间
    this.startTime_ = Cesium.JulianDate.now();
    //过程秒数
    const seconds = this.sumTime_;
    //结束时间
    this.stopTime_ = Cesium.JulianDate.addSeconds(this.startTime_, seconds, new Cesium.JulianDate());
    this.viewer_.clock.startTime = this.startTime_.clone();
    this.viewer_.clock.stopTime = this.stopTime_.clone();
    this.viewer_.clock.currentTime = this.startTime_.clone();
    if (this.isLoop_) {
      this.viewer_.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 循环
    } else {
      this.viewer_.clock.clockRange = Cesium.ClockRange.CLAMPED; // 停止
    }

    this.viewer_.clock.multiplier = 1;
  }

  //初始化路径节点
  initNode_(points) {
    //循环坐标点
    for (let i = 0; i < points.length; i += 1) {

      //坐标的Cartesian3
      const positionT = Cesium.Cartesian3.fromDegrees(points[i][0], points[i][1]);
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
   * @return {module:utilscesium/Cruise~Result}
   */
  getResult() {
    return this.result_;
  }

  /**
   * 创建SampledPositionProperty
   * @param {Array<module:Cesium/Cartesian3>} positions 笛卡尔坐标集合
   */
  calculatePositionSamples_(positions) {
    if (positions !== undefined) {
      if (positions.constructor === Array) {
        let length = this.wholeDistance_(positions);
        const property = new Cesium.SampledPositionProperty();
        for (let since = 0; since < positions.length; since += 1) {
          let l = this.wholeDistance_(positions.slice(0, (since + 1)));
          property.addSample(Cesium.JulianDate.addSeconds(this.startTime_, this.sumTime_ * (l / length), new Cesium.JulianDate()), positions[since]);
        }
        return property;
      }
    }
    return undefined;
  }

  /**
   * 计算两点距离
   * @param {Cesium/Cartesian3} pnt1 点1
   * @param {Cesium/Cartesian3} pnt2 点2
   * @returns {Number} 2点距离
   */
  distance_(pnt1, pnt2) {
    return Math.sqrt(Math.pow((pnt1.x - pnt2.x), 2) + Math.pow((pnt1.y - pnt2.y), 2));
  }

  /**
   * 计算线段长度
   * @param {Array<Cesium/Cartesian3>} points 点集合
   * @returns {Number} 线段长度
   */
  wholeDistance_(points) {
    let distance2 = 0;
    for (var i = 0; i < points.length - 1; i++)
      distance2 += this.distance_(points[i], points[i + 1]);
    return distance2;
  }
}

/**
 * Cruise的结果
 * @typedef {Object} Result
 * @property {Array<Cesium/Entity>} Result.nodeEntities  路线节点的entity集合
 * @property {Cesium/Entity} Result.entity  模型与路线的entity对象
 */

export default Cruise;
