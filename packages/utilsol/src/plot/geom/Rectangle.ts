/**
 * @module utils-ol/plot/geom/Rectangle
 */
import {Coordinate} from "ol/coordinate"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 矩形
 */
class Rectangle extends Polygon {
    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.RECTANGLE;
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
        } else {
            var pnt1 = this.points[0];
            var pnt2 = this.points[1];
            var xmin = Math.min(pnt1[0], pnt2[0]);
            var xmax = Math.max(pnt1[0], pnt2[0]);
            var ymin = Math.min(pnt1[1], pnt2[1]);
            var ymax = Math.max(pnt1[1], pnt2[1]);
            var tl = [xmin, ymax];  //左上角坐标
            var tr = [xmax, ymax];  //右上角坐标
            var br = [xmax, ymin];  //右下角坐标
            var bl = [xmin, ymin];  //左下角坐标
            this.setCoordinates([[tl, tr, br, bl]]);
        }
    }
}

export default Rectangle;