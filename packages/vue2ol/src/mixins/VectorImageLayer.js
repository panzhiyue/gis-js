import BaseVectorLayerMixin from './BaseVectorLayer'

export default {
    mixins: [BaseVectorLayerMixin],
    props: {},
    mounted() {
        this.vectorImageLayerOptions = {
            ...(this.baseVectorLayerOptions || {}) 
        }
    }
}