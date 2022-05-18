/**
 * @module utils-ol/plot/tool/PlotEdit
 * @api
 */

import * as DomUtils from "../util/DomUtils"
import * as events from "ol/events"
import * as interaction from "ol/interaction"

import WebGLHelper from 'ol/webgl/Helper';
import Feature from "ol/Feature"
import Observable from "ol/Observable"
import Overlay from "ol/Overlay"
import Map from "ol/Map"
import { Coordinate } from "ol/coordinate"
import { EventsKey } from "ol/events"

/**
 * 绘标编辑类 
 * @api
 */
class PlotEdit extends Observable {

    /**
     * 地图对象
     */
    map_: Map | null = null;

    /**
     * 激活的会标图形
     */
    activePlot: any = null;

    /**
     * 开始点位,也就是鼠标按下时的经纬度坐标
     */
    startPoint: Coordinate | null = null;

    ghostControlPoints: Array<Coordinate> | null = null;

    controlPoints: Array<Overlay> | null = null;

    /**
     * 鼠标是否悬浮在图形上
     */
    mouseOver: boolean = false;

    elementTable: Object = {};

    /**
     * 激活的控制点的节点id
     */
    activeControlPointId: number = null;

    /**
     * 地图拖动交互对象
     */
    mapDragPan: interaction.DragPan = null;

    /**
     * 控制点鼠标移动事件key
     */
    controlPointMouseMoveHandlerKey: EventsKey = null;

    /**
     * 控制点鼠标抬起事件key
     */
    controlPointMouseUpHandlerKey: EventsKey = null;

    /**
     * 绘标图形鼠标移除事件
     */
    plotMouseOverOutHandlerKey: EventsKey = null;

    /**
     * 绘标图形鼠标按下事件
     */
    plotMouseDownHandlerKey: EventsKey = null;

    /**
     * 绘标图形鼠标移动事件
     */
    plotMouseMoveHandlerKey: EventsKey = null;

    /**
     * 绘标图形鼠标抬起事件
     */
    plotMouseUpHandlerKey: EventsKey = null;



    /**
     * 常数对象
     */
    Constants: { HELPER_HIDDEN_DIV: string, HELPER_CONTROL_POINT_DIV: string } = {
        HELPER_HIDDEN_DIV: 'p-helper-hidden-div',
        HELPER_CONTROL_POINT_DIV: 'p-helper-control-point-div'
    };

    /**
     * 构造函数
     * @param map 地图对象
     */
    constructor(map: Map) {
        super();
        if (!map) {
            return;
        }
        this.setMap(map);
    }

    /**
     * 绑定地图对象
     * @param map 地图对象
     */
    setMap(map: Map) {
        this.map_ = map;
    }

    /**
     * 初始化节点 
     */
    initHelperDom() {
        if (!this.map_ || !this.activePlot) {
            return;
        }
        var parent = this.getMapParentElement();
        if (!parent) {
            return;
        }
        var hiddenDiv = DomUtils.createHidden('div', parent, this.Constants.HELPER_HIDDEN_DIV);

        var cPnts = this.getControlPoints();
        for (var i = 0; i < cPnts.length; i++) {
            var id = this.Constants.HELPER_CONTROL_POINT_DIV + '-' + i;
            DomUtils.create('div', this.Constants.HELPER_CONTROL_POINT_DIV, hiddenDiv, id);
            this.elementTable[id] = i;
        }
    }

    /**
     * 获取地图容器父节点 
     */
    getMapParentElement() {
        var mapElement = this.map_.getTargetElement();
        if (!mapElement) {
            return;
        }
        return mapElement.parentNode;
    }

