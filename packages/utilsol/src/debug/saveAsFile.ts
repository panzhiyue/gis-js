import FileType from "./FileType"
import Feature from "ol/Feature"
import * as format from "ol/format"
import { saveAs } from 'file-saver-es';
import EShapeFile from "src/EShapeFile";

/**
 * 保存为geojson文件格式
 * @param features 
 * @param options 
 */
export const saveAsGeoJson = (features: Feature[], options: Object = {}) => {
    let opt = Object.assign({ name: "geojson.json" }, options);
    let str = new format.GeoJSON().writeFeatures(features);
    let blob = new Blob([str], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, opt.name);
}

/**
 * 保存为topojson文件格式
 * @param features 
 * @param options 
 */
export const saveAsTopoJson = (features: Feature[], options: Object = {}) => {
    let opt = Object.assign({ name: "topojson.json" }, options);
    let str = new format.GeoJSON().writeFeatures(features);
    let blob = new Blob([str], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, opt.name);
}

/**
 * 保存为gpx文件格式
 * @param features 
 * @param options 
 */
 export const saveAsGpx = (features: Feature[], options: Object = {}) => {
    let opt = Object.assign({ name: "vector.gpx" }, options);
    let str = new format.GPX().writeFeatures(features);
    let blob = new Blob([str], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, opt.name);
}

/**
 * 保存为kml文件格式
 * @param features 
 * @param options 
 */
 export const saveAsKml = (features: Feature[], options: Object = {}) => {
    let opt = Object.assign({ name: "vector.kml" }, options);
    let str = new format.KML().writeFeatures(features);
    let blob = new Blob([str], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, opt.name);
}

/**
 * 保存为polyline文件格式
 * @param features 
 * @param options 
 */
 export const saveAsPolyline = (features: Feature[], options: Object = {}) => {
    let opt = Object.assign({ name: "vector.polyline" }, options);
    let str = new format.Polyline().writeFeatures(features);
    let blob = new Blob([str], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, opt.name);
}

/**
 * 保存为wkt文件格式
 * @param features 
 * @param options 
 */
 export const saveAsWkt = (features: Feature[], options: Object = {}) => {
    let opt = Object.assign({ name: "vector.wkt" }, options);
    let str = new format.WKT().writeFeatures(features);
    let blob = new Blob([str], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, opt.name);
}

/**
 * 保存为shp文件格式
 * @param features 
 * @param options 
 */
export const saveAsShp = (features: Feature[], options: Object) => {
    let opt: any = Object.assign({
        name: "vector.shp", shpOptions: {
            folder: "myshapes",
            types: {
                point: "mypoints",
                polygon: "mypolygons",
                line: "mylines",
            }
        }
    }, options);
    var eShapeFile = new EShapeFile({
        projection: opt.projection
    });
    eShapeFile.setFeatures(features);
    eShapeFile.downLoadZip(opt.shpOptions);
}

/**
 * 保存为文件
 * @param type 
 * @param features 
 * @param options 
 */
export const saveAsFile = (type: String, features: Feature[], options?: Object) => {

    switch (type) {
        case FileType.SHP: {
            saveAsShp(features, options);
            break;
        }
        case FileType.GEOJSON: {
            saveAsGeoJson(features, options);
            break;
        }
        case FileType.TOPOJSON: {
            saveAsTopoJson(features, options);
            break;
        }
        case FileType.GPX: {
            saveAsGpx(features, options);
            break;
        }
        case FileType.KML: {
            saveAsKml(features, options);
            break;
        }
        case FileType.POLYLINE: {
            saveAsPolyline(features, options);
            break;
        }
        case FileType.WKT: {
            saveAsWkt(features, options);
            break;
        }
    }
}
