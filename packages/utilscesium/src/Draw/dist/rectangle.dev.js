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
 * 矩形
 * @api
 */
var Rectangle =
/*#__PURE__*/
function (_DrawModel) {
  _inherits(Rectangle, _DrawModel);

  function Rectangle(opt_options) {
    var _this;

    _classCallCheck(this, Rectangle);

    var options = Object.assign({
      rectangleGraphics: {
        material: Cesium.Color.BLACK.withAlpha(0.4),
        outline: true,
        outlineWidth: 2,
        outlineColor: Cesium.Color.RED,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    }, opt_options);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).call(this, options));
    _this.positions_ = [];
    _this.poly_ = undefined;
    /**
     * 矩形样式
     * @type {Cesium.RectangleGraphics}
     */

    _this.rectangleGraphics_ = options.rectangleGraphics;
    _this.geometryType = _PlotTypes["default"].RECTANGLE;
    return _this;
  }
  /**
  * 绘图控件激活
  * @param {boolean} bool true:激活,false:取消
  */


  _createClass(Rectangle, [{
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
          if (this.positions_.length == 0) {
            this.drawStart.raiseEvent({
              type: "drawStart"
            });
            var position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.screenPositionToCartesian(event.position));
            this.positions_.push(position);
          }
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK); //鼠标移动

        this.handler_.setInputAction(function (event) {
          if (this.positions_.length == 0) {
            return;
          }

          var position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.screenPositionToCartesian(event.endPosition));
          var rect = Cesium.Rectangle.fromCartographicArray([position, this.positions_[0]]);

          if (!this.poly_) {
            this.rectangleGraphics_.coordinates = rect;
            this.poly_ = new Cesium.Entity({
              rectangle: this.rectangleGraphics_
            });
            this.viewer_.entities.add(this.poly_);
          } else {
            this.poly_.rectangle.coordinates = new Cesium.CallbackProperty(function () {
              return rect;
            }, false);
            ;
          }
        }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE); //双击鼠标左键结束

        this.handler_.setInputAction(function (event) {
          if (this.positions_.length == 1) {
            var position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.screenPositionToCartesian(event.position));
            var rect = Cesium.Rectangle.fromCartographicArray([position, this.positions_[0]]);
            this.drawEnd.raiseEvent({
              type: "drawEnd",
              rect: rect
            });
            this.positions_ = [];
            this.viewer_.entities.remove(this.poly_);
            this.poly_ = null;
          }
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      } else {
        this.deActiveEvent.raiseEvent({
          type: "deActive"
        });

        if (Cesium.defined(this.handler_)) {
          this.handler_.destroy();
          this.handler_ = null;
          this.positions_ = [];

          if (Cesium.defined) {
            this.viewer_.entities.remove(this.poly_);
            this.poly_ = null;
          }
        }
      }
    }
  }]);

  return Rectangle;
}(_DrawModel2["default"]);

var _default = Rectangle;
exports["default"] = _default;