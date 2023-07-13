import OLObject from "ol/Object"
import olMap from "ol/Map"
import { unlistenByKey } from "ol/events"

/**
 * CanvasFilter的构造参数
 */
export type CanvasFilterOptions = {
    /**
     * 灰度
     */
    grayscale: number | string,
    /**
     * 深褐色
     */
    sepia: number | string,
    /**
     * 饱和度
     */
    saturate: number | string,
    /**
     * 色相
     */
    hueRotate: number | string,

    /**
     * 反相
     */
    invert: number | string,
    /**
     * 透明度
     */
    opacity: number | string,
    /**
     * 亮度
     */
    brightness: number | string,
    /**
     * 对比度
     */
    contrast: number | string,
    /**
     * 模糊
     */
    blur: string,
    /**
     * 阴影
     */
    dropShadow: string,
    /**
     * canvas的className列表
     */
    classNameList: string[],
    /**
     * 顺序
     */
    sort: string[]
}

/**
 * Canvas滤镜
 */
class CanvasFilter extends OLObject {

    /**
     * 地图
     *
     * @private
     * @type {olMap}
     * @memberof CanvasFilter
     */
    private map: olMap;

    /**
     * 将图像转换为灰度图像。值定义转换的比例。值为100%则完全转为灰度图像，值
     * 为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。
     * 若未设置，值默认是0；
     * @example
     * "10%"
     */
    private grayscale: number | string;
    /**
     * 将图像转换为深褐色。值定义转换的比例。值为100%则完全是深褐色的，值为0%
     * 图像无变化。值在0%到100%之间，则是效果的线性乘子。
     * 若未设置，值默认是0；
     * @example
     * "10%"
     */
    private sepia: number | string;
    /**
     * 转换图像饱和度。值定义转换的比例。值为0%则是完全不饱和，值为100%则图像
     * 无变化。其他值，则是效果的线性乘子。超过100%的值是允许的，则有更高的饱
     * 和度。 若值未设置，值默认是1。
     * @example
     * "10%"
     */
    private saturate: number | string;
    /**
     * 给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。
     * 值为0deg，则图像无变化。若值未设置，默认值是0deg。
     * 该值虽然没有最大值，超过360deg的值相当于又绕一圈。
     * @example
     * "90deg"
     */
    private hueRotate: number | string;

    /**
     * 反转输入图像。值定义转换的比例。100%的价值是完全反转。值为0%则图像无变
     * 化。值在0%和100%之间，则是效果的线性乘子。 若值未设置，值默认是0。
     * @example
     * "10%"
     */
    private invert: number | string;
    /**
     * 转化图像的透明程度。值定义转换的比例。值为0%则是完全透明，值为100%则图
     * 像无变化。值在0%和100%之间，则是效果的线性乘子，也相当于图像样本乘以数
     * 量。 若值未设置，值默认是1。该函数与已有的opacity属性很相似，不同之处
     * 在于通过filter，一些浏览器为了提升性能会提供硬件加速。
     * @example
     * "10%"
     */
    private opacity: number | string;
    /**
     * 给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是0%，图像会全黑。
     * 值是100%，则图像无变化。其他的值对应线性乘数效果。值超过100%也是可以
     * 的，图像会比原来更亮。如果没有设定值，默认是1。
     * @example
     * "10%"
     */
    private brightness: number | string;
    /**
     * 调整图像的对比度。值是0%的话，图像会全黑。值是100%，图像不变。值可以超
     * 过100%，意味着会运用更低的对比。若没有设置值，默认是1。
     * @example
     * "10%"
     */
    private contrast: number | string;
    /**
     * 给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多
     * 少像素融在一起， 所以值越大越模糊；
     * @example
     * 10px
     */
    private blur: string;
    /**
     * drop-shadow(h-shadow v-shadow blur spread color)
     * 给图像设置一个阴影效果。阴影是合成在图像下面，可以有模糊度的，
     * 可以以特定颜色画出的遮罩图的偏移版本。
     * "3px 3px 3 3 #ff0000"
     */
    private dropShadow: string;
    /**
     * canvas的className列表
     */
    private classNameList: string[];
    /**
     * 顺序
     */
    private sort: string[];

    /**
     * 滤镜字符串
     *
     * @private
     * @type {string}
     * @memberof CanvasFilter
     */
    private filter: string;

    /**
     * 事件Key
     *
     * @private
     * @type {any}
     * @memberof CanvasFilter
     */
    private _key: any;

    /**
     * 
     * @param opt_options 
     */
    constructor(opt_options: CanvasFilterOptions) {
        let options = Object.assign({}, opt_options);

        super(options);
        this.grayscale = options.grayscale;
        this.sepia = options.sepia;
        this.saturate = options.saturate;
        this.hueRotate = options.hueRotate;
        this.invert = options.invert;
        this.opacity = options.opacity;
        this.brightness = options.brightness;
        this.contrast = options.contrast;
        this.blur = options.blur;
        this.dropShadow = options.dropShadow;
        this.classNameList = options.classNameList ? options.classNameList : ["ol-layer"];
        this.sort = options.sort ? options.sort : [
            "blur",
            "brightness",
            "contrast",
            "grayscale",
            "hueRotate",
            "invert",
            "opacity",
            "saturate",
            "sepia",
            "dropShadow",
        ];

    }

