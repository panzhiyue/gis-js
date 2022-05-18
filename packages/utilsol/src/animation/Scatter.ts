
import { Feature } from "ol";
import { Coordinate } from "ol/coordinate";
import Point from "ol/geom/Point";
import OLObject from "ol/Object"
import parseStyle from "../style/parseJSON"
import { easeOut } from 'ol/easing'
import { Style } from "ol/style";
import VectorSource from "ol/source/Vector";

const defaultCenterStyle: Object = {
    zIndex: 10,
    circle: {
        fill: { color: "#ff0000" },
        radius: 10,
        stroke: {
            width: 2,
            color: "#ffff0000"
        }
    }
};

const defaultRippleStyle: Object = {
    zIndex: 10,
    circle: {
        fill: { color: "#ff0000" },
        stroke: {
            width: 2,
            color: "#ffff0000"
        }
    }
}

export interface ScatterOptions {
    coordinate: Coordinate;  //坐标点
    innerRadius: number;  //散点内圈半径
    outerRadius?: number;  //散点外圈半径
    innerOpacity?: number; //散点内圈透明度
    outerOpacity?: number; //散点外圈透明度
    loop?: boolean;   //是否循环
    centerStyle?: Function | Object | Style | Style[];  //中心点样式
    rippleStyle?: Function | Object | Style | Style[];  //散点样式
    period?: number;   //动画周期
    source: VectorSource<any>;   //图层
}

const defaultOptions: ScatterOptions = {
    coordinate: null,
    innerRadius: 10,
    outerRadius: 50,
    innerOpacity: 1,
    outerOpacity: 0,
    loop: true,
    source: null,
    centerStyle: defaultCenterStyle,
    rippleStyle: defaultRippleStyle,
    period: 1.5,
};

/**
 * 样式函数传入参数
 */
export interface StyleFunctionOptions {
    target: Scatter;
    radius?: number,
    opacity?: number,
    fraction: number;
}

/**
 * 样式函数类型
 */
export type StyleFunction = (options: StyleFunctionOptions) => Style | Style[];



/**
 * 散点
 * @author 潘知悦
 * @since v1.1.0
 */
class Scatter extends OLObject {

    /**
     * 坐标
     */
    private coordinate_: Coordinate;

    /**
     * 散点内圈半径
     */
    private innerRadius_: number;

    /**
     * 散点外圈半径
     */
    private outerRadius_: number;

    /**
     * 散点内圈透明度
     */
    private innerOpacity_: number;

    /**
     * 散点外圈透明度
     */
    private outerOpacity_: number;

    /**
     * 动画循环
     */
    private loop_: boolean;

    /**
     * 动画周期，秒数
     */
    private period_: number;

    /**
     * 中心点样式
     */
    private centerStyle_: StyleFunction | Style[];

    /**
     * 散点样式
     */
    private rippleStyle_: StyleFunction | Style[];

    /**
     * 要素
     */
    private feature_: Feature<any>;

    /**
     * 动画主键
     */
    private aId_: any;

    /**
     * 图层
     */
    private source_: VectorSource<any>;

    /**
     * 构造函数
     * @param opt_options
     */
    constructor(opt_options: ScatterOptions) {
        super();
        let options = Object.assign({}, defaultOptions, opt_options);

        this.setCoordinate(options.coordinate);
        this.setInnerRadius(options.innerRadius);
        this.setOuterRadius(options.outerRadius);
        this.setInnerOpacity(options.innerOpacity);
        this.setOuterOpacity(options.outerOpacity);
        this.setLoop(options.loop);
        this.setSource(options.source);
        this.setCenterStyle(options.centerStyle);
        this.setRippleStyle(options.rippleStyle);
        this.setPeriod(options.period);
        this.init_();
    }

    /**
     * 初始化
     */
    private init_() {
        let geometry = new Point(this.coordinate_)
        if (!geometry) return
        this.feature_ = new Feature({ geometry })
        this.source_.addFeature(this.feature_)
        if (!this.feature_) return
        const center = this.centerStyle_ as Style[];
        let styles = center
        this.feature_.setStyle(styles)
    }

    /**
     * 开始动画
     */
    start() {
        this.animation_()
    }

    /**
     * 结束动画
     */
    end() {
        window.cancelAnimationFrame(this.aId_)
    }

    /**
     * 销毁
     */
    dispose(): void {
        this.end();
        this.source_.removeFeature(this.feature_);
        this.feature_ = null;
    }

