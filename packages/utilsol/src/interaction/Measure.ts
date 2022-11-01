import * as geom from "ol/geom";
import * as interaction from "ol/interaction";
import * as Observable from "ol/Observable";
import * as sphere from "ol/sphere";
import * as style from "ol/style";

import Overlay from "ol/Overlay";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Feature } from "ol";
import Interaction, { InteractionOptions } from "ol/interaction/Interaction"
import InteractionProperty from 'ol/interaction/Property.js';
import { Coordinate } from "ol/coordinate";
import { newGuid } from "src/utils";
import { Positioning } from "ol/Overlay"
import { getAzimuth } from "../utils"
import BaseEvent from "ol/events/Event"
import { Projection } from "ol/proj";

/**
 * 量算类型
 */
export enum MeasureType {

    //面
    POLYGON = "Polygon",
    //线
    LINESTRING = "LineString",
};

/**
 * 量算事件类型
 */
export enum MeasureEventType {

    //量算绘制开始
    MEASURESTART = "measurestart",
    //量算绘制结束
    MEASUREEND = "measureend"
}

/**
 * Measure触发事件的实例
 */
export class MeasureEvent extends BaseEvent {
    public feature: Feature;
    public overlay: Overlay;

    /**
     * 构造函数
     * @param type 量算事件类型
     * @param feature 量算结果要素
     * @param overlay 量算结果覆盖物
     */
    constructor(type: MeasureEventType, feature: Feature, overlay: Overlay) {
        super(type)

        this.feature = feature;
        this.overlay = overlay;
    }
}
//量算几何类型
type MeasureGeometry = geom.LineString | geom.Polygon;
//量算样式类型
type MeasureStyle=style.Style|style.Style[]|Function

/**
 * 构造函数参数
 */
export interface MeasureOptions extends InteractionOptions {
    drawStyle?: MeasureStyle,
    resultStyle?: MeasureStyle,
    layer?: VectorLayer<VectorSource<MeasureGeometry>>
}

/**
 * 量算
 */
class Measure extends Interaction {
    //ol.interaction.Draw实例
    private draw_: interaction.Draw;
    //当前绘制的要素
    private sketchFeature_: Feature;
    //帮助信息地图覆盖物
    private helpOverlay_: Overlay;
    //量算结果覆盖物
    private resultOverlay_: Overlay;
    //量算结果地图覆盖物集合
    private resultOverlayArray_: Overlay[];
    //量算结果图层
    private layer_: VectorLayer<VectorSource<MeasureGeometry>>;
    //绘制样式
    private drawStyle_: MeasureStyle;
    //结果样式
    private resultStyle_: MeasureStyle;
    //鼠标移动方法
    private pointerMoveHandler_: any;

