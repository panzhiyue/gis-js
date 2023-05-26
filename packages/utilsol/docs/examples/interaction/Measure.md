# Measure

## 基础用法

::: demo

```vue
<template>
  <div
    id="container1"
    style="width: 100%; height: 500px; position: relative"
    ref="map"
  >
    <select v-model="type">
      <option value=""></option>
      <option value="LineString">LineString</option>
      <option value="Polygon">Polygon</option>
    </select>
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000">
      <!-- <button @click="start">开始</button>
      <button @click="stop">停止</button>
      <button @click="end">结束</button> -->
    </div>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Stamen from "ol/source/Stamen";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol";
import Tile from "ol/layer/Tile";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";

export default {
  data() {
    return {
      map: null,
      animation: null,
      type: "Polygon",
      measure: null,
    };
  },
  watch: {
    type() {
      this.measure.setType(this.type);
    },
  },
  mounted() {
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

    var line = [
      [4164462.1505763642, 985738.7965919945],
      [4164462.1505763642, 2085738.7965919945],
    ];
    this.map = new Map({
      target: this.$refs["map"],
      layers: [
        new Tile({
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

    let layer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(layer);

    let feature = new Feature({
      geometry: new LineString(line),
    });
    layer.getSource().addFeature(feature);

    this.measure = new utilsol.interaction.Measure({
      layer: this.layer,
    });
    this.measure.setType(this.type);
    this.map.addInteraction(this.measure);
  },
  methods: {},
};
</script>
<style></style>
```

:::

## 右键结束

::: demo

```vue
<template>
  <div
    id="container1"
    style="width: 100%; height: 500px; position: relative"
    ref="map"
  >
    <select v-model="type">
      <option value=""></option>
      <option value="LineString">LineString</option>
      <option value="Polygon">Polygon</option>
    </select>
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000">
      <!-- <button @click="start">开始</button>
      <button @click="stop">停止</button>
      <button @click="end">结束</button> -->
    </div>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Stamen from "ol/source/Stamen";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol";
import Tile from "ol/layer/Tile";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";

export default {
  data() {
    return {
      map: null,
      animation: null,
      type: "Polygon",
      measure: null,
    };
  },
  watch: {
    type() {
      this.measure.setType(this.type);
    },
  },
  mounted() {
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

    var line = [
      [4164462.1505763642, 985738.7965919945],
      [4164462.1505763642, 2085738.7965919945],
    ];
    this.map = new Map({
      target: this.$refs["map"],
      layers: [
        new Tile({
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

    let layer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(layer);

    let feature = new Feature({
      geometry: new LineString(line),
    });
    layer.getSource().addFeature(feature);

    this.measure = new utilsol.interaction.Measure({
      layer: this.layer,
      stopType: "right",
    });
    this.measure.setType(this.type);
    this.map.addInteraction(this.measure);
  },
  methods: {},
};
</script>
<style></style>
```

:::

## 修改样式

::: demo

