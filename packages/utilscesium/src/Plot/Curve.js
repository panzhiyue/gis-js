/**
 * @module utilscesium/Plot/Curve
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"

/**
 * @classdesc
 * 曲线
 * @api
 */
class Curve {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;

        this.type = PlotTypes.CURVE;
        this.t = 0.3;
    }

    generate() {
        var count = this.points.length;
        if (count < 2) {
            return;
        }

        var pnts = this.points;


        let ps;
        if (count == 2) {
            ps = pnts;
        } else {
            ps = PlotUtil.getCurvePoints(this.t, pnts);
        }
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d);
    }

}

export default Curve;