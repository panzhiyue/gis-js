
import * as format from "ol/format";
import * as proj from "ol/proj";
import * as CoordinateSystem from "./CoordinateSystem";
import * as shapefile from "shapefile";

import Collection from "ol/Collection";
import OLObject from "ol/Object";
import Projection from "ol/proj/Projection";
import proj4 from "proj4";
import { GeoJson2Shp } from "@gis-js/geojson2shp"
import { saveAs } from 'file-saver-es';
import JSZip from "jszip";
import BaseEvent from "ol/events/Event"
import EShapeFileEventType from "./EShapeFileEventType";

class EShapeFileEvent extends BaseEvent {
    public message: string;
    constructor(type: EShapeFileEventType, message: string) {
        super(type);

        this.message = message;

    }
}

/**
 * shapefile文件操作类
 */
class EShapeFile extends OLObject {

    featureCollection_: Collection<any>;
    projection_: Projection;
    cpg_: string;
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {module:ol/proj/Projection} [opt_options.projection] 坐标系
     */
    constructor(opt_options) {
        let options = Object.assign(
            {
                projection: null,
                cpg: "UTF-8",
            },
            opt_options
        );
        super({});

        this.featureCollection_ = new Collection();

        /**
         * 坐标系
         * @type  {module:ol/proj/Projection}
         * @readonly
         */
        this.projection_ = options.projection;

        this.cpg_ = options.cpg;
    }

    /**
     * 读取文件
     * @param {FileList} files  file控件上传的文件列表
     */
    readFile(files) {
        //只有选择了shp文件才会加载
        let shpFileNames: Array<any> = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let name = file.name;
            let index = name.lastIndexOf(".");
            let fileName = name.substring(0, index);
            let ext = name.substring(index + 1);
            if (ext == "shp") {
                shpFileNames.push(fileName);
            }
        }
        //选择的文件中没有shp文件
        if (shpFileNames.length == 0) {
            this.dispatchEvent(new EShapeFileEvent(EShapeFileEventType.ERROR, "不存在shp文件!"));
            return;
        }

