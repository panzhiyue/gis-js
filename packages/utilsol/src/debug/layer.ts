import TileLayer from "ol/layer/Tile"
import { OSM } from "ol/source"
import { BaiDu, Bing, GaoDe, GeoQ, TDT } from "src/source"

/**
 * 创建影像图层
 * @param type 
 * @param options 
 */
export const createImageLayer = (type, options) => {
    switch (type) {
        case "OSM": {
            return new TileLayer({
                source: new OSM(options)
            })
        }
        case "Baidu": {
            return new TileLayer({
                source: new BaiDu(options)
            })
        }
        case "Bing": {
            return new TileLayer({
                source: new Bing(options)
            })
        }
        case "GaoDe": {
            return new TileLayer({
                source: new GaoDe(options)
            })
        }
        case "GeoQ": {
            return new TileLayer({
                source: new GeoQ(options)
            })
        }
        case "TDT": {
            return new TileLayer({
                source: new TDT({
                    tk: "6703c18da8b111f1ac38fdcfc4a138d8",
                    ...options
                })
            })
        }
    }
}