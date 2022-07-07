import BaseVectorLayerMixin from './BaseVectorLayer'

export default {
    mixins: [BaseVectorLayerMixin],
    props: {
        /**
         * 图层的背景颜色。如果未指定，则不会呈现背景。
         * @typeName {import('ol/layer/Base').BackgroundColor|false|undefined}
         */
        background:{},
        /**
         * 预加载。将低分辨率图块加载到preload关卡。0 意味着没有预加载。
         */
        preload: {
            type: Number
        },
        /**
         * 错误时使用临时瓷砖。
         */
        useInterimTilesOnError: {
            type: Boolean
        }

    },
    mounted() {
        this.vectorTileLayerOptions = {
            background: this.background,
            preload: this.preload,
            useInterimTilesOnError: this.useInterimTilesOnError,
            ...(this.baseVectorLayerOptions || {})
        }
    }
}