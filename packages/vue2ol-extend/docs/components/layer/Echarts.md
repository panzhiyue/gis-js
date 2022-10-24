---

title: Vue2olLayerEcharts

---

# Vue2olLayerEcharts

---

## 饼图

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt> </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-echarts
      key="1"
      v-if="echartsOption"
      :echartsOption="echartsOption"
      :hideOnMoving="true"
    ></vue2ol-layer-echarts>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";
export default {
  data() {
    return {
      zoom: 8, //级别
      center: [120.5, 28.5], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      echartsOption: null
    };
  },
  mounted() {
    this.echartsOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "right",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "30",
          coordinates: [120.53450137499999, 28.44104525],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "访问来源",
          type: "pie",
          radius: "30",
          coordinates: [121.53450137499999, 28.44104525],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "访问来源",
          type: "pie",
          radius: "30",
          coordinates: [120.53450137499999, 29.44104525],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
};
</script>
```

:::

## 北京公交路线图

::: demo

```vue
<template>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt> </vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-echarts
      v-if="echartsOption"
      :echartsOption="echartsOption"
      :hideOnMoving="true"
      key="2"
    ></vue2ol-layer-echarts>
  </vue2ol-map>
</template>

<script>
import Polygon from "ol/geom/Polygon";

export default {
  data() {
    return {
      zoom: 8, //级别
      center: [116.46, 39.92], //中心点
      viewOptions: {
        projection: "EPSG:4326" //坐标系
      },
      echartsOption: null
    };
  },
  async mounted() {
    let response = await fetch("/data/lines-bus.json");
    let data = await response.json();

    let busLines = [].concat.apply(
      [],
      data.map(function(busLine, idx) {
        let prevPt = [];
        let points = [];
        for (let i = 0; i < busLine.length; i += 2) {
          let pt = [busLine[i], busLine[i + 1]];
          if (i > 0) {
            pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
          }
          prevPt = pt;
          points.push([pt[0] / 1e4, pt[1] / 1e4]);
        }
        return {
          coords: points
        };
      })
    );

    this.echartsOption = {
      bmap: {
        center: [116.46, 39.92],
        zoom: 10,
        roam: true,
        mapStyle: {
          styleJson: [
            {
              featureType: "water",
              elementType: "all",
              stylers: {
                color: "#d1d1d1"
              }
            },
            {
              featureType: "land",
              elementType: "all",
              stylers: {
                color: "#f3f3f3"
              }
            },
            {
              featureType: "railway",
              elementType: "all",
              stylers: {
                visibility: "off"
              }
            },
            {
              featureType: "highway",
              elementType: "all",
              stylers: {
                color: "#fdfdfd"
              }
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off"
              }
            },
            {
              featureType: "arterial",
              elementType: "geometry",
              stylers: {
                color: "#fefefe"
              }
            },
            {
              featureType: "arterial",
              elementType: "geometry.fill",
              stylers: {
                color: "#fefefe"
              }
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: {
                visibility: "off"
              }
            },
            {
              featureType: "green",
              elementType: "all",
              stylers: {
                visibility: "off"
              }
            },
            {
              featureType: "subway",
              elementType: "all",
              stylers: {
                visibility: "off"
              }
            },
            {
              featureType: "manmade",
              elementType: "all",
              stylers: {
                color: "#d1d1d1"
              }
            },
            {
              featureType: "local",
              elementType: "all",
              stylers: {
                color: "#d1d1d1"
              }
            },
            {
              featureType: "arterial",
              elementType: "labels",
              stylers: {
                visibility: "off"
              }
            },
            {
              featureType: "boundary",
              elementType: "all",
              stylers: {
                color: "#fefefe"
              }
            },
            {
              featureType: "building",
              elementType: "all",
              stylers: {
                color: "#d1d1d1"
              }
            },
            {
              featureType: "label",
              elementType: "labels.text.fill",
              stylers: {
                color: "#999999"
              }
            }
          ]
        }
      },
      series: [
        {
          type: "lines",
          coordinateSystem: "bmap",
          polyline: true,
          data: busLines,
          silent: true,
          lineStyle: {
            color: "rgb(200, 35, 45)",
            opacity: 0.2,
            width: 1
          },
          progressiveThreshold: 500,
          progressive: 200
        }
      ]
    };
  }
};
</script>
```

:::

## Props

| 名称                     | 描述               | 类型    | 取值范围 | 默认值 |
| ------------------------ | ------------------ | ------- | -------- | ------ |
| echartsOption            | echarts 参数       | object  | -        |        |
| source                   | 源坐标系           | string  | -        |        |
| destination              | 目标坐标系         | string  | -        |        |
| hideOnMoving             | 地图移动时隐藏图层 | boolean | -        | true   |
| forcedRerender           |                    | boolean | -        | false  |
| forcedPrecomposeRerender |                    | boolean | -        | false  |

## Events

| 名称   | 属性                                  | 描述                     |
| ------ | ------------------------------------- | ------------------------ |
| init   | **mapObject** `ol-echarts` - 地图元素 | 地图元素初始化完时触发   |
| append | **mapObject** `ol-echarts` - 地图元素 | 地图元素添加到地图时触发 |
| ready  | **mapObject** `ol-echarts` - 地图元素 | 组件就绪时触发           |