    /**
     * 设置地图对象
     * @param map 地图
     */
    public setMap(map: olMap) {

        this.map = map;
        this._updateFilter();
    }

    public render() {
        this._render();
    }

    /**
     * 重新渲染
     */
    private _render() {
        if (this.map) {
            this.map.render();
        }
    }
    /**
     * 更新filter字段值
     * @param render 是否重新渲染
     */
    private _updateFilter() {
        let options: any = {
            grayscale: this.grayscale,
            sepia: this.sepia,
            saturate: this.saturate,
            hueRotate: this.hueRotate,
            invert: this.invert,
            opacity: this.opacity,
            brightness: this.brightness,
            contrast: this.contrast,
            blur: this.blur,
            dropShadow: this.dropShadow,
        }
        let filter = "";
        for (let i in this.sort) {
            let field = this.sort[i];
            if (options[field]) {
                if (field == "hueRotate") {
                    filter += `hue-rotate(${options[field]}deg) `;
                } else {
                    filter += `${field}(${options[field]}) `;
                }
            }
        }
        this.filter = filter;

        if (this.map) {
            let renderer: any = this.map.getRenderer();

            if (renderer && renderer.children_.length > 0) {
                renderer.children_.forEach((children, index) => {
                    if (this.classNameList.indexOf(children.className) > -1) {
                        const canvas = children.firstElementChild;
                        let context = canvas.getContext("2d");
                        context.filter = this.filter ? this.filter : "none";
                    }
                });
            }
        }
    }

    /**
     * 设置grayscale值
     * @param grayscale 
     * @example
     * setGrayscale("10%")
     */
    public setGrayscale(grayscale: number | string) {
        this.grayscale = grayscale;
        this._updateFilter();
    }

    /**
     * 获取grayscale的值
     * @returns 
     */
    public getGrayscale(): number | string {
        return this.grayscale;
    }
    /**
     * 设置sepia值
     * @param sepia 
     * @example
     * setSepia("10%")
     */
    public setSepia(sepia: number | string) {
        this.sepia = sepia;
        this._updateFilter();
    }

    /**
     * 获取sepia的值
     * @returns 
     */
    public getSepia(): number | string {
        return this.sepia;
    }
    /**
     * 设置saturate值
     * @param saturate 
     * @example
     * setSaturate("10%")
     */
    public setSaturate(saturate: number | string) {
        this.saturate = saturate;
        this._updateFilter();
    }

    /**
     * 获取saturate的值
     * @returns 
     */
    public getSaturate(): number | string {
        return this.saturate;
    }
    /**
     * 设置hueRotate值
     * @param hueRotate 
     * @example
     * setHueRotate("90deg")
     */
    public setHueRotate(hueRotate: number | string) {
        this.hueRotate = hueRotate;
        this._updateFilter();
    }

    /**
     * 获取hueRotate的值
     * @returns 
     */
    public getHueRotate(): number | string {
        return this.hueRotate;
    }
    /**
     * 设置invert值
     * @param invert 
     * @example
     * setHueRotate("10%")
     */
    public setInvert(invert: number | string) {
        this.invert = invert;
        this._updateFilter();
    }

    /**
     * 获取invert的值
     * @returns 
     */
    public getInvert(): number | string {
        return this.invert;
    }
    /**
     * 设置opacity值
     * @param opacity 
     * @example
     * setOpacity("10%")
     */
    public setOpacity(opacity: number | string) {
        this.opacity = opacity;
        this._updateFilter();
    }

    /**
     * 获取opacity的值
     * @returns 
     */
    public getOpacity(): number | string {
        return this.opacity;
    }
    /**
     * 设置brightness值
     * @param brightness 
     * @example
     * setBrightness("10%")
     */
    public setBrightness(brightness: number | string) {
        this.brightness = brightness;
        this._updateFilter();
    }

    /**
     * 获取brightness的值
     * @returns 
     */
    public getBrightness(): number | string {
        return this.brightness;
    }
    /**
     * 设置contrast值
     * @param contrast 
     * @example
     * setContrast("10%")
     */
    public setContrast(contrast: number | string) {
        this.contrast = contrast;
        this._updateFilter();
    }

    /**
     * 获取contrast的值
     * @returns 
     */
    public getcontrast(): number | string {
        return this.contrast;
    }
    /**
     * 设置blur值
     * @param blur 
     * @example
     * setContrast("10px")
     */
    public setBlur(blur: string) {
        this.blur = blur;
        this._updateFilter();
    }

    /**
     * 获取blur的值
     * @returns 
     */
    public getBlur(): number | string {
        return this.blur;
    }
    /**
     * 设置dropShadow值
     * @param dropShadow
     * @example
     */
    public setDropShadow(dropShadow: string) {
        this.dropShadow = dropShadow;
        this._updateFilter();
    }

    /**
     * 获取dropShadow的值
     * @returns 
     */
    public getDropShadow(): string {
        return this.dropShadow;
    }

    /**
     * 获取classNameList的值
     * @returns 
     */
    public getClassNameList(): string[] {
        return this.classNameList;
    }
    /**
     * 设置sort值
     * @param sort 
     */
    public setSort(sort: string[]) {
        this.sort = sort;
        this._updateFilter();
    }

    /**
     * 获取sort的值
     * @returns 
     */
    public getSort(): string[] {
        return this.sort;
    }

}

export default CanvasFilter;