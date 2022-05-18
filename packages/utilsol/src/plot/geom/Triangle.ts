/**
 * @module utils-ol/plot/geom/Triangle
 */
import {Coordinate} from "ol/coordinate"
import {
    distance,
    getThirdPoint
} from "../PlotUtils"

import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 三角形
 */
class Triangle extends Polygon {
    /**
     * 
     */
    sideCount:number;

    /**
     * 底边长度比例  lengthScale分之一
     */
    lengthScale:number;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.TRIANGLE;
        this.fixPointCount = 2;
        this.sideCount = 3;
        this.lengthScale = 2; //底边长度比例  lengthScale分之一
        this.setPoints(points);

    }
    /**
     * 根据输入点集生成实际点集
     */
    generate() {
        var count = this.getPointCount();
        if (count < 2) {
            return;
        } else {
            var pnt1 = this.points[0];
            var pnt2 = this.points[1];
            //线长度
            var distance = distance(pnt1, pnt2);
            //底边长度
            var len = distance / this.lengthScale;

            //左侧点
            var leftPnt = getThirdPoint(pnt1, pnt2, Math.PI / 2, len / 2, false);
            //右侧点
            var rightPnt = getThirdPoint(pnt1, pnt2, Math.PI / 2, len / 2, true);

            this.setCoordinates([
                [leftPnt, rightPnt, pnt1]
            ]);
        }
    }
}
export default Triangle;