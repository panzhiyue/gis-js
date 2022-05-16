#   介绍

Vue2ol 是库[openlayers](https://openlayers.org/)的包装库

为了轻松封装 [openlayers](https://openlayers.org/) 的常用功能，提供了一系列可组合的 vue 组件。

## 特征

### 继承原有目录结构

为了保持与openlayers的一致，组件名称是根据openlayers模块路径转为驼峰形式。如下所示:

- ol/layer/Vector->Vue2olLayerVector
- ol/source/Vector->Vue2olSourceVector

需要注意的是当openlayers模块名中包含多个大写时，只保留首字母为大写。如下所示:

- ol/source/XYZ->Vue2olSource/Xyz
- ol/geom/MultiLineString->Vue2olGeomMultilinestring

### 调用方式一致

大部分组件都定义了`options`参数，通过此参数可以实现openlayers构造函数的移植。

**使用函数式创建一个地图**

```javascript
let layer=new ol.layer.Tile({
    source:new ol.source.OSM()
})

let map=new ol.Map({
        target: 'map', //地图容器div的ID
        //地图视图设置
        view: new ol.View({
            center: [0, 0],
            projection: ol.proj.get("EPSG:4326"),
            zoomFactor: 2,
            maxZoom: 18,
            zoom: 5

        })
    });

map.addLayer(layer);
```

**使用声明书创建一个地图**

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view  :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
  </vue2ol-map>
</template>

<script>
export default {
  data() {
    return {
      mapOptions:{
        target:"map"  
      }
      viewOptions: {
        center: [0, 0],
        projection: ol.proj.get("EPSG:4326"),
        zoomFactor: 2,
        maxZoom: 18,
        zoom: 5
      }
    };
  }
};
</script>
```

### 响应式

如果props中的属性在openlayers中有对应的set方法，那么修改属性时地图也会随着变化。