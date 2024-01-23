/**
 * @module utilscesium/Manager/OutputManager 
 */


/**
 * @classdesc
 * 输出管理类
 * @api
 */
class OutputManager {

    /**
     * 构造函数
     * @param {Object} opt_options 
     * @param {module:Cesium/Viewer} 查看器
     */
    constructor(opt_options) {
        let options = Object.assign({ viewer: undefined }, opt_options);
        this.viewer_ = options.viewer;
    }

    /**
     * 输出屏幕截图对象，可保存为不同类型图片
     * @param {String} [imageType='image/png'] 输出图片类型
     * @returns {Object} 图片对象
     * @example
     * let img = comm.outputImageObj();
     */
    outputImageObj(imageType="image/png") {
        this.viewer_.render();
        let img = new Image();
        img.src = this.viewer_.canvas.toDataURL(imageType);
        return img;
    }

    /**
     * 屏幕截图输出为图片
     * @param {String} [fileName='下载.png'] 输出图片名称
     * @param {String} [imageType='image/png'] 输出图片类型
     */
    outputFile(fileName="下载.png",imageType="image/png") {
        this.viewer_.render();
        let a = document.createElement("a");
        a.setAttribute("download", fileName);
        a.setAttribute('href', this.viewer_.canvas.toDataURL(imageType).replace(imageType, "image/octet-stream"));
        a.click();
    }
}

export default OutputManager;