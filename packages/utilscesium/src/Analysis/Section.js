/**
 * @module utilscesium/Analysis/Section 
 */

/**
 * @classdesc
 * 区间 
 * 用于对一批entity进行分组
 * @api
 */
class Section {
    /**
     * @alias Section
     * @constructor
     * 
     * @param {Object} opt_options Object with the following properties:
     * @param {number}  [opt_options.minValue=0]  最小值
     * @param {number}  [opt_options.maxValue=0]  最大值
     * @param {module:Cesium/Color}  [opt_options.color=Cesium.Color.WHEAT]  最大值
     * @param {module:Cesium/EntityCollection}  [opt_options.entities]  图形集合
     */
    constructor(opt_options) {
        let options = Object.assign({ minValue: 0, maxValue: 0, material: Cesium.Color.WHEAT, entities: new Cesium.EntityCollection() }, opt_options);
        this.minValue_ = options.minValue;
        this.maxValue_ = options.maxValue;
        this.material_ = options.material;
        this.entities_ = options.entities;


        Object.defineProperties(this, {
            /**
             * 区间最小值(区间包含最小值)
             */
            minValue: {
                set: function (value) {
                    this.minValue_ = value;
                },
                get: function () {
                    return this.minValue_;
                }
            },
            /**
             * 区间最大值(区间不包含最大值)
             */
            maxValue: {
                set: function (value) {
                    this.maxValue_ = value;
                },
                get: function () {
                    return this.maxValue_;
                }
            },
            /**
             * 皮肤
             */
            material: {
                set: function (value) {
                    this.material_ = value;
                },
                get: function () {
                    return this.material_;
                }
            },
            /**
             * 图形集合
             */
            entities: {
                set: function (value) {
                    this.entities_ = value;
                },
                get: function () {
                    return this.entities_;
                }
            }
        });
    }
}
export default Section;
