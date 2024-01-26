//设置token
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc";

var viewer = new Cesium.Viewer("mapContainer", {
  animation: false, //如果设置为false，将不创建“动画”窗口小部件。
  homeButton: false, //如果设置为false，将不会创建HomeButton小部件。
  fullscreenButton: false, //如果设置为false，将不会创建FullscreenButton小部件。
  geocoder: false, //是否显示地名查找控件
  sceneModePicker: false, //是否显示投影方式控件
  baseLayerPicker: false, //如果设置为false，则不会创建BaseLayerPicker小部件。
  timeline: false, //是否显示时间线控件
  infoBox: false, //是否显示点击要素之后显示的信息
  navigationHelpButton: false, //如果设置为false，将不会创建导航帮助按钮。
  selectionIndicator: false, //如果设置为false，则不会创建SelectionIndicator小部件。
});

// 隐藏Cesium自身的logo
viewer._cesiumWidget._creditContainer.style.display = "none";

const OverlayPositioning = utilscesium.OverlayPositioning;
const Property = {
  ELEMENT: "element",
  MANAGER: "manager",
  OFFSET: "offset",
  POSITION: "position",
  POSITIONING: "positioning",
};

/**
 * @classdesc
 * 覆盖物(参考openlayers,基础功能已经实现)
 * @api
 */
class Overlay {
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
  constructor(opt_options) {
    let options = Object.assign(
      {
        element: null,
        offset: [0, 0],
        positioning: "center-left",
        stopEvent: false,
        insertFirst: false,
        autoPan: false,
        autoPanAnimation: {},
        autoPanMargin: 20,
      },
      opt_options
    );
    this.prototype = {};
    this.id = options.id;
    this.insertFirst = options.insertFirst;
    this.stopEvent = options.stopEvent;
    this.element = document.createElement("div");
    this.element.className =
      options.className !== undefined
        ? options.className
        : "cesium-overlay-container ol-selectable";
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
      visible: true,
    };

    this.changedelement = new Cesium.Event();
    this.changedelement.addEventListener(this.handleElementChanged.bind(this));

    this.changedoffset = new Cesium.Event();
    this.changedoffset.addEventListener(this.handleOffsetChanged.bind(this));

    this.changedposition = new Cesium.Event();
    this.changedposition.addEventListener(
      this.handlePositionChanged.bind(this)
    );

    this.changedpositioning = new Cesium.Event();
    this.changedpositioning.addEventListener(
      this.handlePositioningChanged.bind(this)
    );

    this.changedmanager = new Cesium.Event();
    this.changedmanager.addEventListener(this.handleManagerChanged.bind(this));

    if (Cesium.defined(options.element)) {
      this.setElement(options.element);
    }
    this.setOffset(Cesium.defined(options.offset) ? options.offset : [0, 0]);

    this.setPositioning(
      Cesium.defined(options.positioning) ? options.positioning : "top-left"
    );

