import {createCurve,linearInterpolate,equal} from "../utils"
import { Feature } from "ol"
import { Coordinate } from "ol/coordinate"
import LineString from "ol/geom/LineString"
import Point from "ol/geom/Point"
import { Style } from "ol/style"
import { createArrow, ArrowOptions } from "../style/arrow"
import parseStyle from '../style/parseJSON'
import OLObject from "ol/Object"
import VectorSource from "ol/source/Vector"


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
 * 默认箭头样式
 */
const defaultArrowOptions: ArrowOptions = {
    color: "#409eff"
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
    target: Flight;
    feature: Feature<any>;
    fraction?: number;
}

/**
 * 样式函数类型
 */
export type StyleFunction = (options: StyleFunctionOptions) => Style | Style[];

export interface FlightOptions {
    from: Coordinate;
    to: Coordinate;
    radius?: number;
    angle?: number;
    loop?: boolean;
    space?: number;
    smooth?: number;
    endArrow?: ArrowOptions | Boolean | Function;
    animationArrow?: ArrowOptions | Boolean | Function;
    lineStyle?: StyleFunction | Object | Style;
    lineAnimationStyle?: StyleFunction | Object | Style;
    pointAnimationStyle?: StyleFunction | Object | Style;
    source: VectorSource<any>;
}

const defaultOptions: FlightOptions = {
    from: null, to: null, radius: 0, angle: 90, loop: true, space: 0.01, smooth: 0.01, endArrow: defaultArrowOptions, animationArrow: defaultArrowOptions, lineStyle: defaultLine, lineAnimationStyle: defaultLineAnimationStyle, pointAnimationStyle: defaultPointAnimationStyle, source: null
}

/**
 * 航线
 * @author 潘知悦
 * @since v1.1.0
 */
class Flight extends OLObject {
    /**
     * 起点坐标
     */
    private from_: Coordinate;

    /**
     * 终点坐标
     */
    private to_: Coordinate;

    /**
     * 曲线半径度数, 默认为0,直线
     */
    private radius_: number;

    /**
     * 曲线角度，radius与 angle结合可定义曲线的形状
     */
    private angle_: number;

    /**
     * 动画循环
     */
    private loop_: boolean;

    /**
     * 分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快
     */
    private space_: number;

    /**
     * 平滑度，越小线越平滑
     */
    private smooth_: number;

    /**
     * 终点箭头
     */
    private endArrow_: ArrowOptions | Boolean | Function;

    /**
     * 动画箭头
     */
    private animationArrow_: ArrowOptions | Boolean | Function;

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
     * 是否初始化
     */
    private ready: boolean = false;

    /**
     * 构造函数
     */
    constructor(opt_options: FlightOptions) {
        super();
        let options = Object.assign({}, defaultOptions, opt_options);
        this.setFrom(options.from);
        this.setTo(options.to);
        this.setRadius(options.radius);
        this.setAngle(options.angle);
        this.setLoop(options.loop);
        this.setSpace(options.space);
        this.setSmooth(options.smooth);
        this.setEndArrow(options.endArrow);
        this.setAnimationArrow(options.animationArrow);
        this.setLineStyle(options.lineStyle);
        this.setLineAnimationStyle(options.lineAnimationStyle);
        this.setPointAnimationStyle(options.pointAnimationStyle);
        this.setSource(options.source);

        this.init_();

        this.ready = true;
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
        this.initLineFeature_();
        if (!this.feature_) return

        let style: any = [];
        if (this.lineStyle_ instanceof Array) {
            style = style.concat(this.lineStyle_);
        } else if (this.lineStyle_ instanceof Function) {
            style = this.lineStyle_({ target: this, feature: this.feature_ });
            if (style instanceof Style) {
                style = [style];
            }
        }


        if (this.endArrow_) {
            if (this.endArrow_ instanceof Function) {
                style.push(this.endArrow_({ target: this, feature: this.feature_ }));
            } else if (this.endArrow_ instanceof Boolean) {
                style.push(createArrowStyle(this.feature_.getGeometry().getCoordinates(), {}));
            } else {
                style.push(createArrowStyle(this.feature_.getGeometry().getCoordinates(), this.endArrow_));
            }
        }

        this.feature_.setStyle(style)
    }

    /**
     * 初始化航线要素
     */
    private initLineFeature_() {
        //添加航线
        const points = this.createPoints_();
        if (!this.feature_) {
            const flightline = new LineString(points)
            this.feature_ = new Feature({ geometry: flightline })
            this.source_.addFeature(this.feature_)
        } else {
            this.feature_.getGeometry().setCoordinates(points);
        }
    }

    /**
     * 创建航线路线点集
     */
    private createPoints_() {
        const line = this.radius_ > 0
            ? createCurve(this.from_, this.to_, this.radius_, this.angle_, this.smooth_)
            : [this.from_, this.to_]
        return this.space_ ? linearInterpolate(line, this.space_) : line
    }

    /**
     * 渲染
     */
    private animation_() {
        // eslint-disable-next-line no-unused-vars
        const animation = () => {
            let coordinates = this.feature_.getGeometry().getCoordinates();
            let length = coordinates.length;

            if (!this.lineAnimationFeature_) {
                this.lineAnimationFeature_ = new Feature(new LineString([coordinates[0]]))
                this.source_.addFeature(this.lineAnimationFeature_)
            }

            if (!this.pointAnimationFeature_) {
                this.pointAnimationFeature_ = new Feature(new Point(coordinates[0]))
                this.source_.addFeature(this.pointAnimationFeature_)
            }

            ++this.fraction_
            if (this.fraction_ >= length) {
                if (this.loop_) {
                    this.fraction_ = 1;
                } else {
                    return;
                }
            }
            this.renderLine_(coordinates, this.fraction_);
            this.renderPoint_(coordinates, this.fraction_);
            this.aId_ = window.requestAnimationFrame(animation)
        }
        animation();
    };

