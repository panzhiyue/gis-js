import { loadFile } from "./loadFile";

export * from "./loadFile"

export const init = (global, map, vectorLayer) => {
    global.map = map;
    global.layer = vectorLayer;
    global.loadFile = (type, isFit: Boolean = true) => {
        loadFile(type).then((features) => {
            vectorLayer.getSource().addFeatures(features);
        })
    }
    return global;
}