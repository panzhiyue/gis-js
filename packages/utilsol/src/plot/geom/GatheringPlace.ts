/**
 * @module utils-ol/plot/geom/GatheringPlace
 */
import { Coordinate } from "ol/coordinate"
import {
    mid,
    distance,
    getThirdPoint,
    getBisectorNormals,
    getCubicValue
} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 聚集地
 */
class GatheringPlace extends Polygon {
    /**
     * 
     */
    t:number;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.GATHERING_PLACE;
        this.t = 0.4;
        this.fixPointCount = 3;
        this.setPoints(points);
    }
    /**
     * 根据输入点集生成实际点集
     */
    generate() {
        var pnts = this.getPoints();
        if (pnts.length < 2) {
            return;
        }
        if (this.getPointCount() == 2) {
            var midP = mid(pnts[0], pnts[1]);
            var d = distance(pnts[0], midP) / 0.9;
            var pnt = getThirdPoint(pnts[0], midP, Constants.HALF_PI, d, true);
            pnts = [pnts[0], pnt, pnts[1]];
        }
        var midP = mid(pnts[0], pnts[2]);
        pnts.push(midP, pnts[0], pnts[1]);

        var normals = [];
        for (var i = 0; i < pnts.length - 2; i++) {
            var pnt1 = pnts[i];
            var pnt2 = pnts[i + 1];
            var pnt3 = pnts[i + 2];
            var normalPoints = getBisectorNormals(this.t, pnt1, pnt2, pnt3);
            normals = normals.concat(normalPoints);
        }
        var count = normals.length;
        normals = [normals[count - 1]].concat(normals.slice(0, count - 1));
        var pList = [];
        for (i = 0; i < pnts.length - 2; i++) {
            pnt1 = pnts[i];
            pnt2 = pnts[i + 1];
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
export default GatheringPlace;