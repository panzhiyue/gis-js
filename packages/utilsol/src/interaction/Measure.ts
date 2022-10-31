import * as geom from "ol/geom";
import * as interaction from "ol/interaction";
import * as sphere from "ol/sphere";
import * as style from "ol/style";

import Overlay from "ol/Overlay";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Interaction from "ol/Interaction/Interaction"
import { Stroke, Fill, Style, } from "ol/style"
import { MapObjectEventTypes } from "ol/PluggableMap";
import Map from "ol/Map"
import { Feature, MapBrowserEvent } from "ol";
import MapBrowserEventType from "ol/MapBrowserEventType";
import EventType from "ol/events/EventType";
import InteractionProperty from 'ol/interaction/Property.js';
import { Coordinate } from "ol/coordinate";
import Event from "ol/events/Event"

/**
 * 量算类型
 */
export enum MeasureType {

    //面
    POLYGON = "Polygon",
    //线
    LINE_STRING = "LineString",
};

/**
 * @enum {string}
 */
enum MeasureEventType {
    /**
     * 在绘制开始时触发
     */
    DRAWSTART = 'drawstart',
    /**
     * 在绘制结束时触发
     */
    DRAWEND = 'drawend',
    /**
     * 在绘制中断时触发
     */
    DRAWABORT = 'drawabort',
};


/**
 */
export class MeasureEvent extends Event {

    /**
     * @param  type 事件类型.
     */
    constructor(type: MeasureEventType) {
        super(type);
    }
}

class Measure extends Interaction {
    private sketchFeature_: Feature;
    private sketchCoords_: Coordinate[];
    private layer_: VectorLayer<VectorSource>;
    private type_: MeasureType;
    constructor(opt_options) {
        let options = Object.assign({ type: "", style: new Style({ fill: new Fill({ color: 'rgba(0,0,0,0.4)' }), stroke: new Stroke({ color: '#000000', width: 1.25 }) }) }, opt_options)
        super(options);
        this.sketchFeature_ = null;

        this.sketchCoords_ = [];

        this.layer_ = new VectorLayer({
            source: new VectorSource()
        })

        this.type_ = options.type;

        this.addChangeListener(InteractionProperty.ACTIVE, this.updateState_);
    }

    override handleEvent(mapBrowserEvent: MapBrowserEvent<any>): boolean {
        if (mapBrowserEvent.originalEvent.type === EventType.CONTEXTMENU) {
            // Avoid context menu for long taps when drawing on mobile
            mapBrowserEvent.originalEvent.preventDefault();
        }

        if (mapBrowserEvent.type == MapBrowserEventType.SINGLECLICK) {
            this.addCoordinates_(mapBrowserEvent.coordinate);
        } else if (mapBrowserEvent.type == MapBrowserEventType.DBLCLICK) {
            this.drawEnd_();
        }

        return true;
    }

    private addCoordinates_(coordinates) {
        this.sketchCoords_.push(coordinates);

        if (this.sketchCoords_.length == 1) {
            this.dispatchEvent(new MeasureEvent(MeasureEventType.DRAWSTART));
        }

    }

    geometryFunction(){

    }


    private drawEnd_() {
        this.dispatchEvent(new MeasureEvent(MeasureEventType.DRAWEND));
    }

    private updateState_() {
        const map = this.getMap();
        const active = this.getActive();

        // if (!map || !active) {
        //     this.stop();
        // }
        this.layer_.setMap(active ? map : null);
    }

    setMap(map) {
        super.setMap(map);
        this.updateState_();
    }

    // private stop() {

    // }


}


export default Measure;
// /**
//  * 量算
//  * 绘制一个面显示面积或绘制一条线显示长度
//  * @param {module:ol/Map} map 地图
//  * @param {module:ol/layer/Vector} layer 量算图层
//  * @param {module:ol/style/Style} drawStyle 绘制样式
//  */
// export default function Measure(options) {
//     let draw;
//     /**
//      * 当前绘制的要素
//      * @type {module:ol/Feature}
//      */
//     let sketch;

