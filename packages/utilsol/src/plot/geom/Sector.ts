/**
 * @module utils-ol/plot/geom/Sector
 */
import {Coordinate} from "ol/coordinate"
import {
    distance,
    getAzimuth,
    getArcPoints
} from "../PlotUtils"

import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 扇形面(共三个点,第一个点确定圆心,第二个点确定半径,第三个点确定弧度)
 */
class Sector extends Polygon {
    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points:Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.SECTOR;
        this.fixPointCount = 3;
        this.setPoints(points);

    }
    /**
     * 根据输入点集生成实际点集
     */
    generate() {
        if (this.getPointCount() < 2)
            return;
        if (this.getPointCount() == 2)
            this.setCoordinates([this.points]);
        else {
            var pnts = this.getPoints();
            //中心点
            var center = pnts[0];
            var pnt2 = pnts[1];
            var pnt3 = pnts[2];
            //半径
            var radius = distance(pnt2, center);
            //起始角度
            var startAngle = getAzimuth(pnt2, center);
            //结束角度
            var endAngle = getAzimuth(pnt3, center);
            var pList = getArcPoints(center, radius, startAngle, endAngle);
            pList.push(center, pList[0]);
            this.setCoordinates([pList]);
        }
    }


}

export default Sector;