/**
 * @module utilscesium/Overlay
 */

import OverlayPositioning from "./OverlayPositioning.js"

const Property = {
    ELEMENT: 'element',
    VIEWER: 'viewer',
    OFFSET: 'offset',
    POSITION: 'position',
    POSITIONING: 'positioning'
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
        let options = Object.assign({ element: null, offset: [0, 0], positioning: "center-left", stopEvent: false, insertFirst: false, autoPan: false, autoPanAnimation: {}, autoPanMargin: 20 }, opt_options);
        this.prototype = {};
        this.id = options.id;
        this.insertFirst = options.insertFirst;
        this.stopEvent = options.stopEvent;
        this.element = document.createElement('div');
        this.element.className = options.className !== undefined ?
            options.className : 'cesium-overlay-container ol-selectable';
        this.element.style.position = 'absolute';

        this.autoPan = options.autoPan;
        this.autoPanAnimation = options.autoPanAnimation;
        this.autoPanMargin = options.autoPanMargin;
        this.rendered = {
            bottom_: '',
            left_: '',
            right_: '',
            top_: '',
            visible: true
        };
        this.viewerPostrenderListenerKey = null;

        this.changedelement = new Cesium.Event();
        this.changedelement.addEventListener(this.handleElementChanged.bind(this));

        this.changedoffset = new Cesium.Event();
        this.changedoffset.addEventListener(this.handleOffsetChanged.bind(this));

        this.changedposition = new Cesium.Event();
        this.changedposition.addEventListener(this.handlePositionChanged.bind(this));

        this.changedpositioning = new Cesium.Event();
        this.changedpositioning.addEventListener(this.handlePositioningChanged.bind(this));

        this.changedviewer = new Cesium.Event();
        this.changedviewer.addEventListener(this.handleViewerChanged.bind(this));

        if (Cesium.defined(options.element)) {
            this.setElement(options.element);
        }
        this.setOffset(Cesium.defined(options.offset) ? options.offset : [0, 0]);

        this.setPositioning(Cesium.defined(options.positioning) ? (options.positioning) :
            "top-left");

        if (Cesium.defined(options.position)) {
            this.setPosition(options.position);
        }
    }


    getElement() {
        return (this.get(Property.ELEMENT));
    }

    getId() {
        return this.id;
    }

    getViewer() {
        return (
            (this.get(Property.VIEWER))
        );
    }

    getOffset() {
        return (this.get(Property.OFFSET));
    }

    getPosition() {
        return (
            (this.get(Property.POSITION))
        );
    }

    getPositioning() {
        return (
            (this.get(Property.POSITIONING))
        );
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
    handleViewerChanged() {
        const viewer = this.getViewer();
        if (viewer) {
            viewer.scene.postRender.addEventListener(this.render.bind(this));
            //viewer.scene.postUpdate.addEventListener(this.render.bind(this));
            this.updatePixelPosition();
            const container = this.stopEvent ?
                viewer.getOverlayContainerStopEvent() : viewer.getOverlayContainer();
            if (this.insertFirst) {
                container.insertBefore(this.element, container.childNodes[0] || null);
            } else {
                container.appendChild(this.element);
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
     * 绑定viewer
     * @param {module:Cesium/Viewer} viewer
     */
    setViewer(viewer) {
        this.set(Property.VIEWER, viewer);
        //super.setViewer(viewer);
        //this.init();
    }
    setOffset(offset) {
        this.set(Property.OFFSET, offset);
    }
    setPosition(position) {
        this.set(Property.POSITION, position);
    }
    setPositioning(positioning) {
        this.set(Property.POSITIONING, positioning);
    }
    setVisible(visible) {
        if (this.rendered.visible !== visible) {
            this.element.style.display = visible ? '' : 'none';
            this.rendered.visible = visible;
        }
    }
    updatePixelPosition() {
        const viewer = this.getViewer();
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
        const pixel = [p.x, p.y];
        const mapSize = [viewer._cesiumWidget.canvas.width, viewer._cesiumWidget.canvas.height];
        this.updateRenderedPosition(pixel, mapSize);
    }
    updateRenderedPosition(pixel, mapSize) {
        const style = this.element.style;
        const offset = this.getOffset();

        const positioning = this.getPositioning();

        this.setVisible(true);

        let offsetX = offset[0];
        let offsetY = offset[1];
        if (positioning == OverlayPositioning.BOTTOM_RIGHT ||
            positioning == OverlayPositioning.CENTER_RIGHT ||
            positioning == OverlayPositioning.TOP_RIGHT) {
            if (this.rendered.left_ !== '') {
                this.rendered.left_ = '';
                style.left = '';
            }
            const right = Math.round(mapSize[0] - pixel[0] - offsetX) + 'px';
            if (this.rendered.right_ != right) {
                this.rendered.right_ = right;
                style.right = right;
            }
        } else {
            if (this.rendered.right_ !== '') {
                this.rendered.right_ = '';
                style.right = '';
            }
            if (positioning == OverlayPositioning.BOTTOM_CENTER ||
                positioning == OverlayPositioning.CENTER_CENTER ||
                positioning == OverlayPositioning.TOP_CENTER) {
                offsetX -= this.element.offsetWidth / 2;
            }
            const left = Math.round(pixel[0] + offsetX) + 'px';
            if (this.rendered.left_ != left) {
                this.rendered.left_ = left;
                style.left = left;
            }
        }
        if (positioning == OverlayPositioning.BOTTOM_LEFT ||
            positioning == OverlayPositioning.BOTTOM_CENTER ||
            positioning == OverlayPositioning.BOTTOM_RIGHT) {
            if (this.rendered.top_ !== '') {
                this.rendered.top_ = '';
                style.top = '';
            }
            const bottom = Math.round(mapSize[1] - pixel[1] - offsetY) + 'px';
            if (this.rendered.bottom_ != bottom) {
                this.rendered.bottom_ = bottom;
                style.bottom = bottom;
            }
        } else {
            if (this.rendered.bottom_ !== '') {
                this.rendered.bottom_ = '';
                style.bottom = '';
            }
            if (positioning == OverlayPositioning.CENTER_LEFT ||
                positioning == OverlayPositioning.CENTER_CENTER ||
                positioning == OverlayPositioning.CENTER_RIGHT) {
                offsetY -= this.element.offsetHeight / 2;
            }
            const top = Math.round(pixel[1] + offsetY) + 'px';
            if (this.rendered.top_ != top) {
                this.rendered.top_ = 'top';
                style.top = top;
            }
        }
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

export default Overlay;