    /**
     * 销毁element 
     */
    destroyHelperDom() {
        if (this.controlPoints) {
            for (var i = 0; i < this.controlPoints.length; i++) {
                this.map_.removeOverlay(this.controlPoints[i]);
                var element = DomUtils.get(this.Constants.HELPER_CONTROL_POINT_DIV + '-' + i);
                if (element) {
                    DomUtils.removeListener(element, 'mousedown', this.controlPointMouseDownHandler, this);
                    DomUtils.removeListener(element, 'mousemove', this.controlPointMouseMoveHandler2, this);
                }
            }
            this.controlPoints = null;
        }
        //
        var parent = this.getMapParentElement();
        var hiddenDiv = DomUtils.get(this.Constants.HELPER_HIDDEN_DIV);
        if (hiddenDiv && parent) {
            DomUtils.remove(hiddenDiv, parent);
        }
    }

    /**
     * 初始化控制点 
     */
    initControlPoints() {
        if (!this.map_) {
            return;
        }
        this.controlPoints = [];
        var cPnts = this.getControlPoints();
        for (var i = 0; i < cPnts.length; i++) {
            var id = this.Constants.HELPER_CONTROL_POINT_DIV + '-' + i;
            var element = DomUtils.get(id);
            var pnt = new Overlay({
                id: id,
                position: cPnts[i],
                positioning: 'center-center',
                element: element
            });
            this.controlPoints.push(pnt);
            this.map_.addOverlay(pnt);
            DomUtils.addListener(element, 'mousedown', this.controlPointMouseDownHandler, this);
            DomUtils.addListener(element, 'mousemove', this.controlPointMouseMoveHandler2, this);
        }
    }
    /**
     * 控制节点移动
     * @param {any} e
     */
    controlPointMouseMoveHandler2(e) {
        e.stopImmediatePropagation(e);
    }
    /**
     * 控制点鼠标按下事件
     * @param {any} e
     */
    controlPointMouseDownHandler(e) {
        var id = e.target.id;
        this.activeControlPointId = id;

        if (this.controlPointMouseMoveHandlerKey) {
            events.unlistenByKey(this.controlPointMouseMoveHandlerKey);
        }
        this.controlPointMouseMoveHandlerKey = this.map_.on("pointermove", this.controlPointMouseMoveHandler.bind(this));

        this.controlPointMouseUpHandlerKey = DomUtils.addListener(e.currentTarget, 'mouseup', this.controlPointMouseUpHandler, this);
    }
    /**
     * 控制点移动事件
     * @param {any} e
     */
    controlPointMouseMoveHandler(e) {
        var coordinate = e.coordinate;
        if (this.activeControlPointId) {
            var plot = this.activePlot.getGeometry();
            var index = this.elementTable[this.activeControlPointId];
            plot.updatePoint(coordinate, index);
            var overlay = this.map_.getOverlayById(this.activeControlPointId);
            overlay.setPosition(coordinate);
        }
    }

    /**
     * 控制点鼠标弹起事件
     * @param {any} e
     */
    controlPointMouseUpHandler(e) {

        events.unlistenByKey(this.controlPointMouseMoveHandlerKey);
        DomUtils.removeListener(e.currentTarget, 'mouseup', this.controlPointMouseUpHandler, this);
    }

