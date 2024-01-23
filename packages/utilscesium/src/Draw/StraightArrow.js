/**
 * @module utilscesium/Draw/StraightArrow
 */

import Polyline from "./Polyline.js"
import PlotHelper from "../Plot/StraightArrow"
import * as Coordinate from "../Coordinate"
import PlotTypes from "../Plot/PlotTypes"

/**
 * @classdesc
 * 直线箭头
 * 用两点绘制直箭头。
 * @api
 */
 class StraightArrow extends Polyline {

    /**
    * 构造函数
    * @param {Object} opt_options
    */
    constructor(opt_options) {
        let options = Object.assign({}, opt_options);

        super(options);

        this.maxPointCount_ = 2;
        this.minPointCount_ = 2;
        this.geometryType = PlotTypes.STRAIGHT_ARROW;
    }


    /**
     * 重写了父类的方法
     * 用于通过控制点计算直箭头的所有绘制点
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

export default StraightArrow;