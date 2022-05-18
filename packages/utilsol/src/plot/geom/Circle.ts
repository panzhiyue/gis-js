/**
 * @module utils-ol/plot/geom/Circle
 */

import {Coordinate} from "ol/coordinate"
import {distance} from "../PlotUtils"

import Constants from "../Constants"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 圆形
 */
 class Circle extends Polygon {
    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.CIRCLE;
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
        var center = this.points[0];
        var radius = distance(center, this.points[1]);
        this.setCoordinates([this.generatePoints(center, radius)]);
    }
    /**
     * 生成圆形点集
     * @param center 中心点
     * @param radius  半径
     * @return 圆形点集
     */
    generatePoints(center:Coordinate, radius:number):Array<Coordinate> {
        var x, y, angle, points = [];
        for (var i = 0; i <= Constants.FITTING_COUNT; i++) {
            angle = Math.PI * 2 * i / Constants.FITTING_COUNT;
            x = center[0] + radius * Math.cos(angle);
            y = center[1] + radius * Math.sin(angle);
            points.push([x, y]);
        }
        return points;
    }

}

export default Circle;