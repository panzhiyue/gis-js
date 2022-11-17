import BaseHelper from "./BaseHelper";
import * as style from "ol/style"
import * as geom from "ol/geom"

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import EditorCode from "./EditorCode"
import EditorType, { getReverse } from "./EditorType";
import EditorState from "./EditorState";
import EditorBLL from "./EditorBLL"
import olMap from "ol/Map"

export interface VectorHelperOptioons {
    map: olMap,
    layer: VectorLayer<VectorSource>
}

/**
 * 矢量图层编辑类 
 */
class VectorHelper extends BaseHelper {
    //要编辑的矢量图层 
    protected layer_: VectorLayer<VectorSource<any>>;
    //编辑主键
    protected maxEMapEditFeatureId_: number;
    protected editStyle_;
    /**
     * 构造函数
     * @param opt_options
     */
    constructor(opt_options: VectorHelperOptioons) {
        let options = Object.assign({ map: null, layer: null }, opt_options);
        super({ map: options.map });
        // this.layer_ = null;
        this.maxEMapEditFeatureId_ = 1;

        this.editStyle_ = new style.Style({
            stroke: new style.Stroke({
                width: 2,
                color: "#00ffff"
            }),
            fill: new style.Fill({
                color: "rgba(255,255, 255, 0.001)"
            }),
            image: new style.Circle({
                radius: 5,
                stroke: new style.Stroke({
                    color: "#00ffff"
                }),
                fill: new style.Fill({
                    color: "rgba(255,255, 255, 0.001)"
                })
            })

        });
        if (options.layer) {
            this.setLayer(options.layer);
        }
        this.map_ = options.map;
        this.editorBLL_ = new EditorBLL({ map: this.map_, editHelper: this });



        // //合并图斑选择属性控件
        // this.selProIndex_ = new SelProIndex({
        //     map: this.map_, hideFunc:
        //         function () {
        //         }.bind(this)
        // });
        // this.selProIndex_.on("hide", function () {
        //     this.refreshEditLayer();
        // }.bind(this));
        // this.map_.addControl(this.selProIndex_);

        // this.geometryService_ = new GeometryService({ url: "http://hzgzsoft.com:5681/MapService/GeometryService.ashx", sourceWKID: "3857", destWKID: "3857", ajaxType: "GET", async: true });

    }

    /**
     * 添加编辑图形
     * @param {module:ol/Feature} feature 要素
     */
    addEditFeature(feature) {
        let removeFeatures = this.editorBLL_.getRemoveFeatures();
        //如果此图斑已存在于删除图斑中,则不再添加到图层
        for (let i = 0; i < removeFeatures.getLength(); i++) {
            if (removeFeatures.item(i).get("EMapEditFeatureId") == feature.get("EMapEditFeatureId")) {
                return;
            }
        }
        let editLayer = this.editorBLL_.getEditLayer();
        //添加到编辑图层
        editLayer.getSource().addFeature(feature);
        //添加到删除图斑
        removeFeatures.push(feature);
    }
    /**
     * 获取图层中与指定图形相交的要素
     * @param {module:ol/layer/Vector} layer 图层
     * @param {module:ol/geom/Geometry} geometry 图形
     * @param {function} callback 回调函数
     */
    getFeaturesIntersectGeometry(layer, geometry, callback) {
        if (geometry instanceof geom.Point) {
            callback(layer.getSource().getFeaturesAtCoordinate(geometry.getCoordinates()));
        } else {
            let features = layer.getSource().getFeaturesInExtent(geometry.getExtent());

            if (features.length > 0) {
                let geometries = [];
                for (let i = 0; i < features.length; i++) {
                    geometries.push(features[i].getGeometry());
                }
                // this.geometryService_.intersects(geometries, geometry, function (result) {
                //     if (result && result.result.intersects) {
                //         let intersects = result.result.intersects;
                //         for (let j = intersects.length - 1; j >= 0; j--) {
                //             if (intersects[j] == false) {
                //                 features.splice(j, 1);
                //             }
                //         }
                //         callback(features);
                //     }

                // }.bind(this));
            } else {
                callback(features);
            }

        }
    }

    /**
     * 打开属性录入窗口
     * @param {module:ol/Feature} feature 要录入属性的要素
     */
    openSXLR(feature) {
        console.log(feature);
    }

    save(callback) {
        let addFeatures = this.editorBLL_.getEditLayer().getSource().getFeatures();
        let updateFeatures = this.editorBLL_.getUpdateFeatures().getArray();
        let removeFeatures = this.editorBLL_.getRemoveFeatures().getArray();

        this.transaction(addFeatures, updateFeatures, removeFeatures, function (result) {
            callback(result);
        }.bind(this));
    }

