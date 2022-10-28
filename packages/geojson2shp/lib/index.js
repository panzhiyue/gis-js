'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * GeoJson2Shp/Shp/Extent
 */

/**
 * 扩展范围包含指定坐标
 * @param {module:GeoJson2Shp/Shp/Extent~Extent} extent 范围
 * @param {module:GeoJson2Shp/Shp/Geom~Coordinate} pt 坐标
 * @return {module:GeoJson2Shp/Shp/Extent~Extent}  合并后的范围
 */
function extendCoordinate(extent, pt) {
    if (pt[0] < extent.xmin) extent.xmin = pt[0];
    if (pt[0] > extent.xmax) extent.xmax = pt[0];
    if (pt[1] < extent.ymin) extent.ymin = pt[1];
    if (pt[1] > extent.ymax) extent.ymax = pt[1];
    return extent;
}

/**
 * 创建空范围
 * @return {module:GeoJson2Shp/Shp/Extent~Extent}  最小范围
 */
function createEmpty() {
    return {
        xmin: Number.MAX_VALUE,
        ymin: Number.MAX_VALUE,
        xmax: -Number.MAX_VALUE,
        ymax: -Number.MAX_VALUE
    };
}

/**
 * @module GeoJson2Shp/Shp/Writer
 */

/**
 * 写入器基类,一般用于继承,而不在程序中实例化
 * 
 * shp文件流信息
 * -------------------------------------
 *          |-----------------------|  ^
 * 00h /   0| FileCode(9994)        |  |
 *          |-----------------------|  |
 * 01h /   4|                       |  |
 *          |-----------------------|  |
 * 02h /  24| shp文件长度           |  |  
 *          |-----------------------|  |
 * 03h /  28| 版本号(1000)          |  |
 *          |-----------------------|  |
 * 04h /  32| 几何图形类型          |  |
 *          |-----------------------| 文件头信息
 * 05h /  36| x最小值               |  |
 *          |-----------------------|  |
 * 06h /  44| y最小值               |  |
 *          |-----------------------|  |
 * 07h /  52| x最大值               |  |
 *          |-----------------------|  |
 * 08h /  60| y最大值               |  |
 *          |-----------------------|  |
 * 09h /  68|                       |  |
 *          |                       |  |
 * 0Ah / 100|=======================|__v
 *          |                       |  ^
 *          |                       |  | 
 *          |                       |  | 
 *          | 几何图形信息          |  | 
 *          |                       |  | 
 *          |                       |  | 
 *          |                       |  |
 *          |-----------------------|  v 
 * -------------------------------------
 * 
 * 
 * shx文件流信息
 * -------------------------------------
 *          |-----------------------|  ^
 * 00h /   0| FileCode(9994)        |  |
 *          |-----------------------|  |
 * 01h /   4|                       |  |
 *          |-----------------------|  |
 * 02h /  24| shp文件长度           |  |
 *          |-----------------------|  |
 * 03h /  28| 版本号(1000)          |  |
 *          |-----------------------|  |
 * 04h /  32| 几何图形类型          |  |
 *          |-----------------------| 文件头信息
 * 05h /  36| x最小值               |  |
 *          |-----------------------|  |
 * 06h /  44| y最小值               |  |
 *          |-----------------------|  |
 * 07h /  52| x最大值               |  |
 *          |-----------------------|  |
 * 08h /  60| y最大值               |  |
 *          |-----------------------|  |
 * 09h /  68|                       |  |
 *          |                       |  |            
 * 0Ah / 100|=======================|__v              
 *          |                       |  ^       _    
 *          |                       |  |      /  |==============================================|  ^
 *          | ............          |  |_____/   | 00h /   0| 几何图形流在文件中的起始位置      |  |
 *          | 几何图形信息          |  |_____    |----------------------------------------------|  |
 *          | ............          |  |     \   | 01h /   4| 几何图形流内容长度(不包括头信息)  |  |
 *          |                       |  |      \_ |==============================================|  v
 *          |                       |  |
 *          |-----------------------|  v
 * -------------------------------------
 * 
 */
