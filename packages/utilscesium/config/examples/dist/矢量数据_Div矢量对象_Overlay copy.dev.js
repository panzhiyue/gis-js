"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//设置token
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";
var viewer = new Cesium.Viewer("mapContainer", {
  animation: false,
  //如果设置为false，将不创建“动画”窗口小部件。
  homeButton: false,
  //如果设置为false，将不会创建HomeButton小部件。
  fullscreenButton: false,
  //如果设置为false，将不会创建FullscreenButton小部件。
  geocoder: false,
  //是否显示地名查找控件
  sceneModePicker: false,
  //是否显示投影方式控件
  baseLayerPicker: false,
  //如果设置为false，则不会创建BaseLayerPicker小部件。
  timeline: false,
  //是否显示时间线控件
  infoBox: false,
  //是否显示点击要素之后显示的信息
  navigationHelpButton: false,
  //如果设置为false，将不会创建导航帮助按钮。
  selectionIndicator: false //如果设置为false，则不会创建SelectionIndicator小部件。

}); // 隐藏Cesium自身的logo

viewer._cesiumWidget._creditContainer.style.display = "none";
var OverlayPositioning = utilscesium.OverlayPositioning;
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
      var viewer = manager ? manager.getViewer() : null;
      var position = this.getPosition();

      if (!viewer || !position) {
        this.setVisible(false);
        return;
      }

      var p = viewer.scene.cartesianToCanvasCoordinates(position);

      if (!Cesium.defined(p)) {
        console.error("p is undefined");
        return;
      } // const pixel = [p.x, p.y];
      // const mapSize = [
      //   viewer._cesiumWidget.canvas.width,
      //   viewer._cesiumWidget.canvas.height,
      // ];


      var matrix4 = this._getModelMatrix(position); // this.element.style = getCameraCSSMatrix(matrix4);


      console.log(matrix4);
      matrix4[1] = -matrix4[1];
      var a = "".concat(getObjectCSSMatrix(matrix4), " scale(10)"); // a =
      //   "matrix3d(-0.896498, -0.443048, 0, 0, 0.380016, -0.768953, -0.5141, 0, -0.227771, 0.46089, -0.85773, 0, -2.42616e+06, 4.90927e+06, 3.26023e+06, 1) scale(10)";

      this.element.style.transform = a; // console.log(this.element.style);
      // this.updateRenderedPosition(pixel, mapSize);
    }
  }, {
    key: "_getModelMatrix",
    value: function _getModelMatrix(position) {
      var heading = Cesium.Math.toRadians(this.heading_ || 0);
      var pitch = Cesium.Math.toRadians(this.pitch_ || 0);
      var roll = Cesium.Math.toRadians(this.roll_ || 0);
      var converter = Cesium.Transforms.eastNorthUpToFixedFrame;
      var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-80), 0, 0);
      console.log(position);
      var matrix4 = Cesium.Transforms.headingPitchRollToFixedFrame(position, hpr, Cesium.Ellipsoid.WGS84, null);
      console.log(position, hpr, Cesium.Ellipsoid.WGS84, null);
      console.log(matrix4); // return matrix4
      // console.log(Cesium.Matrix4.multiplyByScale(matrix4, 10));
      // let m = new Cesium.Matrix4();
      // Cesium.Matrix4.multiplyByScale(
      //   matrix4,
      //   new Cesium.Cartesian3(10, 10, 10),
      //   m
      // );

      return matrix4;
    }
  }, {
    key: "updateRenderedPosition",
    value: function updateRenderedPosition(pixel, mapSize) {// const style = this.element.style;
      // const offset = this.getOffset();
      // const positioning = this.getPositioning();
      // this.setVisible(true);
      // let offsetX = offset[0];
      // let offsetY = offset[1];
      // if (
      //   positioning == OverlayPositioning.BOTTOM_RIGHT ||
      //   positioning == OverlayPositioning.CENTER_RIGHT ||
      //   positioning == OverlayPositioning.TOP_RIGHT
      // ) {
      //   if (this.rendered.left_ !== "") {
      //     this.rendered.left_ = "";
      //     style.left = "";
      //   }
      //   const right = Math.round(mapSize[0] - pixel[0] - offsetX) + "px";
      //   if (this.rendered.right_ != right) {
      //     this.rendered.right_ = right;
      //     style.right = right;
      //   }
      // } else {
      //   if (this.rendered.right_ !== "") {
      //     this.rendered.right_ = "";
      //     style.right = "";
      //   }
      //   if (
      //     positioning == OverlayPositioning.BOTTOM_CENTER ||
      //     positioning == OverlayPositioning.CENTER_CENTER ||
      //     positioning == OverlayPositioning.TOP_CENTER
      //   ) {
      //     offsetX -= this.element.offsetWidth / 2;
      //   }
      //   const left = Math.round(pixel[0] + offsetX) + "px";
      //   if (this.rendered.left_ != left) {
      //     this.rendered.left_ = left;
      //     style.left = left;
      //   }
      // }
      // if (
      //   positioning == OverlayPositioning.BOTTOM_LEFT ||
      //   positioning == OverlayPositioning.BOTTOM_CENTER ||
      //   positioning == OverlayPositioning.BOTTOM_RIGHT
      // ) {
      //   if (this.rendered.top_ !== "") {
      //     this.rendered.top_ = "";
      //     style.top = "";
      //   }
      //   const bottom = Math.round(mapSize[1] - pixel[1] - offsetY) + "px";
      //   if (this.rendered.bottom_ != bottom) {
      //     this.rendered.bottom_ = bottom;
      //     style.bottom = bottom;
      //   }
      // } else {
      //   if (this.rendered.bottom_ !== "") {
      //     this.rendered.bottom_ = "";
      //     style.bottom = "";
      //   }
      //   if (
      //     positioning == OverlayPositioning.CENTER_LEFT ||
      //     positioning == OverlayPositioning.CENTER_CENTER ||
      //     positioning == OverlayPositioning.CENTER_RIGHT
      //   ) {
      //     offsetY -= this.element.offsetHeight / 2;
      //   }
      //   const top = Math.round(pixel[1] + offsetY) + "px";
      //   if (this.rendered.top_ != top) {
      //     this.rendered.top_ = "top";
      //     style.top = top;
      //   }
      // }
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

var Collection = utilscesium.Collection;
/**
 * @classdesc
 * 覆盖物管理类
 * @api
 */

var OverlayManager =
/*#__PURE__*/
function () {
  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {module:Cesium/Viewer} 查看器
   */
  function OverlayManager(opt_options) {
    _classCallCheck(this, OverlayManager);

    var options = Object.assign({
      viewer: undefined
    }, opt_options);
    this.viewer_ = options.viewer;
  }
  /**
   * 添加覆盖物
   * @param {module:utilscesium/Overlay} overlay 覆盖物
   */


  _createClass(OverlayManager, [{
    key: "addOverlay",
    value: function addOverlay(overlay) {
      var container = document.createElement("div");
      container.style = "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden;";
      var mapContainer = this.getViewer().container;
      var clientHeight = mapContainer["clientHeight"] / 0x2;
      var clientWidth = mapContainer["clientWidth"] / 0x2;
      var perspective = this.getViewer().scene.camera.frustum.projectionMatrix[5] * clientHeight;
      console.log(this.getViewer().scene.camera.frustum.projectionMatrix, perspective); //  let perspective= this.viewer_.scene.requestRenderMode.projectionMatrix[5]*1+'px'

      container.style.perspective = perspective + "px"; // console.log(perspective);

      this.viewer_.container.appendChild(container);

      if (!Cesium.defined(this.overlayContainer_)) {
        this.overlayContainer_ = document.createElement("div"); // this.overlayContainer_.style.position = "absolute";
        // this.overlayContainer_.style.zIndex = "0";

        this.overlayContainer_.style.transformStyle = "preserve-3d";
        this.overlayContainer_.style.width = "100%";
        this.overlayContainer_.style.height = "100%"; // this.overlayContainer_.style.top = "0";
        // this.overlayContainer_.style.left = "0";

        this.overlayContainer_.style.pointerEvents = "none";
        this.overlayContainer_.className = "cesium-overlaycontainer";
        container.appendChild(this.overlayContainer_);
      } // if (!Cesium.defined(this.overlayContainerStopEvent_)) {
      //   this.overlayContainerStopEvent_ = document.createElement("div");
      //   this.overlayContainerStopEvent_.style.position = "absolute";
      //   this.overlayContainerStopEvent_.style.zIndex = "0";
      //   this.overlayContainerStopEvent_.style.width = "100%";
      //   this.overlayContainerStopEvent_.style.height = "100%";
      //   this.overlayContainerStopEvent_.style.top = "0";
      //   this.overlayContainerStopEvent_.style.left = "0";
      //   this.overlayContainerStopEvent_.style.pointerEvents = "none";
      //   this.overlayContainerStopEvent_.className =
      //     "cesium-overlaycontainer-stopevent";
      //   container.appendChild(this.overlayContainerStopEvent_);
      // }


      if (!Cesium.defined(this.overlays_)) {
        this.overlays_ = new Collection();
        this.overlays_.addEvent_.addEventListener(function (event) {
          event.element.setManager(this); //   event.element.setContainer(
          //     event.element.stopEvent
          //       ? this.getOverlayContainerStopEvent()
          //       : this.getOverlayContainer()
          //   );
        }.bind(this));
        this.overlays_.removeEvent_.addEventListener(function (event) {
          var overlay = event.element;
          overlay.setManager(null);
        }.bind(this));
      }

      return this.getOverlays().push(overlay);
    }
    /**
     * 返回地图对象
     * @returns
     */

  }, {
    key: "getViewer",
    value: function getViewer() {
      return this.viewer_;
    }
    /**
     * 删除覆盖物
     * @param {module:utilscesium/Overlay} overlay 覆盖物
     */

  }, {
    key: "removeOverlay",
    value: function removeOverlay(overlay) {
      return this.getOverlays().remove(overlay);
    }
    /**
     * 获取不执行事件的覆盖物容器
     * @return {Element} 不执行事件的覆盖物容器
     */

  }, {
    key: "getOverlayContainerStopEvent",
    value: function getOverlayContainerStopEvent() {
      return this.overlayContainerStopEvent_;
    }
    /**
     * 获取覆盖物容器
     * @return {Element} 覆盖物容器
     */

  }, {
    key: "getOverlayContainer",
    value: function getOverlayContainer() {
      return this.overlayContainer_;
    }
    /**
     * 获取覆盖物列表
     * @return {module:utilscesium/Collection} 覆盖物列表
     */

  }, {
    key: "getOverlays",
    value: function getOverlays() {
      return this.overlays_;
    }
  }]);

  return OverlayManager;
}();

var _default = OverlayManager;
exports["default"] = _default;
var overlayManager = new OverlayManager({
  viewer: viewer
});
var element = document.createElement("div");
element.className = "marsBlueGradientPnl";
element.innerHTML = "<div>我是Overlay</div>";
var overlay = new Overlay({
  element: element,
  offset: [0, -60],
  positioning: "bottom-center"
});
overlayManager.addOverlay(overlay);
overlay.setPosition(Cesium.Cartesian3.fromDegrees(116.29854, 30.937322, 568.1)); // 将三维球定位到中国

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(116.318889, 30.769641, 7432.2),
  orientation: {
    heading: Cesium.Math.toRadians(1),
    pitch: Cesium.Math.toRadians(-19.6),
    roll: Cesium.Math.toRadians(0)
  },
  complete: function callback() {// 定位完成之后的回调函数
  }
});
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116.29854, 30.937322, 568.1),
  point: {
    pixelSize: 10,
    color: Cesium.Color.YELLOW
  }
});

