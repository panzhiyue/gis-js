/**
 * @module utilscesium/Draw/CloseCurve
 */

import Polygon from "./Polygon.js"
import PlotHelper from "../Plot/CloseCurve"
import * as Coordinate from "../Coordinate"
import PlotTypes from "../Plot/PlotTypes"

/**
 * @classdesc
 * 曲线面绘制
 * @api
 */
 class CloseCurve extends Polygon {

    /**
    * 构造函数
    * @param {Object} opt_options
    */
    constructor(opt_options) {
        let options = Object.assign({}, opt_options);

        super(options);

        this.maxPointCount_ = Infinity;
        this.minPointCount_ = 2;
        this.geometryType = PlotTypes.CLOSED_CURVE;
    }


    /**
    * 重写了父类的方法
    * 用于通过控制点计算双箭头的所有绘制点
    * @param {Array<Cesium.Cartesian3>} positions
    */
    calcPositions_(positions) {
        if (positions.length < 2) {
            return;
        }
        let coordinates = Coordinate.fromCartesian3Array(positions);
        return new PlotHelper({ points: coordinates }).generate();
    }
}

export default CloseCurve;