import * as events from "ol/events"
import * as interaction from 'ol/interaction'

import Collection from 'ol/Collection'
import DrawTool from 'ol/interaction/Draw'
import LVector from 'ol/layer/Vector'
import OLObject from 'ol/Object'
import SVector from 'ol/source/Vector'
import EditorEvent from "./EditorEvent"
import EditorType from "./EditorType"
import olMap from "ol/Map"
import BaseHelper from "./BaseHelper"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Feature } from "ol"

/**
 * 编辑类 
 */
class EditorBll extends OLObject {
    //地图
    protected map_: olMap;

    //编辑帮助类
    protected helper_: BaseHelper;

    //是否锁定
    protected isLock_: boolean;

    //删除图斑数组
    protected removeFeatures_: Collection<any>;

    //更新图斑数组
    protected updateFeatures_: Collection<any>;

    //添加图斑数组
    protected addFeatures_: Collection<any>;

    //编辑图层
    protected editLayer_: VectorLayer<VectorSource<any>>;

    //切割图层
    protected drawLayer_: VectorLayer<VectorSource<any>>;

    //修改图斑
    protected modify_: interaction.Modify;

    //绘图结束事件键值
    protected drawEndKey_: any;

    //选取图斑绘图类型
    protected XQTBType_: string;

    //创建图斑绘图类型 
    protected CJTBType_: string;

    //切割图斑绘图类型
    protected QGTBType_: string;

    //录入属性绘图类型 
    protected LRSXType_: string;

    //删除图斑绘图类型
    protected SCTBType_: string;

    protected draw_: interaction.Draw;

    protected oldType_: EditorType;
    protected type_: EditorType;
    protected obj_;

    /**
     * 构造函数
     * @param {Object} opt_options
     */
    constructor(opt_options) {
        let options = Object.assign({ map: null, helper: null }, opt_options);
        super();

        this.map_ = options.map;
        this.helper_ = options.helper;
        this.isLock_ = false;
        this.removeFeatures_ = new Collection();
        this.updateFeatures_ = new Collection();
        this.addFeatures_ = new Collection();
        this.editLayer_ = new LVector({
            source: new SVector(),
            style: function (feature) {
                return this.helper_.getStyle(feature);
            }.bind(this)
        });
        this.editLayer_.setZIndex(3);
        this.map_.addLayer(this.editLayer_);

        this.drawLayer_ = new LVector({
            source: new SVector()
        });
        this.map_.addLayer(this.drawLayer_);
        this.modify_ = null;
        this.drawEndKey_ = null;
        this.XQTBType_ = "Point";
        this.CJTBType_ = "Polygon";
        this.QGTBType_ = "LineString";
        this.LRSXType_ = "Point";
        this.SCTBType_ = "Point";

    }

    /**
     * 初始化绘图对象
     * @param type
     */
    initDraw(type) {
        if (this.draw_) {
            this.map_.removeInteraction(this.draw_);
            this.draw_ = null;
        }

        this.draw_ = new DrawTool({ source: this.drawLayer_.getSource(), type: type });
        this.draw_.on("drawstart", () => {
            this.drawLayer_.getSource().clear();
        });
        this.map_.addInteraction(this.draw_);
    }

    //#region obj
    /**
     * 开始编辑对象
     * @param bool 
     */
    KSBJObj(bool: boolean) {
        if (bool) {
            this.helper_.KSBJ(function (result) {
                this.dispatchEvent(new EditorEvent("complete", EditorType.START, result));
            }.bind(this), function (result) {
                this.dispatchEvent(new EditorEvent("error", EditorType.START, result));
            }.bind(this));
        } else {
        }
    }

    /**
    * 结束编辑对象
    * @param bool
    */
    JSBJObj(bool: boolean) {
        if (bool) {
            this.helper_.JSBJ(function (result) {
                this.dispatchEvent(new EditorEvent("complete", EditorType.STOP, result));
            }.bind(this), function (result) {
                this.dispatchEvent(new EditorEvent("error", EditorType.STOP, result));
            }.bind(this));
        } else {

        }
    }

