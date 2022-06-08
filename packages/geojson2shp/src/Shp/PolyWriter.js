/**
 * @module GeoJson2Shp/Shp/PolyWriter
 */

import * as ext from './Extent.js'
import Writer from './Writer.js'

/**
 * 线,面写入器 
 * 
 * shp文件点内容
 * ---------------------------------------
 *             |=======================|  ^
 * 00h /      0| 记录号(表示第几个图斑)|  |
 *             | 从1开始               |  |
 *             |-----------------------|头信息
 * 01h /      4| 内容所占长度          |  |
 *             |=======================|--v
 * 02h /      8| 几何图形类型          |  ^
 *             |-----------------------|  |
 * 03h /     12| x最小值               |  |
 *             |-----------------------|  |
 * 04h /     20| y最小值               |  |
 *             |-----------------------|  |
 * 05h /     28| x最大值               |  |
 *             |-----------------------|  |
 * 06h /     36| y最大值               |  |
 *             |-----------------------|  |
 * 07h /     44| 子图形数量            |  |
 *             |-----------------------|内容
 * 08h /     48| 坐标点数量            |  |
 *             |-----------------------|  |
 *             | ................      |  |
 * 09h /       | 子图形起始坐标索引    |  |
 * 52+         | 从0开始               |  |
 * partIndex*4 | ................      |  |
 *             |-----------------------|  |
 * 0Ah /       | ................      |  |
 * 52+         | 坐标点                |  |
 * partIndex*4+| ................      |  |
 * coorIndex*16|                       |  |
 *             |-----------------------|  v
 * ----------------------------------------
 */
class PolyWriter extends Writer {

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
         * (2)范围(4*8=32)
         * (3)子图形数量(4)
         * (4)坐标数量(4)
         * (5)子图形起始坐标索引(partCount*4)
         * (6)坐标点(coorCount*16)
         * @type {number}
         */
        var contentLength;

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
        this.geometries_.forEach(function writePolyLine(coordinates, i) {
            //平面坐标
            var flattened = this.getFlattened(coordinates);
            //子图形数量
            var noParts = this.getPartCount([coordinates], this.type_);
            //内容所占长度
            //几何类型(4)+范围(4*8=32)+子图形数量(4)+坐标数量(4)+子图形起始坐标索引(partCount*4)+坐标点(coorCount*16)
            contentLength = 4 + 32 + 4 + 4 + (noParts) * 4 + (flattened.length * 16);
            //范围
            var featureExtent = flattened.reduce(function (extent, c) {
                return ext.extendCoordinate(extent, c);
            }, ext.createEmpty());

            //#region shx文件
            //shx写入几何图形在shp文件起始位值(4)
            shxView.setInt32(shxI, shpI / 2);
            //shx写入记录内容长度(4)
            shxView.setInt32(shxI + 4, contentLength / 2);
            //shx文件下一个图形写入位置:记录位移量(4)+记录长度(4)=8
            shxI += 8;
            //#endregion shx文件


            //#region shx文件
            //shp写入记录号,从1开始(4)
            shpView.setInt32(shpI, i + 1);
            //shp写入内容长度(4)
            shpView.setInt32(shpI + 4, contentLength / 2);
            //shp写入几何图形类型(4)
            shpView.setInt32(shpI + 8, this.type_, true);
            //shp写入范围(32)
            shpView.setFloat64(shpI + 12, featureExtent.xmin, true);
            shpView.setFloat64(shpI + 20, featureExtent.ymin, true);
            shpView.setFloat64(shpI + 28, featureExtent.xmax, true);
            shpView.setFloat64(shpI + 36, featureExtent.ymax, true);
            //shp写入子图形数量(4)
            shpView.setInt32(shpI + 44, noParts, true);
            //shp写入坐标数量(4)
            shpView.setInt32(shpI + 48, flattened.length, true);

            //#region 写入子图形坐标开始索引号(partCount*4)
            //shp第一个子图形坐标开始索引号(4)
            shpView.setInt32(shpI + 52, 0, true);

            //shp写入子图形坐标开始索引号((partCount-1)*4)
            var onlyParts = coordinates.reduce(function (arr, coords) {
                if (Array.isArray(coords[0][0])) {
                    arr = arr.concat(coords);
                } else {
                    arr.push(coords);
                }
                return arr;
            }, []);
            for (var p = 1; p < noParts; p++) {
                shpView.setInt32( // set part index
                    shpI + 52 + (p * 4),
                    onlyParts.reduce(function (a, b, idx) {
                        return idx < p ? a + b.length : a;
                    }, 0),
                    true
                );
            }
            //#endregion 写入子图形坐标开始索引号

            //shp写入坐标(coorCount*16)
            flattened.forEach(function writeLine(coords, i) {
                shpView.setFloat64(shpI + 56 + (i * 16) + (noParts - 1) * 4, coords[0], true); // X
                shpView.setFloat64(shpI + 56 + (i * 16) + (noParts - 1) * 4 + 8, coords[1], true); // Y
            });

            //shp文件下一个图形写入起始位置
            shpI += contentLength + headerLength;
            //#endregion shx文件
        }.bind(this));


    }

    /**
     * @inheritdoc 
     */
    getPartCount(geometries) {
        var no = 1;
        no = geometries.reduce(function (no, coords) {
            no += coords.length;
            if (Array.isArray(coords[0][0][0])) { // multi
                no += coords.reduce(function (no, rings) {
                    return no + rings.length - 1; // minus outer
                }, 0);
            }
            return no;
        }, 0);
        return no;
    }

    /**
     * @inheritdoc
     */
    getExtent() {
        return this.getFlattened(this.geometries_).reduce(function (extent, c) {
            return ext.extendCoordinate(extent, c);
        }, ext.createEmpty());
    }

    /**
     * @inheritdoc
     */
    getShpLength() {
        return (this.geometries_.length * 52) + this.getPartCount(this.geometries_) * 4 +
            // points
            (this.getFlattened(this.geometries_).length * 16);
    }

    /**
     * @inheritdoc
     */
    getShxLength() {
        return this.geometries_.length * 8;
    }
}

export default PolyWriter;
