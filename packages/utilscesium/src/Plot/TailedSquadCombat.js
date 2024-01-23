/**
 * @module utilscesium/Plot/TailedSquadCombat
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"
import AttackArrow from "./AttackArrow"

/**
 * @classdesc
 * 燕尾斜箭头
 * @api
 */
class TailedSquadCombat extends AttackArrow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        super(options);
        this.points = options.points;

        this.type = PlotTypes.TAILED_SQUAD_COMBAT;
        this.headHeightFactor = 0.18;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.tailWidthFactor = 0.1;
        this.swallowTailFactor = 1;
        this.swallowTailPnt = null;
    }

    generate() {
        if (!Cesium.defined(this.points) || this.points.length < 2) {
            return;
        }
        var pnts = this.points;
        if (pnts[pnts.length - 2][0] == pnts[pnts.length - 1][0] && pnts[pnts.length - 2][1] == pnts[pnts.length - 1][1]) {
            pnts.pop();
        }
        var tailPnts = this.getTailPoints(pnts);
        var headPnts = this.getArrowHeadPoints(pnts, tailPnts[0], tailPnts[2]);
        var neckLeft = headPnts[0];
        var neckRight = headPnts[4];
        var bodyPnts = this.getArrowBodyPoints(pnts, neckLeft, neckRight, this.tailWidthFactor);
        var count = bodyPnts.length;
        var leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, count / 2));
        leftPnts.push(neckLeft);
        var rightPnts = [tailPnts[2]].concat(bodyPnts.slice(count / 2, count));
        rightPnts.push(neckRight);

        leftPnts = PlotUtil.getQBSplinePoints(leftPnts);
        rightPnts = PlotUtil.getQBSplinePoints(rightPnts);

        let ps = leftPnts.concat(headPnts, rightPnts.reverse(), [tailPnts[1], leftPnts[0]]);
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d)
    }
    getTailPoints(points) {
        var allLen = PlotUtil.getBaseLength(points);
        var tailWidth = allLen * this.tailWidthFactor;
        var tailLeft = PlotUtil.getThirdPoint(points[1], points[0], Constants.HALF_PI, tailWidth, false);
        var tailRight = PlotUtil.getThirdPoint(points[1], points[0], Constants.HALF_PI, tailWidth, true);
        var len = tailWidth * this.swallowTailFactor;
        var swallowTailPnt = PlotUtil.getThirdPoint(points[1], points[0], 0, len, true);
        return [tailLeft, swallowTailPnt, tailRight];
    }
}

export default TailedSquadCombat;