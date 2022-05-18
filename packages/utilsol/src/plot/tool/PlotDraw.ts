/**
 * @module utils-ol/plot/tool/PlotDraw
 */

import { unlistenByKey, } from "ol/events"
import { DoubleClickZoom } from "ol/interaction"
import { Stroke, Fill, Style, } from "ol/style"

import Feature from "ol/Feature"
import Observable from "ol/Observable"
import VectorSource from "ol/source/Vector"
import VectorLayer from "ol/layer/Vector"

import { createPlot } from "../PlotFactory"
import { distance } from "../PlotUtils"
import PlotTypes from "../PlotTypes"

import Constants from "../Constants"

import Map from "ol/Map"
import { Coordinate } from "ol/coordinate"
import Geometry from "../geom/Geometry"
import { EventsKey } from "ol/events"
import MapBrowserEvent from "ol/MapBrowserEvent"
import BaseEvent from "ol/events/Event"


/**
 * 绘标绘制类 
 */
export default class PlotDraw extends Observable {

    /**
     * 点集合
     */
    points: Array<Coordinate> = null;

    /**
     * 绘标图形
     */
    plot: Geometry = null;

    /**
     * 要素
     */
    feature: Feature<any> = null;

    /**
     * 绘标类型
     */
    plotType: PlotTypes = null;

    /**
     * 绘标参数
     */
    plotParams: Object = null;

    /**
     * 地图双击工具备份
     */
    dblClickZoomInteraction: DoubleClickZoom = null;

    /**
     * 绘标样式
     */
    style: Style = null;

    /**
     * 绘标数据源
     */
    drawSource: VectorSource<any> = null;

    /**
     * 绘标图层 
     */
    drawLayer: VectorLayer<any> = null;

    /**
     * 地图对象
     */
    map_: Map = null;

    /**
     * 鼠标第一次点击事件key值
     */
    mapFirstClickHandlerKey: EventsKey = null;

    /**
     * 第一次之后的点击事件key值
     */
    mapNextClickHandlerKey: EventsKey = null;

    /**
     * 鼠标双击事件key值
     */
    mapDoubleClickHandlerKey: EventsKey = null;

    /**
     * 鼠标移动事件key值
     */
    mapMouseMoveHandlerKey: EventsKey = null;



    /**
     * 构造函数
     * @param {Object} opt_options 构造参数
     * @param {Object} [opt_options.map] 地图对象
     * @param {Object} [opt_options.style] 样式
     */
    constructor(opt_options) {
        super();
        let options = Object.assign({ map: null, style: new Style({ fill: new Fill({ color: 'rgba(0,0,0,0.4)' }), stroke: new Stroke({ color: '#000000', width: 1.25 }) }) }, opt_options)
        this.style = options.style;

        this.drawSource = new VectorSource();

        this.drawLayer = new VectorLayer({
            source: this.drawSource
        });
        this.drawLayer.setStyle(this.style);
        this.setMap(options.map);
    }

    /**
     * 绑定地图对象
     * @param map 地图对象
     */
    setMap(map: Map) {
        this.map_ = map;
    }

    /**
     * 激活绘标
     * @param type 绘标类型
     * @param params 绘标参数
     */
    activate(type: PlotTypes, params: Object) {
        this.deactivate();
        this.deactivateMapTools();

        //绑定鼠标第一次点击事件
        this.mapFirstClickHandlerKey = this.map_.on("click", this.mapFirstClickHandler.bind(this));
        this.plotType = type;
        this.plotParams = params;
        this.map_.addLayer(this.drawLayer);
    }

    /**
     * 注销绘标 
     */
    deactivate() {

        this.activateMapTools();
        this.disconnectEventHandlers();
        this.map_.removeLayer(this.drawLayer);
        this.drawSource.clear();
        this.points = [];
        this.plot = null;
        this.feature = null;
        this.plotType = null;
        this.plotParams = null;


    }

    /**
     * 是否正在绘制
     * @return ture:正在绘制,false:不在绘制
     */
    isDrawing(): boolean {
        return this.plotType != null;
    }