class Writer$1 {

    /**
     * 构造函数
     * @param {Array.<module:GeoJson2Shp/Shp/Geometry~Geometry>} geometries 图形数组
     * @param {module:GeoJson2Shp/Shp/GeometryType} type 图形类型
     */
    constructor(geometries, type) {
        /**
         * 图形数组
         * @type {Array.<module:GeoJson2Shp/Shp/Geometry~Geometry>}
        */
        this.geometries_ = geometries;

        /**
         * 图形类型
         * @type {module:GeoJson2Shp/Shp/GeometryType}
         */
        this.type_ = type;
    }

    /**
     * 写入文件
     * @param {function} callback 回调函数
     */
    write(callback) {

        /**
         * shp文件流长度 
         */
        var shpLength = 100 + this.getShpLength();
        /**
         * shx文件流长度 
         */
        var shxLength = 100 + this.getShxLength();

        /**
         * shp文件流 
         */
        var shpBuffer = new ArrayBuffer(shpLength);

        /**
         * shp文件视图 
         */
        var shpView = new DataView(shpBuffer);

        /**
         *  shx文件流
         */
        var shxBuffer = new ArrayBuffer(shxLength);

        /**
         * shx文件视图 
         */
        var shxView = new DataView(shxBuffer);

        /**
         * 范围 
         */
        var extent = this.getExtent();

        // 写入shp文件头文件信息
        this.writeHeader(shpView, this.type_);
        // 写入shx文件头文件信息
        this.writeHeader(shxView, this.type_);
        //写入shp文件范围信息
        this.writeExtent(extent, shpView);
        //写入shx文件范围信息
        this.writeExtent(extent, shxView);

        //写入几何信息
        this.writeGeometry(
            new DataView(shpBuffer),
            new DataView(shxBuffer));

        //写入shp文件流长度
        shpView.setInt32(24, shpLength / 2);
        //写入shx文件流长度
        shxView.setInt32(24, shxLength / 2);

        callback(null, {
            shp: shpView,
            shx: shxView
        });
    }

    /**
     * 写入文件头信息
     * @param {DataView} view 视图
     */
    writeHeader(view) {
        view.setInt32(0, 9994);
        view.setInt32(28, 1000, true);
        view.setInt32(32, this.type_, true);
    }

    /**
     * 写入范围信息
     * @param {module:GeoJson2Shp/Shp/Extent~Extent} extent  范围
     * @param {DataView} view 视图
     */
    writeExtent(extent, view) {
        view.setFloat64(36, extent.xmin, true);
        view.setFloat64(44, extent.ymin, true);
        view.setFloat64(52, extent.xmax, true);
        view.setFloat64(60, extent.ymax, true);
    }

    /**
     * 写入几何图形部分
     * @param {any} shpView
     * @param {any} shxView
     */
    writeGeometry(shpView, shxView) {

    }

    /**
     * 获取shp文件长度
     * @return {number} shp文件长度
     */
    getShpLength() {

    }

    /**
     * 获取shx文件长度
     * @return {number} shx文件长度
     */
    getShxLength() {

    }
    /**
     * 获取范围
     * @return {module:GeoJson2Sho/Shp/Extent~Extent} 范围
     */
    getExtent() {

    }

    /**
     * 获取子图形数量 
     * @param {any} geometries
     * @return {number} 子图形数量
     */
    getPartCount(geometries) {
    }

    /**
     * 获取平面坐标 
     * @return {Array.<module:GeoJson2Shp/Shp/Geometry~Coordinate>} 平面坐标
     */
    getFlattened(coords, l) {
        if (l === undefined) l = [];
        if (typeof coords[0][0] == 'object') {
            return coords.reduce(function (memo, c) {
                return memo.concat(this.getFlattened(c));
            }.bind(this), l);
        } else {
            return coords;
        }
    }
}

/**
 * @module GeoJson2Shp/Shp/MultiPointWriter
 */


