"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _OverlayPositioning = _interopRequireDefault(require("./OverlayPositioning.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Property = {
  ELEMENT: "element",
  MANAGER: "manager",
  OFFSET: "offset",
  POSITION: "position",
  POSITIONING: "positioning"
};
/**
 * @classdesc
 * 覆盖物(参考openlayers,基础功能已经实现)
 * @api
 */

var Overlay =
/*#__PURE__*/
function () {
  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {Element} [opt_options.element] html元素
   * @param {offset} [opt_options.offset]  偏移
   * @param {utilscesium.OverlayPositioning} [opt_options.positioning]  覆盖物相对点的位置
   * @param {boolean} [opt_options.stopEvent]
   * @param {boolean} [opt_options.insertFirst] 是否插入首位
   * @param {boolean} [opt_options.autoPan]
   * @param {Object} [opt_options.autoPanAnimation]
   * @param {number} [opt_options.autoPanMargin]
   */
  function Overlay(opt_options) {
    _classCallCheck(this, Overlay);

    var options = Object.assign({
      element: null,
      offset: [0, 0],
      positioning: "center-left",
      stopEvent: false,
      insertFirst: false,
      autoPan: false,
      autoPanAnimation: {},
      autoPanMargin: 20
    }, opt_options);
    this.prototype = {};
    this.id = options.id;
    this.insertFirst = options.insertFirst;
    this.stopEvent = options.stopEvent;
    this.element = document.createElement("div");
    this.element.className = options.className !== undefined ? options.className : "cesium-overlay-container ol-selectable";
    this.element.style.position = "absolute";
    this.element.style.pointerEvents = "auto";
    this.autoPan = options.autoPan;
    this.autoPanAnimation = options.autoPanAnimation;
    this.autoPanMargin = options.autoPanMargin;
    this.rendered = {
      bottom_: "",
      left_: "",
      right_: "",
      top_: "",
      visible: true
    };
    this.changedelement = new Cesium.Event();
    this.changedelement.addEventListener(this.handleElementChanged.bind(this));
    this.changedoffset = new Cesium.Event();
    this.changedoffset.addEventListener(this.handleOffsetChanged.bind(this));
    this.changedposition = new Cesium.Event();
    this.changedposition.addEventListener(this.handlePositionChanged.bind(this));
    this.changedpositioning = new Cesium.Event();
    this.changedpositioning.addEventListener(this.handlePositioningChanged.bind(this));
    this.changedmanager = new Cesium.Event();
    this.changedmanager.addEventListener(this.handleManagerChanged.bind(this));

    if (Cesium.defined(options.element)) {
      this.setElement(options.element);
    }

    this.setOffset(Cesium.defined(options.offset) ? options.offset : [0, 0]);
    this.setPositioning(Cesium.defined(options.positioning) ? options.positioning : "top-left");

    if (Cesium.defined(options.position)) {
      this.setPosition(options.position);
    }
  }

  _createClass(Overlay, [{
    key: "getElement",
    value: function getElement() {
      return this.get(Property.ELEMENT);
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "getManager",
    value: function getManager() {
      return this.get(Property.MANAGER);
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
    key: "getPositioning",
    value: function getPositioning() {
      return this.get(Property.POSITIONING);
    }
  }, {
    key: "handleElementChanged",
    value: function handleElementChanged() {
      this.element.innerHTML = "";
      var element = this.getElement();

      if (element) {
        this.element.appendChild(element);
      }
    }
    /**
     * @protected
     */

  }, {
    key: "handleManagerChanged",
    value: function handleManagerChanged() {
      var manager = this.getManager();
      var viewer = manager.getViewer();

      if (viewer) {
        viewer.scene.postRender.addEventListener(this.render.bind(this)); //viewer.scene.postUpdate.addEventListener(this.render.bind(this));

        this.updatePixelPosition();
        var container = this.stopEvent ? manager.getOverlayContainerStopEvent() : manager.getOverlayContainer();

        if (this.insertFirst) {
          container.insertBefore(this.element, container.childNodes[0] || null);
        } else {
          container.appendChild(this.element);
        }
      }
    } // setContainer(container) {
    //   if (this.insertFirst) {
    //     container.insertBefore(this.element, container.childNodes[0] || null);
    //   } else {
    //     container.appendChild(this.element);
    //   }
    // }

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
      this.updatePixelPosition(); //if (this.get(Property.POSITION) && this.autoPan) {
      //    this.panIntoView();
      //}
    }
  }, {
    key: "handlePositioningChanged",
    value: function handlePositioningChanged() {
      this.updatePixelPosition();
    }
  }, {
    key: "setElement",
    value: function setElement(element) {
      this.set(Property.ELEMENT, element);
    }
    /**
     * 绑定manager
     * @param {module:cesium/Manager/OverlayManager} manager
     */

  }, {
    key: "setManager",
    value: function setManager(manager) {
      console.log(manager);
      this.set(Property.MANAGER, manager);
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
     * 设置覆盖物定位
     * @param {*} positioning
     */

  }, {
    key: "setPositioning",
    value: function setPositioning(positioning) {
      this.set(Property.POSITIONING, positioning);
    }
    /**
     * 设置覆盖物显示
     * @param {*} visible
     */

  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      if (this.rendered.visible !== visible) {
        this.element.style.display = visible ? "" : "none";
        this.rendered.visible = visible;
      }
    }
  }, {
    key: "updatePixelPosition",
    value: function updatePixelPosition() {
      var manager = this.getManager();
      console.log(manager);
      var viewer = manager ? manager.getViewer() : null;
      var position = this.getPosition();

      if (!viewer || !position) {
        this.setVisible(false);
        return;
      }

      console.log(position);
      var p = viewer.scene.cartesianToCanvasCoordinates(position);

      if (!Cesium.defined(p)) {
        console.error("p is undefined");
        return;
      }

      var pixel = [p.x, p.y];
      var mapSize = [viewer._cesiumWidget.canvas.width, viewer._cesiumWidget.canvas.height];
      this.updateRenderedPosition(pixel, mapSize);
    }
  }, {
    key: "updateRenderedPosition",
    value: function updateRenderedPosition(pixel, mapSize) {
      var style = this.element.style;
      var offset = this.getOffset();
      var positioning = this.getPositioning();
      this.setVisible(true);
      var offsetX = offset[0];
      var offsetY = offset[1];

      if (positioning == _OverlayPositioning["default"].BOTTOM_RIGHT || positioning == _OverlayPositioning["default"].CENTER_RIGHT || positioning == _OverlayPositioning["default"].TOP_RIGHT) {
        if (this.rendered.left_ !== "") {
          this.rendered.left_ = "";
          style.left = "";
        }

        var right = Math.round(mapSize[0] - pixel[0] - offsetX) + "px";

        if (this.rendered.right_ != right) {
          this.rendered.right_ = right;
          style.right = right;
        }
      } else {
        if (this.rendered.right_ !== "") {
          this.rendered.right_ = "";
          style.right = "";
        }

        if (positioning == _OverlayPositioning["default"].BOTTOM_CENTER || positioning == _OverlayPositioning["default"].CENTER_CENTER || positioning == _OverlayPositioning["default"].TOP_CENTER) {
          offsetX -= this.element.offsetWidth / 2;
        }

        var left = Math.round(pixel[0] + offsetX) + "px";

        if (this.rendered.left_ != left) {
          this.rendered.left_ = left;
          style.left = left;
        }
      }

      if (positioning == _OverlayPositioning["default"].BOTTOM_LEFT || positioning == _OverlayPositioning["default"].BOTTOM_CENTER || positioning == _OverlayPositioning["default"].BOTTOM_RIGHT) {
        if (this.rendered.top_ !== "") {
          this.rendered.top_ = "";
          style.top = "";
        }

        var bottom = Math.round(mapSize[1] - pixel[1] - offsetY) + "px";

        if (this.rendered.bottom_ != bottom) {
          this.rendered.bottom_ = bottom;
          style.bottom = bottom;
        }
      } else {
        if (this.rendered.bottom_ !== "") {
          this.rendered.bottom_ = "";
          style.bottom = "";
        }

        if (positioning == _OverlayPositioning["default"].CENTER_LEFT || positioning == _OverlayPositioning["default"].CENTER_CENTER || positioning == _OverlayPositioning["default"].CENTER_RIGHT) {
          offsetY -= this.element.offsetHeight / 2;
        }

        var top = Math.round(pixel[1] + offsetY) + "px";

        if (this.rendered.top_ != top) {
          this.rendered.top_ = "top";
          style.top = top;
        }
      }
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

  return Overlay;
}();

var _default = Overlay;
exports["default"] = _default;