    //#region  编辑对象接口
    /**
     * @inheritdoc 
     */
    KSBJ(callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        this.editorControl_.setIsEdit(true);
        this.refreshEditItem();

        this.editorBLL_.setIsLock(false);

        callback({ code: EditorCode.SUCCESS, message: "开始编辑！" });
    }

    /**
     * @inheritdoc
     */
    JSBJ(callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        if (this.editorBLL_.getEditLayer().getSource().getFeatures().length > 0 || this.editorBLL_.getRemoveFeatures().getLength() > 0) {
            if (confirm("是否保存!")) {
                this.save(function (result) {
                    if (result == false) {
                        this.message("保存失败!");

                    }
                    else {
                        this.clear();
                        let view = this.map_.getView();
                        view.setResolution(view.getResolution() + Math.random() * 0.00000001);
                        this.message("保存成功");
                    }
                    this.editorControl_.setIsEdit(false);
                    this.refreshEditItem();
                    this.editorBLL_.setIsLock(false);
                    callback({ code: EditorCode.SUCCESS, message: "保存编辑图斑！" });
                }.bind(this));
            } else {
                this.editorControl_.setIsEdit(false);
                this.clear();

                this.editorBLL_.setIsLock(false);
                callback({ code: EditorCode.SUCCESS, message: "有编辑图斑,但是不保存！" });
            }
        } else {
            this.editorControl_.setIsEdit(false);
            this.clear();

            this.editorBLL_.setIsLock(false);
            callback({ code: EditorCode.SUCCESS, message: "没有编辑图斑,直接结束！" });
        }
    }
    /**
     * @inheritdoc
     */
    XQTB(feature, callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        this.getFeaturesIntersectGeometry(this.editorBLL_.getEditLayer(), feature.getGeometry(), function (clickFeature) {
            //判断当前点击位置是否有编辑图斑,若有,则返回
            if (clickFeature && clickFeature.length > 0) {
                this.message("无法重复选择图斑!");

                this.editorBLL_.setIsLock(false);
                callback({ code: EditorCode.WRANING, message: "无法重复选择图斑！" });
                return;
            }
            this.getFeaturesIntersectGeometry(this.layer_, feature.getGeometry(), function (features) {
                if (features && features.length > 0) {
                    for (let i = 0; i < features.length; i++) {
                        // let feature = FeatureHelper.copyFeature(features[i]);
                        // feature.setStyle(null);
                        // this.addEditFeature(feature);
                    }
                }
                this.refreshEditItem();

                this.editorBLL_.setIsLock(false);
                callback({ code: EditorCode.SUCCESS, message: "选取图斑成功！", features: features });
            }.bind(this));
        }.bind(this));

    }

    /**
     * @inheritdoc
     */
    CJTB(feature, callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        //图形是否修改
        feature.set("ShapeIsUpdate", true);
        feature.set("EMapEditFeatureId", this.getEMapEditFeatureId());
        this.editorBLL_.getEditLayer().getSource().addFeature(feature);
        this.refreshEditItem();

        this.editorBLL_.setIsLock(false);
        callback({ code: EditorCode.SUCCESS, message: "创建图斑成功！", feature: feature });
    }

    /**
     * @inheritdoc
     */
    QGTB(feature, callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        let lineFeature = feature;
        let editLayer = this.editorBLL_.getEditLayer();
        let features = editLayer.getSource().getFeatures();

        let promiseArr = [];
        for (let i = 0; i < features.length; i++) {
            let sourceFeature = features[i];
            promiseArr.push(new Promise(function (resolve, reject) {
                // this.geometryService_.cut(sourceFeature, lineFeature, function (result) {
                //     //相交
                //     if (result && result.status == "success" && result.result.geometry) {
                //         let wkt = new format.WKT();
                //         let geometry:geom.Geometr = wkt.readGeometry(result.result.geometry);
                //         if (geometry) {
                //             let geometrys = geometry.getGeometries();
                //             if (geometrys.length <= 1) {
                //                 resolve(false);
                //                 return;
                //             }
                //             let features2 = [];
                //             for (let j = 0; j < geometrys.length; j++) {
                //                 let g = geometrys[j];
                //                 if (geometrys[j] instanceof geom.Polygon) {
                //                     g = new geom.MultiPolygon([]);
                //                     g.appendPolygon(geometrys[j]);
                //                 } else if (geometrys[j] instanceof geom.MultiPolygon) {

                //                 } else {
                //                     continue;
                //                 }


                //                 let feature2 = new Feature();

                //                 feature2.setProperties(sourceFeature.getProperties());
                //                 feature2.setGeometry(g);
                //                 //图形是否修改
                //                 feature2.set("ShapeIsUpdate", true);
                //                 feature2.set("EMapEditFeatureId", this.getEMapEditFeatureId());
                //                 features2.push(feature2);
                //             }
                //             editLayer.getSource().addFeatures(features2);
                //             editLayer.getSource().removeFeature(sourceFeature);
                //             resolve(true);
                //         } else {
                //             resolve(false);
                //         }
                //     } else {
                //         resolve(false);
                //     }
                // }.bind(this));
            }.bind(this)));
        }
        Promise.all(promiseArr).finally(function (results) {
            this.editorBLL_.setIsLock(false);
        }.bind(this));

        callback({ code: EditorCode.SUCCESS, message: "切割图斑成功！" });
    }

