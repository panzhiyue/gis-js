/**
 * @module utilscesium/Plot/CloseCurve
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"

/**
 * @classdesc
 * 曲线面
 * @api
 */
class CloseCurve {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;
        this.type = PlotTypes.CLOSED_CURVE;
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
            pnts.push(pnts[0], pnts[1]);
            var normals = [];
            for (var i = 0; i < pnts.length - 2; i++) {
                var normalPoints = PlotUtil.getBisectorNormals(this.t, pnts[i], pnts[i + 1], pnts[i + 2]);
                normals = normals.concat(normalPoints);
            }
            var count = normals.length;
            normals = [normals[count - 1]].concat(normals.slice(0, count - 1));

            var pList = [];
            for (i = 0; i < pnts.length - 2; i++) {
                var pnt1 = pnts[i];
                var pnt2 = pnts[i + 1];
                pList.push(pnt1);
                for (var t = 0; t <= Constants.FITTING_COUNT; t++) {
                    var pnt = PlotUtil.getCubicValue(t / Constants.FITTING_COUNT, pnt1, normals[i * 2], normals[i * 2 + 1], pnt2);
                    pList.push(pnt);
                }
                pList.push(pnt2);
            }
            ps = pList;
        }
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d);
    }

}

export default CloseCurve;
