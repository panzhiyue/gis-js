import Map from "ol/Map"
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
/**
 * 下载地图为png图片
 */
export function downLoadMapAsPng(options: { map: Map, name: string, control: boolean }) {
    let dom = options.map.getTarget() as Element;
    if (options.control == false) {
        dom = dom.getElementsByClassName("ol-layers")[0];
    }
    domtoimage.toBlob(dom).then(function (blob) {
        saveAs(blob, options.name);
    });
}


/**
 * 下载地图为jpg图片
 */
export function downLoadMapAsJpeg(options: { map: Map, name: string, control: boolean }) {
    let dom = options.map.getTarget() as Element;
    if (options.control == false) {
        dom = dom.getElementsByClassName("ol-layers")[0];
    }
    domtoimage.toJpeg(dom, { quality: 0.95 }).then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = options.name;
        link.href = dataUrl;
        link.click();
    });
}