        //shp文件数量大于1
        if (shpFileNames.length > 1) {
            this.dispatchEvent(new EShapeFileEvent(EShapeFileEventType.ERROR, "只能上传一个shp文件!"));
            return;
        }
        //循环加载shp文件
        for (let i = 0; i < shpFileNames.length; i++) {
            let shpFileName = shpFileNames[i];

            let prj = "";
            let encoding: string = "GB2312";
            let shparray = null;
            let dbfarray = null;
            let promiseArr = [];

            for (let j = 0; j < files.length; j++) {
                let file = files[j];
                let name = file.name;
                let index = name.lastIndexOf(".");
                let fileName = name.substring(0, index);
                let ext = name.substring(index + 1).toLowerCase();

                //读取编码
                if (fileName == shpFileName && ext == "cpg") {
                    promiseArr.push(
                        new Promise(function (resolve, reject) {
                            let reader = new FileReader();
                            reader.onload = function (evt) {
                                encoding = evt.target.result as string;
                                resolve(evt.target.result);
                            };
                            reader.readAsText(file);
                        })
                    );
                }

                //读取坐标系
                if (fileName == shpFileName && ext == "prj") {
                    promiseArr.push(
                        new Promise(function (resolve, reject) {
                            let reader = new FileReader();
                            reader.onload = function (evt) {
                                prj = (<string>evt.target.result).replace(
                                    "Gauss_Kruger",
                                    "Transverse_Mercator"
                                );
                                resolve(evt.target.result);
                            };
                            reader.readAsText(file);
                        })
                    );
                }

                //读取shp文件
                if (fileName == shpFileName && ext == "shp") {
                    promiseArr.push(
                        new Promise(function (resolve, reject) {
                            let reader = new FileReader();
                            reader.onload = function (evt) {
                                shparray = evt.target.result;
                                resolve(evt.target.result);
                            };
                            reader.readAsArrayBuffer(file);
                        })
                    );
                }

                //读取dbf文件
                if (fileName == shpFileName && ext == "dbf") {
                    promiseArr.push(
                        new Promise(function (resolve, reject) {
                            let reader = new FileReader();
                            reader.onload = function (evt) {
                                dbfarray = evt.target.result;
                                resolve(evt.target.result);
                            };
                            reader.readAsArrayBuffer(file);
                        })
                    );
                }
            }
            //文件加载完成
            Promise.all(promiseArr)
                .then(
                    function (results) {
                        let wkid = "9999";
                        if (!prj) {
                            this.dispatchEvent({
                                type: "error",
                                message: "无法识别的坐标系!",
                            });
                            return;
                        }
                        proj4.defs("EPSG:9999", prj);
                        let newProj = new Projection({
                            code: "EPSG:9999",
                        });
                        proj.addProjection(newProj);
                        CoordinateSystem.addCoordinateTransforms("4326", wkid);
                        CoordinateSystem.addCoordinateTransforms("3857", wkid);
                        CoordinateSystem.addCoordinateTransforms2(
                            this.projection_.getCode(),
                            "EPSG:" + wkid
                        );

                        shapefile
                            .open(shparray, dbfarray, { encoding: encoding })
                            .then(
                                function (source) {
                                    source.read().then(
                                        function log(result) {
                                            if (result.done) {
                                                this.dispatchEvent({ type: "loaded" });
                                                return;
                                            }
                                            for (let field in result.value.properties) {
                                                let property = result.value.properties[field];
                                                if (typeof property == "string") {
                                                    while (property.indexOf("\u0000") > -1) {
                                                        property = property.replace("\u0000", "");
                                                    }
                                                    result.value.properties[field] = property;
                                                }
                                            }

                                            let feature = new format.GeoJSON().readFeature(
                                                result.value,
                                                {
                                                    featureProjection: proj.get(
                                                        this.projection_.getCode()
                                                    ),
                                                    dataProjection: proj.get("EPSG:" + wkid),
                                                }
                                            );
                                            this.featureCollection_.push(feature);
                                            return source.read().then(log.bind(this));
                                        }.bind(this)
                                    );
                                }.bind(this)
                            )
                            .catch((error) => console.error(error.stack));
                    }.bind(this)
                )
                .catch(function (error) {
                    console.error(error);
                });
        }
    }

    /**
     * 读取矢量图层
     * @param {module:ol/layer/Vector} vector 矢量图层
     */
    readVector(vector) {
        let features = vector.getSource().getFeatures();
        this.setFeatures(features);
    }

    /**
     * 下载为ZIP文件
     * @param {Object} options 压缩包参数
     * @param {Object} [options.folder] 文件夹
     * @param {Object} [options.types] 文件名称配置
     * @param {Object} [options.types.point] 点文件名称
     * @param {Object} [options.types.line] 线文件名称
     * @param {Object} [options.types.polygon] 面文件名称
     * @param {Function} [options.successCallback] 成功回调函数
     * 
     * @example
     * var options = {
     *     folder: 'myshapes',
     *     types: {
     *         point: 'mypoints',
     *         polygon: 'mypolygons',
     *         line: 'mylines'
     *     }
     * }
     * downLoadZip(options);
     *
     *
     */
    downLoadZip(options) {
        let features = this.getFeatures();
        let gj = new format.GeoJSON().writeFeatures(features);

        var zip = new JSZip(),
            layers = zip.folder(
                options && options.folder ? options.folder : "layers"
            );
        var g2s = new GeoJson2Shp(gj);
        g2s.writePoint(
            function (err, files) {
                var fileName = "point";
                layers.file(fileName + ".shp", files.shp.buffer, { binary: true });
                layers.file(fileName + ".shx", files.shx.buffer, { binary: true });
                layers.file(fileName + ".dbf", files.dbf.buffer, { binary: true });
                layers.file(fileName + ".prj", this.getProjectionWKT());
                layers.file(fileName + ".cpg", this.cpg_);
            }.bind(this)
        );

        g2s.writePolyline(
            function (err, files) {
                var fileName = "polyline";
                layers.file(fileName + ".shp", files.shp.buffer, { binary: true });
                layers.file(fileName + ".shx", files.shx.buffer, { binary: true });
                layers.file(fileName + ".dbf", files.dbf.buffer, { binary: true });
                layers.file(fileName + ".prj", this.getProjectionWKT());
                layers.file(fileName + ".cpg", this.cpg_);
            }.bind(this)
        );

        g2s.writePolygon(
            function (err, files) {
                var fileName = "polygon";
                layers.file(fileName + ".shp", files.shp.buffer, { binary: true });
                layers.file(fileName + ".shx", files.shx.buffer, { binary: true });
                layers.file(fileName + ".dbf", files.dbf.buffer, { binary: true });
                layers.file(fileName + ".prj", this.getProjectionWKT());
                layers.file(fileName + ".cpg", this.cpg_);
            }.bind(this)
        );

        var zipName = options && options.name ? options.name : "example";
        zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            saveAs(content, zipName + ".zip");
            if (options.successCallback && options.successCallback instanceof Function) {
                options.successCallback();
            }
        });
    }
    /**
     * 获取要素数组
     * @return {Array.<module:ol/Feature>} 要素集合
     */
    getFeatures() {
        return this.featureCollection_.getArray();
    }

    /**
     * 获取设置数组
     * @param  features {Array.<module:ol/Feature>} 要素集合
     */
    setFeatures(features) {
        this.featureCollection_.clear();
        this.featureCollection_.extend(features);
    }

    /**
     * 获取坐标系wkt格式字符串
     * @return {string} 坐标系wkt格式字符串
     */
    getProjectionWKT() {
        if (this.projection_.getCode() == "EPSG:4490") {
            return 'GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]';
        } else if (this.projection_.getCode() == "EPSG:4326") {
            return 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG",4326]]';
        }
        else {
            throw "无法识别坐标系:" + this.projection_.getCode();
        }
    }
}

export default EShapeFile;
