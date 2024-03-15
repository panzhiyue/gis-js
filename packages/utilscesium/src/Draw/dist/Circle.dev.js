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
 * 圆绘制
 * @api
 */
var Circle =
/*#__PURE__*/
function (_DrawModel) {
  _inherits(Circle, _DrawModel);

  function Circle(opt_options) {
    var _this;

    _classCallCheck(this, Circle);

    var options = Object.assign({
      ellipseGraphics: {
        material: Cesium.Color.BLACK.withAlpha(0.4),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    }, opt_options);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, options));
    _this.entity_ = undefined;
    _this.radius_ = undefined;
    /**
     * 矩形样式
     * @type {Cesium.RectangleGraphics}
     */

    _this.ellipseGraphics_ = options.ellipseGraphics;
    _this.geometryType = _PlotTypes["default"].CIRCLE;
    return _this;
  }
  /**
   * 绘图控件激活
   * @param {boolean} bool true:激活,false:取消
   */


  _createClass(Circle, [{
    key: "setActive",
    value: function setActive(bool) {
      if (!Cesium.defined(this.handler_)) {
        this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
      }

      if (bool) {
        this.activeEvent.raiseEvent({
          type: "active"
        }); //鼠标左键单击画点

        this.handler_.setInputAction(function (event) {
          if (!Cesium.defined(this.radius_)) {
            this.drawStart.raiseEvent({
              type: "drawStart"
            });
            this.position_ = this.screenPositionToCartesian(event.position);
          }
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK); //鼠标移动

        this.handler_.setInputAction(function (event) {
          if (!Cesium.defined(this.position_)) {
            return;
          }

          var position = this.screenPositionToCartesian(event.endPosition);

          if (!Cesium.defined(position)) {
            return;
          }

          var point1cartographic = Cesium.Cartographic.fromCartesian(this.position_);
          var point2cartographic = Cesium.Cartographic.fromCartesian(position);
          /**根据经纬度计算出距离**/

          var geodesic = new Cesium.EllipsoidGeodesic();
          geodesic.setEndPoints(point1cartographic, point2cartographic);
          this.radius_ = geodesic.surfaceDistance;

          if (!this.entity_) {
            this.ellipseGraphics_.semiMinorAxis = this.radius_;
            this.ellipseGraphics_.semiMajorAxis = this.radius_;
            this.entity_ = new Cesium.Entity({
              position: this.position_,
              ellipse: this.ellipseGraphics_
            });
            this.viewer_.entities.add(this.entity_);
          } else {
            this.entity_.ellipse.semiMinorAxis = new Cesium.CallbackProperty(function () {
              return this.radius_;
            }.bind(this), false);
            this.entity_.ellipse.semiMajorAxis = new Cesium.CallbackProperty(function () {
              return this.radius_;
            }.bind(this), false);
          }
        }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE); //双击鼠标左键结束

        this.handler_.setInputAction(function (event) {
          if (!Cesium.defined(this.position_) || !Cesium.defined(this.radius_)) {
            return;
          }

          this.drawEnd.raiseEvent({
            type: "drawEnd",
            position: this.position_,
            radius: this.radius_
          });
          this.viewer_.entities.remove(this.entity_);
          this.entity_ = null;
          this.position_ = null;
          this.radius_ = null;
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      } else {
        this.deActiveEvent.raiseEvent({
          type: "deActive"
        });

        if (Cesium.defined(this.handler_)) {
          this.handler_.destroy();
          this.handler_ = null;
        }
      }
    }
  }]);

  return Circle;
}(_DrawModel2["default"]);

var _default = Circle;
exports["default"] = _default;