    /** 
     * 选取对象
     * @param bool
     */
    XQTBObj(bool: boolean) {
        if (bool) {
            this.initDraw(this.XQTBType_);
            this.drawEndKey_ = this.draw_.on("drawend", (event) => {
                this.helper_.XQTB(event.feature, (result) => {
                    this.dispatchEvent(new EditorEvent("complete", EditorType.SELECT, result));

                    this.drawLayer_.getSource().clear();
                    //重新激活绘图,防止单击绘制而导致的按shift绘制无效bug
                    this.draw_.setActive(false);
                    this.draw_.setActive(true);
                }, (result) => {
                    this.dispatchEvent(new EditorEvent("error", EditorType.SELECT, result));
                });
            });
            this.draw_.setActive(true);
        } else {
            events.unlistenByKey(this.drawEndKey_);
            this.drawEndKey_ = null;
            this.draw_.setActive(false);
        }
    }


    /** 
     * 创建图斑对象
     * @param bool
     */
    CJTBObj(bool: boolean) {
        if (bool) {
            this.initDraw(this.CJTBType_);
            this.drawEndKey_ = this.draw_.on("drawend", (event) => {
                this.helper_.CJTB(event.feature, (result) => {
                    this.dispatchEvent(new EditorEvent("complete", EditorType.CREATE, result));
                    this.drawLayer_.getSource().clear();
                    //重新激活绘图,防止单击绘制而导致的按shift绘制无效bug
                    this.draw_.setActive(false);
                    this.draw_.setActive(true);
                }, (result) => {
                    this.dispatchEvent(new EditorEvent("error", EditorType.CREATE, result));
                });
            });
            this.draw_.setActive(true);
        } else {
            events.unlistenByKey(this.drawEndKey_);
            this.drawEndKey_ = null;
            this.draw_.setActive(false);
        }
    }


    /** 
     * 切割图斑对象
     * @param bool
     */
    QGTBObj(bool: boolean) {
        if (bool) {
            this.initDraw(this.QGTBType_);
            //绘画切割线完毕事件
            this.drawEndKey_ = this.draw_.on("drawend", (event) => {
                this.helper_.QGTB(event.feature, (result) => {
                    this.dispatchEvent(new EditorEvent("complete", EditorType.CUTTING, result));
                    //重新激活绘图,防止单击绘制而导致的按shift绘制无效bug
                    this.draw_.setActive(false);
                    this.draw_.setActive(true);
                }, (result) => {
                    this.dispatchEvent(new EditorEvent("error", EditorType.CUTTING, result));
                });

            });
            this.draw_.setActive(true);
        } else {
            events.unlistenByKey(this.drawEndKey_);
            this.drawEndKey_ = null;
            this.draw_.setActive(false);
        }
    }

    /**
     * 编辑图斑对象
     * @param bool
     */
    BJTBObj(bool: boolean) {
        if (bool) {
            let editFeatures: any = new Collection();
            for (let i = 0; i < this.editLayer_.getSource().getFeatures().length; i++) {
                editFeatures.push(this.editLayer_.getSource().getFeatures()[i]);
            }
            this.modify_ = new interaction.Modify({
                features: editFeatures
            });
            this.modify_.on("modifyend", (e: any) => {
                this.helper_.BJTB(e.features.getArray(), (result) => {
                    this.dispatchEvent(new EditorEvent("complete", EditorType.EDIT, result));
                }, (result) => {
                    this.dispatchEvent(new EditorEvent("error", EditorType.EDIT, result));
                });
            });
            this.map_.addInteraction(this.modify_);
        } else {
            this.map_.removeInteraction(this.modify_);
        }
    }


