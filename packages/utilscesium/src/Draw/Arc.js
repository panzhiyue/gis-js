/**
 * @module utilscesium/Draw/Arc
 */

import Polyline from "./Polyline.js"
import PlotHelper from "../Plot/Arc"
import * as Coordinate from "../Coordinate"
import PlotTypes from "../Plot/PlotTypes"

/**
 * @classdesc
 * 圆弧。
 * 用三点绘制一段经过此三点的圆弧。
 * @api
 */
class Arc extends Polyline {

    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Cesium.PolylineGraphics} [opt_options.polylineGraphics] 线样式
     */
    constructor(opt_options) {
        let options = Object.assign({}, opt_options);
        super(options);

        this.maxPointCount_ = 3;
        this.minPointCount_ = 3;

        this.geometryType = PlotTypes.ARC;

    }

    /**
      * 重写了父类的方法
      * 用于通过控制点计算箭头的所有绘制点
      * @param {Array<Cesium.Cartesian3>} positions
      */
    calcPositions_(positions) {
        if (positions.length < 2) {
            return;
        }
        if (positions.length == 2) {
            return positions;
        }

        let coordinates = Coordinate.fromCartesian3Array(positions);
        return new PlotHelper({ points: coordinates }).generate();
    }

}

export default Arc;