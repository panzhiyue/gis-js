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
 * 点绘制
 * @api
 */
var Point =
/*#__PURE__*/
function (_DrawModel) {
  _inherits(Point, _DrawModel);

  function Point(opt_options) {
    var _this;

    _classCallCheck(this, Point);

    var options = Object.assign({}, opt_options);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Point).call(this, options));
    _this.geometryType = _PlotTypes["default"].POINT;
    return _this;
  }
  /**
   * 绘图控件激活
   * @param {boolean} bool true:激活,false:取消
   */


  _createClass(Point, [{
    key: "setActive",
    value: function setActive(bool) {
      //定义事件对象
      if (!Cesium.defined(this.handler_)) {
        this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
      } //激活


      if (bool) {
        this.activeEvent.raiseEvent({
          type: "active"
        }); //单击鼠标左键画点

        this.handler_.setInputAction(function (event) {
          //获取点击的地图坐标点
          var position = this.screenPositionToCartesian(event.position);

          if (!Cesium.defined(position)) {
            return;
          } //触发开始绘制事件


          this.drawStart.raiseEvent({
            type: "drawStart"
          }); //触发结束绘制事件

          this.drawEnd.raiseEvent({
            type: "drawEnd",
            position: position
          });
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK);
      } else {
        //取消激活
        this.deActiveEvent.raiseEvent({
          type: "deActive"
        }); //注销事件对象

        if (Cesium.defined(this.handler_)) {
          this.handler_.destroy();
          this.handler_ = null;
        }
      }
    }
  }]);

  return Point;
}(_DrawModel2["default"]);

var _default = Point;
exports["default"] = _default;