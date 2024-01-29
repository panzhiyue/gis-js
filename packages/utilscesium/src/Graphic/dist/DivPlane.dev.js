"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @module utilscesium/Graphic/DivPlane
 */
var Property = {
  ELEMENT: "element",
  LAYER: "layer",
  OFFSET: "offset",
  POSITION: "position",
  VISIBLE: "visible"
};
/**
 * @classdesc
 * 覆盖物(参考openlayers,基础功能已经实现)
 * @api
 */

var DivPlane =
/*#__PURE__*/
function () {
  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {Element} [opt_options.element] html元素
   * @param {offset} [opt_options.offset]  偏移
   * @param {boolean} [opt_options.stopEvent]
   * @param {boolean} [opt_options.insertFirst] 是否插入首位
   * @param {Number} [opt_options.heading]
   * @param {Number} [opt_options.pitch]
   * @param {Number} [opt_options.roll]
   * @param {Number} [opt_options.scale]
   * @param {boolean} [opt_options.visible] 是否显示
   * @param {module:Cesium.HorizontalOrigin} [opt_options.horizontalOrigin]
   * @param {module:Cesium.VerticalOrigin} [opt_options.verticalOrigin]
   */
  function DivPlane(opt_options) {
    _classCallCheck(this, DivPlane);

    var options = Object.assign({
      element: null,
      offset: null,
      stopEvent: false,
      insertFirst: false,
      heading: 0,
      pitch: 0,
      roll: 0,
      scale: 1,
      visible: true,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    }, opt_options);
    this.prototype = {};
    this.insertFirst_ = options.insertFirst;
    this.stopEvent_ = options.stopEvent;
    this.heading_ = options.heading;
    this.pitch_ = options.pitch;
    this.roll_ = options.roll;
    this.scale_ = options.scale;
    this.horizontalOrigin_ = options.horizontalOrigin;
    this.verticalOrigin_ = options.verticalOrigin;
    this.graphic_container_ = document.createElement("div");
    this.graphic_container_.className = options.className !== undefined ? options.className : "utilscesium-divGraphic";
    this.graphic_container_.style.position = "absolute";
    this.graphic_container_.style.pointerEvents = this.stopEvent_ ? "none" : "auto";
    console.log(this.stopEvent_, this.stopEvent_ ? "none" : "auto");
    this.graphic_container_m_ = document.createElement("div");
    this.graphic_container_m_.className = "utilscesium-divGraphic-m";
    this.graphic_container_m_.style.position = "absolute";
    this.graphic_container_.appendChild(this.graphic_container_m_);
    this.rendered = {
      visible: true
    };
    this.changedelement = new Cesium.Event();
    this.changedelement.addEventListener(this.handleElementChanged.bind(this));
    this.changedoffset = new Cesium.Event();
    this.changedoffset.addEventListener(this.handleOffsetChanged.bind(this));
    this.changedposition = new Cesium.Event();
    this.changedposition.addEventListener(this.handlePositionChanged.bind(this));
    this.changedlayer = new Cesium.Event();
    this.changedlayer.addEventListener(this.handleLayerChanged.bind(this));

    if (Cesium.defined(options.element)) {
      this.setElement(options.element);
    }

    this.setOffset(options.offset);

    if (Cesium.defined(options.position)) {
      this.setPosition(options.position);
    }

    this.setVisible(options.visible);
    this.graphic_container_m_.style.transform = "".concat(this._getTemplateTranslate());
  }

  _createClass(DivPlane, [{
    key: "getElement",
    value: function getElement() {
      return this.get(Property.ELEMENT);
    }
  }, {
    key: "getLayer",
    value: function getLayer() {
      return this.get(Property.LAYER);
    }
  }, {
    key: "getOffset",
    value: function getOffset() {
      return this.get(Property.OFFSET);
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.get(Property.POSITION);
    }
  }, {
    key: "getVisible",
    value: function getVisible() {
      return this.get(Property.VISIBLE);
    }
  }, {
    key: "handleElementChanged",
    value: function handleElementChanged() {
      this.graphic_container_m_.innerHTML = "";
      var element = this.getElement();

      if (element) {
        this.graphic_container_m_.appendChild(element);
      }
    }
    /**
     * 获取偏移
     *
     * @memberof DivPlane
     */

  }, {
    key: "_getTemplateTranslate",
    value: function _getTemplateTranslate() {
      var offsetX = 0,
          offsetY = 0;

      switch (this.horizontalOrigin_) {
        case "CENTER":
        case Cesium.HorizontalOrigin.CENTER:
          {
            offsetX = "-50%";
            break;
          }

        case "RIGHT":
        case Cesium.HorizontalOrigin.RIGHT:
          {
            offsetX = "-100%";
            break;
          }

        case "LEFT":
        case Cesium.HorizontalOrigin.LEFT:
          {
            offsetX = "0";
            break;
          }
      }

      switch (this.verticalOrigin_) {
        case "TOP":
        case Cesium.VerticalOrigin.TOP:
          {
            offsetY = "0";
            break;
          }

        case "CENTER":
        case Cesium.VerticalOrigin.CENTER:
          {
            offsetY = "-50%";
            break;
          }

        case "BOTTOM":
        case Cesium.VerticalOrigin.BOTTOM:
          {
            offsetY = "-100%";
            break;
          }
      }

      if (this.getOffset()) {
        offsetX = "calc(".concat(offsetX, " + ").concat(this.getOffset()[0], "px)");
        offsetY = "calc(".concat(offsetY, " + ").concat(this.getOffset()[1], "px)");
      }

      return "translateX(".concat(offsetX, ") translateY(").concat(offsetY, ")");
    }
    /**
     * @protected
     */

  }, {
    key: "handleLayerChanged",
    value: function handleLayerChanged() {
      var layer = this.getLayer();
      var viewer = layer ? layer.getViewer() : null;

      if (!viewer) {
        return;
      }

      if (viewer) {
        viewer.scene.postRender.addEventListener(this.render.bind(this));
        this.updatePixelPosition();
        var container = layer.getCameraContainer();

        if (this.insertFirst_) {
          container.insertBefore(this.graphic_container_, container.childNodes[0] || null);
        } else {
          container.appendChild(this.graphic_container_);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.updatePixelPosition();
    }
  }, {
    key: "handleOffsetChanged",
    value: function handleOffsetChanged() {
      this.updatePixelPosition();
    }
  }, {
    key: "handlePositionChanged",
    value: function handlePositionChanged() {
      this.updatePixelPosition();
    }
  }, {
    key: "setElement",
    value: function setElement(element) {
      this.set(Property.ELEMENT, element);
    }
    /**
     * 绑定图层
     * @param {module:cesium/Layer/GraphicLayer} layer
     */

  }, {
    key: "setLayer",
    value: function setLayer(layer) {
      this.set(Property.LAYER, layer);
    }
    /**
     * 设置覆盖物偏移
     * @param {number[]} offset
     */

  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this.set(Property.OFFSET, offset);
    }
    /**
     * 设置覆盖物位置（[经度，纬度]），如果为undefined 则隐藏
     * @param {*} position
     */

  }, {
    key: "setPosition",
    value: function setPosition(position) {
      this.set(Property.POSITION, position);
    }
    /**
     * 设置覆盖物显示
     * @param {*} visible
     */

  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      if (this.getVisible() !== visible) {
        this.graphic_container_.style.display = visible ? "block" : "none";
        this.set(Property.VISIBLE, visible);
      }
    }
  }, {
    key: "updatePixelPosition",
    value: function updatePixelPosition() {
      var layer = this.getLayer();
      var viewer = layer ? layer.getViewer() : null;
      var position = this.getPosition();

      if (!viewer || !position) {
        //   this.setVisible(false);
        return;
      }

      var p = viewer.scene.cartesianToCanvasCoordinates(position);

      if (!Cesium.defined(p)) {
        console.error("p is undefined");
        return;
      }

      var matrix4 = this._getModelMatrix(position);

      var str = "".concat(getObjectCSSMatrix(matrix4), " scale(").concat(this.scale_, ") ");
      this.graphic_container_.style.transform = str;
    }
  }, {
    key: "_getModelMatrix",
    value: function _getModelMatrix(position) {
      var heading = this.heading_ || 0;
      var pitch = this.pitch_ || 0;
      var roll = this.roll_ || 0;
      var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(heading), Cesium.Math.toRadians(pitch), Cesium.Math.toRadians(roll));
      var matrix4 = Cesium.Transforms.headingPitchRollToFixedFrame(position, hpr, Cesium.Ellipsoid.WGS84, null);
      return matrix4;
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.prototype[name];
    }
  }, {
    key: "set",
    value: function set(name, value) {
      this.prototype[name] = value;

      if (Cesium.defined(this["changed" + name])) {
        this["changed" + name].raiseEvent({
          type: "changed" + name
        });
      }
    }
  }]);

  return DivPlane;
}();

var _default = DivPlane;
exports["default"] = _default;

function formatNum(_0x121ebc) {
  return Math["abs"](_0x121ebc) < 1e-10 ? 0x0 : _0x121ebc;
}

function getObjectCSSMatrix(_0x2532b3) {
  return "matrix3d(" + formatNum(_0x2532b3[0x0]) + "," + formatNum(_0x2532b3[0x1]) + "," + formatNum(_0x2532b3[0x2]) + "," + formatNum(_0x2532b3[0x3]) + "," + formatNum(-_0x2532b3[0x4]) + "," + formatNum(-_0x2532b3[0x5]) + "," + formatNum(-_0x2532b3[0x6]) + "," + formatNum(-_0x2532b3[0x7]) + "," + formatNum(_0x2532b3[0x8]) + "," + formatNum(_0x2532b3[0x9]) + "," + formatNum(_0x2532b3[0xa]) + "," + formatNum(_0x2532b3[0xb]) + "," + formatNum(_0x2532b3[0xc]) + "," + formatNum(_0x2532b3[0xd]) + "," + formatNum(_0x2532b3[0xe]) + "," + formatNum(_0x2532b3[0xf]) + ")";
}