    /**
     * @inheritdoc
     */
    BJTB(features, callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        for (let i = 0; i < features.length; i++) {
            //图形是否修改
            features[i].set("ShapeIsUpdate", true);
        }
        this.editorBLL_.setIsLock(false);
        callback({ code: EditorCode.SUCCESS, message: "编辑图斑成功！", features: features });
    }

    /**
     * @inheritdoc
     */
    LRSX(feature, callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        this.getFeaturesIntersectGeometry(this.editorBLL_.getEditLayer(), feature.getGeometry(), function (features) {
            if (features && features.length > 0) {
                console.log(features[0]);
            }
            this.editorBLL_.setIsLock(false);
            callback({ code: EditorCode.SUCCESS, message: "录入属性！", features: features });
        }.bind(this));


    }

    /**
     * @inheritdoc
     */
    HBTB(callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        let editLayer = this.editorBLL_.getEditLayer();
        let features = editLayer.getSource().getFeatures();
        this.refreshEditLayer();

        // this.selProIndex_.setContent(features.length);
        // this.selProIndex_.setCallback(function (index) {
        //     let geometries = [];
        //     for (let i = 0; i < features.length; i++) {
        //         geometries.push(features[i].getGeometry());
        //     }
        //     this.geometryService_.union(geometries, function (result) {
        //         let wfs = new format.WKT();
        //         let feature = wfs.readFeature(result.result.geometry);
        //         let g = feature.getGeometry();
        //         if (feature.getGeometry() instanceof geom.Polygon) {
        //             g = new geom.MultiPolygon([]);
        //             g.appendPolygon(feature.getGeometry());
        //         }
        //         let feature2 = new Feature();
        //         let properties = features[index].getProperties();
        //         feature2.setProperties(properties);
        //         feature2.setGeometry(g);
        //         //图形是否修改
        //         feature2.set("ShapeIsUpdate", true);
        //         editLayer.getSource().clear();
        //         editLayer.getSource().addFeature(feature2);



        //     }.bind(this));

        //     this.refreshEditItem();
        // }.bind(this));
        // this.selProIndex_.show();

        this.editorBLL_.setIsLock(false);
        callback({ code: EditorCode.SUCCESS, message: "合并图斑！", features: features });
    }

    /**
     * @inheritdoc
     */
    SCTB(feature, callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        this.getFeaturesIntersectGeometry(this.editorBLL_.getEditLayer(), feature.getGeometry(), function (features) {
            let removeFeatures = this.editorBLL_.getRemoveFeatures();
            if (features && features.length > 0) {
                if (confirm("是否删除图斑,若是,则编辑保存图斑后删除！")) {
                    for (let i = 0; i < features.length; i++) {
                        this.editorBLL_.getEditLayer().getSource().removeFeature(features[i]);
                        removeFeatures.push(features[i]);
                    }
                }
            }
            this.refreshEditItem();

            this.editorBLL_.setIsLock(false);
            callback({ code: EditorCode.SUCCESS, message: "删除图斑！", features: features })
        }.bind(this));




    }

    /**
     * @inheritdoc
     */
    QXCZ(callback, errorback) {

        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        if (confirm("是否清除选择!")) {
            this.clear();

            callback({ code: EditorCode.SUCCESS, message: "清除选择！" });
        }
        this.editorBLL_.setIsLock(true);
    }

    /**
     * @inheritdoc
     */
    BCTB(callback, errorback) {
        if (this.editorBLL_.getIsLock()) {
            callback({ code: EditorCode.LOCK, message: "正在执行其他操作！" });
            return;
        }
        this.editorBLL_.setIsLock(true);

        this.save(function (result) {
            if (result == false) {
                this.message("保存失败!");
                return;
            }
            else {
                this.clear();
                let view = this.map_.getView();
                view.setResolution(view.getResolution() + Math.random() * 0.00000001);
                this.message("保存成功");
            }
            this.editorBLL_.setIsLock(false);

            callback({ code: EditorCode.SUCCESS, message: "保存！" });
        }.bind(this));
    }
    //#endregion  编辑对象接口

