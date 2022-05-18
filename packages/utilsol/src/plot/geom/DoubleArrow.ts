/**
 * @module utils-ol/plot/geom/AttackArrow
 */
import {Coordinate} from "ol/coordinate"

import {
    mid,
    isClockWise,
    getBezierPoints,
    distance,
    getThirdPoint,
    getBaseLength,
    wholeDistance,
    getAngleOfThreePoints,
} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 钳击双箭头
 */
class AttackArrow extends Polygon {

    /**
     * 箭头外侧高度占长度百分比
     */
     headHeightFactor: number;

     /**
      * 箭头内侧高度占外侧高度的百分比
      */
     headWidthFactor: number;
 
     /**
      * 箭头内侧高度占外侧高度的百分比
      */
     neckHeightFactor: number;
 
     /**
      * 箭头内侧宽度中箭头高度百分比
      */
     neckWidthFactor: number;


     connPoint:Coordinate=null;

     tempPoint4:Coordinate=null;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.DOUBLE_ARROW;
        this.headHeightFactor = 0.25;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.connPoint = null;
        this.tempPoint4 = null;
        this.fixPointCount = 4;
        this.setPoints(points);
    }
    /**
     * 结束绘制
     */
    finishDrawing() {
        if (this.getPointCount() == 3 && this.tempPoint4 != null)
            this.points.push(this.tempPoint4);
        if (this.connPoint != null)
            this.points.push(this.connPoint);
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
            return;
        }
        var pnt1 = this.points[0];
        var pnt2 = this.points[1];
        var pnt3 = this.points[2];
        var count = this.getPointCount();
        if (count == 3)
            this.tempPoint4 = this.getTempPoint4(pnt1, pnt2, pnt3);
        else
            this.tempPoint4 = this.points[3];
        if (count == 3 || count == 4)
            this.connPoint = mid(pnt1, pnt2);
        else
            this.connPoint = this.points[4];
        var leftArrowPnts, rightArrowPnts;
        //顺时针
        if (isClockWise(pnt1, pnt2, pnt3)) {
            leftArrowPnts = this.getArrowPoints(pnt1, this.connPoint, this.tempPoint4, false);
            rightArrowPnts = this.getArrowPoints(this.connPoint, pnt2, pnt3, true);
        } else { //逆时针
            leftArrowPnts = this.getArrowPoints(pnt2, this.connPoint, pnt3, false);
            rightArrowPnts = this.getArrowPoints(this.connPoint, pnt1, this.tempPoint4, true);
        }
        var m = leftArrowPnts.length;
        var t = (m - 5) / 2;

        var llBodyPnts = leftArrowPnts.slice(0, t);
        var lArrowPnts = leftArrowPnts.slice(t, t + 5);
        var lrBodyPnts = leftArrowPnts.slice(t + 5, m);

        var rlBodyPnts = rightArrowPnts.slice(0, t);
        var rArrowPnts = rightArrowPnts.slice(t, t + 5);
        var rrBodyPnts = rightArrowPnts.slice(t + 5, m);

        rlBodyPnts = getBezierPoints(rlBodyPnts);
        var bodyPnts = getBezierPoints(rrBodyPnts.concat(llBodyPnts.slice(1)));
        lrBodyPnts = getBezierPoints(lrBodyPnts);

        var pnts = rlBodyPnts.concat(rArrowPnts, bodyPnts, lArrowPnts, lrBodyPnts);
        this.setCoordinates([pnts]);
    }

    getArrowPoints(pnt1, pnt2, pnt3, clockWise) {
        var midPnt = mid(pnt1, pnt2);
        var len = distance(midPnt, pnt3);
        var midPnt1 = getThirdPoint(pnt3, midPnt, 0, len * 0.3, true);
        var midPnt2 = getThirdPoint(pnt3, midPnt, 0, len * 0.5, true);
        //var midPnt3=PlotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.7, true);
        midPnt1 = getThirdPoint(midPnt, midPnt1, Constants.HALF_PI, len / 5, clockWise);
        midPnt2 = getThirdPoint(midPnt, midPnt2, Constants.HALF_PI, len / 4, clockWise);
        //midPnt3=PlotUtils.getThirdPoint(midPnt, midPnt3, Constants.HALF_PI, len / 5, clockWise);

        var points = [midPnt, midPnt1, midPnt2, pnt3];
        // 计算箭头部分
        var arrowPnts = this.getArrowHeadPoints(points);
        var neckLeftPoint = arrowPnts[0];
        var neckRightPoint = arrowPnts[4];
        // 计算箭身部分
        var tailWidthFactor = distance(pnt1, pnt2) / getBaseLength(points) / 2;
        var bodyPnts = this.getArrowBodyPoints(points, neckLeftPoint, neckRightPoint, tailWidthFactor);
        var n = bodyPnts.length;
        var lPoints = bodyPnts.slice(0, n / 2);
        var rPoints = bodyPnts.slice(n / 2, n);
        lPoints.push(neckLeftPoint);
        rPoints.push(neckRightPoint);
        lPoints = lPoints.reverse();
        lPoints.push(pnt2);
        rPoints = rPoints.reverse();
        rPoints.push(pnt1);
        return lPoints.reverse().concat(arrowPnts, rPoints);
    }

    getArrowHeadPoints(points) {
        var len = getBaseLength(points);
        var headHeight = len * this.headHeightFactor;
        var headPnt = points[points.length - 1];
        var headWidth = headHeight * this.headWidthFactor;
        var neckWidth = headHeight * this.neckWidthFactor;
        var neckHeight = headHeight * this.neckHeightFactor;
        var headEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
        var neckEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);
        var headLeft = getThirdPoint(headPnt, headEndPnt, Constants.HALF_PI, headWidth, false);
        var headRight = getThirdPoint(headPnt, headEndPnt, Constants.HALF_PI, headWidth, true);
        var neckLeft = getThirdPoint(headPnt, neckEndPnt, Constants.HALF_PI, neckWidth, false);
        var neckRight = getThirdPoint(headPnt, neckEndPnt, Constants.HALF_PI, neckWidth, true);
        return [neckLeft, headLeft, headPnt, headRight, neckRight];
    }

    getArrowBodyPoints(points, neckLeft, neckRight, tailWidthFactor) {
        var allLen = wholeDistance(points);
        var len = getBaseLength(points);
        var tailWidth = len * tailWidthFactor;
        var neckWidth = distance(neckLeft, neckRight);
        var widthDif = (tailWidth - neckWidth) / 2;
        var tempLen = 0,
            leftBodyPnts = [],
            rightBodyPnts = [];
        for (var i = 1; i < points.length - 1; i++) {
            var angle = getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
            tempLen += distance(points[i - 1], points[i]);
            var w = (tailWidth / 2 - tempLen / allLen * widthDif) / Math.sin(angle);
            var left = getThirdPoint(points[i - 1], points[i], Math.PI - angle, w, true);
            var right = getThirdPoint(points[i - 1], points[i], angle, w, false);
            leftBodyPnts.push(left);
            rightBodyPnts.push(right);
        }
        return leftBodyPnts.concat(rightBodyPnts);
    }
    /**
     * 在只有3个点时获取临时第四点,与第三个点对称
     * @param linePnt1   参考线起点
     * @param linePnt2   参考线终点
     * @param point      第三点
     * @return 第四个点
     */
    getTempPoint4(linePnt1:Coordinate, linePnt2:Coordinate, point:Coordinate):Coordinate {
        //获取参考线中心点
        var midPnt = mid(linePnt1, linePnt2);
        //中心点与第三点的长度
        var len = distance(midPnt, point);
        //起点,中心点,第三点构成的夹角
        var angle = getAngleOfThreePoints(linePnt1, midPnt, point);
        var symPnt, distance1, distance2, midP;

        //夹角小于90度
        if (angle < Constants.HALF_PI) {
            distance1 = len * Math.sin(angle);
            distance2 = len * Math.cos(angle);
            midP = getThirdPoint(linePnt1, midPnt, Constants.HALF_PI, distance1, false);
            symPnt = getThirdPoint(midPnt, midP, Constants.HALF_PI, distance2, true);
        } else if (angle >= Constants.HALF_PI && angle < Math.PI) { //90到180度
            distance1 = len * Math.sin(Math.PI - angle);
            distance2 = len * Math.cos(Math.PI - angle);
            midP = getThirdPoint(linePnt1, midPnt, Constants.HALF_PI, distance1, false);
            symPnt = getThirdPoint(midPnt, midP, Constants.HALF_PI, distance2, false);
        } else if (angle >= Math.PI && angle < Math.PI * 1.5) { //180到270度
            distance1 = len * Math.sin(angle - Math.PI);
            distance2 = len * Math.cos(angle - Math.PI);
            midP = getThirdPoint(linePnt1, midPnt, Constants.HALF_PI, distance1, true);
            symPnt = getThirdPoint(midPnt, midP, Constants.HALF_PI, distance2, true);
        } else { //270到360度
            distance1 = len * Math.sin(Math.PI * 2 - angle);
            distance2 = len * Math.cos(Math.PI * 2 - angle);
            midP = getThirdPoint(linePnt1, midPnt, Constants.HALF_PI, distance1, true);
            symPnt = getThirdPoint(midPnt, midP, Constants.HALF_PI, distance2, false);
        }
        return symPnt;
    }
}

export default AttackArrow;