    /**
     * 动画
     */
    private animation_() {
        const period = this.period_;

        const start = new Date().getTime()
        const animation = () => {

            const tick = new Date().getTime()
            const ratio = (tick - start) / (period * 1000)
            if (ratio > 1) {
                this.loop_ && this.animation_()
                return
            }
            const fraction = easeOut(ratio)
            const radius = this.innerRadius_ + (this.outerRadius_ - this.innerRadius_) * fraction
            const opacity = this.innerOpacity_ - (this.innerOpacity_ - this.outerOpacity_) * fraction;

            let center: any = [];
            if (this.centerStyle_ instanceof Array) {
                center = center.concat(this.centerStyle_);
            } else if (this.centerStyle_ instanceof Function) {
                center = this.centerStyle_({ target: this, fraction });
                if (center instanceof Style) {
                    center = [center];
                }
            }
            let ripple: any = [];
            if (this.rippleStyle_ instanceof Array) {
                ripple = ripple.concat(this.rippleStyle_);
                ripple.forEach(style => {
                    style.getImage().setRadius(radius);
                    style.getImage().setOpacity(opacity);
                });
            } else if (this.rippleStyle_ instanceof Function) {
                ripple = this.rippleStyle_({ target: this, radius, opacity, fraction });
                if (ripple instanceof Style) {
                    ripple = [ripple];
                }
            }

            this.feature_.setStyle(ripple.concat(center))
            this.aId_ = window.requestAnimationFrame(animation)
        }
        animation();
    }

    //#region  Set
    /**
     * 设置坐标值
     * @param coordinate 坐标
     */
    setCoordinate(coordinate: Coordinate) {
        this.coordinate_ = coordinate;
        if (this.feature_) {
            this.feature_.getGeometry().setCoordinates(this.coordinate_);
        }
    }

    /**
     * 设置散点内圈
     * @param radius 半径
     */
    setInnerRadius(radius: number) {
        this.innerRadius_ = radius;
    }

    /**
     * 设置散点外圈
     * @param radius 半径
     */
    setOuterRadius(radius: number) {
        this.outerRadius_ = radius;
    }

    /**
     * 设置散点内圈透明度
     * @param opacity 透明度
     */
    setInnerOpacity(opacity: number) {
        this.innerOpacity_ = opacity;
    }

    /**
     * 设置散点外圈透明度
     * @param opacity 透明度
     */
    setOuterOpacity(opacity: number) {
        this.outerOpacity_ = opacity;
    }

    /**
     * 设置是否循环
     * @param loop 是否循环
     */
    setLoop(loop: boolean) {
        this.loop_ = loop;
    }

    /**
     * 设置动画周期
     * @param period 数值，单位为秒
     */
    setPeriod(period: number) {
        this.period_ = period;
    }

    /**
     * 中心点样式
     * @param style 样式
     */
    setCenterStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.centerStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.centerStyle_ = style;
        }
        else if (style instanceof Object) {
            this.centerStyle_ = [parseStyle(style)];
        }
    }

    /**
     * 散点样式
     * @param style 样式
     */
    setRippleStyle(style: StyleFunction | Object | Style | Style[]) {
        if (style instanceof Style) {
            this.rippleStyle_ = [style];
        } else if (style instanceof Function || style instanceof Array) {
            this.rippleStyle_ = style;
        }
        else if (style instanceof Object) {
            this.rippleStyle_ = [parseStyle(style)];
        }
    }

    /**
     * 矢量数据源
     * @param source 矢量数据源
     */
    setSource(source: VectorSource<any>) {
        if (this.source_ && this.feature_) {
            this.source_.removeFeature(this.feature_)
        }
        this.source_ = source;
        if (this.feature_) {
            this.source_.addFeature(this.feature_)
        }

    }

    //#endregion

    //#region  Get
    /**
     * 获取坐标值
     * @return [x,y]
     */
    getCoordinate(): Coordinate {
        return this.coordinate_;
    }

    /**
     * 获取散点内圈半径
     * @return 大于0的数值
     */
    getInnerRadius(): number {
        return this.innerRadius_;
    }

    /**
     * 获取散点外圈半径
     * @return 大于0的数值
     */
    getOuterRadius(): number {
        return this.outerRadius_;
    }

    /**
     * 获取散点内圈透明度
     * @return 0-1的数值
     */
    getInnerOpacity(): number {
        return this.innerOpacity_;
    }

    /**
     * 获取散点外圈透明度
     * @return 0-1的数值
     */
    getOuterOpacity(): number {
        return this.outerOpacity_;
    }

    /**
     * 设置是否循环
     * @return boolean值
     */
    getLoop(): boolean {
        return this.loop_;
    }

    /**
     * 设置动画周期
     * @return 大于0的数值
     */
    getPeriod(): number {
        return this.period_;
    }

    /**
     * 中心点样式
     * @return 样式
     */
    getCenterStyle(): StyleFunction | Style[] {
        return this.centerStyle_;
    }

    /**
     * 散点样式
     * @return 样式
     */
    getRippleStyle(): StyleFunction | Style[] {
        return this.rippleStyle_;
    }

    /**
     * 矢量数据源
     * @return 矢量数据源
     */
    getSource(): VectorSource<any> {
        return this.source_;
    }

    /**
     * 获取要素
     */
    getFeature(): Feature<any> {
        return this.feature_;
    }

    //#endregion

}


export default Scatter;