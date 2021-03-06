---

title: Vue2olFeature

---

# Vue2olFeature

> ol/Feature 的 vue 组件

Since: v1.0.0

[See](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html)

---

## 基础用法

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon :coordinates="coordinates">
          </vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      zoom: 10, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      coordinates: [
        [
          [120, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [120, 28]
        ]
      ]
    };
  }
};
</script>
```

:::

## 监听属性

::: demo

```vue
<template>
  <div>
    <button @click="updateGeometry1">修改几何1</button>
    <button @click="updateGeometry2">修改几何2</button>
    <button @click="updateGeometryName">修改几何名称</button>
    <button @click="updateId">修改id</button>
    <button @click="updateProperties1">修改属性1</button>
    <button @click="updateProperties2">
      修改属性2(这种方法不生效，因为不是深度监听)
    </button>
    <button @click="updateStyle1">修改样式1</button>
    <button @click="updateStyle2">
      修改样式2(这种方法不生效，因为不是深度监听)
    </button>
    <button @click="print">打印</button>
  </div>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature
          :geometry="geometry"
          :geometryName="geometryName"
          :id="id"
          :properties="properties"
          :style-obj="styleObj"
          @ready="onReady"
        >
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
import { Fill, Style } from "ol/style";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      feature: null,
      geometry: new Polygon([
        [
          [120, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [120, 28]
        ]
      ]),
      geometryName: "geometry",
      id: "feature1",
      properties: {
        name: "testFeature"
      },
      styleObj: new Style({
        fill: new Fill({
          color: "rgba(255,255,255,0.4)"
        })
      })
    };
  },
  mounted() {},
  methods: {
    onReady(mapObject) {
      this.feature = mapObject;
    },
    updateGeometry1() {
      this.geometry = new Polygon([
        [
          [121, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [121, 28]
        ]
      ]);
    },
    updateGeometry2() {
      this.geometry.setCoordinates([
        [
          [119, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [119, 28]
        ]
      ]);
    },
    updateGeometryName() {
      this.geometryName = "geometryUpdate";
      setTimeout(() => {
        console.log(this.feature);
        console.log(this.feature.getGeometryName());
      }, 1000);
    },
    updateId() {
      this.id = "feature2";
    },
    updateProperties1() {
      this.properties = {
        name: "testFeature2"
      };
    },
    updateProperties2() {
      //这种方法不生效，因为不是深度监听
      this.properties.name = "testFeature3";
    },
    updateStyle1() {
      this.styleObj = new Style({
        fill: new Fill({
          color: "rgba(0,0,255,0.4)"
        })
      });
    },
    updateStyle2() {
      //这种方法不生效，因为不是深度监听
      this.styleObj.getFill().setColor("#ff0000");
    },
    print() {
      console.log(this.feature);
    }
  }
};
</script>
```

:::

## 通过 options 传值

::: demo

```vue
<template>
  <div>
    <button @click="print">打印</button>
  </div>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :options="options" @ready="onReady"> </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
import { Fill, Style } from "ol/style";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      feature: null,
      options: {
        geometry: new Polygon([
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28]
          ]
        ]),
        name: "testFeature"
      }
    };
  },
  mounted() {},
  methods: {
    onReady(mapObject) {
      this.feature = mapObject;
    },

    print() {
      console.log(this.feature);
    }
  }
};
</script>
```

:::

## 触发组件事件

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature @init="onInit" @append="onAppend" @ready="onReady">
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
import { Fill, Style } from "ol/style";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      feature: null,
      options: {
        geometry: new Polygon([
          [
            [120, 28],
            [121, 28],
            [121, 27],
            [120, 27],
            [120, 28]
          ]
        ]),
        name: "testFeature"
      }
    };
  },
  mounted() {},
  methods: {
    onInit(mapObject) {
      console.log("init", mapObject);
    },
    onAppend(mapObject) {
      console.log("append", mapObject);
    },
    onReady(mapObject) {
      console.log("ready", mapObject);
    }
  }
};
</script>
```

:::

## 触发地图元素事件

::: demo

