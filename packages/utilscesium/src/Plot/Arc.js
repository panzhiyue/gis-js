/**
 * @module utilscesium/Plot/Arc
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"

/**
 * @classdesc
 * 圆弧。
 * 用三点绘制一段经过此三点的圆弧。
 * @api
 */
 class Arc {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);

        this.points = options.points;
        this.type = PlotTypes.ARC;
    }

    generate() {
        if (!Cesium.defined(this.points) || this.points.length < 3) {
            return;
        }

        let point1 = this.points[0];
        let point2 = this.points[1];
        let point3 = this.points[2];

        //计算中心点
        let center = PlotUtil.getCircleCenterOfThreePoints(point1, point2, point3);
        //计算半径
        let radius = PlotUtil.distance(point1, center);
        //计算角度
        let angle1 = PlotUtil.getAzimuth(point1, center);
        let angle2 = PlotUtil.getAzimuth(point2, center);

        let startAngle, endAngle;
        if (PlotUtil.isClockWise(point1, point2, point3)) {
            startAngle = angle2;
            endAngle = angle1;
        } else {
            startAngle = angle1;
            endAngle = angle2;
        }

        let ps = PlotUtil.getArcPoints(center, radius, startAngle, endAngle);
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d)
    }
}

export default Arc;