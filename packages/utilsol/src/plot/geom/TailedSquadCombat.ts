/**
 * @module utils-ol/plot/geom/TailedSquadCombat
 */
import {Coordinate} from "ol/coordinate"
import {
    getBaseLength,
    getThirdPoint,
} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import SquadCombat from "./SquadCombat"


/**
 * 燕尾斜箭头
 */
class TailedSquadCombat extends SquadCombat {

    /**
     * 箭尾内凹长度占箭尾巴宽度百分比
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
        this.type = PlotTypes.TAILED_SQUAD_COMBAT;
        this.headHeightFactor = 0.18; //箭头外侧高度占长度百分比
        this.headWidthFactor = 0.3; //箭头外侧宽度占箭头高度百分比
        this.neckHeightFactor = 0.85; //箭头内侧高度占外侧高度的百分比
        this.neckWidthFactor = 0.15; //箭头内侧宽度中箭头高度百分比
        this.tailWidthFactor = 0.1; //箭尾宽度占箭长百分比
        this.swallowTailFactor = 1; //箭尾内凹长度占箭尾巴宽度百分比
        this.swallowTailPnt = null;
        this.setPoints(points);

    }


    /**
     * 获取箭尾点
     * @param points 点集
     * @return 箭尾3点集
     */
    getTailPoints(points:Array<Coordinate>):Array<Coordinate> {
        //折线长度
        var allLen = getBaseLength(points);
        //箭尾宽度
        var tailWidth = allLen * this.tailWidthFactor;
        //箭尾左侧点
        var tailLeft = getThirdPoint(points[1], points[0], Constants.HALF_PI, tailWidth, false);
        //箭尾右侧点
        var tailRight = getThirdPoint(points[1], points[0], Constants.HALF_PI, tailWidth, true);
        //内凹长度
        var len = tailWidth * this.swallowTailFactor;
        //内凹点
        var swallowTailPnt = getThirdPoint(points[1], points[0], 0, len, true);
        return [tailLeft, swallowTailPnt, tailRight];
    }
}

export default TailedSquadCombat;