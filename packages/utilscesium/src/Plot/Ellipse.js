/**
 * @module utilscesium/Plot/Ellipse
 */

import * as PlotUtil from "../Plot/PlotUtil"
import PlotTypes from "./PlotTypes"
import Constants from "./Constants"

/**
 * @classdesc
 * 椭圆
 * @api
 */
class Ellipse {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        this.points = options.points;

        this.type = PlotTypes.ELLIPSE;
        this.fixPointCount = 2;
    }

    generate() {
        var count = this.points.length;
        if (count < 2) {
            return;
        }
        var pnt1 = this.points[0];
        var pnt2 = this.points[1];
        var center = PlotUtil.mid(pnt1, pnt2);
        var majorRadius = Math.abs((pnt1[0] - pnt2[0]) / 2);
        var minorRadius = Math.abs((pnt1[1] - pnt2[1]) / 2);

        let ps = this.generatePoints(center, majorRadius, minorRadius);
        let d = [];
        for (let i = 0; i < ps.length; i++) {
            d.push(ps[i][0], ps[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(d)
    }

    generatePoints(center, majorRadius, minorRadius) {
        var x, y, angle, points = [];
        for (var i = 0; i <= Constants.FITTING_COUNT; i++) {
            angle = Math.PI * 2 * i / Constants.FITTING_COUNT;
            x = center[0] + majorRadius * Math.cos(angle);
            y = center[1] + minorRadius * Math.sin(angle);
            points.push([x, y]);
        }
        return points;
    }
}

export default Ellipse;