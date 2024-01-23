/**
 * @module utilscesium/Draw/SquadCombat
 */

import Polygon from "./Polygon.js"
import PlotHelper from "../Plot/SquadCombat"
import * as Coordinate from "../Coordinate"
import PlotTypes from "../Plot/PlotTypes"

/**
 * @classdesc
 * 斜箭头
 * @api
 */
 class SquadCombat extends Polygon {

    /**
    * 构造函数
    * @param {Object} opt_options
    */
    constructor(opt_options) {
        let options = Object.assign({}, opt_options);

        super(options);

        this.maxPointCount_ = Infinity;
        this.minPointCount_ = 2;
        this.geometryType = PlotTypes.SQUAD_COMBAT;
    }


    /**
     * 重写了父类的方法
     * 用于通过控制点计算攻击箭头的所有绘制点
     * @param {Array<Cesium.Cartesian3>} positions
     */
    calcPositions_(positions) {
        if (positions.length < 2) {
            return;
        }
        if (positions[positions.length - 2].x == positions[positions.length - 1].x && positions[positions.length - 2].y == positions[positions.length - 1].y) {
            positions.pop();
        }

        let coordinates = Coordinate.fromCartesian3Array(positions);
        return new PlotHelper({ points: coordinates }).generate();
    }

}

export default SquadCombat;
