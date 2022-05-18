/**
 * @module utils-ol/plot/geom/Diamond
 */
import {Coordinate} from "ol/coordinate"
import {distance,getThirdPoint,} from "../PlotUtils"

import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 菱形
 */
class Diamond extends Polygon {
    /**
     * 边数
     */
    sideCount:number;

    /**
     * 底边长度比例  lengthScale分之一
     */
    lengthScale

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.DIAMOND;
        this.fixPointCount = 2;
        this.sideCount = 8;  //边数
        this.lengthScale = 2;//底边长度比例  lengthScale分之一
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
            var angle1 = Math.PI / this.sideCount;
            // var angle1 = (this.sideCount - 4) * Math.PI / this.sideCount;
            //var angle2 = Math.PI - (Math.PI - angle1) / 2;

            //底边长度
            var len = distance * Math.cos(Math.PI / 10) + (distance * Math.sin(angle1 / 2)) / Math.tan(angle1);

            var coordinates = [pnt1];
            coordinates.push(getThirdPoint(pnt2, pnt1, angle1 / 2, len, false));

            for (var i = 0; i < this.sideCount - 1; i++) {
                coordinates.push(getThirdPoint(coordinates[i], coordinates[i + 1], angle1, len, false));
            }
            ////左侧点
            //var leftPnt = getThirdPoint(pnt1, pnt2, Math.PI / 2, len / 2, false);
            ////右侧点
            //var rightPnt = getThirdPoint(pnt1, pnt2, Math.PI / 2, len / 2, true);

            //var coordinates = [leftPnt, rightPnt];
            //for (var i = 0; i < this.sideCount - 2; i++) {
            //    console.log(coordinates[i], coordinates[i + 1], Math.PI - (Math.PI / 2) * (this.sideCount - 2) / this.sideCount);
            //    var point = getThirdPoint(coordinates[i], coordinates[i + 1], Math.PI / 2 - (Math.PI / 2) * (this.sideCount - 2) / this.sideCount, len, true);
            //    coordinates.push(point);
            //}

            //var xmin = Math.min(pnt1[0], pnt2[0]);
            //var xmax = Math.max(pnt1[0], pnt2[0]);
            //var ymin = Math.min(pnt1[1], pnt2[1]);
            //var ymax = Math.max(pnt1[1], pnt2[1]);
            //var tl = [xmin, ymax];  //左上角坐标
            //var tr = [xmax, ymax];  //右上角坐标
            //var br = [xmax, ymin];  //右下角坐标
            //var bl = [xmin, ymin];  //左下角坐标
            this.setCoordinates([coordinates]);
        }
    }
}

export default Diamond;