    if (Cesium.defined(options.position)) {
      this.setPosition(options.position);
    }
  }

  getElement() {
    return this.get(Property.ELEMENT);
  }

  getId() {
    return this.id;
  }

  getManager() {
    return this.get(Property.MANAGER);
  }

  getOffset() {
    return this.get(Property.OFFSET);
  }

  getPosition() {
    return this.get(Property.POSITION);
  }

  getPositioning() {
    return this.get(Property.POSITIONING);
  }

  handleElementChanged() {
    this.element.innerHTML = "";
    const element = this.getElement();
    if (element) {
      this.element.appendChild(element);
    }
  }

  /**
   * @protected
   */
  handleManagerChanged() {
    const manager = this.getManager();
    const viewer = manager.getViewer();
    if (viewer) {
      viewer.scene.postRender.addEventListener(this.render.bind(this));
      //viewer.scene.postUpdate.addEventListener(this.render.bind(this));
      this.updatePixelPosition();
      const container = this.stopEvent
        ? manager.getOverlayContainerStopEvent()
        : manager.getOverlayContainer();
      if (this.insertFirst) {
        container.insertBefore(this.element, container.childNodes[0] || null);
      } else {
        container.appendChild(this.element);
      }
    }
  }

  // setContainer(container) {
  //   if (this.insertFirst) {
  //     container.insertBefore(this.element, container.childNodes[0] || null);
  //   } else {
  //     container.appendChild(this.element);
  //   }
  // }
  render() {
    this.updatePixelPosition();
  }

  handleOffsetChanged() {
    this.updatePixelPosition();
  }

  handlePositionChanged() {
    this.updatePixelPosition();
    //if (this.get(Property.POSITION) && this.autoPan) {
    //    this.panIntoView();
    //}
  }

  handlePositioningChanged() {
    this.updatePixelPosition();
  }
  setElement(element) {
    this.set(Property.ELEMENT, element);
  }
  /**
   * 绑定manager
   * @param {module:cesium/Manager/OverlayManager} manager
   */
  setManager(manager) {
    this.set(Property.MANAGER, manager);
  }
  /**
   * 设置覆盖物偏移
   * @param {number[]} offset
   */
  setOffset(offset) {
    this.set(Property.OFFSET, offset);
  }
  /**
   * 设置覆盖物位置（[经度，纬度]），如果为undefined 则隐藏
   * @param {*} position
   */
  setPosition(position) {
    this.set(Property.POSITION, position);
  }
  /**
   * 设置覆盖物定位
   * @param {*} positioning
   */
  setPositioning(positioning) {
    this.set(Property.POSITIONING, positioning);
  }
  /**
   * 设置覆盖物显示
   * @param {*} visible
   */
  setVisible(visible) {
    if (this.rendered.visible !== visible) {
      // this.element.style.display = visible ? "" : "none";
      this.rendered.visible = visible;
    }
  }
  updatePixelPosition() {
    const manager = this.getManager();
    const viewer = manager ? manager.getViewer() : null;
    const position = this.getPosition();
    if (!viewer || !position) {
      this.setVisible(false);
      return;
    }
    const p = viewer.scene.cartesianToCanvasCoordinates(position);
    if (!Cesium.defined(p)) {
      console.error("p is undefined");
      return;
    }
    // const pixel = [p.x, p.y];
    // const mapSize = [
    //   viewer._cesiumWidget.canvas.width,
    //   viewer._cesiumWidget.canvas.height,
    // ];
    let matrix4 = this._getModelMatrix(position);

    // this.element.style = getCameraCSSMatrix(matrix4);
    // matrix4[1] = -matrix4[1];
    let a = `${getObjectCSSMatrix(matrix4)} scale(10)`;
    console.log(a);
    // a =
    //   "matrix3d(-0.896498, -0.443048, 0, 0, 0.380016, -0.768953, -0.5141, 0, -0.227771, 0.46089, -0.85773, 0, -2.42616e+06, 4.90927e+06, 3.26023e+06, 1) scale(10)";

    this.element.style.transform = a;
  }
  _getModelMatrix(position) {
    let heading = Cesium.Math.toRadians(this.heading_ || 0);
    let pitch = Cesium.Math.toRadians(this.pitch_ || 0);
    let roll = Cesium.Math.toRadians(this.roll_ || 0);

    var converter = Cesium.Transforms.eastNorthUpToFixedFrame;
    var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-80), 0, 0);
    const matrix4 = Cesium.Transforms.headingPitchRollToFixedFrame(
      position,
      hpr,
      Cesium.Ellipsoid.WGS84,
      null
    );

    // return matrix4
    // console.log(Cesium.Matrix4.multiplyByScale(matrix4, 10));
    // let m = new Cesium.Matrix4();
    // Cesium.Matrix4.multiplyByScale(
    //   matrix4,
    //   new Cesium.Cartesian3(10, 10, 10),
    //   m
    // );
    return matrix4;
  }
  updateRenderedPosition(pixel, mapSize) {
    // const style = this.element.style;
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
  get(name) {
    return this.prototype[name];
  }

  set(name, value) {
    this.prototype[name] = value;
    if (Cesium.defined(this["changed" + name])) {
      this["changed" + name].raiseEvent({ type: "changed" + name });
    }
  }
}

const Collection = utilscesium.Collection;
/**
 * @classdesc
 * 覆盖物管理类
 * @api
 */
class OverlayManager {
  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {module:Cesium/Viewer} 查看器
   */
  constructor(opt_options) {
    let options = Object.assign({ viewer: undefined }, opt_options);
    this.viewer_ = options.viewer;
  }

  /**
   * 添加覆盖物
   * @param {module:utilscesium/Overlay} overlay 覆盖物
   */
  addOverlay(overlay) {
    let container = document.createElement("div");
    container.style =
      "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden;";

    let mapContainer = this.getViewer().container;
    let clientHeight = mapContainer["clientHeight"] / 0x2;
    let clientWidth = mapContainer["clientWidth"] / 0x2;
    let perspective =
      this.getViewer().scene.camera.frustum.projectionMatrix[5] * clientHeight;

    container.style.perspective = perspective + "px";
    this.viewer_.container.appendChild(container);
    if (!Cesium.defined(this.overlayContainer_)) {
      this.overlayContainer_ = document.createElement("div");
      // this.overlayContainer_.style.position = "absolute";
      // this.overlayContainer_.style.zIndex = "0";
      this.overlayContainer_.style.transformStyle = "preserve-3d";
      this.overlayContainer_.style.width = "100%";
      this.overlayContainer_.style.height = "100%";
      // this.overlayContainer_.style.top = "0";
      // this.overlayContainer_.style.left = "0";
      this.overlayContainer_.style.pointerEvents = "none";
      this.overlayContainer_.className = "cesium-overlaycontainer";
      container.appendChild(this.overlayContainer_);
    }

    // if (!Cesium.defined(this.overlayContainerStopEvent_)) {
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
      this.overlays_.addEvent_.addEventListener(
        function(event) {
          event.element.setManager(this);
          //   event.element.setContainer(
          //     event.element.stopEvent
          //       ? this.getOverlayContainerStopEvent()
          //       : this.getOverlayContainer()
          //   );
        }.bind(this)
      );
      this.overlays_.removeEvent_.addEventListener(
        function(event) {
          const overlay = event.element;

          overlay.setManager(null);
        }.bind(this)
      );
    }

