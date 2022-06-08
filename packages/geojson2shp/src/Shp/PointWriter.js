/**
 * @module GeoJson2Shp/Shp/PointsWriter
 */

import * as ext from './Extent.js'
import Writer from './Writer.js'

/**
 * @description
 * 点写入器 
 * shp文件点内容
 *          |=======================|  ^
 * 00h /   0| 记录号(表示第几个图斑)|  |
 *          | 从1开始               |  |                  
 *          |-----------------------|头信息
 * 01h /   4| 内容所占长度          |  |
 *          |=======================|--v
 * 02h /   8| 几何图形类型          |  ^
 *          |-----------------------|  |
 * 03h /  12| x坐标                 |  内容
 *          |-----------------------|  |
 * 04h /  20| y坐标                 |  |
 *          |-----------------------|  v
 */
class PointWriter extends Writer {

    /**
     * @inheritdoc
     */
    constructor(geometries, type) {
        super(geometries, type);
    }

    /**
     * @inheritdoc
     */
    writeGeometry(shpView, shxView) {

        /**
         * 1个图形内容所占长度
         * (1)几何类型(4)
         * (2)x坐标(8)
         * (3)y坐标(8)
         * @type {number}
         */
        var contentLength = 20;

        /**
         * 1个图形头信息所占长度
         * (1)记录号(4)
         * (2)内容所占长度(4)
         * @type {number}
         */
        var headerLength = 8;

        /**
         * 几何图形信息在shp文件流中起始位置 
         * @type {number}
         */
        var shpI = 100;

        /**
         * 几何图形信息在shx文件流中起始位置
         * @type {number}
         */
        var shxI = 100;

        //循环写入几何图形
        this.geometries_.forEach(function writePoint(coords, i) {
            //#region shx文件
            //shx写入几何图形在shp文件起始位值(4)
            shxView.setInt32(shxI, shpI / 2);
            //shx写入记录内容长度(4)   (图形类型+x坐标+y坐标)/2=(4+8+8)/2 =20
            shxView.setInt32(shxI + 4, contentLength / 2);
            //shx文件下一个图形写入位置:记录位移量(4)+记录长度(4)=8
            shxI += 8;
            //#endregion shx文件

            //#region shp文件
            //shp写入记录号,从1开始(4)
            shpView.setInt32(shpI, i + 1);
            //shp写入内容长度(4)
            shpView.setInt32(shpI + 4, contentLength / 2);
            //shp写入几何图形类型(4)
            shpView.setInt32(shpI + 8, this.type_, true);
            //shp写入x坐标(8)
            shpView.setFloat64(shpI + 12, coords[0], true);
            //shp写入y坐标(8)
            shpView.setFloat64(shpI + 20, coords[1], true);

            //shp文件下一个图形写入起始位置
            shpI += contentLength + headerLength;
            //#endregion shp文件

        }.bind(this));
    }

    /**
     * @inheritdoc 
     */
    getPartCount(geometries) {
        return geometries.length;
    }

    /**
     * @inheritdoc
     */
    getExtent() {
        return this.geometries_.reduce(function (extent, coords) {
            return ext.extendCoordinate(extent, coords);
        }, ext.createEmpty());
    }

    /**
     * @inheritdoc
     */
    getShpLength() {
        return this.geometries_.length * 28;
    }

    /**
     * @inheritdoc
     */
    getShxLength() {
        return this.geometries_.length * 8;
    }
}

export default PointWriter;
