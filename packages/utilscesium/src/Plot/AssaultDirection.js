/**
 * @module utilscesium/Plot/AssaultDirection
 */

import PlotTypes from "./PlotTypes"
import FineArrow from "./FineArrow"

/**
 * @classdesc
 * 直箭头
 * @api
 */
 class AssaultDirection extends FineArrow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {Array<Coordinate>} [opt_options.points] 点集
     */
    constructor(opt_options) {
        let options = Object.assign({ points: null }, opt_options);
        super(options);
        this.points = options.points;
        this.type = PlotTypes.ASSAULT_DIRECTION;
        this.tailWidthFactor = 0.2;
        this.neckWidthFactor = 0.25;
        this.headWidthFactor = 0.3;
        this.headAngle = Math.PI / 4;
        this.neckAngle = Math.PI * 0.17741;
    }
}

export default AssaultDirection;
