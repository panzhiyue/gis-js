/**
 * @module utils-ol/plot/geom/TailedAttackArrow
 */
import {Coordinate} from "ol/coordinate"
import {isClockWise,mid,distance,getBaseLength,getThirdPoint,getQBSplinePoints,} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import AttackArrow from "./AttackArrow"


/**
 * 燕尾进攻箭头(3个点以上,第一个,第二个点为箭尾左右侧点,根据顺时针还是逆时针决定)
 */
class TailedAttackArrow extends AttackArrow {
    /**
     * 
     */
    tailWidthFactor:number;

    /**
     * 
     */
    swallowTailFactor:number;

    /**
     * 
     */
    swallowTailPnt:Coordinate;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.TAILED_ATTACK_ARROW;
        this.headHeightFactor = 0.18;//箭头外侧高度占长度百分比
        this.headWidthFactor = 0.3;  //箭头外侧宽度占箭头高度百分比
        this.neckHeightFactor = 0.85;//箭头内侧高度占外侧高度的百分比
        this.neckWidthFactor = 0.15; //箭头内侧宽度中箭头高度百分比
        this.tailWidthFactor = 0.1;
        this.headTailFactor = 0.8;   //箭头外侧高度占箭尾宽度的百分比
        this.swallowTailFactor = 1;
        this.swallowTailPnt = null;
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
        if (this.getPointCount() == 2) {
            this.setCoordinates([this.points]);
            return;
        }
        var pnts = this.getPoints();
        //箭尾左侧点
        var tailLeft = pnts[0];
        //箭尾右侧点
        var tailRight = pnts[1];

        //顺时针调换左右点
        if (isClockWise(pnts[0], pnts[1], pnts[2])) {
            tailLeft = pnts[1];
            tailRight = pnts[0];
        }
        //箭尾中心点
        var midTail = mid(tailLeft, tailRight);
        var bonePnts = [midTail].concat(pnts.slice(2));
        //箭头点集
        var headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight);
        //箭头左内侧点
        var neckLeft = headPnts[0];
        //箭头右内侧点
        var neckRight = headPnts[4];
        //箭尾宽度
        var tailWidth = distance(tailLeft, tailRight);
        //折线长度
        var allLen = getBaseLength(bonePnts);
        //箭尾点与左右中心点的距离
        var len = allLen * this.tailWidthFactor * this.swallowTailFactor;
        //箭尾点
        this.swallowTailPnt =getThirdPoint(bonePnts[1], bonePnts[0], 0, len, true);
        //箭尾左右点长度占折线长度的百分比
        var factor = tailWidth / allLen;
        //箭身点集
        var bodyPnts = this.getArrowBodyPoints(bonePnts, neckLeft, neckRight, factor);
        var count = bodyPnts.length;
        var leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
        leftPnts.push(neckLeft);
        var rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
        rightPnts.push(neckRight);

        leftPnts = getQBSplinePoints(leftPnts);
        rightPnts = getQBSplinePoints(rightPnts);

        this.setCoordinates([leftPnts.concat(headPnts, rightPnts.reverse(), [this.swallowTailPnt, leftPnts[0]])]);
    }

}

export default TailedAttackArrow;