    /**
     * 线
     * @param coordinates 航线坐标点集
     * @param fraction 索引号
     */
    private renderLine_(coordinates: Array<Coordinate>, fraction: number) {
        const points = coordinates.slice(0, fraction + 1)
        const line = new LineString(points)
        this.lineAnimationFeature_.setGeometry(line)

        let style: any = [];
        if (this.lineAnimationStyle_ instanceof Array) {
            style = style.concat(this.lineAnimationStyle_);
        } else if (this.lineAnimationStyle_ instanceof Function) {
            style = this.lineAnimationStyle_({ feature: this.lineAnimationFeature_, fraction, target: this });
            if (style instanceof Style) {
                style = [style];
            }
        }

        if (this.animationArrow_) {
            if (this.animationArrow_ instanceof Function) {
                style.push(this.animationArrow_({ target: this, feature: this.feature_ }));
            } else if (this.animationArrow_ instanceof Boolean) {
                style.push(createArrowStyle(points, {}));
            } else {
                style.push(createArrowStyle(points, this.animationArrow_));
            }
        }

        this.lineAnimationFeature_.setStyle(style)
    }

    /**
     * 渲染点
     * @param coordinates 航线坐标点集
     * @param fraction 索引号
     */
    private renderPoint_(coordinates: Array<Coordinate>, fraction: number) {
        const coordinate = coordinates[fraction]
        const point = new Point(coordinate)
        this.pointAnimationFeature_.setGeometry(point)

        let style: any = [];
        if (this.pointAnimationStyle_ instanceof Array) {
            style = style.concat(this.pointAnimationStyle_);
        } else if (this.pointAnimationStyle_ instanceof Function) {
            style = this.pointAnimationStyle_({ feature: this.pointAnimationFeature_, fraction, target: this });
            if (style instanceof Style) {
                style = [style];
            }
        }

        this.pointAnimationFeature_.setStyle(style)
    }


    //#region Set
    /**
     * 设置起点
     * @param from [x,y]
     */
    setFrom(from: Coordinate) {
        this.from_ = from;
        this.ready && this.init_();
    }

    /**
     * 设置终点
     * @param to [x,y]
     */
    setTo(to: Coordinate) {
        this.to_ = to;
        this.ready && this.init_();
    }

    /**
     * 设置曲线半径读书，默认为0，直线
     * @param radius
     */
    setRadius(radius: number) {
        this.radius_ = radius;
        this.ready && this.init_();
    }

    /**
     * 设置曲线角度，radius与 angle结合可定义曲线的形状
     * @param angle
     */
    setAngle(angle: number) {
        this.angle_ = angle;
        this.ready && this.init_();
    }

    /**
     * 分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快
     * @param space
     */
    setSpace(space: number) {
        this.space_ = space;
        this.ready && this.init_();
    }

    /**
     * 平滑度，越小线越平滑
     * @param smooth
     */
    setSmooth(smooth: number) {
        this.smooth_ = smooth;
        this.ready && this.init_();
    }

    /**
     * 设置是否循环
     * @param loop 
     */
    setLoop(loop: boolean) {
        this.loop_ = loop;
    }

    /**
     * 设置终点箭头
     * @param arrow
     */
    setEndArrow(arrow: ArrowOptions | Boolean | Function) {
        this.endArrow_ = arrow;
        this.ready && this.init_();
    }

    /**
     * 设置动画箭头
     * @param arrow
     */
    setAnimationArrow(arrow: ArrowOptions | Boolean | Function) {
        this.animationArrow_ = arrow;
    }

    /**
     * 设置默认轨迹样式
     * @param style 样式
     */
    setLineStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.lineStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.lineStyle_ = style as any;
        }
        else if (style instanceof Object) {
            this.lineStyle_ = [parseStyle(style)];
        }
        this.ready && this.init_();
    }

    /**
     * 设置动画轨迹样式
     * @param style 样式
     */
    setLineAnimationStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.lineAnimationStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.lineAnimationStyle_ = style as any;
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
            this.pointAnimationStyle_ = style as any;
        }
        else if (style instanceof Object) {
            this.pointAnimationStyle_ = [parseStyle(style)];
        }
    }

    /**
     * 设置矢量数据源
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
     * 获取起点坐标
     * @return [x,y]
     */
    getFrom(): Coordinate {
        return this.from_;
    }

    /**
     * 获取终点坐标
     * @return [x,y]
     */
    getTo(): Coordinate {
        return this.to_;
    }

    /**
     * 获取曲线半径度数
     * @return 
     */
    getRadius(): number {
        return this.radius_;
    }

    /**
     * 获取曲线半径度数
     * @return 
     */
    getAngle(): number {
        return this.angle_;
    }

    /**
     * 获取是否循环
     * @return 布尔值
     */
    getLoop(): boolean {
        return this.loop_;
    }

    /**
     * 获取分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快
     * @return 
     */
    getSpace(): number {
        return this.space_;
    }

    /**
     * 获取平滑度，越小线越平滑
     * @return 
     */
    getSmooth(): number {
        return this.smooth_;
    }

    /**
     * 获取终点箭头
     * @return 
     */
    getEndArrow(): ArrowOptions | Boolean | Function {
        return this.endArrow_;
    }

    /**
     * 获取动画箭头
     * @return 
     */
    getAnimationArrow(): ArrowOptions | Boolean | Function {
        return this.animationArrow_;
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
     * 获取矢量数据源
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


export default Flight;