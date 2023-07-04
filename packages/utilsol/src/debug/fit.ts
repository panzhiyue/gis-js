import { Point } from "ol/geom"
import olMap from "ol/Map"

const fit = (map: olMap, geom, options) => {
    map.getView().fit(geom, options)
}

export const fitToPoint = (map: olMap, lon: number, lat: number, options: Object) => {
    let opt = {
        maxZoom: 15,
        ...options
    }
    fit(map, new Point([lon, lat]), opt)
}

export const fitToExtent = (map: olMap, extent, options: Object) => {
    fit(map, extent, options)
}

