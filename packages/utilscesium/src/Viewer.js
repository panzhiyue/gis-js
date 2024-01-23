/**
 * @module utilscesium/Viewer
 */

import Collection from "./Collection"

class Viewer extends Cesium.Viewer {
    constructor(container, opt_options) {
        let options = Object.assign({}, opt_options)
        super(container, options);
    }

    /**
     * 根据id获取图层
     * @param {any} layerId
     */
    getLayerById(layerId) {
        let layers = this.imageryLayers._layers;
        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if (layer.id == layerId) {
                return layer;
            }
        }
    }

    addOverlay(overlay) {
        if (!Cesium.defined(this.overlayContainer_)) {
            this.overlayContainer_ = document.createElement('div');
            this.overlayContainer_.style.position = 'absolute';
            this.overlayContainer_.style.zIndex = '0';
            this.overlayContainer_.style.width = '100%';
            this.overlayContainer_.style.height = '100%';
            this.overlayContainer_.style.top = "0";
            this.overlayContainer_.style.left = "0";
            this.overlayContainer_.style.pointerEvents="none";
            this.overlayContainer_.className = 'cesium-overlaycontainer';
            this.container.appendChild(this.overlayContainer_);
        }

        if (!Cesium.defined(this.overlayContainerStopEvent_)) {
            this.overlayContainerStopEvent_ = document.createElement('div');
            this.overlayContainerStopEvent_.style.position = 'absolute';
            this.overlayContainerStopEvent_.style.zIndex = '0';
            this.overlayContainerStopEvent_.style.width = '100%';
            this.overlayContainerStopEvent_.style.height = '100%';
            this.overlayContainerStopEvent_.style.top = "0";
            this.overlayContainerStopEvent_.style.left = "0";
            this.overlayContainerStopEvent_.style.pointerEvents="none";

            this.overlayContainerStopEvent_.className = 'cesium-overlaycontainer-stopevent';
            this.container.appendChild(this.overlayContainerStopEvent_);
        }

        if (!Cesium.defined(this.overlays_)) {
            this.overlays_ = new Collection();
            this.overlays_.addEvent_.addEventListener(function (event) {

                event.element.setViewer(this);
                console.log(this.overlays_.getArray());
            }.bind(this));
            this.overlays_.removeEvent_.addEventListener(function (event) {
                console.log(event);
                const overlay = (event.element);
                const id = overlay.getId();
                
                overlay.setViewer(null);
            }.bind(this));
        }

        //overlay.setViewer(this);
        return this.getOverlays().push(overlay);
    }

    removeOverlay(overlay) {
        return this.getOverlays().remove(overlay);
    }

    getOverlayContainerStopEvent() {
        return this.overlayContainerStopEvent_;
    }

    getOverlayContainer() {
        return this.overlayContainer_;
    }

    getOverlays() {
        return this.overlays_;
    }
}

export default Viewer;
