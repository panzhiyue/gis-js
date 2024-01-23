/**
 * @module utilscesium/Plot/FineArrow
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"

/**
 * @classdesc
 * 细直箭头
 * @api
 */
class FineArrow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;
        this.type = PlotTypes.FINE_ARROW;
        this.tailWidthFactor = 0.15;
        this.neckWidthFactor = 0.2;
        this.headWidthFactor = 0.25;
        this.headAngle = Math.PI / 8.5;
        this.neckAngle = Math.PI / 13;
        this.fixPointCount = 2;
    }

    generate() {
        var pnts = this.points;
        if (pnts.length < 2) {
            return;
        }

        var pnt1 = pnts[0];
        var pnt2 = pnts[1];
        var len = PlotUtil.getBaseLength(pnts);
        var tailWidth = len * this.tailWidthFactor;
        var neckWidth = len * this.neckWidthFactor;
        var headWidth = len * this.headWidthFactor;
        var tailLeft = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, true);
        var tailRight = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, false);
        var headLeft = PlotUtil.getThirdPoint(pnt1, pnt2, this.headAngle, headWidth, false);
        var headRight = PlotUtil.getThirdPoint(pnt1, pnt2, this.headAngle, headWidth, true);
        var neckLeft = PlotUtil.getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, false);
        var neckRight = PlotUtil.getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, true);
        var pList = [tailLeft, neckLeft, headLeft, pnt2, headRight, neckRight, tailRight];

        let ps = pList;

        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d);
    }

}

export default FineArrow;