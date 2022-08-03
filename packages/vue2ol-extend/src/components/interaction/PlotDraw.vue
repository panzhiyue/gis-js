<template>
  <div></div>
</template>
<script>
import {
  findRealParent,
  findParentMap,
  optionsMerger,
  propsBinder,
  bindListeners,
  getListeners,
} from "@gis-js/vue2ol";
import * as utilsol from "@gis-js/utilsol";

export default {
  name: "Vue2olInteractionPlotdraw",
  provide() {
    return {
      interaction: this,
    };
  },
  data() {
    return {
      // mapObject: null, //utilsol/plot/tool/PlotDraw对象
      ready: false, //是否加载完毕
      // parent: null, //openlayers父对象
      map: null,
    };
  },
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },

    /**
     * @typeName {import('ol/source/Vector').default}
     */
    parentSource: {
      type: Object,
    },

    /**
     * 激活绘标类型
     * @values
     */
    type: {
      type: String,
      custom: true,
    },
    /**
     * 绘标参数
     */
    params: {
      type: Object,
      custom: true,
    },
    /**
     * 样式
     */
    styleObj: {
      type: [Object, Function],
      custom: true,
    },
  },
  watch: {},
  mounted() {
    if (this.parentSource) {
      this.parent = this.parentSource;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }

    if (this.parentMap) {
      this.map = this.parentMap;
    } else {
      this.map = findParentMap(this.$parent).mapObject;
    }

    let options = optionsMerger(
      {
        map: this.map,
        styleObj: this.styleObj,
      },
      this
    );
    if (options.styleObj) {
      options.style = options.styleObj;
    }

    // 初始化标绘绘制工具，添加绘制结束事件响应
    this.mapObject = new utilsol.plot.tool.PlotDraw(options);
    this.mapObject.on("draw_end", this.onDrawEnd);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    if (this.type) {
      this.mapObject.activate(this.type, this.params);
    }
  },
  destroyed() {
    this.mapObject.deactivate();
    this.mapObject.un("draw_end", this.onDrawEnd);
  },
  unmounted() {
    this.mapObject.deactivate();
    this.mapObject.un("draw_end", this.onDrawEnd);
  },
  methods: {
    onDrawEnd(event) {
      var feature = event.target.feature;
      this.parent.addFeature(feature);
      this.mapObject.activate(this.type, this.params);
      /**
       * 绘制完成事件
       */
      this.$emit("drawend", this.mapObject);
    },
    setType(newVal) {
      if (newVal) {
        this.mapObject.activate(newVal, this.params);
      } else {
        this.mapObject.deactivate();
      }
    },
    setParams(newVal) {
      this.mapObject.activate(this.type, newVal);
    },
    setStyleObj(newVal) {
      this.mapObject.setStyle(newVal);
    },
  },
};
</script>