    /**
     * 构造函数
     */
    constructor(opt_options:MeasureOptions) {
        let options = Object.assign({}, opt_options)
        super(options);

        //默认绘制样式
        let defaultDrawStyle = (feature: Feature<MeasureGeometry>) => {
            let styles = [];
            let geometry: MeasureGeometry = feature.getGeometry()
            styles.push(
                new style.Style({
                    fill: new style.Fill({
                        color: "rgba(255, 255, 255, 0.2)",
                    }),
                    stroke: new style.Stroke({
                        color: "#EF7E3D",
                        width: 3,
                    }),

                }),
            );
            if (this.getType() == MeasureType.LINESTRING && geometry.getType() == "LineString") {
                const coordinates: Coordinate[] = geometry.getCoordinates() as Coordinate[];
                coordinates.forEach((coordinate, index) => {
                    let text = "";
                    if (index == 0) {
                        text = "起点";
                    } else if (index == coordinates.length - 1) {

                    } else {
                        text = measureLength(new geom.LineString(coordinates.slice(0, index + 1)), this.getMap().getView().getProjection());
                    }
                    styles.push(
                        new style.Style({
                            geometry: new geom.Point(coordinate),
                            image: new style.Circle({
                                radius: 5,
                                stroke: new style.Stroke({
                                    width: 2,
                                    color: "#f00"
                                }),
                                fill: new style.Fill({
                                    color: "#fff",
                                }),
                            }),
                            text: new style.Text({
                                text: text,
                                overflow: true,
                                fill: new style.Fill({
                                    color: "#7a7a7a",
                                }),
                                backgroundFill: new style.Fill({
                                    color: "#fff"
                                }),
                                backgroundStroke: new style.Stroke({
                                    width: 1,
                                    color: "#7a7a7a"
                                }),
                                font: "10px sans-serif",
                                padding: [1, 4, 1, 4],
                                offsetX: 16,
                                textAlign: "left"
                            })
                        })
                    );
                })
            }
            return styles;
        }

        //默认结果样式
        let defaultResultStyle = (feature: Feature<MeasureGeometry>) => {
            let styles = [];
            let geometry: MeasureGeometry = feature.getGeometry()

            styles.push(
                new style.Style({
                    fill: new style.Fill({
                        color: "rgba(255, 255, 255, 0.2)",
                    }),
                    stroke: new style.Stroke({
                        color: "#EF7E3D",
                        width: 3,
                    }),
                }),
            );
            if (geometry.getType() == "LineString") {
                const coordinates: Coordinate[] = geometry.getCoordinates() as Coordinate[];
                coordinates.forEach((coordinate, index) => {
                    let text = "";
                    if (index == 0) {
                        text = "起点";
                    } else if (index == coordinates.length - 1) {
                    } else {
                        text = measureLength(new geom.LineString(coordinates.slice(0, index + 1)), this.getMap().getView().getProjection());
                    }
                    styles.push(
                        new style.Style({
                            geometry: new geom.Point(coordinate),
                            image: new style.Circle({
                                radius: 5,
                                stroke: new style.Stroke({
                                    width: 2,
                                    color: "#f00"
                                }),
                                fill: new style.Fill({
                                    color: "#fff",
                                }),
                            }),
                            text: new style.Text({
                                text: text,
                                overflow: true,
                                fill: new style.Fill({
                                    color: "#7a7a7a",
                                }),
                                backgroundFill: new style.Fill({
                                    color: "#fff"
                                }),
                                backgroundStroke: new style.Stroke({
                                    width: 1,
                                    color: "#7a7a7a"
                                }),
                                font: "10px sans-serif",
                                padding: [1, 4, 1, 4],
                                offsetX: 16,
                                textAlign: "left"
                            })
                        })
                    );
                })
            }
            return styles;
        }

        this.drawStyle_ = options.drawStyle ? options.drawStyle : defaultDrawStyle;

        this.resultStyle_ = options.resultStyle ? options.resultStyle : defaultResultStyle;

        if (options.layer) {
            this.layer_ = options.layer;
        } else {
            this.layer_ = new VectorLayer({
                source: new VectorSource(),
            });
        }

        this.resultOverlayArray_ = [];

        /**
         * 鼠标移动事件
         * 量算提示信息跟随鼠标
         */
        this.pointerMoveHandler_ = (evt) => {
            if (evt.dragging) {
                return;
            }
            if (this.getType() == MeasureType.POLYGON) {
                this.createResultOverlay_();
            }
            this.updateHelpOverlay_(evt.coordinate);
        }

        this.addChangeListener(InteractionProperty.ACTIVE, this.updateState_);
    }

    /**
     * 设置地图对象
     * @param map 地图对象 
     */
    setMap(map) {
        super.setMap(map);
        this.updateState_();
    }

    /**
     * 设置量算类型
     * @param type 量算类型
     */
    public setType(type: MeasureType) {
        this.set("type", type);
        this.updateState_();
    }

    /**
     * 获取量算类型
     * @returns 量算类型
     */
    public getType() {
        return this.get("type");
    }

    /**
      * 创建量算结果覆盖物
      */
    private createResultOverlay_() {
        if (!this.sketchFeature_) {
            return;
        }
        let g = this.sketchFeature_.getGeometry();
        let tooltipCoord;
        let output;
        if (g instanceof geom.Polygon) {
            output = "面积：" + measureArea(g, this.getMap().getView().getProjection());
            tooltipCoord = g.getInteriorPoint().getCoordinates();
        } else if (g instanceof geom.LineString) {
            output = "总长：" + measureLength(g, this.getMap().getView().getProjection());
            tooltipCoord = g.getLastCoordinate();
        }
        if (!this.resultOverlay_) {
            let element = document.createElement("div");
            element.className = "measure-tooltip measure-tooltip-result";

            element.innerHTML = output;

            let positioning: Positioning = "center-center"
            let offset = [0, 0];
            if (this.getType() == MeasureType.LINESTRING) {
                let coordinates: Coordinate[] = (this.sketchFeature_.getGeometry() as geom.LineString).getCoordinates();
                let startP = coordinates[coordinates.length - 2];
                let endP = coordinates[coordinates.length - 1];
                let azimuth = getAzimuth(startP, endP)
                if (azimuth >= 0 && azimuth <= Math.PI) {
                    positioning = "top-center";
                    offset = [0, 15];
                } else {
                    positioning = "bottom-center";
                    offset = [0, -15];
                }

            }

            this.resultOverlay_ = new Overlay({
                element: element,
                offset: offset,
                positioning: positioning,
                stopEvent: true
            });
            this.resultOverlay_.set("id", newGuid());
            this.getMap().addOverlay(this.resultOverlay_);
            this.resultOverlayArray_.push(this.resultOverlay_);
        } else {
            this.resultOverlay_.getElement().innerHTML = output;
        }

        this.resultOverlay_.set("feature", this.sketchFeature_);
        const close = document.createElement("span");
        close.innerHTML = "x";
        close.className = "close";
        close.id = this.resultOverlay_.get("id");
        close.addEventListener("click", (e: PointerEvent) => {
            let id = (e.target as HTMLElement).id

            for (let i = this.resultOverlayArray_.length - 1; i >= 0; i--) {
                let item = this.resultOverlayArray_[i];
                if (item.get("id") == id) {
                    this.layer_.getSource().removeFeature(item.get("feature"));
                    this.getMap().removeOverlay(item);

                    this.resultOverlayArray_.splice(i, 1);
                }
            }
        })
        this.resultOverlay_.getElement().append(close);

        this.resultOverlay_.setPosition(tooltipCoord);
    }

