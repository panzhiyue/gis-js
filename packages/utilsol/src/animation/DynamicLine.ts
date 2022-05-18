import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature"
import LineString from "ol/geom/LineString"
import VectorSource from "ol/source/Vector";
import {
    Style,
    Stroke
} from "ol/style";

export interface DynamicLineOptions {
    coordinates: Coordinate[],
    outlineColor?: string,
    outlineWidth?: number,
    innerlineColor?: string,
    innerlineWidth?: number,
    innerlineDash?: number[],
    innerlineDashOffset?: number,
    source: VectorSource<any>
}

// 默认点动效样式
const defaultOptions = {
    coordinates: null,
    outlineColor: "#ff0000",
    outlineWidth: 8,
    innerlineColor: "#ffffff",
    innerlineWidth: 6,
    innerlineDash: [0, 12],
    innerlineDashOffset: 0,
    source: null
};

/**
 * 动态线
 */
class DynamicLine {
    /**
     * 轨迹点
     */
    coordinates_: Coordinate[];

    /**
     * 
     */
    outlineColor_: string;

    outlineWidth_: number;
    innerlineColor_: string;
    innerlineWidth_: number;
    innerlineDash_: number[];
    innerlineDashOffset_: number;
    source_: VectorSource<any>;
    feature_:Feature<LineString>;

    /**
     * 计时器
     */
    timer_: any;

    /**
     * 构造函数
     * @param {DynamicLineOptions} opt_options 构造参数
     */
    constructor(opt_options: DynamicLineOptions) {
        let options = Object.assign({}, defaultOptions, opt_options);
        this.source_ = options.source;
        this.coordinates_ = options.coordinates;
        this.outlineColor_ = options.outlineColor;
        this.outlineWidth_ = options.outlineWidth;
        this.innerlineColor_ = options.innerlineColor;
        this.innerlineWidth_ = options.innerlineWidth;
        this.innerlineDash_ = options.innerlineDash;
        this.innerlineDashOffset_ = options.innerlineDashOffset;
        this.init_();
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
            this.feature_.getGeometry().setCoordinates(this.coordinates_);
        }

        this.feature_.setStyle(this.getStyle_(this.innerlineDashOffset_));
    }


    getStyle_(dashOffset) {
        var outlineStroke = new Style({
            stroke: new Stroke({
                color: this.outlineColor_,
                width: this.outlineWidth_,
            }),
        });
        const getAnimationStrokeStyle = () => {
            return new Style({
                stroke: new Stroke({
                    color: this.innerlineColor_,
                    width: this.innerlineWidth_,
                    lineDash: this.innerlineDash_,
                    lineDashOffset: dashOffset,
                }),
            });
        };
        return [outlineStroke, getAnimationStrokeStyle()];
    }

    /**
     * 开始动画
     */
    start() {
        let offset = this.innerlineDashOffset_;

        this.timer_ = setInterval(() => {
            offset += 1;
            this.feature_.setStyle(this.getStyle_(offset));
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
     *
     */
    setOutlineColor(outlineColor) {
        this.outlineColor_ = outlineColor;
        this.init_();
    }

    setOutlineWidth(outlineWidth) {
        this.outlineWidth_ = outlineWidth;
        this.init_();
    }

    setInnerlineColor(innerlineColor) {
        this.innerlineColor_ = innerlineColor;
        this.init_();
    }

    setInnerlineWidth(innerlineWidth) {
        this.innerlineWidth_ = innerlineWidth;
        this.init_();
    }

    setInnerlineDash(innerlineDash) {
        this.innerlineDash_ = innerlineDash;
        this.init_();
    }

    setInnerlineDashOffset(innerlineDashOffset) {
        this.innerlineDashOffset_ = innerlineDashOffset;
        this.init_();
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
}

export default DynamicLine;