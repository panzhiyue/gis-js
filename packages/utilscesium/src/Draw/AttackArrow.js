/**
 * @module utilscesium/Draw/AttackArrow
 */

import Polygon from "./Polygon.js"
import PlotHelper from "../Plot/AttackArrow"
import * as Coordinate from "../Coordinate"
import PlotTypes from "../Plot/PlotTypes"

/**
 * @classdesc
 * 攻击箭头绘制 
 * @api
 */
 class AttackArrow extends Polygon {

    /**
    * 进攻箭头
    * @param {Object} opt_options
    */
    constructor(opt_options) {
        let options = Object.assign({}, opt_options);

        super(options);

        this.maxPointCount_ = Infinity;
        this.minPointCount_ = 3;
        this.geometryType = PlotTypes.ATTACK_ARROW;
    }


    /**
     * 重写了父类的方法
     * 用于通过控制点计算攻击箭头的所有绘制点
     * @param {Array<Cesium.Cartesian3>} positions
     */
    calcPositions_(positions) {
        if (positions.length < 3) {
            return;
        }

        let coordinates = Coordinate.fromCartesian3Array(positions);

        return new PlotHelper({ points: coordinates }).generate();
    }
}

export default AttackArrow;