    // /*
    //  * 属性录入对象
    //  */
    // LRSXObj(bool) {
    //     if (bool) {
    //         this.initDraw(this.LRSXType_);
    //         this.drawEndKey_ = this.draw_.on("drawend", function (event) {
    //             this.helper_.LRSX(event.feature, function (result) {
    //                 this.dispatchEvent(new EditorEvent("complete", EditorType.LRSX, result));
    //                 this.drawLayer_.getSource().clear();
    //                 //重新激活绘图,防止单击绘制而导致的按shift绘制无效bug
    //                 this.draw_.setActive(false);
    //                 this.draw_.setActive(true);
    //             }.bind(this), function (result) {
    //                 this.dispatchEvent(new EditorEvent("error", EditorType.LRSX, result));
    //             }.bind(this));
    //         }.bind(this));
    //         this.draw_.setActive(true);
    //     } else {
    //         events.unlistenByKey(this.drawEndKey_);
    //         this.drawEndKey_ = null;
    //         this.draw_.setActive(false);
    //     }
    // }


    /**
     * 合并图斑对象
     * @param bool 
     */
    HBTBObj(bool: boolean) {
        if (bool) {
            this.helper_.HBTB((result) => {
                this.dispatchEvent(new EditorEvent("complete", EditorType.MERGE, result));
            }, (result) => {
                this.dispatchEvent(new EditorEvent("error", EditorType.MERGE, result));
            });
        } else {

        }
    }

    /**
     * 删除图斑对象
     * @param bool 
     */
    SCTBObj(bool: boolean) {

        if (bool) {
            this.initDraw(this.SCTBType_);
            this.drawEndKey_ = this.draw_.on("drawend", (event) => {
                this.helper_.SCTB(event.feature, (result) => {
                    this.dispatchEvent(new EditorEvent("complete", EditorType.DELETE, result));
                    this.drawLayer_.getSource().clear();
                    //重新激活绘图,防止单击绘制而导致的按shift绘制无效bug
                    this.draw_.setActive(false);
                    this.draw_.setActive(true);
                }, (result) => {
                    this.dispatchEvent(new EditorEvent("error", EditorType.DELETE, result));
                });
            });
            this.draw_.setActive(true);
        } else {
            events.unlistenByKey(this.drawEndKey_);
            this.drawEndKey_ = null;
            this.draw_.setActive(false);
        }
    }

    /**
     * 取消操作对象
     * @param bool
     */
    QXCZObj(bool: boolean) {
        if (bool == true) {
            this.helper_.QXCZ((result) => {
                this.dispatchEvent(new EditorEvent("complete", EditorType.CANCEL, result));
            }, (result) => {
                this.dispatchEvent(new EditorEvent("error", EditorType.CANCEL, result));
            });

        } else {
        }
    }

    /**
     * 保存图斑对象
     * @param bool
     */
    BCTBObj(bool: boolean) {
        if (bool) {
            this.helper_.BCTB((result) => {
                this.dispatchEvent(new EditorEvent("complete", EditorType.SAVE, result));
            }, (result) => {
                this.dispatchEvent(new EditorEvent("error", EditorType.SAVE, result));
            });
        } else {
        }
    }


    //#endregion obj