    /**
     * @inheritdoc
     */
    refreshEditItem() {
        console.log(this.editorBLL_);
        let enableTypes = null;
        let hideTypes = null;
        let addFeatures = this.editorBLL_.getEditLayer().getSource().getFeatures();
        let updateFeatures = this.editorBLL_.getUpdateFeatures().getArray();
        let removeFeatures = this.editorBLL_.getRemoveFeatures().getArray();
        //在编辑
        if (this.editorControl_.getIsEdit() == true) {
            if (addFeatures.length == 0) {
                if (removeFeatures.length == 0) {
                    enableTypes = [EditorType.STOP, EditorType.SELECT, EditorType.CREATE];
                    hideTypes = [EditorType.START];
                } else {
                    enableTypes = [EditorType.STOP, EditorType.SELECT, EditorType.SAVE];
                    hideTypes = [EditorType.START];
                }
            }
            else if (addFeatures.length == 1) {
                enableTypes = [EditorType.STOP, EditorType.SELECT, EditorType.CREATE, EditorType.CUTTING, EditorType.EDIT, EditorType.DELETE, EditorType.CANCEL, EditorType.SAVE];
                hideTypes = [EditorType.START];
            } else {
                enableTypes = [EditorType.STOP, EditorType.SELECT, EditorType.CREATE, EditorType.CUTTING, EditorType.EDIT, EditorType.DELETE, EditorType.CANCEL, EditorType.SAVE, EditorType.MERGE];
                hideTypes = [EditorType.START];
            }

        }
        //不在编辑
        else {
            enableTypes = [EditorType.START];
            hideTypes = [EditorType.STOP];
        }
        this.editorControl_.updateItemsState(enableTypes, EditorState.ENABLE);
        this.editorControl_.updateItemsState(hideTypes, EditorState.HIDE);
        let reverse = getReverse(enableTypes);

        for (let i = 0; i < reverse.length; i++) {
            let itemInfo = this.editorControl_.getItemInfoByType(reverse[i]);
            if (itemInfo && (itemInfo.state == EditorState.ENABLE || itemInfo.state == EditorState.SELECTED)) {
                this.editorControl_.updateItemState(reverse[i], EditorState.DISABLE);
            }
        }
        this.editorControl_.initHTML();
    }

    /**
     * @inheritdoc
     */
    refreshEditLayer() {
        let features = this.editorBLL_.getEditLayer().getSource().getFeatures();
        for (let i = 0; i < features.length; i++) {
            let feature = features[i];
            feature.setStyle(this.getStyle(feature, i));
        }
    }


    /**
     * 绑定矢量图层
     * @param {module:ol/layer/Vector} layer
     */
    setLayer(layer) {
        this.layer_ = layer;
        let features = layer.getSource().getFeatures();
        for (let i = 0; i < features.length; i++) {
            features[i].set("EMapEditFeatureId", this.getEMapEditFeatureId());
        }
    }

    /**
     * @inheritdoc
     */
    getStyle(feature, index) {
        if (this.editorBLL_.getType() == EditorType.MERGE) {
            return new style.Style({
                stroke: new style.Stroke({
                    width: 1,
                    color: "#9d1be9"
                }),
                fill: new style.Fill({
                    color: "rgba(0,255, 255, 0.5)"
                }),
                text: new style.Text({
                    text: "图斑" + index,
                    overflow: true,
                    fill: new style.Fill({
                        color: "#ffffff"
                    }),
                    font: "20px sans-serif"
                })
            });
        } else {
            return this.editStyle_;
        }

    }

    /**
     * @inheritdoc
     */
    transaction(addFeatures, updateFeatures, removeFeatures, callback) {
        for (let i = 0; i < removeFeatures.length; i++) {
            for (let j = this.layer_.getSource().getFeatures().length - 1; j >= 0; j--) {
                if (removeFeatures[i].get("EMapEditFeatureId") == this.layer_.getSource().getFeatures()[j].get("EMapEditFeatureId")) {
                    this.layer_.getSource().removeFeature(this.layer_.getSource().getFeatures()[j]);
                }
            }
        }
        for (let i = 0; i < addFeatures.length; i++) {
            addFeatures[i].setStyle(null);
            this.layer_.getSource().addFeature(addFeatures[i]);
        }

        if (callback instanceof Function) {
            callback();
        }
    }


    /**
     * 获取编辑主键 
     * @return {number}
     */
    getEMapEditFeatureId() {
        return this.maxEMapEditFeatureId_++;
    }

    /**
     * 提示信息 
     * @param {string} 提示信息
     */
    message(str) {
        alert(str);
    }



    clear() {
        let addFeatures = this.editorBLL_.getAddFeatures();
        let removeFeatures = this.editorBLL_.getRemoveFeatures();

        addFeatures.clear();
        removeFeatures.clear();
        this.editorBLL_.getEditLayer().getSource().clear();
        this.editorBLL_.getDrawLayer().getSource().clear();
        this.refreshEditItem();
        this.refreshEditLayer();
    }
}

export default VectorHelper;