/**
 * @module utilscesium/Plot/TailedAttackArrow
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import AttackArrow from "./AttackArrow"

/**
 * @classdesc
 * 燕尾进攻箭头
 * @api
 */
class TailedAttackArrow extends AttackArrow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        super(options);
        this.points = options.points;

        this.type = PlotTypes.TAILED_ATTACK_ARROW;
        this.headHeightFactor = 0.18;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.tailWidthFactor = 0.1;
        this.headTailFactor = 0.8;
        this.swallowTailFactor = 1;
        this.swallowTailPnt = null;
    }

    generate() {
        if (!Cesium.defined(this.points) || this.points.length < 3) {
            return;
        }
        var pnts = this.points;
        if (pnts[pnts.length - 2][0] == pnts[pnts.length - 1][0] && pnts[pnts.length - 2][1] == pnts[pnts.length - 1][1]) {
            pnts.pop();
        }
        var tailLeft = pnts[0];
        var tailRight = pnts[1];
        if (PlotUtil.isClockWise(pnts[0], pnts[1], pnts[2])) {
            tailLeft = pnts[1];
            tailRight = pnts[0];
        }
        var midTail = PlotUtil.mid(tailLeft, tailRight);
        var bonePnts = [midTail].concat(pnts.slice(2));
        var headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight);
        var neckLeft = headPnts[0];
        var neckRight = headPnts[4];
        var tailWidth = PlotUtil.distance(tailLeft, tailRight);
        var allLen = PlotUtil.getBaseLength(bonePnts);
        var len = allLen * this.tailWidthFactor * this.swallowTailFactor;
        this.swallowTailPnt = PlotUtil.getThirdPoint(bonePnts[1], bonePnts[0], 0, len, true);
        var factor = tailWidth / allLen;
        var bodyPnts = this.getArrowBodyPoints(bonePnts, neckLeft, neckRight, factor);
        var count = bodyPnts.length;
        var leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
        leftPnts.push(neckLeft);
        var rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
        rightPnts.push(neckRight);

        leftPnts = PlotUtil.getQBSplinePoints(leftPnts);
        rightPnts = PlotUtil.getQBSplinePoints(rightPnts);

        let ps = leftPnts.concat(headPnts, rightPnts.reverse(), [this.swallowTailPnt, leftPnts[0]]);
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d)
    }

}

export default TailedAttackArrow;