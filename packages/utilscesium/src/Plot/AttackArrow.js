/**
 * @module utilscesium/Plot/AttackArrow
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"

/**
 * @classdesc
 * 攻击箭头
 * @api
 */
class AttackArrow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;

        this.type = PlotTypes.ATTACK_ARROW;
        this.headHeightFactor = 0.18;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.headTailFactor = 0.8;
    }

    generate() {
        if (!Cesium.defined(this.points) || this.points.length < 2) {
            return;
        }
        var pnts = this.points;
        if (pnts[pnts.length - 2][0] == pnts[pnts.length - 1][0] && pnts[pnts.length - 2][1] == pnts[pnts.length - 1][1]) {
            pnts.pop();
        }
        // 计算箭尾
        var tailLeft = pnts[0];
        var tailRight = pnts[1];
        if (PlotUtil.isClockWise(pnts[0], pnts[1], pnts[2])) {
            tailLeft = pnts[1];
            tailRight = pnts[0];
        }
        var midTail = PlotUtil.mid(tailLeft, tailRight);
        var bonePnts = [midTail].concat(pnts.slice(2));
        // 计算箭头
        var headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight);
        var neckLeft = headPnts[0];
        var neckRight = headPnts[4];
        var tailWidthFactor = PlotUtil.distance(tailLeft, tailRight) / PlotUtil.getBaseLength(bonePnts);
        // 计算箭身
        var bodyPnts = this.getArrowBodyPoints(bonePnts, neckLeft, neckRight, tailWidthFactor);
        // 整合
        var count = bodyPnts.length;
        var leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
        leftPnts.push(neckLeft);
        var rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
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

    /**
     * 计算箭头
     * @param {any} points
     * @param {any} tailLeft
     * @param {any} tailRight
     */
    getArrowHeadPoints(points, tailLeft, tailRight) {
        var len = PlotUtil.getBaseLength(points);
        var headHeight = len * this.headHeightFactor;
        var headPnt = points[points.length - 1];
        len = PlotUtil.distance(headPnt, points[points.length - 2]);
        var tailWidth = PlotUtil.distance(tailLeft, tailRight);
        if (headHeight > tailWidth * this.headTailFactor) {
            headHeight = tailWidth * this.headTailFactor;
        }
        var headWidth = headHeight * this.headWidthFactor;
        var neckWidth = headHeight * this.neckWidthFactor;
        headHeight = headHeight > len ? len : headHeight;
        var neckHeight = headHeight * this.neckHeightFactor;
        var headEndPnt = PlotUtil.getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
        var neckEndPnt = PlotUtil.getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);
        var headLeft = PlotUtil.getThirdPoint(headPnt, headEndPnt, Constants.HALF_PI, headWidth, false);
        var headRight = PlotUtil.getThirdPoint(headPnt, headEndPnt, Constants.HALF_PI, headWidth, true);
        var neckLeft = PlotUtil.getThirdPoint(headPnt, neckEndPnt, Constants.HALF_PI, neckWidth, false);
        var neckRight = PlotUtil.getThirdPoint(headPnt, neckEndPnt, Constants.HALF_PI, neckWidth, true);
        return [neckLeft, headLeft, headPnt, headRight, neckRight];
    }
    /**
     * 计算箭身
     * @param {any} points
     * @param {any} neckLeft
     * @param {any} neckRight
     * @param {any} tailWidthFactor
     */
    getArrowBodyPoints(points, neckLeft, neckRight, tailWidthFactor) {
        var allLen = PlotUtil.wholeDistance(points);
        var len = PlotUtil.getBaseLength(points);
        var tailWidth = len * tailWidthFactor;
        var neckWidth = PlotUtil.distance(neckLeft, neckRight);
        var widthDif = (tailWidth - neckWidth) / 2;
        var tempLen = 0, leftBodyPnts = [], rightBodyPnts = [];
        for (var i = 1; i < points.length - 1; i++) {
            var angle = PlotUtil.getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
            tempLen += PlotUtil.distance(points[i - 1], points[i]);
            var w = (tailWidth / 2 - tempLen / allLen * widthDif) / Math.sin(angle);
            var left = PlotUtil.getThirdPoint(points[i - 1], points[i], Math.PI - angle, w, true);
            var right = PlotUtil.getThirdPoint(points[i - 1], points[i], angle, w, false);
            leftBodyPnts.push(left);
            rightBodyPnts.push(right);
        }
        return leftBodyPnts.concat(rightBodyPnts);
    }
}

export default AttackArrow;