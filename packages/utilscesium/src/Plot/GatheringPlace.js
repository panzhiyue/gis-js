/**
 * @module utilscesium/Plot/GatheringPlace
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"

/**
 * @classdesc
 * 聚集地
 * @api
 */
class GatheringPlace {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;
        this.type = PlotTypes.GATHERING_PLACE;
        this.t = 0.4;
        this.fixPointCount = 3;
    }

    generate() {
        let pnts = this.points;
        if (pnts.length < 2) {
            return;
        }
        if (pnts.length == 2) {
            let mid = PlotUtil.mid(pnts[0], pnts[1]);
            let d = PlotUtil.distance(pnts[0], mid) / 0.9;
            let pnt = PlotUtil.getThirdPoint(pnts[0], mid, Constants.HALF_PI, d, true);
            pnts = [pnts[0], pnt, pnts[1]];
        }
        let mid = PlotUtil.mid(pnts[0], pnts[2]);
        pnts.push(mid, pnts[0], pnts[1]);

        let normals = [];
        for (let i = 0; i < pnts.length - 2; i++) {
            let pnt1 = pnts[i];
            let pnt2 = pnts[i + 1];
            let pnt3 = pnts[i + 2];
            let normalPoints = PlotUtil.getBisectorNormals(this.t, pnt1, pnt2, pnt3);
            normals = normals.concat(normalPoints);
        }
        let count = normals.length;
        normals = [normals[count - 1]].concat(normals.slice(0, count - 1));
        let pList = [];
        for (let i = 0; i < pnts.length - 2; i++) {
            let pnt1 = pnts[i];
            let pnt2 = pnts[i + 1];
            pList.push(pnt1);
            for (let t = 0; t <= Constants.FITTING_COUNT; t++) {
                let pnt = PlotUtil.getCubicValue(t / Constants.FITTING_COUNT, pnt1, normals[i * 2], normals[i * 2 + 1], pnt2);
                pList.push(pnt);
            }
            pList.push(pnt2);
        }
        let ps = pList;
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d);
    }

}

export default GatheringPlace;