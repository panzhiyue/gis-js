/**
 * @module utils-ol/plot/geom/SquadCombat
 */
import { Coordinate } from "ol/coordinate"
import { getQBSplinePoints, getBaseLength, getThirdPoint } from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import AttackArrow from "./AttackArrow"


/**
 * 斜箭头
 */
class SquadCombat extends AttackArrow {

    /**
     * 箭头尾宽度占箭长百分比
     */
    tailWidthFactor: number;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points: Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.SQUAD_COMBAT;
        this.headHeightFactor = 0.18; //箭头外侧高度占长度百分比
        this.headWidthFactor = 0.3;   //箭头外侧宽度占箭头高度百分比
        this.neckHeightFactor = 0.85; //箭头内侧高度占外侧高度的百分比
        this.neckWidthFactor = 0.15;  //箭头内侧宽度中箭头高度百分比
        this.tailWidthFactor = 0.1;   //箭头尾宽度占箭长百分比
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
        var pnts = this.getPoints();
        //箭头尾点集
        var tailPnts = this.getTailPoints(pnts);
        //箭头点集
        var headPnts = this.getArrowHeadPoints(pnts, tailPnts[0], tailPnts[1]);
        //箭头左内侧点
        var neckLeft = headPnts[0];
        //箭头右内侧点
        var neckRight = headPnts[4];
        //箭身点集
        var bodyPnts = this.getArrowBodyPoints(pnts, neckLeft, neckRight, this.tailWidthFactor);
        var count = bodyPnts.length;
        //左边箭身坐标
        var leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, count / 2));
        leftPnts.push(neckLeft);
        //右侧箭身坐标
        var rightPnts = [tailPnts[tailPnts.length - 1]].concat(bodyPnts.slice(count / 2, count));
        rightPnts.push(neckRight);

        leftPnts = getQBSplinePoints(leftPnts);
        rightPnts = getQBSplinePoints(rightPnts);
        //console.log(tailPnts.slice(1, tailPnts.length - 1));
        this.setCoordinates([leftPnts.concat(headPnts, rightPnts.reverse(), tailPnts.slice(1, tailPnts.length - 1))]);
    }
    /**
     * 获取箭尾点
     * @param points 点集
     * @return 箭尾2个点组成的点集
     */
    getTailPoints(points: Array<Coordinate>): Array<Coordinate> {
        //折线长度
        var allLen = getBaseLength(points);
        //箭尾宽度
        var tailWidth = allLen * this.tailWidthFactor;
        //箭尾左边点坐标
        var tailLeft = getThirdPoint(points[1], points[0], Constants.HALF_PI, tailWidth, false);
        //箭尾右边点坐标
        var tailRight = getThirdPoint(points[1], points[0], Constants.HALF_PI, tailWidth, true);
        return [tailLeft, tailRight];
    }
}

export default SquadCombat;