/**
 * 多点写入器 
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
 * 06h /     36| y最大值               | 内容
 *             |-----------------------|  |
 * 07h /     44| 坐标点数量            |  |
 *             |-----------------------|  |
 * 08h /       | ................      |  |
 * 48+         | 坐标点                |  |
 * partIndex*4+| ................      |  |
 * coorIndex*16|                       |  |
 *             |-----------------------|  v
 * ----------------------------------------
 */
class MultiPointWriter extends Writer$1 {

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
         * (4)坐标数量(4)
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
        this.geometries_.forEach(
            function writeMultiPoint(coordinates, i) {
                //平面坐标
                var flattened = this.getFlattened(coordinates);
                //内容所占长度
                //几何类型(4)+范围(4*8=32)+坐标数量(4)+坐标点(coorCount*16)
                contentLength = 4 + 32 + 4 + (flattened.length * 16);

                //范围
                var featureExtent = flattened.reduce(function (extent, c) {
                    return extendCoordinate(extent, c);
                }, createEmpty());

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
                //shp写入坐标数量(4)
                shpView.setInt32(shpI + 44, flattened.length, true);
                //shp写入坐标(coorCount*16)
                flattened.forEach(function writeLine(coords, i) {
                    shpView.setFloat64(shpI + 48 + (i * 16), coords[0], true); // X
                    shpView.setFloat64(shpI + 48 + (i * 16) + 8, coords[1], true); // Y
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
        return geometries.length;
    }

    /**
     * @inheritdoc
     */
    getExtent() {
        return this.getFlattened(this.geometries_).reduce(function (extent, c) {
            return extendCoordinate(extent, c);
        }, createEmpty());
    }

    /**
     * @inheritdoc 
     */
    getShxLength() {
        return this.geometries_.length * 8;
    }

    /**
     * @inheritdoc 
     */
    getShpLength() {
        return (this.geometries_.length * 48) +
            // points
            (this.getFlattened(this.geometries_).length * 16);
    }
}

/**
 * @module GeoJson2Shp/Shp/PointsWriter
 */

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
class PointWriter extends Writer$1 {

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
            return extendCoordinate(extent, coords);
        }, createEmpty());
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

/**
 * @module GeoJson2Shp/Shp/PolyWriter
 */

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
class PolyWriter extends Writer$1 {

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
                return extendCoordinate(extent, c);
            }, createEmpty());

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
            return extendCoordinate(extent, c);
        }, createEmpty());
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

/**
 * @module GeoJson2Shp/Dbf/Lib
 */

/**
 * 左补位
 * @param {string} str 原字符串
 * @param {number} len 目标字符串长度
 * @param {string} char 补位字符
 * @returns {string} 补位后的字符串
 */
function lpad(str, len, char) {
    while (str.length < len) { str = char + str; } return str;
}
/**
 * 右补位
 * @param {string} str 原字符串
 * @param {number} len 目标字符串长度
 * @param {string} char 补位字符
 * @returns {string} 补位后的字符串
 */
function rpad(str, len, char) {
    while (str.length < len) { str = str + char; } return str;
}/**
 * 字符串转Uint8Array
 * @param {string} string
 * @param {Object} options 
 * @param {boolean} [options.stream] 是否为流
 */
