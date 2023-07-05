import XYZ from "ol/source/XYZ"
import { Options as XYZOptions } from "ol/source/XYZ"

export interface GaoDeOptions extends XYZOptions {
    /**
     * 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion
     */
    layer?: string,
}

/**
 * 高德地图的图层数据源
 */
class GaoDe extends XYZ {
    /**
     * 
     * @param options 
     */
    constructor(opt_options: GaoDeOptions) {
        const options: GaoDeOptions = opt_options || {};
        let layer = options.layer === undefined ? 'normal_map' : options.layer;
        let url;
        if (layer == "normal_map") {
            url = `http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}`;
          } else if (layer == "satellite_map") {
            url= `http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`;
          } else if (layer == "satellite_annotion") {
            url = `http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}`;
          }
        
        
        super({
            ...options,
            url,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 18,
        });

    }
}

export default GaoDe;