import {getArc} from "../utils"
import OLObject from "ol/Object"
import { Feature } from "ol";
import Polygon from "ol/geom/Polygon";
import { Fill, Stroke, Style } from "ol/style";
import Point from "ol/geom/Point";
import CircleGeom from "ol/geom/Circle"
import { Coordinate } from "ol/coordinate";
import parseStyle from "../style/parseJSON"
import VectorSource from "ol/source/Vector";



/**
 * 默认中心点样式
 */
const defaultCenter = {
    circle: {
        fill: '#ff0000',
        radius: 3
    }
}

/**
 * 默认圆样式
 */
const defaultCircle = {
    stroke: {
        color: "#ff0000"
    },
    fill: {
        color: "rgba(255,0,0,0.1)"
    }
}

/**
 * 默认弧度样式
 */
const defaultArc = {
    fill: {
        color: "rgba(255,0,0,0.01)"
    },
    stroke: {
        color: 'rgba(0,0,0,0)',
        width: 2
    }
}

/**
 * 样式函数传入参数
 */
export interface StyleFunctionOptions {
    target: Radar;
    feature: Feature<any>;
    index?: number;
}

/**
 * 样式函数类型
 */
export type StyleFunction = (options: StyleFunctionOptions) => Style | Style[];


export interface RadarOptions {
    /**
     * 中心点坐标
     */
    center: Coordinate;

    /**
     * 半径,单位为矢量数据单位
     */
    radius: number;

    /**
     * 起始角度
     */
    startAngle: number;

    /**
     * 弧角度
     */
    arcAngle: number;

    /**
     * 动画周期,单位s
     */
    period: number;

    /**
     * 是否循环
     */
    loop: boolean;

    /**
     * 图层
     */
    source: VectorSource<any>;

    /**
     * 中心点样式
     */
    centerStyle: StyleFunction | Object | Style;

    /**
     * 圆样式
     */
    circleStyle: StyleFunction | Object | Style;

    /**
     * 弧样式
     */
    arcStyle: StyleFunction | Object | Style;
}

export const defaultOptions = {
    radius: 10,
    center: [0, 0],
    period: 5,
    startAngle: 0,
    arcAngle: 1,
    loop: true,
    source: null,
    centerStyle: defaultCenter,
    circleStyle: defaultCircle,
    arcStyle: defaultArc

};

class Radar extends OLObject {

    /**
     * 半径
     */
    private radius_: number;

    /**
     * 中心点坐标
     */
    private center_: Coordinate;

    /**
     * 起始角度
     */
    private startAngle_: number;

    /**
     * 弧角度
     */
    private arcAngle_: number;

    /**
     * 是否循环
     */
    private loop_: boolean;

    /**
     * 动画周期
     */
    private period_: number;

    /**
     * 矢量图层
     */
    private source_: VectorSource<any>;

    /**
     * 中心点样式
     */
    private centerStyle_: StyleFunction | Style[];

    /**
     * 圆样式
     */
    private circleStyle_: StyleFunction | Style[];

    /**
     * 弧样式
     */
    private arcStyle_: StyleFunction | Style[];

    /**
     * 中心点要素
     */
    private centerFeature_: Feature<Point>;

    /**
     * 圆要素
     */
    private circleFeature_: Feature<CircleGeom>;

    /**
     * 弧要素集合
     */
    private arcFeatures_: Array<Feature<Polygon>>;

    /**
     * 动画
     */
    private aId_;

    /**
     * 当前角度
     */
    private currentAngle_: number = 0;

    /**
     * 是否加载完毕
     */
    private ready: boolean = false;

    constructor(opt_options: RadarOptions) {
        super();
        let options = Object.assign({}, defaultOptions, opt_options);
        this.source_ = options.source;
        this.radius_ = options.radius;
        this.center_ = options.center;
        this.startAngle_ = options.startAngle;
        this.arcAngle_ = options.arcAngle;
        this.loop_ = options.loop;
        this.period_ = options.period;
        this.setCenterStyle(options.centerStyle);
        this.setCircleStyle(options.circleStyle);
        this.setArcStyle(options.arcStyle);
        this.init_();
        this.ready = true;
    }


