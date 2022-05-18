import {equal,getCoordinateByScale,getAzimuth,sliceByScale} from "../utils"
import { Feature } from "ol"
import { Coordinate } from "ol/coordinate"
import LineString from "ol/geom/LineString"
import Point from "ol/geom/Point"
import { Style } from "ol/style"
import { createArrow, ArrowOptions } from "../style/arrow"
import parseStyle from '../style/parseJSON'
import OLObject from "ol/Object"
import Event from "ol/events/Event"
import VectorSource from "ol/source/Vector"


export class TrackEvent extends Event {

    /**
     * 当前所在点
     */
    public coordinate: Coordinate;

    /**
     * 角度
     */
    public angle: number;

    /**
     * @param type
     * @param coordinate
     * @param angle
     */
    constructor(type: string, coordinate: Coordinate, angle: number) {
        super(type);

        this.coordinate = coordinate;

        this.angle = angle;
    }
}

/**
 * 默认线样式
 */
const defaultLine = {
    stroke: {
        color: '#409eff',
        lineDash: [5],
        width: 3
    }
}

// 默认线动效样式
const defaultLineAnimationStyle = {
    stroke: {
        width: 3,
        color: '#409eff',
    }
}

// 默认点动效样式
const defaultPointAnimationStyle = {
    circle: {
        fill: '#409eff',
        radius: 3
    }
}

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
 * 样式函数传入参数
 */
export interface StyleFunctionOptions {
    target: Track;
    fraction?: number;
    angle?: number;
}

/**
 * 样式函数类型
 */
export type StyleFunction = (options: StyleFunctionOptions) => Style | Style[];

export interface TrackOptions {
    coordinates: Array<Coordinate>;
    loop?: boolean;
    lineStyle?: StyleFunction | Object | Style;
    lineAnimationStyle?: StyleFunction | Object | Style;
    pointAnimationStyle?: StyleFunction | Object | Style;
    source: VectorSource<any>;
}

const defaultOptions: TrackOptions = {
    coordinates: null, loop: true, lineStyle: defaultLine, lineAnimationStyle: defaultLineAnimationStyle, pointAnimationStyle: defaultPointAnimationStyle, source: null
}

/**
 * 航线
 * @author 潘知悦
 * @since v1.1.0
 */
class Track extends OLObject {
    /**
     * 起点坐标
     */
    private coordinates_: Array<Coordinate>;


    /**
     * 动画循环
     */
    private loop_: boolean;


    /**
     * 固定航线线样式
     */
    private lineStyle_: StyleFunction | Style[];

    /**
     * 动画线样式
     */
    private lineAnimationStyle_: StyleFunction | Style[];

    /**
     * 动画点样式
     */
    private pointAnimationStyle_: StyleFunction | Style[];

    /**
     * 航线要素
     */
    private feature_: Feature<any> = null;

    /**
     * 动画线要素
     */
    private lineAnimationFeature_: Feature<any> = null;

    /**
     * 动画点要素
     */
    private pointAnimationFeature_: Feature<any> = null;

    /**
     * 矢量图层
     */
    private source_: VectorSource<any>;

    /**
     * 动画索引号
     */
    private fraction_: number = 0;

    /**
     * 动画id
     */
    private aId_;

    /**
     * 构造函数
     */
    constructor(opt_options: TrackOptions) {
        super();
        let options = Object.assign({}, defaultOptions, opt_options);

        this.setCoordinates(options.coordinates);
        this.setLoop(options.loop);
        this.setLineStyle(options.lineStyle);
        this.setLineAnimationStyle(options.lineAnimationStyle);
        this.setPointAnimationStyle(options.pointAnimationStyle);
        this.setSource(options.source);

        this.init_();
    }

    /**
     * 开始
     */
    start() {
        if (!this.aId_) {
            this.animation_();
        }
    }

    /**
     * 暂停
     */
    stop() {
        if (this.aId_) {
            window.cancelAnimationFrame(this.aId_)
            this.aId_ = null;
        }
    }

