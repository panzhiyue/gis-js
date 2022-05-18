/**
 * @module utils-ol/plot/geom/FineArrow
 */
import {Coordinate} from "ol/coordinate"
import {getBaseLength,getThirdPoint} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 细直箭头(箭头通过长度与夹角进行计算获得) 
 */
class FineArrow extends Polygon {
    /**
     * 尾部宽度占长度的百分比
     */
    tailWidthFactor:number;

    /**
     * 头部箭头内线长度,这个值越小,箭头两侧越细长
     */
    neckWidthFactor:number;

    /**
     * 头部箭头外线长度(箭头外侧那2条线)
     */
    headWidthFactor:number;

    /**
     * 外侧线与直线的夹角
     */
     headAngle:number;

     /**
      * 内侧线与直线的夹角
      */
     neckAngle:number;

    //  /**
    //   * 最大点数
    //   */
    //  fixPointCount:number;
    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.FINE_ARROW;
        this.tailWidthFactor = 0.15;    //尾部宽度占长度的百分比
        this.neckWidthFactor = 0.2;     //头部箭头内线长度,这个值越小,箭头两侧越细长
        this.headWidthFactor = 0.25;    //头部箭头外线长度(箭头外侧那2条线)
        this.headAngle = Math.PI / 8.5; //外侧线与直线的夹角
        this.neckAngle = Math.PI / 13;  //内侧线与直线的夹角
        this.fixPointCount = 2;
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
        var pnt1 = pnts[0];
        var pnt2 = pnts[1];
        //长度
        var len = getBaseLength(pnts);
        var tailWidth = len * this.tailWidthFactor;
        var neckWidth = len * this.neckWidthFactor;
        var headWidth = len * this.headWidthFactor;

        //箭头尾部左侧点
        var tailLeft = getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, true);
        //箭头尾部右侧点
        var tailRight = getThirdPoint(pnt2, pnt1, Constants.HALF_PI, tailWidth, false);
        //箭头左外侧点
        var headLeft = getThirdPoint(pnt1, pnt2, this.headAngle, headWidth, false);
        //箭头右外侧点
        var headRight = getThirdPoint(pnt1, pnt2, this.headAngle, headWidth, true);
        //箭头左内侧点
        var neckLeft = getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, false);
        //箭头右内侧点
        var neckRight = getThirdPoint(pnt1, pnt2, this.neckAngle, neckWidth, true);
        var pList = [tailLeft, neckLeft, headLeft, pnt2, headRight, neckRight, tailRight];
        this.setCoordinates([pList]);
    }
}

export default FineArrow;