//     let isActive = false;

//     /**
//      * 帮助信息dom节点
//      * @type {HTMLElement}
//      */
//     let helpTooltipElement;

//     /**
//      * 帮助信息地图覆盖物
//      * @type {module:ol/Overlay}
//      */
//     let helpTooltip;

//     /**
//      * 显示量算结果的dom节点
//      * @type {HTMLElement}
//      */
//     let measureTooltipElement;

//     /**
//      * 显示量算结果的地图覆盖物
//      * @type {module:ol/Overlay}
//      */
//     let measureTooltip;

//     /**
//      * 用户绘制多边形时显示的消息
//      * @type {string}
//      */
//     let continuePolygonMsg = "双击结束绘制面";

//     /**
//      * 当用户绘制线段时显示的消息。
//      * @type {string}
//      */
//     let continueLineMsg = "双击结束绘制";

//     /**
//      * 量算结果地图覆盖物集合
//      * @type {module:Array.<module:ol/Overlay>}
//      */
//     let measureTooltipArray = [];

//     /**
//      * 鼠标移动事件
//      * 量算提示信息跟随鼠标
//      * @param {module:ol/MapBrowserEvent} evt The event.
//      */
//     let pointerMoveHandler = function (evt) {
//         if (evt.dragging) {
//             return;
//         }
//         /** @type {string} */
//         let helpMsg = "单击开始绘制";

//         //如果正在绘制图像
//         if (sketch) {
//             let g = sketch.getGeometry();
//             if (g instanceof geom.Polygon) {
//                 helpMsg = continuePolygonMsg;
//             } else if (g instanceof geom.LineString) {
//                 helpMsg = continueLineMsg;
//             }
//         }
//         //更新提示信息
//         helpTooltipElement.innerHTML = helpMsg;
//         helpTooltip.setPosition(evt.coordinate);
//         helpTooltipElement.classList.remove("hidden");
//     };
//     //初始化图层
//     let vector, source;
//     if (layer) {
//         source = layer.getSource();
//         vector = layer;
//     } else {
//         source = new VectorSource();
//         vector = new VectorLayer({
//             source: source,
//             style: new style.Style({
//                 fill: new style.Fill({
//                     color: "rgba(255, 255, 255, 0.2)",
//                 }),
//                 stroke: new style.Stroke({
//                     color: "#ffcc33",
//                     width: 2,
//                 }),
//                 image: new style.Circle({
//                     radius: 7,
//                     fill: new style.Fill({
//                         color: "#ffcc33",
//                     }),
//                 }),
//             }),
//         });
//         map.addLayer(vector);
//     }

//     map.getViewport().addEventListener("mouseout", function () {
//         // helpTooltipElement.classList.add('hidden');
//     });

//     /**
//      * 获取距离量算结果输出字符串
//      * @param {module:ol/geom/LineString} line 线几何图形
//      * @return {string} 距离量算结果输出字符串
//      */
//     let formatLength = function (line) {
//         let length = sphere.getLength(line, {
//             projection: map.getView().getProjection(),
//         });
//         let output;
//         if (length > 100) {
//             output = Math.round((length / 1000) * 100) / 100 + " " + "km";
//         } else {
//             output = Math.round(length * 100) / 100 + " " + "m";
//         }
//         return output;
//     };

//     /**
//      * 获取面积量算结果输出字符串
//      * @param {module:ol/geom/Polygon} polygon 面几何图形
//      * @return {string} 面积量算结果输出字符串
//      */
//     let formatArea = function (polygon) {
//         let area = sphere.getArea(polygon, {
//             projection: map.getView().getProjection(),
//         });
//         let output;
//         output = (area / 666.66666667).toFixed(2) + " " + "亩";
//         //        if (area > 10000) {
//         //            output = (Math.round(area / 1000000 * 100) / 100) +
//         //              ' ' + 'km<sup>2</sup>';
//         //        } else {
//         //            output = (Math.round(area * 100) / 100) +
//         //              ' ' + 'm<sup>2</sup>';
//         //        }
//         return output;
//     };

