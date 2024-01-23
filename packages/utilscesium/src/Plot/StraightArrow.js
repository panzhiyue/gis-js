/**
 * @module utilscesium/Plot/StraightArrow
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"

/**
 * @classdesc
 * 直线箭头。
 * @api
 */
class StraightArrow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);

        this.points = options.points;
        this.type = PlotTypes.STRAIGHT_ARROW;
        this.fixPointCount = 2;
        this.maxArrowLength = 3000000;
        this.arrowLengthScale = 5;
    }

    generate() {
        if (!Cesium.defined(this.points) || this.points.length < 2) {
            return;
        }

        var pnts = this.points;
        var pnt1 = pnts[0];
        var pnt2 = pnts[1];
        var distance = PlotUtil.distance(pnt1, pnt2);
        var len = distance / this.arrowLengthScale;
        len = len > this.maxArrowLength ? this.maxArrowLength : len;

        var leftPnt = PlotUtil.getThirdPoint(pnt1, pnt2, Math.PI / 6, len, false);
        var rightPnt = PlotUtil.getThirdPoint(pnt1, pnt2, Math.PI / 6, len, true);
        var ps = [pnt1, pnt2, leftPnt, pnt2, rightPnt];
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d)
    }
}

export default StraightArrow;