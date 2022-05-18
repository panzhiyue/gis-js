/**
 * @module utils-ol/plot/geom/AssaultDirection
 */

import { Coordinate } from "ol/coordinate";
import PlotTypes from "../PlotTypes"
import FineArrow from "./FineArrow"


/**
 * 直箭头
 */
class AssaultDirection extends FineArrow {

    /**
     * 构造函数
     * @param  points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.ASSAULT_DIRECTION;
        this.tailWidthFactor = 0.2; //尾部宽度占长度的百分比
        this.neckWidthFactor = 0.25; //头部箭头内线长度,这个值越小,箭头两侧越细长
        this.headWidthFactor = 0.3; //头部箭头外线长度(箭头外侧那2条线)
        this.headAngle = Math.PI / 4; //外侧线与直线的夹角
        this.neckAngle = Math.PI * 0.17741; //内侧线与直线的夹角

        this.setPoints(points);

    }
}
export default AssaultDirection;