    /**
     * 激活
     * @param {ol.Feature} plot 激活编辑的要素
     */
    activate(plot) {
        if (!plot || !(plot instanceof Feature) || plot == this.activePlot) {
            return;
        }

        var geom = plot.getGeometry();
        if (!geom.isPlot()) {
            return;
        }

        this.deactivate();

        this.activePlot = plot;

        this.plotMouseOverOutHandlerKey = this.map_.on("pointermove", this.plotMouseOverOutHandler.bind(this));
        this.initHelperDom();

        this.initControlPoints();

    }
    /**
     * 获取控制点 
     */
    getControlPoints() {
        if (!this.activePlot) {
            return [];
        }
        var geom = this.activePlot.getGeometry();
        return geom.getPoints();
    }
    /**
     * 鼠标移入移出控制要素事件
     * @param {any} e
     */
    plotMouseOverOutHandler(e) {
        var feature = this.map_.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
            return feature;
        });
        if (feature && feature == this.activePlot) {
            if (!this.mouseOver) {
                this.mouseOver = true;
                this.map_.getViewport().style.cursor = 'move';
                this.plotMouseDownHandlerKey = DomUtils.addListener(this.map_.getTargetElement(), "mousedown", this.plotMouseDownHandler, this);
            }
        } else {
            if (this.mouseOver) {
                this.mouseOver = false;
                this.map_.getViewport().style.cursor = 'default';
                events.unlistenByKey(this.plotMouseDownHandlerKey);
            }
        }
    }
    /**
     * 编辑要素鼠标按下事件
     * @param {any} e
     */
    plotMouseDownHandler(e) {

        this.ghostControlPoints = this.getControlPoints();
        this.startPoint = this.map_.getCoordinateFromPixel([e.layerX, e.layerY]);
        this.disableMapDragPan();
        DomUtils.removeListener(this.map_.getTargetElement(), "mousedown", this.plotMouseDownHandler, this);
        // this.plotMouseUpHandlerKey = this.map_.on('pointerup', this.plotMouseUpHandler.bind(this));
        this.plotMouseMoveHandlerKey = this.map_.on('pointerdrag', this.plotMouseMoveHandler.bind(this));
    }
    /**
     * 编辑要素鼠标移动事件
     * @param {any} e
     */
    plotMouseMoveHandler(e) {
        var point = e.coordinate;
        var dx = point[0] - this.startPoint[0];
        var dy = point[1] - this.startPoint[1];
        var newPoints = [];
        for (var i = 0; i < this.ghostControlPoints.length; i++) {
            var p = this.ghostControlPoints[i];
            var coordinate = [p[0] + dx, p[1] + dy];
            newPoints.push(coordinate);
            var id = this.Constants.HELPER_CONTROL_POINT_DIV + '-' + i;
            var overlay = this.map_.getOverlayById(id);
            overlay.setPosition(coordinate);
            overlay.setPositioning('center-center');
        }
        var plot = this.activePlot.getGeometry();
        plot.setPoints(newPoints);
    }
    /**
     * 编辑要素鼠标弹起事件
     * @param {any} e
     */
    plotMouseUpHandler(e) {
        this.enableMapDragPan();
        events.unlistenByKey(this.plotMouseUpHandlerKey);
        events.unlistenByKey(this.plotMouseMoveHandlerKey);
    }
    /**
     * 注销事件 
     */
    disconnectEventHandlers() {
        events.unlistenByKey(this.plotMouseOverOutHandlerKey);

        events.unlistenByKey(this.controlPointMouseMoveHandlerKey);
        events.unlistenByKey(this.controlPointMouseUpHandlerKey);
        events.unlistenByKey(this.plotMouseDownHandlerKey);
        events.unlistenByKey(this.plotMouseUpHandlerKey);
        events.unlistenByKey(this.plotMouseMoveHandlerKey);
    }
    /**
     * 注销激活事件 
     */
    deactivate() {
        this.activePlot = null;
        this.mouseOver = false;
        this.destroyHelperDom();
        this.disconnectEventHandlers();
        this.elementTable = {};
        this.activeControlPointId = null;
        this.startPoint = null;
    }
    /**
     * 不允许地图拖拽 
     */
    disableMapDragPan() {
        var interactions = this.map_.getInteractions();
        var length = interactions.getLength();
        for (var i = 0; i < length; i++) {
            var item = interactions.item(i);
            if (item instanceof interaction.DragPan) {
                this.mapDragPan = item;
                item.setActive(false);
                break;
            }
        }
    }
    /**
     * 允许地图拖拽 
     */
    enableMapDragPan() {
        if (this.mapDragPan != null) {
            this.mapDragPan.setActive(true);
            this.mapDragPan = null;
        }
    }
}

export default PlotEdit;