    /**
     * 结束
     */
    end() {
        if (this.aId_) {
            window.cancelAnimationFrame(this.aId_)
        }
        this.source_.removeFeature(this.lineAnimationFeature_);
        this.source_.removeFeature(this.pointAnimationFeature_);
        this.fraction_ = 0;
        this.pointAnimationFeature_ = null;
        this.lineAnimationFeature_ = null;
        this.aId_ = null;
    }

    /**
     * 初始化
     */
    private init_() {
        //添加航线
        const points = this.createPoints_();
        const geometry = new LineString(points)
        if (!geometry) return
        this.feature_ = new Feature({ geometry: geometry })
        this.source_.addFeature(this.feature_)
        if (!this.feature_) return

        let style: any = [];
        if (this.lineStyle_ instanceof Array) {
            style = style.concat(this.lineStyle_);
        } else if (this.lineStyle_ instanceof Function) {
            style = this.lineStyle_({ target: this });
            if (style instanceof Style) {
                style = [style];
            }
        }
        this.feature_.setStyle(style)
    }

    /**
     * 创建航线路线点集
     */
    private createPoints_() {
        return this.coordinates_;
    }

    /**
     * 渲染
     */
    private animation_() {
        let geometry, coordinates, length;

        if (!geometry) {
            geometry = this.feature_.getGeometry();
        }

        if (!coordinates) {
            coordinates = geometry.getCoordinates();
        }

        if (!length) {
            length = coordinates.length;
        }

        if (!this.lineAnimationFeature_) {
            this.lineAnimationFeature_ = new Feature(new LineString([coordinates[0]]))
            this.source_.addFeature(this.lineAnimationFeature_)
        }

        if (!this.pointAnimationFeature_) {
            this.pointAnimationFeature_ = new Feature(new Point(coordinates[0]))
            this.source_.addFeature(this.pointAnimationFeature_)
        }
        let start = new Date().getTime()


        // eslint-disable-next-line no-unused-vars
        const animation = () => {
            const tick = new Date().getTime()
            let fraction = (tick - start) / (10 * 1000)
            fraction += this.fraction_

            if (fraction > 1) {
                this.fraction_ = 0
                if (this.loop_) {
                    start = new Date().getTime();
                } else {
                    return;
                }
            }
            const coordinate = getCoordinateByScale(coordinates, fraction);
            const nextCoordinate = getCoordinateByScale(coordinates, fraction + 0.00001);
            const angle = getAzimuth(coordinate, nextCoordinate);
            this.dispatchEvent(new TrackEvent("move", coordinate, angle));
            this.renderLine_(coordinates, fraction, angle);
            this.renderPoint_(coordinates, fraction, angle);
            this.aId_ = window.requestAnimationFrame(animation)
        }
        animation();
    };

    /**
     * 线
     * @param coordinates 航线坐标点集
     * @param fraction 索引号
     */
    private renderLine_(coordinates: Array<Coordinate>, fraction: number, angle: number) {
        const points = sliceByScale(coordinates, 0, fraction);
        const line = new LineString(points)
        this.lineAnimationFeature_.setGeometry(line)

        let style: any = [];
        if (this.lineAnimationStyle_ instanceof Array) {
            style = style.concat(this.lineAnimationStyle_);
        } else if (this.lineAnimationStyle_ instanceof Function) {
            style = this.lineAnimationStyle_({ target: this, fraction });
            if (style instanceof Style) {
                style = [style];
            }
        }

        this.lineAnimationFeature_.setStyle(style)
    }

