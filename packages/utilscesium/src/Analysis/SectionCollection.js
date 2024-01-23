/**
 * @module utilscesium/Analysis/SectionCollection
 */

/**
 * @classdesc
 * 区间集合
 * @api
 */
class SectionCollection {
    constructor() {
        this.values_ = [];
        Object.defineProperties(this, {
            values: {
                get: function () {
                    return this.values_;
                }
            }
        });
    }

    /**
     * 添加
     * @param {module:utilscesium/Analysis/Section} section
     */
    add(section) {
        this.values_.push(section);
    }

    /**
     * 根据索引获取
     * @param {number} index  索引
     */
    get(index) {
        return this.values_[index];
    }
}


export default SectionCollection;