```vue
<template>
  <div>
    <button @click="updateGeometry1">修改几何1</button>
    <button @click="updateGeometry2">修改几何2</button>
    <button @click="updateGeometryName">修改几何名称</button>
    <button @click="updateId">修改id</button>
    <button @click="updateProperties1">修改属性1</button>
    <button @click="updateProperties2">
      修改属性2(这种方法不生效，因为不是深度监听)
    </button>
    <button @click="updateStyle1">修改样式1</button>
    <button @click="updateStyle2">
      修改样式2(这种方法不生效，因为不是深度监听)
    </button>
    <button @click="print">打印</button>
  </div>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature
          :geometry="geometry"
          :geometryName="geometryName"
          :id="id"
          :properties="properties"
          :style-obj="styleObj"
          @ready="onReady"
          @change="onChange"
          @change:geometry="onChangeGeometry"
          @propertychange="onPropertyChange"
        >
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
import { Fill, Style } from "ol/style";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [120, 28], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      feature: null,
      geometry: new Polygon([
        [
          [120, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [120, 28]
        ]
      ]),
      geometryName: "geometry",
      id: "feature1",
      properties: {
        name: "testFeature"
      },
      styleObj: new Style({
        fill: new Fill({
          color: "rgba(255,255,255,0.4)"
        })
      })
    };
  },
  mounted() {},
  methods: {
    onReady(mapObject) {
      this.feature = mapObject;
    },
    updateGeometry1() {
      this.geometry = new Polygon([
        [
          [121, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [121, 28]
        ]
      ]);
    },
    updateGeometry2() {
      this.geometry.setCoordinates([
        [
          [119, 28],
          [121, 28],
          [121, 27],
          [120, 27],
          [119, 28]
        ]
      ]);
    },
    updateGeometryName() {
      this.geometryName = "geometryUpdate";
      setTimeout(() => {
        console.log(this.feature);
        console.log(this.feature.getGeometryName());
      }, 1000);
    },
    updateId() {
      this.id = "feature2";
    },
    updateProperties1() {
      this.properties = {
        name: "testFeature2"
      };
    },
    updateProperties2() {
      //这种方法不生效，因为不是深度监听
      this.properties.name = "testFeature3";
    },
    updateStyle1() {
      this.styleObj = new Style({
        fill: new Fill({
          color: "rgba(0,0,255,0.4)"
        })
      });
    },
    updateStyle2() {
      //这种方法不生效，因为不是深度监听
      this.styleObj.getFill().setColor("#ff0000");
    },
    print() {
      console.log(this.feature);
    },
    onChange() {
      console.log("change", arguments);
    },
    onChangeGeometry() {
      console.log("changeGeometry", arguments);
    },
    onPropertyChange() {
      console.log("propertyChange", arguments);
    }
  }
};
</script>
```

:::

## Props

| 名称         | 描述                                                                                                                                                                             | 类型                                 | 取值范围 | 默认值 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ------ |
| properties   | 属性                                                                                                                                                                             | object                               | -        |        |
| options      | 对应 openlayers 对象的实例化参数选项,其他没有在 props 中列举的参数，如果有传入 props 并且与默认值不同，则以 props 中的值为准，否则使用 options 中的值                            | object                               | -        |        |
| parentLayer  |                                                                                                                                                                                  | {import('ol/layer/Vector').default}  | -        |        |
| geometry     | 几何图形                                                                                                                                                                         | {import('ol/geom/Geometry').default} | -        |        |
| geometryName | 要素几何图形的属性名称。调用[ol/Feature~Feature#getGeometry](https://openlayers.org/en/latest/apidoc/module-ol_Feature-Feature.html#getGeometry)时，将返回具有该名称的属性的值。 | string                               | -        |        |
| id           | feature 的 ID                                                                                                                                                                    | number\|string                       | -        |        |
| styleObj     | 特征的样式。<br/>因为 style 是保留属性，因此改名为 styleObj                                                                                                                      | {import('ol/style/Style').StyleLike} | -        |        |

## Events

| 名称   | 属性                                                    | 描述                     |
| ------ | ------------------------------------------------------- | ------------------------ |
| init   | **mapObject** `import('ol/Feature').default` - 地图元素 | 地图元素初始化完时触发   |
| append | **mapObject** `import('ol/Feature').default` - 地图元素 | 地图元素添加到地图时触发 |
| ready  | **mapObject** `import('ol/Feature').default` - 地图元素 | 组件就绪时触发           |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
