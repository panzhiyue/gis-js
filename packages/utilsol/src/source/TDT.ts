import XYZ from "ol/source/XYZ"
import { Options as XYZOptions } from "ol/source/XYZ"

export interface TDTOptions extends XYZOptions {
    /**
     * 矢量地图:vec,矢量注记:cva,矢量英文注记:eva,影像地图:img,影像注记:cia,影像英文注记:eia,地形地图:ter,地形注记:cta,全球境界:ibo
     */
    layer?: string,
    /**
     * 秘钥
     *
     * @type {string}
     * @memberof Options
     */
    tk?: string 
}

/**
 * 全国天地图的图层数据源
 */
class TDT extends XYZ {
    /**
     * 
     * @param options 
     */
    constructor(opt_options: TDTOptions) {
        const options: TDTOptions = opt_options || {};
        let layer = options.layer === undefined ? 'img' : options.layer;
        let projection = options.projection === undefined ? 'EPSG:4326' : options.projection;
        let url = `http://t{0-3}.tianditu.gov.cn/${layer}_c/wmts?layer=${layer}&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${options.tk}`;
        super({
            ...options,
            url,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 18,
            projection
        });

    }
}

export default TDT;