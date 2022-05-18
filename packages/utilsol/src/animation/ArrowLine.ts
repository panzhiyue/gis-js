import { equal } from "../utils"
import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature"
import LineString from "ol/geom/LineString"
import VectorSource from "ol/source/Vector";
import arrowIcon from "../assets/images/waymark-arrow.svg"
// let arrowIcon;
// await fetch("../assets/images/waymark-arrow.svg").then((res) => {
//     arrowIcon = res;
// })
import parseStyle from '../style/parseJSON'
import { createArrow, ArrowOptions } from "../style/arrow"
import {
    Style,
} from "ol/style";


/**
 * 创建箭头样式
 * @param coordinates 坐标点集
 * @param color 颜色
 */
export const createArrowStyle = (coordinates: Array<Coordinate>, arrowOptions: ArrowOptions) => {
    const length: number = coordinates.length
    let index: number = 0
    const to = coordinates[length - 1]
    let from = to
    while (from && equal(from, to)) {
        ++index
        from = coordinates[length - index]
    }
    return createArrow(from || to, to, arrowOptions)
}

/**
 * 默认线样式
 */
const defaultLineStyle = {
    stroke: {
        color: 'green',
        width: 8
    }
}

/**
 * 默认箭头样式
 */
const defaultArrowOptions: ArrowOptions = {
    color: "#ffffff",
    src: arrowIcon,
    scale: 4.5,
    rotation: Math.PI / 2
}

/**
 * 样式函数传入参数
 */
export interface StyleFunctionOptions {
    target: ArrowLine;
    feature: Feature<any>;
    fraction?: number;
}

/**
 * 样式函数类型
 */
export type StyleFunction = (options: StyleFunctionOptions) => Style | Style[];

export interface ArrowLineOptions {
    coordinates: Coordinate[],  //轨迹坐标
    lineStyle: StyleFunction | Object | Style;  //轨迹线样式
    arrowStyle: ArrowOptions | Function, //箭头线样式
    interval: number,   //箭头间隔
    source: VectorSource<any>
}

// 默认点动效样式
const defaultOptions = {
    coordinates: null,
    lineStyle: defaultLineStyle,
    arrowStyle: defaultArrowOptions,
    interval: 20,
    source: null
};

/**
 * 动态线
 */
class ArrowLine {
    /**
     * 轨迹点
     */
    coordinates_: Coordinate[];
    lineStyle_!: StyleFunction | Object | Style;
    arrowStyle_: ArrowOptions | Function;
    interval_: number;
    source_: VectorSource<any>;
    feature_!: Feature<LineString>;

    /**
     * 计时器
     */
    timer_: any;

    /**
     * 是否初始化
     */
    private ready: boolean = false;

    /**
     * 动画循环参数(0-10)
     */
    fraction: number = 0;

    /**
     * 速度倍率(默认速度的多少倍)
     */
    speed: number = 1;


    /**
     * 构造函数
     * @param  opt_options 构造参数
     */
    constructor(opt_options: ArrowLineOptions) {
        let options: ArrowLineOptions = Object.assign({}, defaultOptions, opt_options);
        this.source_ = options.source;
        this.coordinates_ = options.coordinates;
        this.interval_ = options.interval;
        this.setArrowStyle(options.arrowStyle);
        this.setLineStyle(options.lineStyle);
        this.init_();
        this.ready = true;
    }

    dispose() {
        this.end();
        this.source_.removeFeature(this.feature_);
    }

    init_() {
        if (!this.feature_) {
            this.feature_ = new Feature({
                geometry: new LineString(this.coordinates_)
            })
            this.source_.addFeature(this.feature_);
        } else {
            this.feature_.getGeometry()!.setCoordinates(this.coordinates_);
        }

        this.feature_.setStyle(this.getStyle_(0));
    }


    getStyle_(startIndex: number) {
        var styles = (feature, resolution) => {
            var geometry = feature.getGeometry();
            var length = geometry.getLength(); //获取线段长度
            var radio = (this.interval_ * resolution) / length;

            var dradio = 1; //投影坐标系，如3857等，在EPSG:4326下可以设置dradio=10000

            let styles: any = [];
            if (this.lineStyle_ instanceof Array) {
                styles = styles.concat(this.lineStyle_);
            } else if (this.lineStyle_ instanceof Function) {
                styles = this.lineStyle_({ target: this, feature: this.feature_, });
                if (styles instanceof Style) {
                    styles = [styles];
                }
            }


            for (var i = radio * startIndex / 10; i <= 1; i += radio) {
                var arrowLocation = geometry.getCoordinateAt(i);

                //编辑每个线段
                geometry.forEachSegment((start, end) => {
                    if (start[0] == end[0] && start[1] == end[1]) return;
                    var dx1 = end[0] - arrowLocation[0];
                    var dy1 = end[1] - arrowLocation[1];
                    var dx2 = arrowLocation[0] - start[0];
                    var dy2 = arrowLocation[1] - start[1];
                    if (Math.abs(dradio * dx1 * dy2 - dradio * dx2 * dy1) < 0.0001) {
                        if (this.arrowStyle_ instanceof Function) {
                            let tempStyle = this.arrowStyle_({ target: this, feature: this.feature_ });
                            if (tempStyle instanceof Array) {
                                styles.concat(tempStyle);
                            } else {
                                styles.push(tempStyle);
                            }
                        } else {
                            styles.push(createArrowStyle([start, arrowLocation], this.arrowStyle_));
                        }
                    }
                });
            }
            return styles;
        }
        return styles;
    }

    /**
     * 开始动画
     */
    start() {
        this.fraction = 0;
        this.timer_ = setInterval(() => {
            this.fraction += this.speed;

            this.fraction = this.fraction >= 10 ? 1 : this.fraction;
            let startIndex = this.fraction;
            this.feature_.setStyle(this.getStyle_(startIndex));
        }, 150);
    }

    /**
     * 结束动画
     */
    end() {
        if (this.timer_) {
            clearInterval(this.timer_);
            this.timer_ = null;
        }
    }

    /**
     * 设置轨迹坐标
     * @param coordinates
     */
    setCoordinates(coordinates) {
        this.coordinates_ = coordinates;
        this.init_();
    }


    /**
     * 设置默认轨迹样式
     * @param style 样式
     */
    setLineStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.lineStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.lineStyle_ = style;
        }
        else if (style instanceof Object) {
            this.lineStyle_ = [parseStyle(style)];
        }
        this.ready && this.init_();
    }

    /**
     * 设置动画箭头
     * @param arrow
     */
    setArrowStyle(arrow: ArrowOptions | Function) {
        this.arrowStyle_ = arrow;
        this.ready && this.init_();
    }

    /**
     * 设置箭头间隔(像素)
     * @param interval
     */
    setInterval(interval: number) {
        this.interval_ = interval;
        this.ready && this.init_();
    }



    /**
     * 设置矢量图层
     * @param source
     */
    setSource(source) {
        if (this.source_) {
            this.feature_ && this.source_.removeFeature(this.feature_);
        }
        this.source_ = source;
        this.feature_ && source.addFeature(this.feature_);

    }

    /**
     * 获取默认轨迹样式
     */
    getLineStyle() {
        return this.lineStyle_;
    }


    /**
     * 获取箭头间隔(像素)
     * @return 
     */
    getInterval(): number {
        return this.interval_;

    }
}

export default ArrowLine;