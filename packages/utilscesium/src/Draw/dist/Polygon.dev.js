"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DrawModel2 = _interopRequireDefault(require("./DrawModel.js"));

var _PlotTypes = _interopRequireDefault(require("../Plot/PlotTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @classdesc
 * 多边形
 * @api
 */
var Polygon =
/*#__PURE__*/
function (_DrawModel) {
  _inherits(Polygon, _DrawModel);

  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {Cesium.PolylineGraphics} [opt_options.polygonGraphics] 样式
   * @param {number} [opt_options.minPointCount] 最小点数
   * @param {number} [opt_options.maxPointCount] 最大点数
   * @param {boolean} [opt_options.enableRight]  是否启用右键手绘
   * @param {boolean} [opt_options.autoStop]  当点大于最大点数时是否自动结束,若为false,最后一个点会被替换
   */
  function Polygon(opt_options) {
    var _this;

    _classCallCheck(this, Polygon);

    var options = Object.assign({
      polygonGraphics: {
        material: Cesium.Color.BLACK.withAlpha(0.4),
        outline: true,
        outlineWidth: 2,
        outlineColor: Cesium.Color.BLACK,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      minPointCount: 3,
      maxPointCount: Infinity,
      enableRight: false,
      autoStop: false
    }, opt_options);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Polygon).call(this, options));
    /**
     * 点集合
     * @type {Array<Cesium.Cartesian3>}
     */

    _this.positions_ = [];
    /**
     * 输入点集
     * @type {Array<Cesium.Cartesian3>}
     */

    _this.inputPositions_ = [];
    /**
     * 临时面对象
     * @type {module:Cesium/Entity}
     */

    _this.entity_ = undefined;
    /**
     * 面样式
     * @type {Cesium.PolygonGraphics}
     */

    _this.polygonGraphics_ = options.polygonGraphics;
    /**
     * 最大点数
     * @type {number}
     */

    _this.maxPointCount_ = options.maxPointCount;
    /**
     * 最小点数
     * @type {number}
     */

    _this.minPointCount_ = options.minPointCount;
    /**
     * 是否可以右键绘图
     * @type {boolean}
     */

    _this.enableRight_ = options.enableRight;
    /**
     * 当点大于最大点数时是否自动结束,若为false,最后一个点会被替换
     * @type {boolean}
     */

    _this.autoStop_ = options.autoStop;
    /**
     * 右键是否按下
     */

    _this.rightDown_ = false;
    _this.geometryType = _PlotTypes["default"].POLYLINE;
    return _this;
  }
  /**
   * 绘图控件激活
   * @param {boolean} bool true:激活,false:取消
   */


  _createClass(Polygon, [{
    key: "setActive",
    value: function setActive(bool) {
      //定义事件对象
      if (!Cesium.defined(this.handler_)) {
        this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
      } //激活


      if (bool) {
        this.activeEvent.raiseEvent({
          type: "active"
        }); //鼠标左键单击画点

        this.handler_.setInputAction(function (event) {
          this.addPoint_(event);
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK); //鼠标右键按下事件开始手绘

        this.handler_.setInputAction(function (event) {
          this.rightDown_ = true;
          this.viewer_.scene.screenSpaceCameraController.enableTranslate = false;
          this.viewer_.scene.screenSpaceCameraController.enableZoom = false;

          if (this.enableRight_ == true) {
            this.addPoint_(event);
          }
        }.bind(this), Cesium.ScreenSpaceEventType.RIGHT_DOWN); //鼠标右键弹出结束手绘

        this.handler_.setInputAction(function () {
          this.rightDown_ = false;
          this.viewer_.scene.screenSpaceCameraController.enableTranslate = true;
          this.viewer_.scene.screenSpaceCameraController.enableZoom = true;
        }.bind(this), Cesium.ScreenSpaceEventType.RIGHT_UP); //鼠标移动

        this.handler_.setInputAction(function (event) {
          //构建临时面对象
          var position = this.screenPositionToCartesian(event.endPosition);

          if (!Cesium.defined(position)) {
            return;
          }

          var positions = this.inputPositions_.concat();

          if (this.rightDown_ == true && this.enableRight_ == true) {
            positions = this.inputPositions_;
          }

          if (positions.length >= this.maxPointCount_) {
            positions.pop();
          }

          positions.push(position);

          if (positions.length >= 2) {
            //构建新的线
            this.draw_(this.calcPositions_(positions));
          }
        }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE); //双击鼠标左键结束

        this.handler_.setInputAction(function (event) {
          //大于等于最小点数时双击结束绘制
          if (this.inputPositions_.length >= this.minPointCount_) {
            this.stopDraw_();
          }
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK); //右键鼠标左键结束

        this.handler_.setInputAction(function (event) {
          //大于等于最小点数时双击结束绘制
          if (this.inputPositions_.length >= this.minPointCount_) {
            this.stopDraw_();
          }
        }.bind(this), Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      } else {
        this.deActiveEvent.raiseEvent({
          type: "deActive"
        }); //清空临时对象

        this.positions_ = [];
        this.inputPositions_ = [];
        this.viewer_.entities.remove(this.entity_);
        this.entity_ = null; //注销事件对象

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

  }, {
    key: "calcPositions_",
    value: function calcPositions_(positions) {
      return positions;
    }
    /**
     * 开始
     * @param {any} event
     */

  }, {
    key: "addPoint_",
    value: function addPoint_(event) {
      //添加点
      var position = this.screenPositionToCartesian(event.position);

      if (!Cesium.defined(position)) {
        return;
      } //触发开始绘制事件


      if (this.inputPositions_.length == 0) {
        this.drawStart.raiseEvent({
          type: "drawStart"
        });
      }

      if (this.inputPositions_.length == this.maxPointCount_) {
        this.inputPositions_.pop();
      }

      this.inputPositions_.push(position);

      if (this.inputPositions_.length >= this.maxPointCount_ && this.autoStop_ == true) {
        this.stopDraw_();
      }
    }
    /**
     * 停止绘画
     */

  }, {
    key: "stopDraw_",
    value: function stopDraw_() {
      //触发结束绘制事件
      this.drawEnd.raiseEvent({
        type: "drawEnd",
        positions: this.calcPositions_(this.inputPositions_),
        inputPositions: this.inputPositions_
      }); //清空临时对象

      this.positions_ = [];
      this.inputPositions_ = [];
      this.viewer_.entities.remove(this.entity_);
      this.entity_ = null;
    }
    /**
     * 根据点集绘制面
     * @param {any} positions  点集
     */

  }, {
    key: "draw_",
    value: function draw_(positions) {
      if (!positions || positions.length < 2) {
        return;
      }

      var positionsTemp = positions.concat();

      if (positionsTemp.length == 2) {
        positionsTemp.push(positionsTemp[0]);
      } //构建新的面


      if (!this.entity_) {
        this.polygonGraphics_.hierarchy = positionsTemp;
        this.entity_ = new Cesium.Entity({
          polygon: this.polygonGraphics_
        });
        this.viewer_.entities.add(this.entity_);
      } else {
        //刷新面的点集合
        this.entity_.polygon.hierarchy = new Cesium.CallbackProperty(function () {
          return {
            positions: positionsTemp
          };
        }, false);
      }
    }
  }]);

  return Polygon;
}(_DrawModel2["default"]);

var _default = Polygon;
exports["default"] = _default;