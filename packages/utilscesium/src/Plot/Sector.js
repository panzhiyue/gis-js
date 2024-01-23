/**
 * @module utilscesium/Plot/Sector
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"

/**
 * @classdesc
 * 扇形面
 * @api
 */
class Sector {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;
        this.type = PlotTypes.SECTOR;
        this.fixPointCount = 3;
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
            var center = pnts[0];
            var pnt2 = pnts[1];
            var pnt3 = pnts[2];
            var radius = PlotUtil.distance(pnt2, center);
            var startAngle = PlotUtil.getAzimuth(pnt2, center);
            var endAngle = PlotUtil.getAzimuth(pnt3, center);
            var pList = PlotUtil.getArcPoints(center, radius, startAngle, endAngle);
            pList.push(center, pList[0]);
            ps = pList;
        }

        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d);
    }

}

export default Sector;