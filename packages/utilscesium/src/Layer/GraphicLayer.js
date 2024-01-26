/**
 * @module utilscesium/Layer/GraphicLayer
 */

import Collection from "../Collection";
/**
 * @classdesc
 * 覆盖物管理类
 * @api
 */
class GraphicLayer {
  /**
   * 构造函数
   * @param {Object} opt_options
   * @param {module:Cesium/Viewer} 查看器
   */
  constructor(opt_options) {
    let options = Object.assign({ viewer: undefined }, opt_options);
    this.viewer_ = options.viewer;
    this.container_ = null;
    this.camera_container_ = null;
    this.graphics_ = null;

    this._initParentContainer();
    this._initGraphics();

    this._refreshMatrix_ = this._refreshMatrix.bind(this);
    this.setViewer(options.viewer);
  }
  setViewer(viewer) {
    if (this.viewer_) {
      this.viewer_.scene.postUpdate.removeEventListener(this._refreshMatrix_);
      this.container_.remove();
      this.viewer_ = null;
    }
    if (viewer) {
      this.viewer_ = viewer;
      this.viewer_.scene.postUpdate.addEventListener(this._refreshMatrix_);
      this.viewer_.container.appendChild(this.container_);
    }
  }
  /**
   * 初始化graphic集合
   *
   * @memberof GraphicLayer
   */
  _initGraphics() {
    if (!Cesium.defined(this.graphics_)) {
      this.graphics_ = new Collection();
      this.graphics_.addEvent_.addEventListener((event) => {
        event.element.setLayer(this);
      });
      this.graphics_.removeEvent_.addEventListener((event) => {
        const g = event.element;
        g.setLayer(null);
      });
    }
  }
  /**
   * 初始化容器div
   *
   * @memberof GraphicLayer
   */
  _initParentContainer() {
    if (!Cesium.defined(this.container_)) {
      this.container_ = document.createElement("div");
      this.container_.className = "utilscesium-GraphicLayer";
      this.container_.style =
        "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden;";

      let mapContainer = this.getViewer().container;
      let clientHeight = mapContainer["clientHeight"] / 0x2;
      let perspective =
        this.getViewer().scene.camera.frustum.projectionMatrix[5] *
        clientHeight;

      this.container_.style.perspective = perspective + "px";
    }

    if (!Cesium.defined(this.camera_container_)) {
      this.camera_container_ = document.createElement("div");
      this.camera_container_.style.transformStyle = "preserve-3d";
      this.camera_container_.style.width = "100%";
      this.camera_container_.style.height = "100%";
      this.camera_container_.style.pointerEvents = "none";
      this.camera_container_.className = "utilscesium-GraphicLayer-camera";
      this.container_.appendChild(this.camera_container_);
    }
  }
  /**
   * 刷新matrix3d的值
   *
   * @memberof GraphicLayer
   */
  _refreshMatrix() {
    if (this.camera_container_) {
      let mapContainer = this.viewer_.container;
      let clientHeight = mapContainer["clientHeight"] / 0x2;
      let clientWidth = mapContainer["clientWidth"] / 0x2;
      let perspective =
        this.viewer_.scene.camera.frustum.projectionMatrix[5] * clientHeight;
      let str = `translateZ(${perspective}px) ${getCameraCSSMatrix(
        this.viewer_.camera.viewMatrix
      )} translate(${clientWidth}px, ${clientHeight}px)`;
      this.camera_container_.style.transform = str;
    }
  }

  /**
   * 添加
   * @param {module:utilscesium/Graphic/DivPlane} graphic
   */
  addGraphic(graphic) {
    return this.getGraphics().push(graphic);
  }

  /**
   * 返回地图对象
   * @returns
   */
  getViewer() {
    return this.viewer_;
  }

  /**
   * 删除
   * @param {module:utilscesium/Graphic/DivPlane} graphic
   */
  removeGraphic(graphic) {
    graphic.graphic_container_.remove();
    return this.getGraphics().remove(graphic);
  }

  /**
   * 获取容器
   * @return {Element} 容器
   */
  getContainer() {
    return this.container_;
  }

  /**
   * 获取相机容器
   * @return {Element} 容器
   */
  getCameraContainer() {
    return this.camera_container_;
  }

  /**
   * 获取graphic列表
   * @return {module:utilscesium/Collection} graphic列表
   */
  getGraphics() {
    return this.graphics_;
  }
}

export default GraphicLayer;

function formatNum(_0x121ebc) {
  return Math["abs"](_0x121ebc) < 1e-10 ? 0x0 : _0x121ebc;
}
function getCameraCSSMatrix(_0x481c86) {
  return (
    "matrix3d(" +
    formatNum(_0x481c86[0x0]) +
    "," +
    formatNum(-_0x481c86[0x1]) +
    "," +
    formatNum(_0x481c86[0x2]) +
    "," +
    formatNum(_0x481c86[0x3]) +
    "," +
    formatNum(_0x481c86[0x4]) +
    "," +
    formatNum(-_0x481c86[0x5]) +
    "," +
    formatNum(_0x481c86[0x6]) +
    "," +
    formatNum(_0x481c86[0x7]) +
    "," +
    formatNum(_0x481c86[0x8]) +
    "," +
    formatNum(-_0x481c86[0x9]) +
    "," +
    formatNum(_0x481c86[0xa]) +
    "," +
    formatNum(_0x481c86[0xb]) +
    "," +
    formatNum(_0x481c86[0xc]) +
    "," +
    formatNum(-_0x481c86[0xd]) +
    "," +
    formatNum(_0x481c86[0xe]) +
    "," +
    formatNum(_0x481c86[0xf]) +
    ")"
  );
}
