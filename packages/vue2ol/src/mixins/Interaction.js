import ObjectMixin from './Object'
import OptionsMixin from './Options'
import {
    findParentMap
} from '../utils/index'


export default {
    data() {
        return {
            // mapObject: null, //对应的openlayers对象
            ready: false, //是否加载完毕
            // parent: null, //openlayers父对象
        }
    },
    provide() {
        return {
            interaction: this,
        };
    },
    mixins: [ObjectMixin, OptionsMixin],
    props: {
        /**
     * 父地图
     */
        parentMap: {
            type: Object,
        },
        /**
         * 是否激活
         */
        active: {
            type: Boolean,
        },
    },

    destroyed() {
        this.mapObject.setActive(false);
        this.parent.removeInteraction(this.mapObject);
    },
    unmounted() {
        this.mapObject.setActive(false);
        this.parent.removeInteraction(this.mapObject);
    },
}