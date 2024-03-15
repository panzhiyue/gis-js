"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @module utilscesium/Draw/DrawModel
 */
var drawStart_ = Symbol("drawStart_");
var drawEnd_ = Symbol("drawEnd_");
var activeEvent_ = Symbol("activeEvent_");
var deActiveEvent_ = Symbol("deActiveEvent_");
/**
 * @classdesc
 * 图形绘制模板
 * @api
 */

var DrawModel =
/*#__PURE__*/
function () {
  function DrawModel(opt_options) {
    _classCallCheck(this, DrawModel);

    /**
     *  开始绘制事件
     *  @type {Cesium.Event}
     */
    this[drawStart_] = new Cesium.Event();
    /**
     * 绘制结束时间
     * @type {Cesium.Event}
     */

    this[drawEnd_] = new Cesium.Event();
    /**
     * 激活事件
     * @type {Cesium.Event}
     */

    this[activeEvent_] = new Cesium.Event();
    /**
     * 取消激活事件
     * @type {Cesium.Event}
     */

    this[deActiveEvent_] = new Cesium.Event();
    /**
     * 定义为私有事件
     */

    Object.defineProperties(this, {
      drawStart: {
        get: function get() {
          return this[drawStart_];
        }
      },
      drawEnd: {
        get: function get() {
          return this[drawEnd_];
        }
      },
      activeEvent: {
        get: function get() {
          return this[activeEvent_];
        }
      },
      deActiveEvent: {
        get: function get() {
          return this[deActiveEvent_];
        }
      }
    });
  }
  /**
   * 绑定viewer
   * @param {module:Cesium/Viewer} viewer
   */


  _createClass(DrawModel, [{
    key: "setViewer",
    value: function setViewer(viewer) {
      this.viewer_ = viewer;
    }
    /**
     * 绘图控件激活
     * @param {boolean} bool true:激活,false:取消
     */

  }, {
    key: "setActive",
    value: function setActive(bool) {
      if (!this.handler_) {
        this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
      }

      if (bool) {} else {}
    }
    /**
     * 获取类型
     * @returns {PlotTypes}
     */

  }, {
    key: "getType",
    value: function getType() {
      return this.geometryType;
    }
    /**
     * 屏幕坐标转笛卡尔坐标
     * @param {Position} screenPosition 屏幕坐标
     * @return {Position} 笛卡尔坐标
     */

  }, {
    key: "screenPositionToCartesian",
    value: function screenPositionToCartesian(screenPosition) {
      var ray = this.viewer_.camera.getPickRay(screenPosition);
      var position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);

      if (!position) {
        position = this.viewer_.scene.pickPosition(screenPosition);
      }

      return position;
    }
  }]);

  return DrawModel;
}();

var _default = DrawModel;
exports["default"] = _default;