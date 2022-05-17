import SourceMixin from "./Source";
export default {
    mixins: [SourceMixin],
    props: {
        /**
         * 新加载器。下一个渲染周期将使用新的加载器
         * @typeName {import('ol/featureloader').FeatureLoader}
         */
        loader: {
            type: Object,
        },

        /**
         * 新的 url。下一个渲染周期将使用新的 url。
         */
        url: {
            type: String,
        },
    },
    mounted() {
        this.vectorSourceOptions = {
            ...(this.sourceOptions || {}),
            loader: this.loader,
            url: this.url,
        }
    }
}