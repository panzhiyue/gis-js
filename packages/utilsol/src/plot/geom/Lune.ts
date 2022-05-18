/**
 * @module utils-ol/plot/geom/Lune
 */
import {Coordinate} from "ol/coordinate"
import {mid,distance,getThirdPoint,getCircleCenterOfThreePoints,getAzimuth,isClockWise,getArcPoints} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 弓形
 */
class Lune extends Polygon {
    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.LUNE;
        this.fixPointCount = 3;
        this.setPoints(points);

    }
    /**
    * 根据输入点集生成实际点集
    */
    generate() {
        if (this.getPointCount() < 2) {
            return;
        }
        var pnts = this.getPoints();
        if (this.getPointCount() == 2) {
            var midP = mid(pnts[0], pnts[1]);
            var d = distance(pnts[0], midP);
            var pnt = getThirdPoint(pnts[0], midP, Constants.HALF_PI, d);
            pnts.push(pnt);
        }
        var pnt1 = pnts[0];
        var pnt2 = pnts[1];
        var pnt3 = pnts[2];
        //中心点
        var center = getCircleCenterOfThreePoints(pnt1, pnt2, pnt3);
        //半径
        var radius = distance(pnt1, center);

        //第一个点与圆心生成的方位角
        var angle1 = getAzimuth(pnt1, center);

        //第二个点与圆心生成的方位角
        var angle2 = getAzimuth(pnt2, center);

        //如果是顺时针
        if (isClockWise(pnt1, pnt2, pnt3)) {
            var startAngle = angle2;
            var endAngle = angle1;
        }
        else {//如果是逆时针
            startAngle = angle1;
            endAngle = angle2;
        }
        //生成圆弧点集
        var pnts = getArcPoints(center, radius, startAngle, endAngle);
        //构成闭环
        pnts.push(pnts[0]);
        this.setCoordinates([pnts]);
    }
}
export default Lune;