/**
 * @module utilscesium/Graphic/DivPlane
 */

const Property = {
  ELEMENT: "element",
  LAYER: "layer",
  OFFSET: "offset",
  POSITION: "position",
  VISIBLE: "visible",
};
/**
 * @classdesc
 * 覆盖物(参考openlayers,基础功能已经实现)
 * @api
 */
class DivPlane {
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
  constructor(opt_options) {
    let options = Object.assign(
      {
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
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
      opt_options
    );

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
    this.graphic_container_.className =
      options.className !== undefined
        ? options.className
        : "utilscesium-divGraphic";
    this.graphic_container_.style.position = "absolute";
    this.graphic_container_.style.pointerEvents = this.stopEvent_
      ? "none"
      : "auto";
      console.log(this.stopEvent_,this.stopEvent_
        ? "none"
        : "auto");

    this.graphic_container_m_ = document.createElement("div");
    this.graphic_container_m_.className = "utilscesium-divGraphic-m";
    this.graphic_container_m_.style.position = "absolute";
    this.graphic_container_.appendChild(this.graphic_container_m_);

    this.rendered = {
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

    this.graphic_container_m_.style.transform = `${this._getTemplateTranslate()}`;
  }

  getElement() {
    return this.get(Property.ELEMENT);
  }

  getLayer() {
    return this.get(Property.LAYER);
  }

  getOffset() {
    return this.get(Property.OFFSET);
  }

  getPosition() {
    return this.get(Property.POSITION);
  }

  getVisible() {
    return this.get(Property.VISIBLE);
  }
  handleElementChanged() {
    this.graphic_container_m_.innerHTML = "";
    const element = this.getElement();
    if (element) {
      this.graphic_container_m_.appendChild(element);
    }
  }
  /**
   * 获取偏移
   *
   * @memberof DivPlane
   */
  _getTemplateTranslate() {
    let offsetX = 0,
      offsetY = 0;
    switch (this.horizontalOrigin_) {
      case "CENTER":
      case Cesium.HorizontalOrigin.CENTER: {
        offsetX = "-50%";
        break;
      }
      case "RIGHT":
      case Cesium.HorizontalOrigin.RIGHT: {
        offsetX = "-100%";
        break;
      }
      case "LEFT":
      case Cesium.HorizontalOrigin.LEFT: {
        offsetX = "0";
        break;
      }
    }
    switch (this.verticalOrigin_) {
      case "TOP":
      case Cesium.VerticalOrigin.TOP: {
        offsetY = "0";
        break;
      }
      case "CENTER":
      case Cesium.VerticalOrigin.CENTER: {
        offsetY = "-50%";
        break;
      }
      case "BOTTOM":
      case Cesium.VerticalOrigin.BOTTOM: {
        offsetY = "-100%";
        break;
      }
    }
    if (this.getOffset()) {
      offsetX = `calc(${offsetX} + ${this.getOffset()[0]}px)`;
      offsetY = `calc(${offsetY} + ${this.getOffset()[1]}px)`;
    }
    return `translateX(${offsetX}) translateY(${offsetY})`;
  }

  /**
   * @protected
   */
  handleLayerChanged() {
    const layer = this.getLayer();

    const viewer = layer ? layer.getViewer() : null;
    if (!viewer) {
      return;
    }
    if (viewer) {
      viewer.scene.postRender.addEventListener(this.render.bind(this));
      this.updatePixelPosition();
      const container = layer.getCameraContainer();
      if (this.insertFirst_) {
        container.insertBefore(
          this.graphic_container_,
          container.childNodes[0] || null
        );
      } else {
        container.appendChild(this.graphic_container_);
      }
    }
  }

  render() {
    this.updatePixelPosition();
  }

  handleOffsetChanged() {
    this.updatePixelPosition();
  }

  handlePositionChanged() {
    this.updatePixelPosition();
  }

  setElement(element) {
    this.set(Property.ELEMENT, element);
  }
  /**
   * 绑定图层
   * @param {module:cesium/Layer/GraphicLayer} layer
   */
  setLayer(layer) {
    this.set(Property.LAYER, layer);
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
   * 设置覆盖物显示
   * @param {*} visible
   */
  setVisible(visible) {
    if (this.getVisible() !== visible) {
      this.graphic_container_.style.display = visible ? "block" : "none";
      this.set(Property.VISIBLE, visible);
    }
  }
  updatePixelPosition() {
    const layer = this.getLayer();
    const viewer = layer ? layer.getViewer() : null;
    const position = this.getPosition();
    if (!viewer || !position) {
      //   this.setVisible(false);
      return;
    }

    const p = viewer.scene.cartesianToCanvasCoordinates(position);
    if (!Cesium.defined(p)) {
      console.error("p is undefined");
      return;
    }
    let matrix4 = this._getModelMatrix(position);

    let str = `${getObjectCSSMatrix(matrix4)} scale(${this.scale_}) `;
    this.graphic_container_.style.transform = str;
  }
  _getModelMatrix(position) {
    let heading = this.heading_ || 0;
    let pitch = this.pitch_ || 0;
    let roll = this.roll_ || 0;
    var hpr = new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(heading),
      Cesium.Math.toRadians(pitch),
      Cesium.Math.toRadians(roll)
    );
    const matrix4 = Cesium.Transforms.headingPitchRollToFixedFrame(
      position,
      hpr,
      Cesium.Ellipsoid.WGS84,
      null
    );
    return matrix4;
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

export default DivPlane;

function formatNum(_0x121ebc) {
  return Math["abs"](_0x121ebc) < 1e-10 ? 0x0 : _0x121ebc;
}

function getObjectCSSMatrix(_0x2532b3) {
  return (
    "matrix3d(" +
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