function stringToUint8Array(string, options = { stream: false }) {
    if (options.stream) {
        throw new Error(`Failed to encode: the 'stream' option is unsupported.`);
    }

    let pos = 0;
    const len = string.length;

    let at = 0;  // output position
    let tlen = Math.max(32, len + (len >> 1) + 7);  // 1.5x size
    let target = new Uint8Array((tlen >> 3) << 3);  // ... but at 8 byte offset

    while (pos < len) {
        let value = string.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff) {
            // high surrogate
            if (pos < len) {
                const extra = string.charCodeAt(pos);
                if ((extra & 0xfc00) === 0xdc00) {
                    ++pos;
                    value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                }
            }
            if (value >= 0xd800 && value <= 0xdbff) {
                continue;  // drop lone surrogate
            }
        }

        // expand the buffer if we couldn't write 4 bytes
        if (at + 4 > target.length) {
            tlen += 8;  // minimum extra
            tlen *= (1.0 + (pos / string.length) * 2);  // take 2x the remaining
            tlen = (tlen >> 3) << 3;  // 8 byte offset

            const update = new Uint8Array(tlen);
            update.set(target);
            target = update;
        }

        if ((value & 0xffffff80) === 0) {  // 1-byte
            target[at++] = value;  // ASCII
            continue;
        } else if ((value & 0xfffff800) === 0) {  // 2-byte
            target[at++] = ((value >> 6) & 0x1f) | 0xc0;
        } else if ((value & 0xffff0000) === 0) {  // 3-byte
            target[at++] = ((value >> 12) & 0x0f) | 0xe0;
            target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else if ((value & 0xffe00000) === 0) {  // 4-byte
            target[at++] = ((value >> 18) & 0x07) | 0xf0;
            target[at++] = ((value >> 12) & 0x3f) | 0x80;
            target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else {
            // FIXME: do we care
            continue;
        }

        target[at++] = (value & 0x3f) | 0x80;
    }

    return target.slice(0, at);
}

/**
 * @module GeoJson2Shp/Dbf/FieldSize
 */

/**
 * dbf中各种数据格式的大小 
 * @enum {number}
 */
const FieldSize = {
    /**
     * 字符串
     */
    C: 254,
    /**
     * 布尔
     */
    L: 1,
    /**
     * 日期时间
     */
    D: 8,
    /**
     * 数值
     */
    N: 18,
    /**
     * 数值
     */
    M: 18,
    /**
     * 数值,浮点数
     */
    F: 18,
    /**
     * 数值
     */
    B: 8
};

/**
 * @module GeoJson2Shp/Dbf/FieldType
 */

/**
 * 字段类型
 * @enum {string}
 */
var FieldType = {
    /**
     * 字符串
     */
    string: 'C',

    /**
     * 数值
     */
    number: 'N',

    /**
     * 布尔
     */
    boolean: 'L',

    /**
     * 字段的所有值都为null时要使用的类型
     */
    null: 'C'
};

/**
 * @module GeoJson2Shp/Dbf/Field
 */

/**
 * @typedef {Object} Field
 * @property {string} Field.name 字段名称
 * @property {module:GeoJson2Shp/Dbf/FieldType} Field.type 字段类型
 * @property {number} Field.size 字段大小
 */

/**
 * 属性数组所有字段定义
 * @param {Array.<Object>} features 属性数组
 * @return {Array.<module:GeoJson2Shp/Dbf/Field~Field>} 属性数组所有字段定义
 * 
 * @example 
 * var features=[{"NAME":"测试点","aa":"20"},{"NAME":"1","aa":"21"},{"NAME":"2","aa":"22"},{"NAME":"3","aa":"23"},{"NAME":"4","aa":"24"},{"NAME":"5","aa":"25"}];
 * multi(features)
 * //结果:[{"name":"NAME","type":"C","size":254},{"name":"aa","type":"C","size":254}]
 */
function multi(features) {
    var fields = {};

    //合并属性对象对象
    features.forEach(collect);
    function collect(f) { inherit(fields, f); }

    return obj(fields);
}

/**
 * 合并对象a,b,类似jquery的extend
 * @param {Object} a
 * @param {Object} b
 * @returns {Object} 合并后的对象
 * 
 * @example 
 * var a={"T":""};
 * var b={"NAME":"测试点","aa":"20"};
 * inherit(a,b)
 * //结果:{"T":"","NAME":"测试点","aa":"20"}
 */
function inherit(a, b) {
    for (var i in b) {
        var isDef = typeof b[i] !== 'undefined' && b[i] !== null;
        if (typeof a[i] === 'undefined' || isDef) {
            a[i] = b[i];
        }
    }
    return a;
}

/**
 * 属性对象转为字段定义
 * @param {Object} _ 属性对象
 * @return {Array.<module:GeoJson2Shp/Dbf/Field~Field>} 字段定义
 */
function obj(_) {
    var fields = {}, o = [];
    for (var p in _) fields[p] = _[p] === null ? 'null' : typeof _[p];
    for (var n in fields) {
        var t = FieldType[fields[n]];
        if (t) {
            o.push({
                name: n,   //字段名称
                type: t,   //字段类型
                size: FieldSize[t]  //字段大小
            });
        }
    }
    return o;
}

/**
 * @module GeoJson2Shp/Dbf/Write
 */

/**
 * 根据属性对象与字段定义生成dbf文件流,字段定义可不传,通过属性对象进行生成
 * dbf文件结构
 *
 *           _______________________  _______
 * 00h /   0| 版本号(dBase III)     |  ^
 *          |-----------------------|  |
 * 01h /   1|  最后更新时间(年)     |  |
 * 02h /   2|  最后更新时间(月)     |  |
 * 03h /   3|  最后更新时间(日)     |  |
 *          |-----------------------|  |
 * 04h /   4| 记录数量              | Record
 * 05h /   5|                       | header
 * 06h /   6|                       |  |
 * 07h /   7|                       |  |
 *          |-----------------------|  |
 * 08h /   8| 文件头信息长度        |  |
 * 09h /   9|                       |  |
 *          |-----------------------|  |
 * 0Ah /  10| 每条记录的长度        |  |
 * 0Bh /  11|                       |  |
 *          |-----------------------|  |
 * 0Ch /  12| ( Reserved )        *3|  |
 * 0Dh /  13|                       |  |
 *          |-----------------------|  |
 * 0Eh /  14| Incomplete transac.*12|  |
 *          |-----------------------|  |
 * 0Fh /  15| Encryption flag    *13|  |
 *          |-----------------------|  |
 * 10h /  16| Free record thread    |  |
 * 11h /  17| (reserved for LAN     |  |
 * 12h /  18|  only )               |  |
 * 13h /  19|                       |  |
 *          |-----------------------|  |
 * 14h /  20| ( Reserved for        |  |            _        |=======================| ______
 *          |   multi-user dBASE )  |  |           / 00h /  0| Field name in ASCII   |  ^
 *          : ( dBASE III+ - )      :  |          /          : (terminated by 00h)   :  |
 *          :                       :  |         |           |                       |  |
 * 1Bh /  27|                       |  |         |   0Ah / 10|                       |  |
 *          |-----------------------|  |         |           |-----------------------| For
 * 1Ch /  28| MDX flag (dBASE IV)*14|  |         |   0Bh / 11| Field type (ASCII) *20| each
 *          |-----------------------|  |         |           |-----------------------| field
 * 1Dh /  29| Language driver     *5|  |        /    0Ch / 12| Field data address    |  |
 *          |-----------------------|  |       /             |                     *6|  |
 * 1Eh /  30| ( Reserved )          |  |      /              | (in memory !!!)       |  |
 * 1Fh /  31|                     *3|  |     /       0Fh / 15| (dBASE III+)          |  |
 *          |=======================|__|____/                |-----------------------|  |  -
 * 20h /  32|                       |  |  ^          10h / 16| Field length       *22|  |   |
 *          |- - - - - - - - - - - -|  |  |                  |-----------------------|  |   | *7
 *          |                    *19|  |  |          11h / 17| Decimal count      *23|  |   |
 *          |- - - - - - - - - - - -|  |  Field              |-----------------------|  |  -
 *          |                       |  | Descriptor  12h / 18| ( Reserved for        |  |
 *          :. . . . . . . . . . . .:  |  |array     13h / 19|   multi-user dBASE)*18|  |
 *          :                       :  |  |                  |-----------------------|  |
 *       n  |                       |__|__v_         14h / 20| Work area ID       *16|  |
 *          |-----------------------|  |    \                |-----------------------|  |
 *       n+1| Terminator (0Dh)      |  |     \       15h / 21| ( Reserved for        |  |
 *          |=======================|  |      \      16h / 22|   multi-user dBASE )  |  |
 *       m  | Database Container    |  |       \             |-----------------------|  |
 *          :                    *15:  |        \    17h / 23| Flag for SET FIELDS   |  |
 *          :                       :  |         |           |-----------------------|  |
 *     / m+263                      |  |         |   18h / 24| ( Reserved )          |  |
 *          |=======================|__v_ ___    |           :                       :  |
 *          :                       :    ^       |           :                       :  |
 *          :                       :    |       |           :                       :  |
 *          :                       :    |       |   1Eh / 30|                       |  |
 *          | Record structure      |    |       |           |-----------------------|  |
 *          |                       |    |        \  1Fh / 31| Index field flag    *8|  |
 *          |                       |    |         \_        |=======================| _v_____
 *          |                       | Records
 *          |-----------------------|    |
 *          |                       |    |          _        |=======================| _______
 *          |                       |    |         / 00h /  0| Record deleted flag *9|  ^
 *          |                       |    |        /          |-----------------------|  |
 *          |                       |    |       /           | Data               *10|  One
 *          |                       |    |      /            : (ASCII)            *17: record
 *          |                       |____|_____/             |                       |  |
 *          :                       :    |                   |                       | _v_____
 *          :                       :____|_____              |=======================|
 *          :                       :    |
 *          |                       |    |
 *          |                       |    |
 *          |                       |    |
 *          |                       |    |
 *          |                       |    |
 *          |=======================|    |
 *          |__文件结束标识__________| ___v____  文件结束标识 ( 1Ah )  *11
 * 
 */
class Writer {
    /**
     * 
     * @param {Array.<Object>} data 属性对象
     * @param {Array.<module:GeoJson2Shp/Dbf/Field~Field>} field_meta  字段定义
     */
    constructor(data, field_meta) {

        /**
         * 字段定义
         * @type  {Array.<module:GeoJson2Shp/Dbf/Field~Field>}
         */
        this.field_meta_ = field_meta || multi(data);

        /**
         * 字段定义
         * @type {Array.<Object>}
         */
        this.data_ = data;
    }

    /**
     * 写入dbf文件
     * @param {function} callback 回调函数
     */
    write(callback) {

        /**
         * 字段描述长度
         * @type {number}
         */
        var fieldDescLength = (32 * this.field_meta_.length);

        /**
         * 每条记录所占长度(包括删除标记)
         * @type {number}
         */
        var bytesPerRecord = this.getBytesPerRecord(this.field_meta_);

        /**
         * dbf文件流
         * @type {ArrayBuffer}
         */
        var buffer = new ArrayBuffer(
            // 文件头信息长度
            32 +
            // 字段描述长度
            fieldDescLength +
            //描述信息结束
            1 +
            // 属性数据长度
            (bytesPerRecord * this.data_.length) +
            // 文件结束标识
            1
        );

        /**
         * 当前时间
         * @type {Date}
         */
        var now = new Date();

        /**
         * dbf文件视图
         * @type {DataView}
         */
        var view = new DataView(buffer);

        // 版本号 - dBase III(1)
        view.setUint8(0, 0x03);
        // 最后一次更新日期
        //当前年-1900(1)
        view.setUint8(1, now.getFullYear() - 1900);
        //当前月(1)
        view.setUint8(2, now.getMonth());
        //当前日(1)
        view.setUint8(3, now.getDate());
        // 记录数(4)
        view.setUint32(4, this.data_.length, true);

        // 文件头信息长度(2)
        var headerLength = fieldDescLength + 32 + 1;
        view.setUint16(8, headerLength, true);
        // 每条记录的长度(2)
        view.setUint16(10, bytesPerRecord, true);

        // 描述信息结束(1)
        view.setInt8(32 + fieldDescLength, 0x0D);

        //字段描述(字段数量*32)
        this.field_meta_.forEach(function (f, i) {
            //字段名称占10位
            let name = f.name.slice(0, 10);
            name = rpad(name, 10, " ");
            let uint8Array = stringToUint8Array(name);

            for (let index = 0; index < 10; index++) {
                view.setInt8(32 + i * 32 + index, uint8Array[index]);
            }

            // 字段类型(5)
            view.setInt8(32 + i * 32 + 11, f.type.charCodeAt(0));
            // 字段长度(1)
            view.setInt8(32 + i * 32 + 16, f.size);
            if (f.type == 'N') view.setInt8(32 + i * 32 + 17, 3);
        });

        var offset = fieldDescLength + 32 + 1;

        //记录
        this.data_.forEach(function (row, num) {
            // 删除标记
            view.setUint8(offset, 32);
            offset++;
            this.field_meta_.forEach(function (f) {
                var val = row[f.name];
                if (val === null || typeof val === 'undefined') val = '';

                switch (f.type) {
                    // boolean
                    case 'L':
                        view.setUint8(offset, val ? 84 : 70);
                        offset++;
                        break;

                    // date
                    case 'D':
                        offset = this.writeField_(view, 8,
                            lpad(val.toString(), 8, ' '), offset);
                        break;

                    // number
                    case 'N':
                        offset = this.writeField_(view, f.size,
                            lpad(val.toString(), f.size, ' ').substr(0, 18),
                            offset);
                        break;

                    // string
                    case 'C':
                        offset = this.writeField_(view, f.size,
                            rpad(val.toString(), f.size, ' '), offset);
                        break;

                    default:
                        throw new Error('Unknown field type');
                }
            }.bind(this));
        }.bind(this));

        // 文件结束表示
        view.setUint8(offset, 0x1A);

        callback(null, {
            dbf: view
        });
    }

    /**
     * 写入字段
     * @param {DataView} view dbf文件对象
     * @param {number} fieldLength 字段长度
     * @param {string} str 值
     * @param {number} offset 写入位置
     * @returns {number} 写入后流的位置
     */
    writeField_(view, fieldLength, str, offset) {
        let uint8Array = stringToUint8Array(str);
        for (var i = 0; i < fieldLength; i++) {
            view.setUint8(offset, uint8Array[i]);
            offset++;
        }
        return offset;
    };

    /**
     * 获取每条记录所占字节数(包括删除标记)
     * @param {Array.<module:GeoJson2Shp/Dbf/Field~Field>} fields 字段定义
     * @returns {number} 每条记录所占长度
     */
    getBytesPerRecord(fields) {
        // deleted flag
        return fields.reduce(function (memo, f) { return memo + f.size; }, 1);
    }
}

/**
 * @module GeoJson2Shp/Shp/GeometryType 
 */

/**
 * 图形类型在shp文件中的值
 * @enum {number}
 */
var geometryType = {
    NULL: 0,
    POINT: 1,
    POLYLINE: 3,
    POLYGON: 5,
    MULTIPOINT: 8,
    POINTZ: 11,
    POLYLINEZ: 13,
    POLYGONZ: 15,
    MULTIPOINTZ: 18,
    POINTM: 21,
    POLYLINEM: 23,
    POLYGONM: 25,
    MULTIPOINTM: 28,
    MULTIPATCH: 31,
};

/**
 * @module GeoJson2Shp/GeoJson2Shp
 */

/**
 * GeoJson转为Shp 
 * @api
 */
class GeoJson2Shp {
    /**
     * 构造函数
     * @param {Object|string} geojson 矢量数据geojson格式
     */
    constructor(geojson) {

        if (typeof (geojson) == "string") {
            geojson = eval("(" + geojson + ")");
        }

        /**
         * @type {Object|string}
         * @readonly
         */
        this.geojson_ = geojson;
    }

    /**
     * 写入点
     * @param {Function} callback
     */
    writePoint(callback) {
        this.write_(geometryType.POINT, callback);
    }

    /**
    * 写入多点
    * @param {Function} callback
    */
    writeMultiPoint(callback) {
        this.write_(geometryType.MULTIPOINT, callback);
    }

    /**
     * 写入线
     * @param {Function} callback
     */
    writePolyline(callback) {
        this.write_(geometryType.POLYLINE, callback);
    }

    /**
     * 写入面
     * @param {Function} callback
     */
    writePolygon(callback) {
        this.write_(geometryType.POLYGON, callback);
    }

    /**
     * 根据类型写入
     * @param {module:GeoJson2Shp/Shp/GeometryType} type
     * @param {Function} callback
     */
    write_(type, callback) {
        var writeOptions = this.getWriteOptions_(type);
        var writer = this.getShpWriter_(type);
        if (writeOptions) {
            new writer(writeOptions.geometries, writeOptions.type).write(function (err, files) {
                new Writer(writeOptions.properties).write(function (err, files2) {
                    files.dbf = files2.dbf;
                    callback(err, files);
                });

            });
        }
    }

    /**
     * 根据图形类型获取shp写入器
     * @param {module:GeoJson2Shp/Shp/GeometryType} type
     */
    getShpWriter_(type) {
        var writer;
        if (type == geometryType.POINT) {
            writer = PointWriter;
        } else if (type == geometryType.MULTIPOINT) {
            writer = MultiPointWriter;
        } else if (type == geometryType.POLYLINE) {
            writer = PolyWriter;
        } else if (type == geometryType.POLYGON) {
            writer = PolyWriter;
        }
        return writer;
    }

    /**
     * 获取点部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getPointOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "Point"; });
        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: geometryType.POINT
        };
    }

    /**
     * 获取点部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getMultiPointOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "MultiPoint"; });

        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: geometryType.MULTIPOINT
        };
    }

    /**
     * 获取线部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getPolylineOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "LineString" || f.geometry.type === "MultiLineString"; });
        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: geometryType.POLYLINE
        };
    }

    /**
     * 获取面部分写入参数
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getPolygonOptions_() {
        var oftype = this.geojson_.features.filter(function (f) { return f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon"; });
        if (!oftype || oftype.length == 0) {
            return null;
        }
        return {
            geometries: oftype.map(this.justCoords_),
            properties: oftype.map(this.justProps_),
            type: geometryType.POLYGON
        };
    }


    /**
     * 根据传入类型获取写入参数
     * @param {module:GeoJson2Shp/Shp/GeometryType} geometryType  图形类型
     * @return {module:GeoJson2Shp/GeoJson2Shp~WriteOptions} 写入参数
     */
    getWriteOptions_(type) {
        var writeOptions;
        if (type == geometryType.POINT) {
            writeOptions = this.getPointOptions_();
        } else if (type == geometryType.MULTIPOINT) {
            writeOptions = this.getMultiPointOptions_();
        } else if (type == geometryType.POLYLINE) {
            writeOptions = this.getPolylineOptions_();
        } else if (type == geometryType.POLYGON) {
            writeOptions = this.getPolygonOptions_();
        }
        return writeOptions;
    }

    /**
     * 获取GeoJson中的坐标部分
     * @param {Object} t GeoJson中的feature
     * @return {Array} feature中的坐标部分
     */
    justCoords_(t) {
        if (t.geometry.type == "LineString" || t.geometry.type == "MultiLineString") {
            return [t.geometry.coordinates];
        } else {
            return t.geometry.coordinates
        }
    }

    /**
     * 获取GeoJson中的属性部分
     * @param {Object} t GeoJson中的feature
     * @return {Object} feature中的属性部分
     */
    justProps_(t) {
        return t.properties;
    }

}

exports.DbfWriter = Writer;
exports.FieldSize = FieldSize;
exports.FieldType = FieldType;
exports.GeoJson2Shp = GeoJson2Shp;
exports.GeometryType = geometryType;
exports.MultiPointWriter = MultiPointWriter;
exports.PointWriter = PointWriter;
exports.PolyWriter = PolyWriter;
exports.ShpWriter = Writer$1;