    /**
     * 
     * @param type 
     */
    setActive(type: EditorType) {
        this.oldType_ = this.type_;
        this.type_ = type;
        if (this.obj_) {
            this.dispatchEvent(new EditorEvent("deactive-before", this.oldType_, null));
            this.obj_(false);
            this.obj_ = null;
            this.dispatchEvent(new EditorEvent("deactive-after", this.oldType_, null));
        }
        switch (type) {
            //开始编辑
            case EditorType.START:
                {
                    this.obj_ = this.KSBJObj;
                    break;
                }
            case EditorType.STOP:
                {
                    this.obj_ = this.JSBJObj;
                    break;
                }
            //选取图斑
            case EditorType.SELECT:
                this.obj_ = this.XQTBObj;
                break;
            //创建图斑
            case EditorType.CREATE:
                this.obj_ = this.CJTBObj;
                break;
            //切割图斑
            case EditorType.CUTTING:
                this.obj_ = this.QGTBObj;
                break;
            //编辑图斑
            case EditorType.EDIT:
                this.obj_ = this.BJTBObj;
                break;
            //删除图斑
            case EditorType.DELETE:
                this.obj_ = this.SCTBObj;
                break;
            //合并图斑
            case EditorType.MERGE:
                this.obj_ = this.HBTBObj;
                break;
            // //录入属性
            // case EditorType.LRSX:
            //     this.obj_ = this.LRSXObj;
            //     break;
            //取消选择 
            case EditorType.CANCEL:
                this.obj_ = this.QXCZObj;
                break;
            //保存图斑
            case EditorType.SAVE:
                this.obj_ = this.BCTBObj;
                break;
            //结束编辑
            case EditorType.STOP:
                this.obj_ = this.JSBJObj;
                break;
        }
        if (this.obj_) {

            this.dispatchEvent(new EditorEvent("active-before", type, null));
            this.obj_(true);
            this.dispatchEvent(new EditorEvent("active-after", type, null));
        }
    }

    /**
     * 获取编辑图层
     * @returns 
     */
    getEditLayer(): VectorLayer<VectorSource> {
        return this.editLayer_;
    }

    /**
     *  获取是否锁住
     *  @return
     */
    getIsLock(): boolean {
        return this.isLock_;
    }

    /**
     * 设置是否锁住
     * @param isLock 是否锁住
     */
    setIsLock(isLock: boolean) {
        this.isLock_ = isLock;
    }

    /**
     * 获取添加要素
     * @return 添加要素
     */
    getAddFeatures(): Collection<Feature> {
        return this.addFeatures_;
    }

    /**
     * 获取修改要素
     * @return
     */
    getUpdateFeatures(): Collection<Feature> {
        return this.updateFeatures_;
    }

    /**
     * 获取删除要素
     * @return
     */
    getRemoveFeatures(): Collection<Feature> {
        return this.removeFeatures_;
    }

    /**
    * 获取选取图斑绘图类型
    * @return
    */
    getXQTBType(): string {
        return this.XQTBType_;
    }

    /**
   * 获取创建图斑绘图类型
   * @return
   */
    getCJTBType(): string {
        return this.CJTBType_;
    }

    /**
   * 获取切割图斑绘图类型
   * @return
   */
    getQGTBType(): string {
        return this.QGTBType_;
    }

    //     /**
    //    * 获取录入属性绘图类型
    //    * @return {module:ol/geometry/GeometryType} 录入属性绘图类型
    //    */
    //     getLRSXType() {
    //         return this.LRSXTypee_;
    //     }

    /**
     * 获取删除图斑绘图类型
     * @return
     */
    getSCTBType(): string {
        return this.SCTBType_;
    }

    /**
   * 设置选取图斑绘图类型
   * @param type 创建图斑绘图类型
   */
    setXQTBType(type: string) {
        this.XQTBType_ = type;;
    }

    /**
   * 设置创建图斑绘图类型
   * @param type 创建图斑绘图类型
   */
    setCJTBType(type: string) {
        this.CJTBType_ = type;;
    }

    /**
    * 设置切割图斑绘图类型
    * @param type 切割图斑绘图类型
    */
    setQGTBType(type: string) {
        this.QGTBType_ = type;
    }

    /**
     * 设置删除图斑绘图类型
     * @param type 删除图斑绘图类型
     */
    setSCTBType(type: string) {
        this.SCTBType_ = type;
    }

    /**
     * 获取目前激活的功能类型
     * @return
     */
    getType(): EditorType {
        return this.type_;
    }

    /**
     * 获取绘图图层
     * @return
     */
    getDrawLayer(): VectorLayer<VectorSource> {
        return this.drawLayer_;
    }
}

export default EditorBll;