    /**
     * 初始化
     * @param redraw 重新渲染
     */
    init_(redraw: boolean = false) {
        this.renderArc_(redraw);
        this.renderCircle_(redraw);
        this.renderCenter_(redraw);
    }

    /**
    * 渲染中心点
    * @param redraw 重新渲染
    */
    renderArc_(redraw: boolean = false) {
        if (!this.arcFeatures_) {
            this.arcFeatures_ = [];
            for (let i = 0; i < 100; i++) {
                let points = getArc(this.center_, this.radius_, this.currentAngle_ - 0.01 * this.arcAngle_ * (i + 1), this.currentAngle_);
                points.push(this.center_);
                points.unshift(this.center_);
                this.arcFeatures_.push(new Feature({
                    geometry: new Polygon([points])
                }));
            }

            this.source_.addFeatures(this.arcFeatures_);
        }


        for (let i = 0; i < this.arcFeatures_.length; i++) {
            let feature = this.arcFeatures_[i];
            if (redraw) {
                let points = getArc(this.center_, this.radius_, this.currentAngle_ - 0.01 * this.arcAngle_ * (i + 1), this.currentAngle_);

                points.push(this.center_);
                points.unshift(this.center_);
                feature.getGeometry().setCoordinates([points]);
            }

            let style: any = [];
            if (this.arcStyle_ instanceof Array) {
                style = style.concat(this.arcStyle_);
            } else if (this.arcStyle_ instanceof Function) {
                style = this.arcStyle_({ target: this, feature: feature, index: i });
                if (style instanceof Style) {
                    style = [style];
                }
            }

            feature.setStyle(style);
        }
    }

    /**
     * 渲染中心点
     * @param redraw 重新渲染
     */
    renderCenter_(redraw: boolean = false) {
        if (!this.centerFeature_) {
            this.centerFeature_ = new Feature({
                geometry: new Point(this.center_),
            });
            this.source_.addFeature(this.centerFeature_);
        }
        if (redraw) {
            this.centerFeature_.getGeometry().setCoordinates(this.center_);
        }

        let style: any = [];
        if (this.centerStyle_ instanceof Array) {
            style = style.concat(this.centerStyle_);
        } else if (this.centerStyle_ instanceof Function) {
            style = this.centerStyle_({ target: this, feature: this.centerFeature_ });
            if (style instanceof Style) {
                style = [style];
            }
        }

        this.centerFeature_.setStyle(style);
    }

    /**
     * 渲染圆
     * @param redraw 重新渲染
     */
    renderCircle_(redraw: boolean = false) {
        if (!this.circleFeature_) {
            this.circleFeature_ = new Feature({
                geometry: new CircleGeom(this.center_, this.radius_),
            });
            this.source_.addFeature(this.circleFeature_);
        }

        if (redraw) {
            this.circleFeature_.getGeometry().setCenter(this.center_);
        }

        let style: any = [];
        if (this.circleStyle_ instanceof Array) {
            style = style.concat(this.circleStyle_);
        } else if (this.circleStyle_ instanceof Function) {
            style = this.circleStyle_({
                target: this, feature: this.circleFeature_
            });
            if (style instanceof Style) {
                style = [style];
            }
        }

        this.circleFeature_.setStyle(style);
    }

    start() {
        this.animation_();
    }

    end() {
        window.cancelAnimationFrame(this.aId_);
    }

    animation_() {
        
        const start = new Date().getTime()
        const animation = () => {
            const tick = new Date().getTime()
            const ratio = (tick - start) / (this.period_ * 1000)
            if (ratio > 1) {
                this.loop_ && this.animation_()
                return
            }

            this.currentAngle_ = this.startAngle_ + ratio * Math.PI * 2;

            this.init_(true);
            this.aId_ = window.requestAnimationFrame(animation)
        }
        animation();
    }


    //#region Set

    /**
     * 设置中心点
     * @param center 中心点
     */
    setCenter(center: Coordinate) {
        this.center_ = center;
        this.ready && this.init_(true);
    }

    /**
     * 设置半径
     * @param radius 半径
     */
    setRadius(radius: number) {
        this.radius_ = radius;
        this.ready && this.init_(true);
    }

