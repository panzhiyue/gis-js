import { Feature } from "ol";
import * as format from "ol/format"
export const FileType = {
    "SHP": "shp",
    "GEOJSON": "geojson",
    "TOPOJSON":"topojson"
}

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
 * 加载文件
 * @param type 
 * @returns 
 */
export const loadFile = (type): Promise<Feature[]> => {
    console.log(type,FileType.TOPOJSON);
    let result = null;
    switch (type) {
        case FileType.GEOJSON: {
            result = loadGeoJson();
            break;
        }
        case FileType.TOPOJSON: {
            console.log(333);
            result = loadTopoJson();
            break;
        }
    }
    return result;
}


