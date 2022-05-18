/**
 * @module utils-ol/plot/geom/StraightArrow
 */
import {Coordinate} from "ol/coordinate"
import {distance,getThirdPoint,} from "../PlotUtils"

import PlotTypes from "../PlotTypes"
import Polyline from "./Polyline"


/**
 * 直线箭头
 */
class StraightArrow extends Polyline {

    /**
     * 最大箭头长度
     */
    maxArrowLength:number;

    /**
     * 箭头长度比例  arrowLengthScale分之一
     */
    arrowLengthScale:number;

    /**
     * 箭头弧度
     */
     arrowAngle:number;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.STRAIGHT_ARROW;
        this.fixPointCount = 2;
        this.maxArrowLength = 3000000;   //最大箭头长度
        this.arrowLengthScale = 5;       //箭头长度比例  arrowLengthScale分之一
        this.arrowAngle = Math.PI / 5;   //箭头角度
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
        var pnt1 = pnts[0];
        var pnt2 = pnts[1];
        //线长度
        var length = distance(pnt1, pnt2);
        //箭头长度
        var len = length / this.arrowLengthScale;
        len = len > this.maxArrowLength ? this.maxArrowLength : len;
        //左侧点
        var leftPnt = getThirdPoint(pnt1, pnt2, this.arrowAngle, len, false);
        //右侧点
        var rightPnt = getThirdPoint(pnt1, pnt2, this.arrowAngle, len, true);
        this.setCoordinates([pnt1, pnt2, leftPnt, pnt2, rightPnt]);
    }

}

export default StraightArrow;