    /**
     * 渲染点
     * @param coordinates 航线坐标点集
     * @param fraction 索引号
     */
    private renderPoint_(coordinates: Array<Coordinate>, fraction: number, angle: number) {

        const coordinate = getCoordinateByScale(coordinates, fraction);
        const nextCoordinate = getCoordinateByScale(coordinates, fraction + 0.00001);
        const point = new Point(coordinate)
        this.pointAnimationFeature_.setGeometry(point)

        let style: any = [];

        if (this.pointAnimationStyle_ instanceof Array) {
            style = style.concat(this.pointAnimationStyle_);
        } else if (this.pointAnimationStyle_ instanceof Function) {
            style = this.pointAnimationStyle_({ target: this, angle, fraction });
            if (style instanceof Style) {
                style = [style];
            }
        }
        this.pointAnimationFeature_.setStyle(style)
    }

    //#region Set
    /**
     * 设置点集
     * @param coordinates [[x,y]...[x,y]]
     */
    setCoordinates(coordinates: Array<Coordinate>) {
        this.coordinates_ = coordinates;
        if (this.feature_) {
            this.feature_.getGeometry().setCoordinates(this.coordinates_);
        }
    }

    /**
     * 设置是否循环
     * @param loop 
     */
    setLoop(loop: boolean) {
        this.loop_ = loop;
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
    }

    /**
     * 设置动画轨迹样式
     * @param style 样式
     */
    setLineAnimationStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.lineAnimationStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.lineAnimationStyle_ = style;
        }

        else if (style instanceof Object) {
            this.lineAnimationStyle_ = [parseStyle(style)];
        }
    }

    /**
     * 设置动画点样式
     * @param style 样式
     */
    setPointAnimationStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.pointAnimationStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.pointAnimationStyle_ = style;
        }
        else if (style instanceof Object) {
            this.pointAnimationStyle_ = [parseStyle(style)];
        }
    }

    /**
     * 设置矢量图层
     * @param source
     */
    setSource(source: VectorSource<any>) {
        if (this.source_) {
            let source = this.source_;
            this.feature_ && source.removeFeature(this.feature_);
            this.lineAnimationFeature_ && source.removeFeature(this.lineAnimationFeature_);
            this.pointAnimationFeature_ && source.removeFeature(this.pointAnimationFeature_);
        }
        this.source_ = source;
        this.feature_ && source.addFeature(this.feature_);
        this.lineAnimationFeature_ && source.addFeature(this.lineAnimationFeature_);
        this.pointAnimationFeature_ && source.addFeature(this.pointAnimationFeature_);

    }

    /**
     * 设置动画进程
     * @param fraction
     */
    setFraction(fraction: number) {
        this.fraction_ = fraction;
    }
    //#endregion

    //#region Get

    /**
     * 获取坐标集合
     * @return [[x,y]...[x,y]]
     */
    getCoordinate(): Array<Coordinate> {
        return this.coordinates_;
    }

    /**
     * 获取是否循环
     * @return 布尔值
     */
    getLoop(): boolean {
        return this.loop_;
    }

    /**
     * 获取默认线样式
     * @return 
     */
    getLineStyle(): StyleFunction | Style[] {
        return this.lineStyle_;
    }

    /**
     * 获取动画线样式
     * @return 
     */
    getLineAnimationStyle(): StyleFunction | Style[] {
        return this.lineAnimationStyle_;
    }

    /**
     * 获取动画点样式
     * @return 
     */
    getPointAnimationStyle(): StyleFunction | Style[] {
        return this.pointAnimationStyle_;
    }

    /**
     * 获取默认线要素
     * @return
     */
    getFeature(): Feature<any> {
        return this.feature_;
    }

    /**
     * 获取动画线要素
     * @return
     */
    getLineAnimationFeature(): Feature<any> {
        return this.lineAnimationFeature_;
    }

    /**
     * 获取动画点要素
     * @return
     */
    getPointAnimationFeature(): Feature<any> {
        return this.pointAnimationFeature_;
    }

    /**
     * 获取矢量图层
     * @return 
     */
    getSource(): VectorSource<any> {
        return this.source_;
    }

    /**
     * 获取动画执行部分
     * @return 
     */
    getFraction_(): number {
        return this.fraction_;
    }

    //#endregion

}


export default Track;