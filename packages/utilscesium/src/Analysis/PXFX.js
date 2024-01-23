/**
 * @module utilscesium/Analysis/PXFX
 */

import SectionCollection from "./SectionCollection"


/**
 * @classdesc
 * 坡向分析
 * @api
 */
class PXFX {
    /**
    * 构造函数
    * @param {Object} opt_options
    * @param {boolean} [opt_options.show=true]  是否显示
    * @param {number} [opt_options.xCount=true]  横轴数量
    * @param {number} [opt_options.yCount=true]  纵轴数量
    * @param {module:Cesium/Entity} [opt_options.entity=null]  分区区域
    * @param {module:utilscesium/Analysis/SectionCollection} [opt_options.sections]   坡度区间集合
    */
    constructor(opt_options) {
        let options = Object.assign({ show: true, xCount: 20, yCount: 20, entity: null, sections: new SectionCollection() }, opt_options);

        /**
         * 横轴数量 
         * @type {number}
         */
        this.xCount_ = options.xCount;

        /**
         * 纵轴数量 
         * @type {number}
         */
        this.yCount_ = options.yCount;

        /**
         * 分析区域
         * @type {module:Cesium/Entity}
         */
        this.entity_ = options.entity;

        /**
         * 坡度区间
         * @type {module:utilscesium/Analysis/SectionCollection} 
         */
        this.sections_ = options.sections;

        /**
         * 是否显示
         * @type {boolean} 
         */
        this.show_ = options.show;
    }

    /**
    * 绑定viewer
    * @param {module:Cesium/Viewer} viewer
    */
    setViewer(viewer) {
        this.viewer_ = viewer;
    }

