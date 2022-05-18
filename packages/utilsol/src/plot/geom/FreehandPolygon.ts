/**
 * @module utils-ol/plot/geom/FreehandPolygon
 */

import { Coordinate } from "ol/coordinate"
import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 自由面
 */
class FreehandPolygon extends Polygon {

    /**
     * 是否自由绘制
     */
    freehand:boolean;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points: Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.FREEHAND_POLYGON;
        this.freehand = true;
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
        this.setCoordinates([this.points]);
    }


}

export default FreehandPolygon;