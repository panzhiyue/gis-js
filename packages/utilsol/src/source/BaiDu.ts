import TileImage from "ol/source/TileImage"
import { Options as TileImageOptions } from "ol/source/TileImage"
import TileGrid from "ol/tilegrid/TileGrid";

export interface BaiDuSourceOptions extends TileImageOptions {
    /**
     * 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion
     */
    layer?: string,
}

/**
 * 百度地图地图的图层数据源
 */
class BaiDu extends TileImage {
    /**
     * 
     * @param options 
     */
    constructor(opt_options?: BaiDuSourceOptions) {
        const options: BaiDuSourceOptions = Object.assign({}, opt_options)
        let layer = options.layer === undefined ? 'normal_map' : options.layer;
        let projection = options.projection === undefined ? 'EPSG:3857' : options.projection;
        let url;
        if (layer == "normal_map") {
            url = `http://online0.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1`;
        } else if (layer == "satellite_map") {
            url = `http://shangetu0.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46`;
        } else if (layer == "satellite_annotion") {
            url = `http://online0.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020`;
        }

        //分辨率
        let resolutions: any = [];
        for (var i = 0; i < 19; i++) {
            resolutions[i] = Math.pow(2, 18 - i);
        }

        let tileGrid = new TileGrid({
            origin: [0, 0],
            resolutions: resolutions,
        });


        super({
            ...options,
            // maxZoom: options.maxZoom !== undefined ? options.maxZoom : 18,
            tileGrid,
            projection,

            tileUrlFunction: (tileCoord, pixelRatio, proj) => {
                if (!tileCoord) {
                    return "";
                }
                var z: any = tileCoord[0];
                var x: any = tileCoord[1];
                var y: any = -tileCoord[2] - 1;

                if (x < 0) {
                    x = "M" + -x;
                }
                if (y < 0) {
                    y = "M" + -y;
                }
                return url
                    .replace("{x}", x)
                    .replace("{y}", y)
                    .replace("{z}", z);
            },
        });
    }
}

export default BaiDu;