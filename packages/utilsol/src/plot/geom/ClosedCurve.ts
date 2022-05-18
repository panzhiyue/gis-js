/**
 * @module utils-ol/plot/geom/ClosedCurve
 */

import {Coordinate} from "ol/coordinate"
import {getBisectorNormals,getCubicValue} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 曲线面
 */
 class ClosedCurve extends Polygon {

    /**
     * 
     */
    t:number;

    /**
     * 构造函数
     * @param  points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.CLOSED_CURVE;
        this.t = 0.3;
        this.setPoints(points);

    }
    /**
    * 根据输入点集生成实际点集
    */
    generate() {
        var count = this.getPointCount();
        if (count < 2) {
            return;
        }
        if (count == 2) {
            this.setCoordinates([this.points]);
        }
        else {
            var pnts = this.getPoints();
            pnts.push(pnts[0], pnts[1]);
            var normals = [];
            for (var i = 0; i < pnts.length - 2; i++) {
                var normalPoints = getBisectorNormals(this.t, pnts[i], pnts[i + 1], pnts[i + 2]);
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
                    var pnt = getCubicValue(t / Constants.FITTING_COUNT, pnt1, normals[i * 2], normals[i * 2 + 1], pnt2);
                    pList.push(pnt);
                }
                pList.push(pnt2);
            }
            this.setCoordinates([pList]);
        }
    }

}

export default ClosedCurve;