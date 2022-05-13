import LayerMixin from './Layer'
export default {
  mixins: [LayerMixin],
  props: {
    /**
     * 特征的样式。这可以是单个样式对象、样式数组或采用特征和分辨率并返回样式数组的函数。如果设置为null，则图层没有样式（null样式），因此只有具有自己样式的要素才会在图层中呈现。不带参数调用 setStyle()以重置为默认样式。
     * 因为style是保留属性，因此改名为styleObj
     * @typeName {import('ol/style/Style').StyleLike| null | undefined}
     */
    styleObj: {
      type: [Object, Function],
      custom:true
    },
  },
  mounted() {
    this.baseVectorLayerOptions = {
      ...(this.layerOptions || {}),
      styleObj: this.styleObj,
    }
  },
  methods: {
    setStyleObj(newVal, oldVal) {
      this.mapObject.setStyle(newVal)
    },
  }
}
