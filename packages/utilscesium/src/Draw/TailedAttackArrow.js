/**
 * @module utilscesium/Draw/TailedAttackArrow
 */

import Polygon from "./Polygon.js"
import PlotHelper from "../Plot/TailedAttackArrow"
import * as Coordinate from "../Coordinate"
import PlotTypes from "../Plot/PlotTypes"

/**
 * @classdesc
 * 燕尾进攻箭头
 * @api
 */
 class TailedAttackArrow extends Polygon {

    /**
    * 构造函数
    * @param {Object} opt_options
    */
    constructor(opt_options) {
        let options = Object.assign({}, opt_options);

        super(options);

        this.maxPointCount_ = Infinity;
        this.minPointCount_ = 3;
        this.geometryType = PlotTypes.TAILED_ATTACK_ARROW;
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

export default TailedAttackArrow;