    /**
     *  分析
     */
    analysis() {
        let xmin = Cesium.Math.toDegrees(this.entity_.rectangle.coordinates._value.west).toFixed(7);
        let ymin = Cesium.Math.toDegrees(this.entity_.rectangle.coordinates._value.south).toFixed(7);
        let xmax = Cesium.Math.toDegrees(this.entity_.rectangle.coordinates._value.east).toFixed(7);
        let ymax = Cesium.Math.toDegrees(this.entity_.rectangle.coordinates._value.north).toFixed(7);

        var xC = xmax - xmin;
        var yC = ymax - ymin;

        var slopelineposition = [];
        var hireacys = [];
        for (let i = 0; i < this.xCount_; i++) {
            for (let j = 0; j < this.yCount_; j++) {

                let hireacy = [];
                //分割成小面，切分经纬度
                hireacy.push(new Cesium.Cartesian3(parseFloat(xmin) + (i / this.xCount_) * xC, ymax - (j / this.yCount_) * yC, 0));
                hireacy.push(new Cesium.Cartesian3(parseFloat(xmin) + ((i + 1) / this.xCount_) * xC, ymax - (j / this.yCount_) * yC, 0));
                hireacy.push(new Cesium.Cartesian3(parseFloat(xmin) + ((i + 1) / this.xCount_) * xC, ymax - ((j + 1) / this.yCount_) * yC, 0));
                hireacy.push(new Cesium.Cartesian3(parseFloat(xmin) + (i / this.xCount_) * xC, ymax - ((j + 1) / this.yCount_) * yC, 0));
                hireacys.push(hireacy);
                //取出面的8个点坐标，拿点坐标去求高度值
                slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[0].x, hireacy[0].y));
                slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[0].x + hireacy[1].x) / 2, (hireacy[0].y + hireacy[1].y) / 2));
                slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[1].x, hireacy[1].y));
                slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[1].x + hireacy[2].x) / 2, (hireacy[1].y + hireacy[2].y) / 2));
                slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[2].x, hireacy[2].y));
                slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[2].x + hireacy[3].x) / 2, (hireacy[2].y + hireacy[3].y) / 2));
                slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[3].x, hireacy[3].y));
                slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[3].x + hireacy[0].x) / 2, (hireacy[3].y + hireacy[0].y) / 2));
            }
        }

        var promise = Cesium.sampleTerrainMostDetailed(this.viewer_.terrainProvider, slopelineposition);

        Cesium.when(promise,
            function (updatedPositions) {
                var m = 0
                for (var k = 0; k < updatedPositions.length / 8; k++) {
                    //第一个点与第五个点的坡度
                    var slope1 = (updatedPositions[m].height - updatedPositions[m + 4].height) / (Cesium.Cartesian3.distance(
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m].latitude, updatedPositions[m].longitude, updatedPositions[m].height),
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m + 4].latitude, updatedPositions[m + 4].longitude, updatedPositions[m + 4].height)))
                    //第二个点与第六个点的坡度
                    var slope2 = (updatedPositions[m + 1].height - updatedPositions[m + 5].height) / (Cesium.Cartesian3.distance(
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m + 1].latitude, updatedPositions[m + 1].longitude, updatedPositions[m + 1].height),
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m + 5].latitude, updatedPositions[m + 5].longitude, updatedPositions[m + 5].height)))
                    //第三个点与第七个点的坡度
                    var slope3 = (updatedPositions[m + 2].height - updatedPositions[m + 6].height) / (Cesium.Cartesian3.distance(
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m + 2].latitude, updatedPositions[m + 2].longitude, updatedPositions[m + 2].height),
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m + 6].latitude, updatedPositions[m + 6].longitude, updatedPositions[m + 6].height)))
                    //第四个点与第八个点的坡度
                    var slope4 = (updatedPositions[m + 3].height - updatedPositions[m + 7].height) / (Cesium.Cartesian3.distance(
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m + 3].latitude, updatedPositions[m + 3].longitude, updatedPositions[m + 3].height),
                        Cesium.Cartesian3.fromDegrees(updatedPositions[m + 7].latitude, updatedPositions[m + 7].longitude, updatedPositions[m + 7].height)))
                    var arrposition = [Math.abs(slope1), Math.abs(slope2), Math.abs(slope3), Math.abs(slope4)];//取绝对值
                    arrposition.sort();
                    var slope = arrposition[3]; // 拿到最大的坡度值  

                    var lineposition = [];//画方向线的坐标
                    if (slope == Math.abs(slope1)) {
                        if (slope1 > 0) {
                            lineposition.push(Cesium.Math.toDegrees(updatedPositions[m].longitude), Cesium.Math.toDegrees(updatedPositions[m].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m + 4].longitude), Cesium.Math.toDegrees(updatedPositions[m + 4].latitude));
                        } else {
                            lineposition.push(
                                Cesium.Math.toDegrees(updatedPositions[m + 4].longitude), Cesium.Math.toDegrees(updatedPositions[m + 4].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m].longitude), Cesium.Math.toDegrees(updatedPositions[m].latitude));

                        }
                    } else if (slope == Math.abs(slope2)) {
                        if (slope2 > 0) {
                            lineposition.push(Cesium.Math.toDegrees(updatedPositions[m + 1].longitude), Cesium.Math.toDegrees(updatedPositions[m + 1].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m + 5].longitude), Cesium.Math.toDegrees(updatedPositions[m + 5].latitude));
                        } else {
                            lineposition.push(
                                Cesium.Math.toDegrees(updatedPositions[m + 5].longitude), Cesium.Math.toDegrees(updatedPositions[m + 5].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m + 1].longitude), Cesium.Math.toDegrees(updatedPositions[m + 1].latitude));
                        }
                    } else if (slope == Math.abs(slope3)) {
                        if (slope3 > 0) {
                            lineposition.push(Cesium.Math.toDegrees(updatedPositions[m + 2].longitude), Cesium.Math.toDegrees(updatedPositions[m + 2].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m + 6].longitude), Cesium.Math.toDegrees(updatedPositions[m + 6].latitude));
                        } else {
                            lineposition.push(
                                Cesium.Math.toDegrees(updatedPositions[m + 6].longitude), Cesium.Math.toDegrees(updatedPositions[m + 6].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m + 2].longitude), Cesium.Math.toDegrees(updatedPositions[m + 2].latitude));
                        }
                    } else if (slope == Math.abs(slope4)) {
                        if (slope4 > 0) {
                            lineposition.push(Cesium.Math.toDegrees(updatedPositions[m + 3].longitude), Cesium.Math.toDegrees(updatedPositions[m + 3].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m + 7].longitude), Cesium.Math.toDegrees(updatedPositions[m + 7].latitude));
                        } else {
                            lineposition.push(
                                Cesium.Math.toDegrees(updatedPositions[m + 7].longitude), Cesium.Math.toDegrees(updatedPositions[m + 7].latitude),
                                Cesium.Math.toDegrees(updatedPositions[m + 3].longitude), Cesium.Math.toDegrees(updatedPositions[m + 3].latitude));
                        }
                    }
                    slope = (Math.abs(slope1) + Math.abs(slope2) + Math.abs(slope3) + Math.abs(slope4)) / 4; //四个坡度值大小有的差值特别大，这里取的平均值用来配置颜色
                    for (let i = 0; i < this.sections_.values.length; i++) {
                        let section = this.sections_.get(i);
                        if (slope >= section.minValue && slope < section.maxValue) {

                            let e = this.viewer_.entities.add({
                                type: 'drawSlopePolyline',
                                polyline: {
                                    clampToGround: true,
                                    positions: Cesium.Cartesian3.fromDegreesArray(lineposition),
                                    material: section.material,// Cesium.Color.BLUE.withAlpha(0.5) ,
                                    width: 8
                                }
                            });
                            e.polyline.show = new Cesium.CallbackProperty(function () {
                                return this.show_;
                            }.bind(this), false);

                            section.entities.add(e);
                            break;

                        }
                    }

                    m += 8;
                }
            }.bind(this))

    }

    /**
     * 清除上一次分析结果 
     */
    clear() {
        if (!Cesium.defined(this.sections_)) {
            return;
        }
        for (let i = 0; i < this.sections_.values.length; i++) {
            let section = this.sections_.get(i);
            for (let j = 0; j < section.entities.values.length; j++) {
                this.viewer_.entities.remove(section.entities.values[j]);
            }
            section.entities.removeAll();
        }
    }

    /**
    * 销毁 
    */
    destroy() {
        this.clear();
        this.viewer_ = undefined;
        this.sections_ = undefined;
        this.entity_ = undefined;
    }
}

export default PXFX;