```vue
<template>
  <div style="width: 100%; height: 500px; position: relative" ref="map">
    <select v-model="type">
      <option value=""></option>
      <option value="LineString">LineString</option>
      <option value="Polygon">Polygon</option>
    </select>
    <div style="position: absolute; top: 0px; left: 0px; z-index: 1000"></div>
  </div>
</template>
<script>
import { transform } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Stamen from "ol/source/Stamen";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import * as utilsol from "@gis-js/utilsol";
import Tile from "ol/layer/Tile";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import * as style from "ol/style";
import * as geom from "ol/geom";

export default {
  data() {
    return {
      map: null,
      animation: null,
      type: "Polygon",
      measure: null,
    };
  },
  watch: {
    type() {
      this.measure.setType(this.type);
    },
  },
  mounted() {
    var center = transform([37.41, 8.82], "EPSG:4326", "EPSG:3857");

    var line = [
      [4164462.1505763642, 985738.7965919945],
      [4164462.1505763642, 2085738.7965919945],
    ];
    this.map = new Map({
      target: this.$refs["map"],
      layers: [
        new Tile({
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

    let layer = new VectorLayer({
      source: new VectorSource(),
    });
    this.map.addLayer(layer);

    let feature = new Feature({
      geometry: new LineString(line),
    });
    layer.getSource().addFeature(feature);

    this.measure = new utilsol.interaction.Measure({
      layer: this.layer,
      classPrefix: "test",
      drawStyle: (feature) => {
        let styles = [];
        let geometry = feature.getGeometry();
        styles.push(
          new style.Style({
            fill: new style.Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new style.Stroke({
              color: "#0000ff",
              width: 3,
            }),
          })
        );
        if (
          this.type == utilsol.interaction.MeasureType.LINESTRING &&
          geometry.getType() == "LineString"
        ) {
          const coordinates = geometry.getCoordinates();
          coordinates.forEach((coordinate, index) => {
            let text = "";
            if (index == 0) {
              text = "起点";
            } else if (index == coordinates.length - 1) {
            } else {
              text = this.measure.measureResultFunction(
                new geom.LineString(coordinates.slice(0, index + 1)),
                this.map.getView().getProjection()
              );
            }
            styles.push(
              new style.Style({
                geometry: new geom.Point(coordinate),
                image: new style.Circle({
                  radius: 5,
                  stroke: new style.Stroke({
                    width: 2,
                    color: "#00f",
                  }),
                  fill: new style.Fill({
                    color: "#fff",
                  }),
                }),
                text: new style.Text({
                  text: text,
                  overflow: true,
                  fill: new style.Fill({
                    color: "#7a7a7a",
                  }),
                  backgroundFill: new style.Fill({
                    color: "#fff",
                  }),
                  backgroundStroke: new style.Stroke({
                    width: 1,
                    color: "#7a7a7a",
                  }),
                  font: "10px sans-serif",
                  padding: [1, 4, 1, 4],
                  offsetX: 16,
                  textAlign: "left",
                }),
              })
            );
          });
        }
        return styles;
      },
      resultStyle: (feature) => {
        let styles = [];
        let geometry = feature.getGeometry();

        styles.push(
          new style.Style({
            fill: new style.Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new style.Stroke({
              color: "#00ff00",
              width: 3,
            }),
          })
        );
        if (geometry.getType() == "LineString") {
          const coordinates = geometry.getCoordinates();
          coordinates.forEach((coordinate, index) => {
            let text = "";
            if (index == 0) {
              text = "起点";
            } else if (index == coordinates.length - 1) {
            } else {
              text = this.measure.measureResultFunction(
                new geom.LineString(coordinates.slice(0, index + 1)),
                this.map.getView().getProjection()
              );
            }
            styles.push(
              new style.Style({
                geometry: new geom.Point(coordinate),
                image: new style.Circle({
                  radius: 5,
                  stroke: new style.Stroke({
                    width: 2,
                    color: "#00f",
                  }),
                  fill: new style.Fill({
                    color: "#fff",
                  }),
                }),
                text: new style.Text({
                  text: text,
                  overflow: true,
                  fill: new style.Fill({
                    color: "#7a7a7a",
                  }),
                  backgroundFill: new style.Fill({
                    color: "#fff",
                  }),
                  backgroundStroke: new style.Stroke({
                    width: 1,
                    color: "#7a7a7a",
                  }),
                  font: "10px sans-serif",
                  padding: [1, 4, 1, 4],
                  offsetX: 16,
                  textAlign: "left",
                }),
              })
            );
          });
        }
        return styles;
      },
    });
    this.measure.setType(this.type);
    this.map.addInteraction(this.measure);
  },
  methods: {},
};
</script>
<style>
.test-tooltip {
  position: relative;
  white-space: nowrap;
  border: 1px solid rgb(0, 1, 255);
  background: #fff;
  color: black;
  padding: 4px;
  font-size: 12px;
}

.test-tooltip-result {
  opacity: 1;
  font-weight: bold;
  padding-right: 30px;
  position: relative;
}

.test-tooltip-result .close {
  display: inline-block;
  /* width: 20px;
    height: 20px;
    background-color: #000; */
  position: absolute;
  padding: 0px;
  margin: 0px;
  border: 0px;
  cursor: pointer;
  width: 12px;
  height: 12px;
  right: 4px;
  top: 6px;
  transform-origin: 6px 6px;
  user-select: none;
  border: 1px solid #00f;
  color: #00f;
  font-weight: bold;
  text-align: center;
  line-height: 8px;
  font-size: 12px;
}

.test-tooltip-help {
}
</style>
```

:::
