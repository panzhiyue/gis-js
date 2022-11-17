import BaseObject from "ol/Object"
import olMap from "ol/Map"
import EditorBLL from "./EditorBLL"
import Editor from "../control/Editor"
import { Feature } from "ol"

/**
 * 基础帮助类构造函数参数
 */
export interface BaseHelperOptions {
    map: olMap
}

/**
 * 编辑辅助类
 * 这个是一个基类,只用于继承,不在应用中实例化
 */
class BaseHelper extends BaseObject {
    //地图
    protected map_: olMap;
    //编辑类
    protected editorBLL_: EditorBLL;
    //编辑控件
    protected editorControl_: Editor;
    /**
     * 构造函数
     * @param opt_options 构造函数参数
     */
    constructor(opt_options: BaseHelperOptions) {
        let options = Object.assign({ map: null }, opt_options);
        super(options);
        this.map_ = options.map;
    }

    //#region 编辑对象接口
    /**
     * 开始编辑 
     * @param  callback 回调函数
     * @param  errorback 错误回调
     */
    KSBJ(callback: Function, errorback: Function) {

    }

    /**
     * 结束编辑
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    JSBJ(callback: Function, errorback: Function) {

    }

    /**
     * 选取图斑
     * @param feature 要素
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    XQTB(feature: Feature, callback: Function, errorback: Function) {

    }

    /**
     * 创建图斑
     * @param feature 要素
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    CJTB(feature: Feature, callback: Function, errorback: Function) {

    }

    /**
     * 切割图版
     * @param feature 要素
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    QGTB(feature: Feature, callback: Function, errorback: Function) {

    }

    /**
     * 保存图斑
     * @param  features 回调函数
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    BJTB(features: Feature[], callback: Function, errorback: Function) {

    }

    // /**
    //  * 录入属性
    //  * @param {module:ol/Feature} feature 要素
    //  * @param {function} callback 回调函数
    //  * @param {function} errorback 错误回调
    //  */
    // LRSX(feature, callback, errorback) {

    // }

    /**
     * 合并图斑 
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    HBTB(callback: Function, errorback: Function) {

    }

    /**
     * 删除图版
     * @param feature 要素
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    SCTB(feature: Feature, callback: Function, errorback: Function) {

    }
    /**
     * 取消操作 
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    QXCZ(callback: Function, errorback: Function) {

    }

    /**
     * 保存图斑 
     * @param callback 回调函数
     * @param errorback 错误回调
     */
    BCTB(callback: Function, errorback: Function) {

    }
    //#endregion 编辑对象接口

    /**
     * 刷新编辑项 
     */
    refreshEditItem() {

    }

    /**
     * 刷新编辑图层
     */
    refreshEditLayer() {

    }

    /**
     * 绑定编辑类
     * @param  editorBLL 编辑类
     */
    setEditorBLL(editorBLL: EditorBLL) {
        this.editorBLL_ = editorBLL;
    }

    /**
     * 绑定编辑控件
     * @param editorControl 编辑控件
     */
    setEditorControl(editorControl: Editor) {
        this.editorControl_ = editorControl;
    }
}

export default BaseHelper;