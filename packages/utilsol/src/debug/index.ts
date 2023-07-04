import { loadFile } from "./loadFile";
import olMap from "ol/Map"
import VectorLayer from "ol/layer/Vector";
import { saveAsFile } from "./saveAsFile";
import FileType from "./FileType";

export * from "./loadFile"

export const init = (global, map: olMap, vectorLayer: VectorLayer<any>) => {
    let isPrint = true;
    const print = (...args) => {
        if (isPrint) {
            console.info(`debug:${args[0]}`, ...(args.slice(1)));
        }
    }
    print("初始化debug");
    global.setIsPrint = (isP) => {
        isPrint = isP;
    }

    global.map = map;
    global.vectorLayer = vectorLayer;
    //#region loadFile
    global.loadFile = (type, isFit: Boolean = true) => {
        print("start-loadFile");
        loadFile(type, {
            projection: map.getView().getProjection()
        }).then((features) => {
            print("loadFile.features", features);
            vectorLayer.getSource().addFeatures(features);
            if (isFit) {
                map.getView().fit(vectorLayer.getSource().getExtent())
            }
            print("end-loadFile");
        })
    }
    global.loadShp = (isFit: Boolean) => {
        global.loadFile(FileType.SHP, isFit);
    }
    global.loadGeoJson = (isFit: Boolean ) => {
        global.loadFile(FileType.GEOJSON, isFit);
    }
    global.loadTopoJson = (isFit: Boolean) => {
        global.loadFile(FileType.TOPOJSON, isFit);
    }
    global.loadGpx = (isFit: Boolean) => {
        global.loadFile(FileType.GPX, isFit);
    }
    global.loadKml = (isFit: Boolean) => {
        global.loadFile(FileType.KML, isFit);
    }
    global.loadPolyline = (isFit: Boolean) => {
        global.loadFile(FileType.POLYLINE, isFit);
    }
    global.loadWkt = (isFit: Boolean) => {
        global.loadFile(FileType.WKT, isFit);
    }
    //#endregion

    //#region saveAsFile
    global.saveAsFile = (type, options) => {
        print("start-saveAsFile");
        let opt = Object.assign({
            projection: global.map.getView().getProjection()
        }, options)
        let features = global.vectorLayer.getSource().getFeatures()
        saveAsFile(type, features, opt)
        print("end-saveAsFile");
    }
    global.saveAsShp = (options) => {
        global.saveAsFile(FileType.SHP, options);
    }
    global.saveAsGeoJson = (options) => {
        global.saveAsFile(FileType.GEOJSON, options);
    }

    global.saveAsTopoJson = (options) => {
        global.saveAsFile(FileType.TOPOJSON, options);
    }
    global.saveAsGpx = (options) => {
        global.saveAsFile(FileType.GPX, options);
    }
    global.saveAsKml = (options) => {
        global.saveAsFile(FileType.KML, options);
    }
    global.saveAsPolyline = (options) => {
        global.saveAsFile(FileType.POLYLINE, options);
    }
    global.saveAsWkt = (options) => {
        global.saveAsFile(FileType.WKT, options);
    }
    //#endregion
    global.fit = map.getView().fit;
    global.fitToLayer = (options) => {
        map.getView().fit(vectorLayer.getSource().getExtent(), options);
    }

    global.printMapInfo = () => {
        let output = {
            map: map,
            layers: map.getLayers().getArray(),
            extent: map.getView().calculateExtent(),
            size: map.getSize(),
            overlays: map.getOverlays(),
            zoom: map.getView().getZoom(),
            interactions: map.getInteractions().getArray(),
        };
        console.info(output)
    }
    return global;
}