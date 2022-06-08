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
class Writer {

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

export default Writer;
