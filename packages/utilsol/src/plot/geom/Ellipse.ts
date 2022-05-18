/**
 * @module utils-ol/plot/geom/Ellipse
 */

import {Coordinate} from "ol/coordinate"
import {mid} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 椭圆
 */
 class Ellipse extends Polygon {
    /**
     * 构造函数
     * @param  points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.ELLIPSE;
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
        var pnt1 = this.points[0];
        var pnt2 = this.points[1];
        //中点
        var center = mid(pnt1, pnt2);
        //x轴半径
        var majorRadius = Math.abs((pnt1[0] - pnt2[0]) / 2);
        //y轴半径
        var minorRadius = Math.abs((pnt1[1] - pnt2[1]) / 2);
        this.setCoordinates([this.generatePoints(center, majorRadius, minorRadius)]);
    }
    /**
     * 获取椭圆点集
     * @param center 中心点
     * @param majorRadius x轴半径
     * @param minorRadius y轴半径
     */
    generatePoints(center:Coordinate, majorRadius:number, minorRadius:number) {
        var x, y, angle, points = [];
        for (var i = 0; i <= Constants.FITTING_COUNT; i++) {
            angle = Math.PI * 2 * i / Constants.FITTING_COUNT;
            x = center[0] + majorRadius * Math.cos(angle);
            y = center[1] + minorRadius * Math.sin(angle);
            points.push([x, y]);
        }
        return points;
    }
}

export default Ellipse;