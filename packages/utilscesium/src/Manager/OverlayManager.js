/**
 * @module utilscesium/Manager/OverlayManager 
 */


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
        if (!Cesium.defined(this.overlayContainer_)) {
            this.overlayContainer_ = document.createElement('div');
            this.overlayContainer_.style.position = 'absolute';
            this.overlayContainer_.style.zIndex = '0';
            //this.overlayContainer_.style.width = '100%';
            //this.overlayContainer_.style.height = '100%';
            this.overlayContainer_.style.top = "0";
            this.overlayContainer_.style.left = "0";
            this.overlayContainer_.className = 'cesium-overlaycontainer';
            this.viewer_.container.appendChild(this.overlayContainer_);
        }

        if (!Cesium.defined(this.overlayContainerStopEvent_)) {
            this.overlayContainerStopEvent_ = document.createElement('div');
            this.overlayContainerStopEvent_.style.position = 'absolute';
            this.overlayContainerStopEvent_.style.zIndex = '0';
            //this.overlayContainerStopEvent_.style.width = '100%';
            //this.overlayContainerStopEvent_.style.height = '100%';
            this.overlayContainerStopEvent_.style.top = "0";
            this.overlayContainerStopEvent_.style.left = "0";
            this.overlayContainerStopEvent_.style.pointerEvents = "none";

            this.overlayContainerStopEvent_.className = 'cesium-overlaycontainer-stopevent';
            this.viewer_.container.appendChild(this.overlayContainerStopEvent_);
        }

        if (!Cesium.defined(this.overlays_)) {
            this.overlays_ = new Collection();
            this.overlays_.addEvent_.addEventListener(function (event) {
                event.element.setViewer(this);
            }.bind(this));

            this.overlays_.removeEvent_.addEventListener(function (event) {
                const overlay = (event.element);
                const id = overlay.getId();
                overlay.setViewer(null);
            }.bind(this));
        }
        return this.getOverlays().push(overlay);
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