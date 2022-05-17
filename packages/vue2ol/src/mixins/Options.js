export default {
    data() {
        return {}
    },
    props: {
        /**
         * 对应openlayers对象的实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
         */
        options: {
            type: Object,
            default: () => ({})
        }
    }
}