    /**
     * 鼠标首次点击事件
     * @param e 
     */
    mapFirstClickHandler(e: MapBrowserEvent<any>) {

        this.points.push(e.coordinate);

        //生成绘标图形
        this.plot = createPlot(this.plotType, this.points, this.plotParams);
        this.feature = new Feature(this.plot);
        this.drawSource.addFeature(this.feature);

        //解绑首次点击事件
        unlistenByKey(this.mapFirstClickHandlerKey);
        //点数量等于最大点数则结束绘制
        if (this.plot.fixPointCount == this.plot.getPointCount()) {
            this.mapDoubleClickHandler(e);
            return;
        }
        //绑定第一次之后的点击事件
        this.mapNextClickHandlerKey = this.map_.on("click", this.mapNextClickHandler.bind(this));

        //如果不是自由绘制则绑定双击事件
        if (!this.plot.freehand) {
            this.mapDoubleClickHandlerKey = this.map_.on("dblclick", this.mapDoubleClickHandler.bind(this));
        }

        //绑定鼠标移动事件
        this.mapMouseMoveHandlerKey = this.map_.on("pointermove", this.mapMouseMoveHandler.bind(this));

    }
    /**
     * 鼠标移动事件
     * @param {any} e
     */
    mapMouseMoveHandler(e) {

        var coordinate = e.coordinate;
        //与最后一个点之间的距离小于指定容差
        if (distance(coordinate, this.points[this.points.length - 1]) < Constants.ZERO_TOLERANCE)
            return;

        //不是自由绘制则生成临时点集,否则生成正式点集
        if (!this.plot.freehand) {
            var pnts = this.points.concat([coordinate]);
            this.plot.setPoints(pnts);
        } else {
            this.points.push(coordinate);
            this.plot.setPoints(this.points);
        }
    }
    /**
     * 第一次之后的点击事件
     * @param {any} e
     */
    mapNextClickHandler(e) {
        //不是自由绘制
        if (!this.plot.freehand) {
            //与最后一个点之间的距离小于指定容差
            if (distance(e.coordinate, this.points[this.points.length - 1]) < Constants.ZERO_TOLERANCE)
                return;
        }
        this.points.push(e.coordinate);
        this.plot.setPoints(this.points);
        //如果已经达到最大点数量则结束绘制
        if (this.plot.fixPointCount == this.plot.getPointCount()) {
            this.mapDoubleClickHandler(e);
            return;
        }
        //如果是自由绘制,结束
        if (this.plot && this.plot.freehand) {
            this.mapDoubleClickHandler(e);
        }
    }
    /**
     * 鼠标双击完成绘制
     * @param {any} e
     */
    mapDoubleClickHandler(e) {
        this.disconnectEventHandlers();
        this.plot.finishDrawing();
        e.preventDefault();
        this.drawEnd();
    }

    /**
     * 解除绑定的事件 
     */
    disconnectEventHandlers() {
        //解绑鼠标首次点击事件
        unlistenByKey(this.mapFirstClickHandlerKey);
        //解绑鼠标之后点击事件
        unlistenByKey(this.mapNextClickHandlerKey);
        //解绑鼠标移动事件
        unlistenByKey(this.mapMouseMoveHandlerKey);
        //解绑鼠标双击事件
        unlistenByKey(this.mapDoubleClickHandlerKey);
    }
    /**
     * 绘制结束
     */
    drawEnd() {
        this.drawSource.removeFeature(this.feature);
        setTimeout(() => {
            this.activateMapTools();
        }, 250);
        this.disconnectEventHandlers();
        this.map_.removeLayer(this.drawLayer);
        this.points = [];
        this.plot = null;
        this.plotType = null;
        this.plotParams = null;
        this.dispatchEvent("draw_end");
        this.feature = null;
    }

    /**
     * 注销地图双击工具,并备份(开始绘制时注销)
     */
    deactivateMapTools() {
        var interactions = this.map_.getInteractions();
        var length = interactions.getLength();
        for (var i = 0; i < length; i++) {
            var item = interactions.item(i);
            if (item instanceof DoubleClickZoom) {
                this.dblClickZoomInteraction = item;
                item.setActive(false);
                break;
            }
        }
    }

    /**
     * 激活地图双击工具(结束绘制时激活) 
     */
    activateMapTools() {

        //双击交互
        if (this.dblClickZoomInteraction != null) {
            this.dblClickZoomInteraction.setActive(true);
        }
    }
    
    setStyle(style) {
        this.style = style;
        this.drawLayer.setStyle(this.style);
    }
}
