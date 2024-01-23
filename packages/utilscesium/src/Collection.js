/**
 * 参考ol.Collection
 * @module utilscesium/Collection
 */


/**
 * @enum {string}
 * @private
 */
const Property = {
    LENGTH: 'length'
};

/**
 * @classdesc
 * 集合
 * @api
 */
class Collection {
    /**
     * 构造函数
     * @param {Array<T>=} opt_array Array.
     * @param {Options=} opt_options Collection options.
     */
    constructor(opt_array, opt_options) {

        //super();

        const options = opt_options || {};
        this.prototype = {};
        /**
         * @private
         * @type {boolean}
         */
        this.unique_ = !!options.unique;

        /**
         * @private
         * @type {!Array<T>}
         */
        this.array_ = opt_array ? opt_array : [];

        if (this.unique_) {
            for (let i = 0, ii = this.array_.length; i < ii; ++i) {
                this.assertUnique_(this.array_[i], i);
            }
        }

        this.updateLength_();

        this.addEvent_ = new Cesium.Event();
        this.removeEvent_ = new Cesium.Event();
    }

    /**
     * 删除集合所元素
     * @api
     */
    clear() {
        while (this.getLength() > 0) {
            this.pop();
        }
    }

    /**
  * Add elements to the collection.  This pushes each item in the provided array
  * to the end of the collection.
  * @param {!Array<T>} arr Array.
  * @return {Collection<T>} This collection.
  * @api
  */
    extend(arr) {
        for (let i = 0, ii = arr.length; i < ii; ++i) {
            this.push(arr[i]);
        }
        return this;
    }

    /**
 * Iterate over each element, calling the provided callback.
 * @param {function(T, number, Array<T>): *} f The function to call
 *     for every element. This function takes 3 arguments (the element, the
 *     index and the array). The return value is ignored.
 * @api
 */
    forEach(f) {
        const array = this.array_;
        for (let i = 0, ii = array.length; i < ii; ++i) {
            f(array[i], i, array);
        }
    }

    /**
 * Get a reference to the underlying Array object. Warning: if the array
 * is mutated, no events will be dispatched by the collection, and the
 * collection's "length" property won't be in sync with the actual length
 * of the array.
 * @return {!Array<T>} Array.
 * @api
 */
    getArray() {
        return this.array_;
    }

    /**
 * Get the element at the provided index.
 * @param {number} index Index.
 * @return {T} Element.
 * @api
 */
    item(index) {
        return this.array_[index];
    }

    /**
 * Get the length of this collection.
 * @return {number} The length of the array.
 * @observable
 * @api
 */
    getLength() {
        return this.get(Property.LENGTH);
    }

    /**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */
    insertAt(index, elem) {
        if (this.unique_) {
            this.assertUnique_(elem);
        }
        this.array_.splice(index, 0, elem);
        this.updateLength_();
        this.addEvent_.raiseEvent({ type: "add", element: elem, index: index });
        //this.dispatchEvent(
        //    new CollectionEvent(CollectionEventType.ADD, elem, index));
    }

    /**
  * Remove the last element of the collection and return it.
  * Return `undefined` if the collection is empty.
  * @return {T|undefined} Element.
  * @api
  */
    pop() {
        return this.removeAt(this.getLength() - 1);
    }

    /**
     * Insert the provided element at the end of the collection.
     * @param {T} elem Element.
     * @return {number} New length of the collection.
     * @api
     */
    push(elem) {
        if (this.unique_) {
            this.assertUnique_(elem);
        }
        const n = this.getLength();
        this.insertAt(n, elem);
        return this.getLength();
    }

    /**
     * Remove the first occurrence of an element from the collection.
     * @param {T} elem Element.
     * @return {T|undefined} The removed element or undefined if none found.
     * @api
     */
    remove(elem) {
        const arr = this.array_;
        for (let i = 0, ii = arr.length; i < ii; ++i) {
            console.log(arr[i] === elem);
            if (arr[i] === elem) {
                return this.removeAt(i);
            }
        }
        return undefined;
    }

    /**
     * Remove the element at the provided index and return it.
     * Return `undefined` if the collection does not contain this index.
     * @param {number} index Index.
     * @return {T|undefined} Value.
     * @api
     */
    removeAt(index) {
        const prev = this.array_[index];
        this.array_.splice(index, 1);
        this.updateLength_();
        //this.dispatchEvent(new CollectionEvent(CollectionEventType.REMOVE, prev, index));
        this.removeEvent_.raiseEvent({ type: "remove", element: prev, index: index });
        return prev;
    }

    /**
     * Set the element at the provided index.
     * @param {number} index Index.
     * @param {T} elem Element.
     * @api
     */
    setAt(index, elem) {
        const n = this.getLength();
        if (index < n) {
            if (this.unique_) {
                this.assertUnique_(elem, index);
            }
            const prev = this.array_[index];
            this.array_[index] = elem;
            this.removeEvent_.raiseEvent({ type: "remove", element: prev, index: index });
            this.addEvent_.raiseEvent({ type: "add", element: elem, index: index });
            //this.dispatchEvent(
            //    new CollectionEvent(CollectionEventType.REMOVE, prev, index));
            //this.dispatchEvent(
            //    new CollectionEvent(CollectionEventType.ADD, elem, index));

        } else {
            for (let j = n; j < index; ++j) {
                this.insertAt(j, undefined);
            }
            this.insertAt(index, elem);
        }
    }

    /**
     * @private
     */
    updateLength_() {
        this.set(Property.LENGTH, this.array_.length);
    }



    get(name) {
        return this.prototype[name];
    }

    set(name, value) {
        this.prototype[name] = value;
        if (Cesium.defined(this["changed" + name])) {
            this["changed" + name].raiseEvent({ type: "changed" + name });
        }
    }
}

export default Collection;
