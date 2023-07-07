import XYZ from "ol/source/XYZ"
import { Options as XYZOptions } from "ol/source/XYZ"

export interface BingSourceOptions extends XYZOptions {
}

/**
 * Bing地图的图层数据源
 */
class Bing extends XYZ {
    /**
     * 
     * @param options 
     */
    constructor(opt_options?: BingSourceOptions) {
        const options: BingSourceOptions = Object.assign({}, opt_options)
        super({
            ...options,
        });

    }
    getVETileUrl(url, z, x, y) {
        for (var a = "", c = x, d = y, e = 0; e < z; e++) {
            a = ((c & 1) + 2 * (d & 1)).toString() + a;
            c >>= 1;
            d >>= 1;
        }
        return url + a + "?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=111&ur=CN";
    }

    tileUrlFunction(coord, params1, params2) {
        return this.getVETileUrl(
            "http://t0.dynamic.tiles.ditu.live.com/comp/ch/",
            coord[0],
            coord[1],
            coord[2] //5.1.3版本为 -coord[2] -1
        );
    }
}

export default Bing;