    return this.getOverlays().push(overlay);
  }

  /**
   * 返回地图对象
   * @returns
   */
  getViewer() {
    return this.viewer_;
  }

  /**
   * 删除覆盖物
   * @param {module:utilscesium/Overlay} overlay 覆盖物
   */
  removeOverlay(overlay) {
    return this.getOverlays().remove(overlay);
  }

  /**
   * 获取不执行事件的覆盖物容器
   * @return {Element} 不执行事件的覆盖物容器
   */
  getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_;
  }

  /**
   * 获取覆盖物容器
   * @return {Element} 覆盖物容器
   */
  getOverlayContainer() {
    return this.overlayContainer_;
  }

  /**
   * 获取覆盖物列表
   * @return {module:utilscesium/Collection} 覆盖物列表
   */
  getOverlays() {
    return this.overlays_;
  }
}
export default OverlayManager;

const overlayManager = new OverlayManager({
  viewer: viewer,
});

const element = document.createElement("div");
element.className = "marsBlueGradientPnl";
element.innerHTML = "<div>我是Overlay</div>";
let overlay = new Overlay({
  element: element,
  offset: [0, -60],
  positioning: "bottom-center",
});
overlayManager.addOverlay(overlay);
overlay.setPosition(Cesium.Cartesian3.fromDegrees(116.29854, 30.937322, 568.1));

// 将三维球定位到中国
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(116.318889, 30.769641, 7432.2),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(0),
    roll: Cesium.Math.toRadians(0),
  },
  complete: function callback() {
    // 定位完成之后的回调函数
  },
});

viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(116.29854, 30.937322, 568.1),
  point: {
    pixelSize: 10,
    color: Cesium.Color.YELLOW,
  },
});

function formatNum(_0x121ebc) {
  return Math["abs"](_0x121ebc) < 1e-10 ? 0x0 : _0x121ebc;
}

function getObjectCSSMatrix(_0x2532b3) {

  return (
    "matrix3d("  +
    formatNum(_0x2532b3[0x0]) +
    "," +
    formatNum(_0x2532b3[0x1]) +
    "," +
    formatNum(_0x2532b3[0x2]) +
    "," +
    formatNum(_0x2532b3[0x3]) +
    "," +
    formatNum(-_0x2532b3[0x4]) +
    "," +
    formatNum(-_0x2532b3[0x5]) +
    "," +
    formatNum(-_0x2532b3[0x6]) +
    "," +
    formatNum(-_0x2532b3[0x7]) +
    "," +
    formatNum(_0x2532b3[0x8]) +
    "," +
    formatNum(_0x2532b3[0x9]) +
    "," +
    formatNum(_0x2532b3[0xa]) +
    "," +
    formatNum(_0x2532b3[0xb]) +
    "," +
    formatNum(_0x2532b3[0xc]) +
    "," +
    formatNum(_0x2532b3[0xd]) +
    "," +
    formatNum(_0x2532b3[0xe]) +
    "," +
    formatNum(_0x2532b3[0xf]) +
    ")"
  );
}
function getCameraCSSMatrix(_0x3c571f) {
  return (
    "matrix3d(" +
    formatNum(_0x3c571f[0x0]) +
    "," +
    formatNum(-_0x3c571f[0x1]) +
    "," +
    formatNum(_0x3c571f[0x2]) +
    "," +
    formatNum(_0x3c571f[0x3]) +
    "," +
    formatNum(_0x3c571f[0x4]) +
    "," +
    formatNum(-_0x3c571f[0x5]) +
    "," +
    formatNum(_0x3c571f[0x6]) +
    "," +
    formatNum(_0x3c571f[0x7]) +
    "," +
    formatNum(_0x3c571f[0x8]) +
    "," +
    formatNum(-_0x3c571f[0x9]) +
    "," +
    formatNum(_0x3c571f[0xa]) +
    "," +
    formatNum(_0x3c571f[0xb]) +
    "," +
    formatNum(_0x3c571f[0xc]) +
    "," +
    formatNum(-_0x3c571f[0xd]) +
    "," +
    formatNum(_0x3c571f[0xe]) +
    "," +
    formatNum(_0x3c571f[0xf]) +
    ")"
  );
}

setInterval(() => {}, 1000);

const initMatrix = () => {
  let mapContainer = viewer.container;
  let clientHeight = mapContainer["clientHeight"] / 0x2;
  let clientWidth = mapContainer["clientWidth"] / 0x2;
  let perspective =
    viewer.scene.camera.frustum.projectionMatrix[5] * clientHeight;
  console.log(viewer.camera.viewMatrix);
  let a = `translateZ(${perspective}px) ${getCameraCSSMatrix(
    viewer.camera.viewMatrix
  )} translate(${clientWidth}px, ${clientHeight}px)`;
  overlayManager.overlayContainer_.style.transform = a;
  overlayManager.overlayContainer_.style.transformStyle = "preserve-3d";
};
initMatrix();
viewer.scene.postUpdate.addEventListener(() => {
  initMatrix();
});
