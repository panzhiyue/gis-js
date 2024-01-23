/**
 * @module utilscesium/Plot/SquadCombat
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"
import AttackArrow from "./AttackArrow"

/**
 * @classdesc
 * 斜箭头
 * @api
 */
class SquadCombat extends AttackArrow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        super(options);
        this.points = options.points;

        this.type = PlotTypes.SQUAD_COMBAT;
        this.headHeightFactor = 0.18;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.tailWidthFactor = 0.1;
    }

    generate() {
        if (!Cesium.defined(this.points) || this.points.length < 2) {
            return;
        }
        var pnts = this.points;

        var tailPnts = this.getTailPoints(pnts);
        var headPnts = this.getArrowHeadPoints(pnts, tailPnts[0], tailPnts[1]);
        var neckLeft = headPnts[0];
        var neckRight = headPnts[4];
        var bodyPnts = this.getArrowBodyPoints(pnts, neckLeft, neckRight, this.tailWidthFactor);
        var count = bodyPnts.length;
        var leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, count / 2));
        leftPnts.push(neckLeft);
        var rightPnts = [tailPnts[1]].concat(bodyPnts.slice(count / 2, count));
        rightPnts.push(neckRight);

        leftPnts = PlotUtil.getQBSplinePoints(leftPnts);
        rightPnts = PlotUtil.getQBSplinePoints(rightPnts);

        let ps = leftPnts.concat(headPnts, rightPnts.reverse());
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
        return [tailLeft, tailRight];
    }
}

export default SquadCombat;