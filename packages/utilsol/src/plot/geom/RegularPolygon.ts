/**
 * @module utils-ol/plot/geom/RegularPolygon
 */
import { Coordinate } from "ol/coordinate"
import { distance, getThirdPoint, } from "../PlotUtils"

import PlotTypes from "../PlotTypes"
import Polygon from "./Polygon"


/**
 * 正多边形
 */
class RegularPolygon extends Polygon {
    /**
     * 边数
     */
    sideCount: number;

    /**
     * 构造函数
     * @param points 点集
     * @param options 其他参数
     * @param options.sideCount 边数
     */
    constructor(points: Array<Coordinate>, options: any) {
        super([]);
        this.type = PlotTypes.REGULARPOLYGON;
        this.fixPointCount = 2;
        this.sideCount = 5;  //边数
        if (options && options.sideCount) {
            this.sideCount = options.sideCount;
        }
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

            //内边角度
            var nearAngle = (Math.PI) * (this.sideCount - 2) / this.sideCount;
            //线长度
            var length = distance(pnt1, pnt2);
            let len;
            if (this.sideCount % 2 == 0) {
                len = length / Math.tan(nearAngle / 2);
            } else {
                len = Math.cos(nearAngle / 2) * (length / (1 + Math.sin(nearAngle / 2))) * 2;
            }

            //左侧点
            var leftPnt = getThirdPoint(pnt1, pnt2, Math.PI / 2, len / 2, false);
            //右侧点
            var rightPnt = getThirdPoint(pnt1, pnt2, Math.PI / 2, len / 2, true);

            var coordinates = [leftPnt, rightPnt];
            for (var i = 0; i < this.sideCount - 2; i++) {
                var point = getThirdPoint(coordinates[i], coordinates[i + 1], nearAngle, len, true);
                coordinates.push(point);
            }

            this.setCoordinates([coordinates]);
        }
    }
}

export default RegularPolygon;