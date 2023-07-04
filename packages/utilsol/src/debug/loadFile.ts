import { Feature } from "ol";
import * as format from "ol/format"
import EShapeFile from "src/EShapeFile";
import FileType from "./FileType"

/**
 * 获取文件
 * @param multiple 是否多选
 * @param callback 回调函数
 */
const getFile = (multiple: boolean, callback: Function) => {
    let file = document.createElement("input");
    file.type = "file";
    file.multiple = multiple;
    file.onchange = function (event: any) {
        if (typeof callback == "function") {
            callback(file.files);
        }
    };
    file.click();
}


/**
 * 加载文件
 * @param format 格式转换器
 * @returns 
 */
export const loadFormat = (format): Promise<Feature[]> => {
    return new Promise((resolve) => {
        //加载文件
        getFile(true, (files) => {
            if (files && files.length >= 1) {
                let promiesArr = [];
                for (let i = 0; i < files.length; i++) {
                    let item = files[i]
                    let promise = new Promise((resolve) => {
                        let reader = new FileReader();
                        reader.onload = function (evt: any) {
                            resolve(evt.target.result);
                        };
                        reader.readAsText(item);
                    })
                    promiesArr.push(promise);
                }

                Promise.all(promiesArr).then((result) => {
                    let features = [];
                    result.forEach((item) => {
                        features = features.concat(format.readFeatures(item))
                    })
                    resolve(features);
                })
            }
        });
    })
}

/**
 * 加载geojson文件
 * @returns 
 */
export const loadGeoJson = (): Promise<Feature[]> => {
    let f = new format.GeoJSON();
    return loadFormat(f);
}

/**
 * 加载topojson文件
 * @returns 
 */
export const loadTopoJson = (): Promise<Feature[]> => {
    let f = new format.TopoJSON();
    return loadFormat(f);
}

/**
 * 加载gpx文件
 * @returns 
 */
export const loadGpx = (): Promise<Feature[]> => {
    let f = new format.GPX();
    return loadFormat(f);
}

/**
 * 加载KML文件
 * @returns 
 */
export const loadKml = (): Promise<Feature[]> => {
    let f = new format.KML();
    return loadFormat(f);
}

/**
 * 加载Polyline文件
 * @returns 
 */
export const loadPolyline = (): Promise<Feature[]> => {
    let f = new format.Polyline();
    return loadFormat(f);
}

/**
 * 加载Wkt文件
 * @returns 
 */
export const loadWkt = (): Promise<Feature[]> => {
    let f = new format.WKT();
    return loadFormat(f);
}

/**
 * TODO 待开发
 * @returns 
 */
export const loadExcel = (options): Promise<Feature[]> => {
    return null;

}

/**
 * 加载shp文件
 * @returns 
 */
export const loadShp = (options): Promise<Feature[]> => {
    return new Promise((resolve) => {
        //加载shapefile文件
        getFile(true, (files) => {
            var eShapeFile = new EShapeFile(options);
            eShapeFile.on("loaded" as any, () => {
                var features = eShapeFile.getFeatures();
                resolve(features);
            });
            eShapeFile.readFile(files);
        });
    })

}

/**
 * 加载文件
 * @param type 
 * @returns 
 */
export const loadFile = (type, options): Promise<Feature[]> => {
    let result = null;
    switch (type) {
        case FileType.SHP: {
            result = loadShp(options);
            break;
        }
        case FileType.GEOJSON: {
            result = loadGeoJson();
            break;
        }
        case FileType.TOPOJSON: {
            result = loadTopoJson();
            break;
        }
        case FileType.GPX: {
            result = loadGpx();
            break;
        }
        case FileType.KML: {
            result = loadKml();
            break;
        }
        case FileType.POLYLINE: {
            result = loadPolyline();
            break;
        }
        case FileType.WKT: {
            result = loadWkt();
            break;
        }
        case FileType.EXCEL: {
            result = loadExcel(options);
            break;
        }
    }
    return result;
}