function formatNum(_0x121ebc) {
  return Math["abs"](_0x121ebc) < 1e-10 ? 0x0 : _0x121ebc;
}

function getObjectCSSMatrix(_0x2532b3) {
  return "matrix3d(" + formatNum(_0x2532b3[0x0]) + "," + formatNum(_0x2532b3[0x1]) + "," + formatNum(_0x2532b3[0x2]) + "," + formatNum(_0x2532b3[0x3]) + "," + formatNum(-_0x2532b3[0x4]) + "," + formatNum(-_0x2532b3[0x5]) + "," + formatNum(-_0x2532b3[0x6]) + "," + formatNum(-_0x2532b3[0x7]) + "," + formatNum(_0x2532b3[0x8]) + "," + formatNum(_0x2532b3[0x9]) + "," + formatNum(_0x2532b3[0xa]) + "," + formatNum(_0x2532b3[0xb]) + "," + formatNum(_0x2532b3[0xc]) + "," + formatNum(_0x2532b3[0xd]) + "," + formatNum(_0x2532b3[0xe]) + "," + formatNum(_0x2532b3[0xf]) + ")";
}

function getCameraCSSMatrix(_0x481c86) {
  return "matrix3d(" + formatNum(_0x481c86[0x0]) + "," + formatNum(-_0x481c86[0x1]) + "," + formatNum(_0x481c86[0x2]) + "," + formatNum(_0x481c86[0x3]) + "," + formatNum(_0x481c86[0x4]) + "," + formatNum(-_0x481c86[0x5]) + "," + formatNum(_0x481c86[0x6]) + "," + formatNum(_0x481c86[0x7]) + "," + formatNum(_0x481c86[0x8]) + "," + formatNum(-_0x481c86[0x9]) + "," + formatNum(_0x481c86[0xa]) + "," + formatNum(_0x481c86[0xb]) + "," + formatNum(_0x481c86[0xc]) + "," + formatNum(-_0x481c86[0xd]) + "," + formatNum(_0x481c86[0xe]) + "," + formatNum(_0x481c86[0xf]) + ")";
}

setInterval(function () {
  var mapContainer = viewer.container;
  var clientHeight = mapContainer["clientHeight"] / 0x2;
  var clientWidth = mapContainer["clientWidth"] / 0x2;
  var perspective = viewer.scene.camera.frustum.projectionMatrix[5] * clientHeight;
  var a = "translateZ(".concat(perspective, "px) ").concat(getCameraCSSMatrix(viewer.camera.viewMatrix), " translate(").concat(clientWidth, "px, ").concat(clientHeight, "px)");
  overlayManager.overlayContainer_.style.transform = a;
  overlayManager.overlayContainer_.style.transformStyle = "preserve-3d";
}, 1000);