    /**
     * 创建提示信息覆盖物
     */
    private createHelpOverlay_() {
        if (!this.helpOverlay_) {
            let element = document.createElement("div");
            element.className = "measure-tooltip";
            this.helpOverlay_ = new Overlay({
                element: element,
                offset: [15, 0],
                positioning: "center-left",
            });
            this.getMap().addOverlay(this.helpOverlay_);
        }
    }

    /**
     * 更新帮助信息覆盖物信息
     * @param coordinate 显示坐标
     */
    private updateHelpOverlay_(coordinate) {
        /** @type {string} */
        let helpMsg = "单击确定起点";

        //如果正在绘制图像
        if (this.sketchFeature_) {
            let g = this.sketchFeature_.getGeometry();
            if (g instanceof geom.Polygon) {
                helpMsg = `双击结束绘制面`;
            } else if (g instanceof geom.LineString) {
                helpMsg = `<div>总长:${measureLength(this.sketchFeature_.getGeometry() as geom.LineString, this.getMap().getView().getProjection())}</div><div>单击确定地点，双击结束</div>`;
            }
        }
        //更新提示信息
        this.helpOverlay_.getElement().innerHTML = helpMsg;
        this.helpOverlay_.setPosition(coordinate);
        this.helpOverlay_.getElement().classList.remove("hidden");
    }

    /**
     * 激活功能
     * @param  type
     */
    public start_(type: MeasureType) {
        //先移出之前激活的交互
        this.end_();
        //绑定鼠标移动,提示信息跟随事件
        this.getMap().on("pointermove", this.pointerMoveHandler_);
        //初始化绘图交互对象
        this.draw_ = new interaction.Draw({
            source: this.layer_.getSource(),
            type: type,
            style: this.drawStyle_,
        });
        this.getMap().addInteraction(this.draw_);

        //创建提示信息覆盖物
        this.createHelpOverlay_();

        //绑定绘图交互对象事件
        let listener;
        //绘图事件开始
        this.draw_.on(
            "drawstart",
            (evt) => {
                // 设置sketch
                this.sketchFeature_ = evt.feature;
                this.dispatchEvent("",);
            },
        );

        //绘图结束事件
        this.draw_.on(
            "drawend",
            (evt) => {
                evt.feature.setStyle(this.resultStyle_);
                this.createResultOverlay_();
                // 清空临时对象,事件(包括sketch:正在绘制的要素,listener:图形修改事件等)
                this.sketchFeature_ = null;
                this.resultOverlay_ = null;
                this.updateHelpOverlay_(null);
                Observable.unByKey(listener);
            },
        );
    }

    /**
     * 量算结束
     */
    public end_() {
        if (this.draw_) {
            this.getMap().un("pointermove", this.pointerMoveHandler_);
            this.getMap().removeOverlay(this.helpOverlay_);
            this.getMap().removeInteraction(this.draw_);
        }
    }

    /**
     * 清空量算结果
     */
    public clear() {
        this.layer_.getSource().clear();
        for (let i = 0; i < this.resultOverlayArray_.length; i++) {
            let overlay = this.resultOverlayArray_[i];
            this.getMap().removeOverlay(overlay);
        }
        this.resultOverlayArray_ = [];
    }

    /**
     * 更新状态
     */
    private updateState_() {
        const map = this.getMap();
        const active = this.getActive();
        const type = this.getType();
        if (!map || !active || !type) {
            this.end_();
        } else {
            this.start_(type);

        }
        this.layer_.setMap(active ? map : null);
    }

}

export default Measure;

/**
 * 获取面积量算结果输出字符串
 * @param polygon 面几何图形
 * @return 面积量算结果输出字符串
 */
export const measureArea = (polygon: geom.Polygon, projection: Projection) => {
    let area = sphere.getArea(polygon, {
        projection: projection,
    });
    let output;
    output = (area / 666.66666667).toFixed(2) + " " + "亩";
    return output;
}

/**
 * 获取距离量算结果输出字符串
 * @param  line 线几何图形
 * @return 距离量算结果输出字符串
 */
export const measureLength = (line: geom.LineString, projection: Projection) => {
    let length = sphere.getLength(line, {
        projection: projection,
    });
    let output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
    } else {
        output = Math.round(length * 100) / 100 + " " + "m";
    }
    return output;
}

