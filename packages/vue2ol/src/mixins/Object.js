export default {
  data() {
    return {
      // mapObject: null, //对应的openlayers对象
      // ready: false, //是否加载完毕
      // parent: null, //openlayers父对象
      // parentContainer: null //父组件
    }
  },
  props: {
    /**
     * 属性
     */
    properties: {
      type: Object,
    },
    // /**
    //  * 对应openlayers对象的实例化参数选项,其他没有在props中列举的参数，如果有传入props并且与默认值不同，则以props中的值为准，否则使用options中的值
    //  */
    // options: {
    //   type: Object,
    //   default: () => ({})
    // }
  }

}