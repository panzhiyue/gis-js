# utilsol/plot

## 绘制
::: demo
``` vue
<template>
  <div id="container">
    <div id="menu">
      <div>
        点标
        <button type="button" @click="activate('point')">点</button>
      </div>
      <div>
        线标
        <button type="button" @click="activate('arc')">弧线</button>
        <button type="button" @click="activate('curve')">曲线</button>
        <button type="button" @click="activate('polyline')">折线</button>
        <button type="button" @click="activate('freehandline')">自由线</button>
      </div>
      <div>
        面标
        <button type="button" @click="activate('circle')">圆</button>
        <button type="button" @click="activate('ellipse')">椭圆</button>
        <button type="button" @click="activate('lune')">弓形</button>
        <button type="button" @click="activate('sector')">扇形</button>
        <button type="button" @click="activate('closedcurve')">曲线面</button>
        <button type="button" @click="activate('polygon')">多边形</button>
        <button type="button" @click="activate('rectangle')">矩形</button>
        <button type="button" @click="activate('freehandpolygon')">
          自由面
        </button>
        <button type="button" @click="activate('gatheringplace')">
          聚集地
        </button>
      </div>
      <div>
        箭头
        <button type="button" @click="activate('doublearrow')">钳击</button>
        <button type="button" @click="activate('straightarrow')">直箭头</button>
        <button type="button" @click="activate('finearrow')">细直箭头</button>
        <button type="button" @click="activate('assaultdirection')">
          直箭头
        </button>
        <button type="button" @click="activate('attackarrow')">进攻箭头</button>
        <button type="button" @click="activate('tailedattackarrow')">
          燕尾进攻箭头
        </button>
        <button type="button" @click="activate('squadcombat')">斜箭头</button>
        <button type="button" @click="activate('tailedsquadcombat')">
          燕尾斜箭头
        </button>
      </div>

      <div>
        正多边形
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 3 })"
        >
          正三角形
        </button>
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 4 })"
        >
          正四边形
        </button>
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 5 })"
        >
          正五边形
        </button>
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 6 })"
        >
          正六边形
        </button>
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 7 })"
        >
          正七边形
        </button>
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 8 })"
        >
          正八边形
        </button>
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 9 })"
        >
          正九边形
        </button>
        <button
          type="button"
          @click="activate('regularpolygon', { sideCount: 10 })"
        >
          正十边形
        </button>
      </div>
      <div>
        多角星
        <button type="button" @click="activate('star', { sideCount: 3 })">
          正三角形
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import Stamen from "ol/source/Stamen";
import * as style from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol"

export default {
  data() {
    return {
      map: null,
      plotDraw: null,
      plotEdit: null,
      drawLayer: null,
    };
  },
  mounted() {
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");
    this.map = new Map({
      target: "container",
      layers: [
        new Tile({
          //source: new ol.source.MapQuest({layer: 'sat'})
          source: new Stamen({
            layer: "watercolor",
          }),
        }),
      ],
      view: new View({
        center: center,
        zoom: 4,
      }),
    });

    // 设置标绘符号显示的默认样式
    let stroke = new style.Stroke({
      color: "#FF0000",
      width: 2,
    });
    let fill = new style.Fill({ color: "rgba(0,255,0,0.4)" });
    let image = new style.Circle({ fill: fill, stroke: stroke, radius: 8 });
    let drawStyle = new style.Style({
      image: image,
      fill: fill,
      stroke: stroke,
    });

    this.drawLayer = new VectorLayer({
      source: new VectorSource(),
    });
    this.drawLayer.setStyle(drawStyle);
    this.drawLayer.setMap(this.map);

    // 初始化标绘绘制工具，添加绘制结束事件响应
    this.plotDraw = new utilsol.plot.tool.PlotDraw({map:this.map});
    this.plotDraw.on("draw_end", this.onDrawEnd, false, this);
    // 初始化标绘编辑工具
    this.plotEdit = new utilsol.plot.tool.PlotEdit(this.map);

    var interactions = this.map.getInteractions();
    var length = interactions.getLength();
  },
  methods: {
    onDrawEnd(event) {
      var feature = event.target.feature;
      this.drawLayer.getSource().addFeature(feature);
      // 开始编辑
      this.plotEdit.activate(feature);
    },
    activate(plotType, options) {
      this.plotEdit.deactivate();
      this.plotDraw.activate(plotType, options);
    },
  },
};
</script>
<style>
#container {
  width: 100%;
  height: 500px;
  position: relative;
}

#menu {
  position: absolute;
  top: 80px;
  left: 10px;
  background: rgba(100, 100, 100, 0.85);
  padding: 10px;
  color: #cccccc;
  z-index: 1000;
}

button {
  font-family: "微软雅黑", sans-serif;
  opacity: 1;
  min-width: 55px;
  padding: 4px 6px;
}

#delete-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 8px;
}

#delete-wrapper #btn-delete {
  padding: 8px 16px;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  background: rgba(255, 8, 53, 0.85);
}

.p-helper-control-point-div {
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  background-color: #ff0;
  opacity: 0.8;
  cursor: move;
}
</style>
```
:::