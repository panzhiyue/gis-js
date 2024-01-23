/**
 * @module utilscesium/Plot/PolylineBuffer
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"

/**
 * @classdesc
 * 细直箭头
 * @api
 */
class PolylineBuffer {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;
        this.type = PlotTypes.FINE_ARROW;
        this.tailWidthFactor = 0.2;
        this.neckWidthFactor = 0.2;
        this.neckAngle = Math.PI / 2;
        this.fixPointCount = 2;

    }

    generate() {
        
        var pnts = this.points;
        var len = PlotUtil.getBaseLength(pnts);
        var tailWidth = len * this.tailWidthFactor;
        if (pnts.length < 2) {
            return;
        }
        var ps1 = [], ps2 = [];
        for (let i = 0; i < this.points.length; i++) {
            if (i == this.points.length - 1) {
                var pnt1 = pnts[i];
                var pnt2 = pnts[i-1];
                var tailLeft = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, true);
                var tailRight = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, false);
                ps1.push(tailRight);
                ps2.push(tailLeft);
            } else {
                var pnt1 = pnts[i];
                var pnt2 = pnts[i + 1];
                var tailLeft = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, true);
                var tailRight = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, false);
                ps1.push(tailLeft);
                ps2.push(tailRight);
            }
        }
        var ps = ps1.concat(ps2.reverse());
        //var pList = [tailLeft, neckLeft, neckRight, tailRight];


        // var pnt1 = pnts[0];
        // var pnt2 = pnts[1];
        // var len = PlotUtil.getBaseLength(pnts);
        // var tailWidth = len * this.tailWidthFactor;
        // var neckWidth = len * this.neckWidthFactor;
        // var tailLeft = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, true);
        // var tailRight = PlotUtil.getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, false);
        // var neckLeft = PlotUtil.getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, false);
        // var neckRight = PlotUtil.getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, true);
        // var pList = [tailLeft, neckLeft, neckRight, tailRight];

        // let ps = pList;

        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d);
    }

}

export default PolylineBuffer;