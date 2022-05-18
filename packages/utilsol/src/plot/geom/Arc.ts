/**
 * @module utils-ol/plot/geom/Arc
 */

import { getCircleCenterOfThreePoints, distance, getAzimuth, isClockWise, getArcPoints } from "../PlotUtils"

import PlotTypes from "../PlotTypes"
import Polyline from "./Polyline"
import { Coordinate } from "ol/coordinate";

/**
 * 弧线绘标(3个点生成圆弧)
 */
class Arc extends Polyline {

    /**
     * 构造函数
     * @param  points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.ARC;
        this.fixPointCount=3;
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
            this.setCoordinates(this.points);
        } else {
            var pnt1 = this.points[0];
            var pnt2 = this.points[1];
            var pnt3 = this.points[2];
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
            } else { //如果是逆时针
                startAngle = angle1;
                endAngle = angle2;
            }
            //生成圆弧点集
            this.setCoordinates(getArcPoints(center, radius, startAngle, endAngle));
        }
    }

}

export default Arc;