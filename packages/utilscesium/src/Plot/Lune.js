/**
 * @module utilscesium/Plot/Lune
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"

/**
 * @classdesc
 * 弓形
 * @api
 */
class Lune {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;
        this.type = PlotTypes.LUNE;
        this.fixPointCount = 3;
    }

    generate() {
        let count = this.points.length;
        if (count < 2) {
            return;
        }

        let pnts = this.points;

        if (count == 2) {
            let mid = PlotUtil.mid(pnts[0], pnts[1]);
            let d = PlotUtil.distance(pnts[0], mid);
            let pnt = PlotUtil.getThirdPoint(pnts[0], mid, Constants.HALF_PI, d);
            pnts.push(pnt);
        }
        let pnt1 = pnts[0];
        let pnt2 = pnts[1];
        let pnt3 = pnts[2];
        let center = PlotUtil.getCircleCenterOfThreePoints(pnt1, pnt2, pnt3);
        let radius = PlotUtil.distance(pnt1, center);

        let angle1 = PlotUtil.getAzimuth(pnt1, center);
        let angle2 = PlotUtil.getAzimuth(pnt2, center);
        let startAngle;
        let endAngle;
        if (PlotUtil.isClockWise(pnt1, pnt2, pnt3)) {
            startAngle = angle2;
            endAngle = angle1;
        }
        else {
            startAngle = angle1;
            endAngle = angle2;
        }
        let ps = PlotUtil.getArcPoints(center, radius, startAngle, endAngle);
        ps.push(ps[0]);
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d);
    }

}

export default Lune;