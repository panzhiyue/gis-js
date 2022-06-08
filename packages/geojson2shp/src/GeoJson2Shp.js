/**
 * @module GeoJson2Shp/GeoJson2Shp
 */

import MultiPointWriter from './Shp/MultiPointWriter.js'
import PointWriter from './Shp/PointWriter.js'
import PolyWriter from './Shp/PolyWriter.js'
import DbfWrite from './Dbf/Writer.js'
import GeometryType from './Shp/GeometryType.js'

/**
 * GeoJson转为Shp 
 * @api
 */
class GeoJson2Shp {
    /**
     * 构造函数
     * @param {Object|string} geojson 矢量数据geojson格式
     */
    constructor(geojson) {

        if (typeof (geojson) == "string") {
            geojson = eval("(" + geojson + ")");
        }

        /**
         * @type {Object|string}
         * @readonly
         */
        this.geojson_ = geojson;
    }

    /**
     * 写入点
     * @param {Function} callback
     */
    writePoint(callback) {
        this.write_(GeometryType.POINT, callback);
    }

    /**
    * 写入多点
    * @param {Function} callback
    */
    writeMultiPoint(callback) {
        this.write_(GeometryType.MULTIPOINT, callback);
    }

    /**
     * 写入线
     * @param {Function} callback
     */
    writePolyline(callback) {
        this.write_(GeometryType.POLYLINE, callback);
    }

    /**
     * 写入面
     * @param {Function} callback
     */
    writePolygon(callback) {
        this.write_(GeometryType.POLYGON, callback);
    }

    /**
     * 根据类型写入
     * @param {module:GeoJson2Shp/Shp/GeometryType} type
     * @param {Function} callback
     */
    write_(type, callback) {
        var writeOptions = this.getWriteOptions_(type);
        var writer = this.getShpWriter_(type);
        if (writeOptions) {
            new writer(writeOptions.geometries, writeOptions.type).write(function (err, files) {
                new DbfWrite(writeOptions.properties).write(function (err, files2) {
                    files.dbf = files2.dbf;
                    callback(err, files);
                });

            });
        }
    }

    /**
     * 根据图形类型获取shp写入器
     * @param {module:GeoJson2Shp/Shp/GeometryType} type
     */
    getShpWriter_(type) {
        var writer;
        if (type == GeometryType.POINT) {
            writer = PointWriter;
        } else if (type == GeometryType.MULTIPOINT) {
            writer = MultiPointWriter;
        } else if (type == GeometryType.POLYLINE) {
            writer = PolyWriter;
        } else if (type == GeometryType.POLYGON) {
            writer = PolyWriter;
        }
        return writer;
    }

    /**
     * 获取点部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getPointOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "Point"; });
        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: GeometryType.POINT
        };
    }

    /**
     * 获取点部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getMultiPointOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "MultiPoint"; });

        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: GeometryType.MULTIPOINT
        };
    }

    /**
     * 获取线部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getPolylineOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "LineString" || f.geometry.type === "MultiLineString"; });
        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: GeometryType.POLYLINE
        };
    }

    /**
     * 获取面部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getPolygonOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon"; });
        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: GeometryType.POLYGON
        };
    }


    /**
     * 根据传入类型获取写入参数
     * @param {module:GeoJson2Shp/Shp/GeometryType} geometryType  图形类型
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getWriteOptions_(type) {
        var writeOptions;
        if (type == GeometryType.POINT) {
            writeOptions = this.getPointOptions_();
        } else if (type == GeometryType.MULTIPOINT) {
            writeOptions = this.getMultiPointOptions_();
        } else if (type == GeometryType.POLYLINE) {
            writeOptions = this.getPolylineOptions_();
        } else if (type == GeometryType.POLYGON) {
            writeOptions = this.getPolygonOptions_();
        }
        return writeOptions;
    }

    /**
     * 获取GeoJson中的坐标部分
     * @param {Object} t GeoJson中的feature
     * @return {Array} feature中的坐标部分
     */
    justCoords_(t) {
        if (t.geometry.type == "LineString" || t.geometry.type == "MultiLineString") {
            return [t.geometry.coordinates];
        } else {
            return t.geometry.coordinates
        }
    }

    /**
     * 获取GeoJson中的属性部分
     * @param {Object} t GeoJson中的feature
     * @return {Object} feature中的属性部分
     */
    justProps_(t) {
        return t.properties;
    }

}

/**
 * @typedef {Object} WriteOptions
 * @property {Array} geometries
 * @property {Array} properties
 * @property {Array} type
 */

export default GeoJson2Shp;
