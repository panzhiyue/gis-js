/**
 * @module utils-ol/plot/geom/AttackArrow
 */

import {
    isClockWise,
    mid,
    distance,
    getQBSplinePoints,
    getBaseLength,
    getThirdPoint,
    wholeDistance,
    getAngleOfThreePoints,
} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"
import { Coordinate } from "ol/coordinate";


/**
 * 进攻箭头(箭头通过高度与宽度进行计算获得)
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

    /**
     * 箭头外侧高度占箭尾宽度的百分比
     */
    headTailFactor: number;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points: Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.ATTACK_ARROW;
        this.headHeightFactor = 0.18;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.headTailFactor = 0.8;
        this.setPoints(points);

    }
    /**
     * 根据输入点集生成实际点集
     */
    generate() {
        if (this.getPointCount() < 2) {
            return;
        }
        if (this.getPointCount() == 2) {
            this.setCoordinates([this.points]);
            return;
        }
        var pnts = this.getPoints();
        // 计算箭尾
        var tailLeft = pnts[0];
        var tailRight = pnts[1];
        if (isClockWise(pnts[0], pnts[1], pnts[2])) {
            tailLeft = pnts[1];
            tailRight = pnts[0];
        }
        //箭尾中心点,普通箭头的通过中心点计算左右两侧点
        var midTail = mid(tailLeft, tailRight);
        //生成新的点集
        var bonePnts = [midTail].concat(pnts.slice(2));
        // 计算箭头
        var headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight);
        var neckLeft = headPnts[0]; //箭头左内侧
        var neckRight = headPnts[4]; //箭头右内侧
        //箭尾占箭长的比例
        var tailWidthFactor = distance(tailLeft, tailRight) / getBaseLength(bonePnts);
        // 计算箭身
        var bodyPnts = this.getArrowBodyPoints(bonePnts, neckLeft, neckRight, tailWidthFactor);
        // 整合
        var count = bodyPnts.length;
        var leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
        leftPnts.push(neckLeft);
        var rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
        rightPnts.push(neckRight);

        leftPnts = getQBSplinePoints(leftPnts);
        rightPnts = getQBSplinePoints(rightPnts);

        this.setCoordinates([leftPnts.concat(headPnts, rightPnts.reverse())]);
    }
    /**
     * 根据折线计算箭头
     * 1.计算外侧中心线长度,内侧中心线长度(由箭尾宽度与最后2点长度共同决定)
     * 2.计算外侧线的宽度,内侧线的宽度
     * 3.计算外侧点与内侧点(中心线垂直线上点)
     * @param points 点集
     * @param tailLeft 箭头尾部左侧点
     * @param tailRight 箭头尾部右侧点
     * @return  箭头坐标集合
     */
    getArrowHeadPoints(points: Array<Coordinate>, tailLeft: Coordinate, tailRight: Coordinate): Array<Coordinate> {
        //折线长度
        var len = getBaseLength(points);
        //箭头高度
        var headHeight = len * this.headHeightFactor;
        var headPnt = points[points.length - 1];
        //最后2个点的长度
        len = distance(headPnt, points[points.length - 2]);
        //箭尾宽度
        var tailWidth = distance(tailLeft, tailRight);
        //箭头高度不能超过箭尾宽度
        if (headHeight > tailWidth * this.headTailFactor) {
            headHeight = tailWidth * this.headTailFactor;
        }
        //箭头外侧线长度
        var headWidth = headHeight * this.headWidthFactor;
        //箭头内测线长度
        var neckWidth = headHeight * this.neckWidthFactor;

        //箭头高度不能超过最后2个点的长度
        headHeight = headHeight > len ? len : headHeight;
        //箭头内测高度
        var neckHeight = headHeight * this.neckHeightFactor;


        //根据外侧长度计算外侧中心点终点
        var headEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
        //根据内侧长度计算内侧中心点终点
        var neckEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);

        //箭头左外侧点
        var headLeft = getThirdPoint(headPnt, headEndPnt, Constants.HALF_PI, headWidth, false);
        //箭头内外侧点
        var headRight = getThirdPoint(headPnt, headEndPnt, Constants.HALF_PI, headWidth, true);

        //箭头左内侧点
        var neckLeft = getThirdPoint(headPnt, neckEndPnt, Constants.HALF_PI, neckWidth, false);
        //箭头右内侧点
        var neckRight = getThirdPoint(headPnt, neckEndPnt, Constants.HALF_PI, neckWidth, true);
        return [neckLeft, headLeft, headPnt, headRight, neckRight];
    }

    /**
     * 计算箭身
     * @param points 点集
     * @param neckLeft  箭头左内侧点
     * @param neckRight 箭头右内侧点
     * @param tailWidthFactor  箭尾占箭长的比例
     * @return 箭身坐标集合
     */
    getArrowBodyPoints(points:Array<Coordinate>, neckLeft:Coordinate, neckRight:Coordinate, tailWidthFactor:number):Array<Coordinate> {
        //折线长度
        var allLen = wholeDistance(points);
        var len = getBaseLength(points);
        //箭尾宽度
        var tailWidth = len * tailWidthFactor;
        //箭头内侧宽度
        var neckWidth = distance(neckLeft, neckRight);
        //箭身首尾宽度差
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
}

export default AttackArrow;