//     /**
//      * 创建绘制帮助信息
//      */
//     function createHelpTooltip() {
//         if (helpTooltipElement) {
//             helpTooltipElement.parentNode.removeChild(helpTooltipElement);
//         }

//         helpTooltipElement = document.createElement("div");
//         helpTooltipElement.className = "measure-tooltip";
//         helpTooltip = new Overlay({
//             element: helpTooltipElement,
//             offset: [15, 0],
//             positioning: "center-left",
//         });
//         map.addOverlay(helpTooltip);
//     }

//     /**
//      * 创建量算结果信息
//      */
//     function createMeasureTooltip() {
//         if (measureTooltipElement) {
//             measureTooltipElement.parentNode.removeChild(measureTooltipElement);
//         }
//         measureTooltipElement = document.createElement("div");
//         measureTooltipElement.className = "measure-tooltip measure-tooltip-result";
//         measureTooltip = new Overlay({
//             element: measureTooltipElement,
//             offset: [0, -15],
//             positioning: "bottom-center",
//         });
//         map.addOverlay(measureTooltip);
//         measureTooltipArray.push(measureTooltip);
//     }

//     /**
//      * 激活功能
//      * @param {any} type
//      */
//     this.addInteraction = function (type) {
//         //先移出之前激活的交互
//         this.removeInteraction();
//         //更新状态
//         isActive = true;
//         //绑定鼠标移动,提示信息跟随事件
//         map.on("pointermove", pointerMoveHandler);
//         //初始化绘图交互对象
//         draw = new interaction.Draw({
//             source: source,
//             type: type,
//             style: drawStyle,
//         });
//         map.addInteraction(draw);

//         //创建提示信息覆盖物
//         createMeasureTooltip();
//         createHelpTooltip();

//         //绑定绘图交互对象事件
//         let listener;
//         //绘图事件开始
//         draw.on(
//             "drawstart",
//             function (evt) {
//                 // 设置sketch
//                 sketch = evt.feature;

//                 /** @type {module:ol/Coordinate|undefined} */
//                 let tooltipCoord = evt.coordinate;

//                 //图形修改,实时显示量算结果
//                 listener = sketch.getGeometry().on("change", function (evt) {
//                     let g = evt.target;
//                     let output;
//                     if (g instanceof geom.Polygon) {
//                         output = formatArea(g);
//                         tooltipCoord = g.getInteriorPoint().getCoordinates();
//                     } else if (g instanceof geom.LineString) {
//                         output = formatLength(g);
//                         tooltipCoord = g.getLastCoordinate();
//                     }
//                     measureTooltipElement.innerHTML = output;
//                     measureTooltip.setPosition(tooltipCoord);
//                 });
//             },
//             this
//         );

//         //绘图结束事件
//         draw.on(
//             "drawend",
//             function () {
//                 measureTooltipElement.className = "measure-tooltip measure-tooltip-help";
//                 measureTooltip.setOffset([0, -7]);
//                 // 清空临时对象,事件(包括sketch:正在绘制的要素,listener:图形修改事件等)
//                 sketch = null;
//                 measureTooltipElement = null;
//                 createMeasureTooltip();
//                 Observable.unByKey(listener);
//             },
//             this
//         );
//     };

//     /**
//      * 移出交互
//      */
//     this.removeInteraction = function () {
//         if (draw) {
//             map.un("pointermove", pointerMoveHandler);
//             map.removeOverlay(helpTooltip);
//             map.removeInteraction(draw);
//             isActive = false;
//         }
//     };

//     /**
//      * 清空量算结果
//      */
//     this.clear = function () {
//         source.clear();
//         for (let i = 0; i < measureTooltipArray.length; i++) {
//             let overlay = measureTooltipArray[i];
//             map.removeOverlay(overlay);
//         }
//         measureTooltipArray = [];
//     };

//     /**
//      * 获取状态
//      */
//     this.getIsActive = function () {
//         return this.isActive;
//     };
// }
