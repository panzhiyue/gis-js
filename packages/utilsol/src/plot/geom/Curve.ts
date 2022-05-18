/**
 * @module utils-ol/plot/geom/Curve
 */
import {Coordinate} from "ol/coordinate"
import {getCurvePoints} from "../PlotUtils"

import PlotTypes from "../PlotTypes"
import Polyline from "./Polyline"


/**
 * 曲线绘标 
 */
 class Curve extends Polyline {

    /**
     * 
     */
    t:number;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.CURVE;
        this.t = 0.3;
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
            this.setCoordinates(getCurvePoints(this.t, this.points));
        }
    }
}

export default Curve;