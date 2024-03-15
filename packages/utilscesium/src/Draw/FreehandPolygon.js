/**
 * @module utilscesium/Draw/FreehandPolygon
 */

import Polygon from "./Polygon.js";
import PlotTypes from "../Plot/PlotTypes";

/**
 * @classdesc
 * 手绘多边形
 * @api
 */
class FreehandPolygon extends Polygon {
  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {Cesium.PolylineGraphics} [opt_options.polygonGraphics] 样式
   * @param {number} [opt_options.minPointCount] 最小点数
   * @param {number} [opt_options.maxPointCount] 最大点数
   * @param {boolean} [opt_options.autoStop]  当点大于最大点数时是否自动结束,若为false,最后一个点会被替换
   */
  constructor(opt_options) {
    let options = Object.assign(
      {
        polygonGraphics: {
          material: Cesium.Color.GREEN.withAlpha(1),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        minPointCount: 3,
        maxPointCount: Infinity,
        autoStop: false,
      },
      opt_options
    );

    super(options);

    /**
     * 点集合
     * @type {Array<Cesium.Cartesian3>}
     */
    this.positions_ = [];

    /**
     * 输入点集
     * @type {Array<Cesium.Cartesian3>}
     */
    this.inputPositions_ = [];

    /**
     * 临时面对象
     * @type {module:Cesium/Entity}
     */
    this.entity_ = undefined;

    /**
     * 面样式
     * @type {Cesium.PolygonGraphics}
     */
    this.polygonGraphics_ = options.polygonGraphics;

    /**
     * 最大点数
     * @type {number}
     */
    this.maxPointCount_ = options.maxPointCount;

    /**
     * 最小点数
     * @type {number}
     */
    this.minPointCount_ = options.minPointCount;

    /**
     * 当点大于最大点数时是否自动结束,若为false,最后一个点会被替换
     * @type {boolean}
     */
    this.autoStop_ = options.autoStop;

    /**
     * 右键是否按下
     */
    this.rightDown_ = false;

    this.geometryType = PlotTypes.FREEHAND_POLYGON;
  }
  /**
   * 绘图控件激活
   * @param {boolean} bool true:激活,false:取消
   */
  setActive(bool) {
    //定义事件对象
    if (!Cesium.defined(this.handler_)) {
      this.handler_ = new Cesium.ScreenSpaceEventHandler(
        this.viewer_.scene.canvas
      );
    }
    //激活
    if (bool) {
      this.activeEvent.raiseEvent({ type: "active" });
      //鼠标左键单击画点
      this.handler_.setInputAction(
        function(event) {
          this.viewer_.scene.screenSpaceCameraController.enableTranslate = false;
          this.viewer_.scene.screenSpaceCameraController.enableZoom = false;
          this.addPoint_(event);
        }.bind(this),
        Cesium.ScreenSpaceEventType.RIGHT_DOWN
      );

      //鼠标右键弹出结束手绘
      this.handler_.setInputAction(
        function() {
          this.viewer_.scene.screenSpaceCameraController.enableTranslate = true;
          this.viewer_.scene.screenSpaceCameraController.enableZoom = true;
          //大于等于最小点数时双击结束绘制
          if (this.inputPositions_.length >= this.minPointCount_) {
            this.stopDraw_();
          }
        }.bind(this),
        Cesium.ScreenSpaceEventType.RIGHT_UP
      );

      //鼠标移动
      this.handler_.setInputAction(
        function(event) {
          if (this.inputPositions_.length == 0) {
            return;
          }
          //构建临时面对象
          let position = this.screenPositionToCartesian(event.endPosition);

          if (!Cesium.defined(position)) {
            return;
          }
          let positions = this.inputPositions_;

          if (positions.length >= this.maxPointCount_) {
            positions.pop();
          }
          positions.push(position);
          if (positions.length >= 2) {
            //构建新的线
            this.draw_(this.calcPositions_(positions));
          }
        }.bind(this),
        Cesium.ScreenSpaceEventType.MOUSE_MOVE
      );
    } else {
      this.deActiveEvent.raiseEvent({ type: "deActive" });
      //注销事件对象
      if (Cesium.defined(this.handler_)) {
        this.handler_.destroy();
        this.handler_ = null;
      }
    }
  }
  /**
   * 根据绘制点计算图上点
   * 子类构造时需要重写
   * @param {any} positions
   */
  calcPositions_(positions) {
    return positions;
  }
  /**
   * 开始
   * @param {any} event
   */
  addPoint_(event) {
    //添加点
    let position = this.screenPositionToCartesian(event.position);
    if (!Cesium.defined(position)) {
      return;
    }
    //触发开始绘制事件
    if (this.inputPositions_.length == 0) {
      this.drawStart.raiseEvent({ type: "drawStart" });
    }

    if (this.inputPositions_.length == this.maxPointCount_) {
      this.inputPositions_.pop();
    }
    this.inputPositions_.push(position);
    if (
      this.inputPositions_.length >= this.maxPointCount_ &&
      this.autoStop_ == true
    ) {
      this.stopDraw_();
    }
  }

  /**
   * 停止绘画
   */
  stopDraw_() {
    //触发结束绘制事件
    this.drawEnd.raiseEvent({
      type: "drawEnd",
      positions: this.calcPositions_(this.inputPositions_),
      inputPositions: this.inputPositions_,
    });
    //清空临时对象
    this.positions_ = [];
    this.inputPositions_ = [];
    this.viewer_.entities.remove(this.entity_);
    this.entity_ = null;
  }

  /**
   * 根据点集绘制面
   * @param {any} positions  点集
   */
  draw_(positions) {
    if (!positions || positions.length < 2) {
      return;
    }
    let positionsTemp = positions.concat();

    if (positionsTemp.length == 2) {
      positionsTemp.push(positionsTemp[0]);
    }

    //构建新的面
    if (!this.entity_) {
      this.polygonGraphics_.hierarchy = positionsTemp;
      this.entity_ = new Cesium.Entity({
        polygon: this.polygonGraphics_,
      });
      this.viewer_.entities.add(this.entity_);
    } else {
      //刷新面的点集合
      this.entity_.polygon.hierarchy = new Cesium.CallbackProperty(function() {
        return { positions: positionsTemp };
      }, false);
    }
  }
}

export default FreehandPolygon;