    /**
     * 设置起始角度
     * @param startAngle 起始角度
     */
    setStartAngle(startAngel: number) {
        this.startAngle_ = startAngel;
        this.ready && this.init_(true);
    }

    /**
     * 设置弧角度
     * @param arcAngle 弧角度
     */
    setArcAngle(arcAngle: number) {
        this.arcAngle_ = arcAngle;
        this.ready && this.init_(true);
    }


    /**
     * 设置动画周期
     * @param period 动画周期
     */
    setPeriod(period: number) {
        this.period_ = period;
    }

    /**
     * 设置是否循环
     * @param loop 是否循环
     */
    setLoop(loop: boolean) {
        this.loop_ = loop;
    }

    /**
     * 设置矢量图层
     * @param source 矢量图层
     */
    setSource(source: VectorSource<any>) {

        if (this.source_) {
            this.centerFeature_ && this.source_.removeFeature(this.centerFeature_);
            this.circleFeature_ && this.source_.removeFeature(this.circleFeature_);
            for (let i = this.arcFeatures_.length; i >= 0; i--) {
                this.arcFeatures_ && this.source_.removeFeature(this.arcFeatures_[i]);
            }
        }

        this.source_ = source;
        this.centerFeature_ && this.source_.addFeature(this.centerFeature_)
        this.circleFeature_ && this.source_.addFeature(this.circleFeature_)
        this.arcFeatures_ && this.source_.addFeatures(this.arcFeatures_)
    }

    /**
     * 设置中心点样式
     * @param style 样式
     */
    setCenterStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.centerStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.centerStyle_ = style as any;
        }
        else if (style instanceof Object) {
            this.centerStyle_ = [parseStyle(style)];
        }
    }

    /**
     * 设置圆样式
     * @param style 样式
     */
    setCircleStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.circleStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.circleStyle_ = style as any;
        }
        else if (style instanceof Object) {
            this.circleStyle_ = [parseStyle(style)];
        }
    }

    /**
     * 设置圆弧样式
     * @param style 样式
     */
    setArcStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.arcStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.arcStyle_ = style as any;
        }
        else if (style instanceof Object) {
            this.arcStyle_ = [parseStyle(style)];
        }
    }

    //endregion Set


    //#region Get

    /**
     * 获取中心点
     * @return [x,y]坐标
     */
    getCenetr(): Coordinate {
        return this.center_;
    }

    /**
     * 获取半径
     * @return 表示半径的数值
     */
    getRadius(): number {
        return this.radius_;
    }

    /**
     * 获取起始角度(弧度)
     * @return 0-2PI之间的数值
     */
    getStartAngle(): number {
        return this.startAngle_;
    }

    /**
     * 获取弧角度
     * @return 
     */
    getArcAngle(): number {
        return this.arcAngle_;
    }

    /**
     * 获取是否循环
     * @return boolean
     */
    getLoop(): boolean {
        return this.loop_;
    }

    /**
     * 获取动画周期
     * @return 数值
     */
    getPeriod(): number {
        return this.period_;
    }

    /**
     * 获取矢量数据源
     * @return 矢量数据源
     */
    getSource(): VectorSource<any> {
        return this.source_;
    }

    /**
     * 获取中心点样式
     * @return 中心点样式
     */
    getCenterStyle(): StyleFunction | Style[] {
        return this.centerStyle_;
    }

    /**
     * 获取圆样式
     * @return
     */
    getCircleStyle(): StyleFunction | Style[] {
        return this.circleStyle_;
    }

    /**
     * 获取圆弧样式
     * @return
     */
    getArcStyle(): StyleFunction | Style[] {
        return this.arcStyle_;
    }

    /**
     * 获取中心点要素
     * @return
     */
    getCenterFeature(): Feature<any> {
        return this.centerFeature_;
    }

    /**
     * 获取圆弧要素
     * @return 
     */
    getCircleFeature(): Feature<any> {
        return this.circleFeature_;
    }

    /**
     * 获取圆弧要素集合
     * @return
     */
    getArcFeatures(): Array<Feature<any>> {
        return this.arcFeatures_;
    }

    /**
     * 获取当前扫描角度
     * @return
     */
    getCurrentAngle(): number {
        return this.currentAngle_;
    }
    //#endregion

}

export default Radar;
