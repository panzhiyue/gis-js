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
        projection: "EPSG:4326", //坐标系
      },
      echartsOption: null,
    };
  },
  mounted() {
    this.echartsOption = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "right",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
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
            { value: 1548, name: "搜索引擎" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
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
            { value: 1548, name: "搜索引擎" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
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
            { value: 1548, name: "搜索引擎" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  },
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
        projection: "EPSG:4326", //坐标系
      },
      echartsOption: null,
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
          coords: points,
        };
      })
    );

    this.echartsOption = {
      bmap: {
        center: [116.46, 39.92],
        zoom: 10,
        roam: false,
        mapStyle: {
          styleJson: [
            {
              featureType: "water",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "land",
              elementType: "all",
              stylers: {
                color: "#f3f3f3",
              },
            },
            {
              featureType: "railway",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "highway",
              elementType: "all",
              stylers: {
                color: "#fdfdfd",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.fill",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "green",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "subway",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "manmade",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "local",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "boundary",
              elementType: "all",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "building",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "label",
              elementType: "labels.text.fill",
              stylers: {
                color: "#999999",
              },
            },
          ],
        },
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
            width: 1,
          },
          progressiveThreshold: 500,
          progressive: 200,
        },
      ],
    };
  },
};
</script>
```

:::

## 迁徙

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
      zoom: 4, //级别
      center: [116.0046, 28.6633], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      echartsOption: null,
    };
  },
  async mounted() {
    var geoCoordMap = {
      石家庄: [114.4995, 38.1006],
      哈尔滨: [127.9688, 45.368],
      杭州: [119.5313, 29.8773],
      广州: [113.5107, 23.2196],
      武汉: [114.3896, 30.6628],
      南昌: [116.0046, 28.6633],
      长沙: [113.0823, 28.2568],
      西安: [109.1162, 34.2004],
      上海: [121.4648, 31.2891],
      天津: [117.4219, 39.4189],
      重庆: [107.7539, 30.1904],
    };

    var GZData = [
      [{ name: "广州" }, { name: "上海", value: 95 }],
      [{ name: "广州" }, { name: "重庆", value: 90 }],
      [{ name: "广州" }, { name: "长沙", value: 80 }],
      [{ name: "广州" }, { name: "杭州", value: 70 }],
      [{ name: "广州" }, { name: "石家庄", value: 60 }],
      [{ name: "广州" }, { name: "哈尔滨", value: 50 }],
      [{ name: "广州" }, { name: "南昌", value: 40 }],
      [{ name: "广州" }, { name: "天津", value: 30 }],
      [{ name: "广州" }, { name: "武汉", value: 20 }],
      [{ name: "广州" }, { name: "西安", value: 10 }],
    ];

    // var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    var convertData = function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
          });
        }
      }
      return res;
    };

    var color = ["#7bbfea"];
    var series = [];
    [["广州", GZData]].forEach(function(item, i) {
      series.push(
        {
          name: item[0] + " Top10",
          type: "lines",
          zlevel: 1,
          //symbol: ['none', 'arrow'],
          //symbolSize: 10,
          effect: {
            show: true,
            period: 4, // 特效动画的时间
            trailLength: 0.3, // 特效尾迹的长度。取从 0 到 1 的值，默认为 0.2，数值越大尾迹越长
            color: "#fff",
            // symbol: planePath, // 特效图形的标记
            symbolSize: 3,
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2,
            },
          },
          data: convertData(item[1]),
        },
        {
          name: item[0] + " Top10",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 1,
          rippleEffect: {
            brushType: "stroke",
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}",
              textStyle: {
                fontSize: 9,
                color: "#fff",
              },
            },
          },
          symbolSize: function(val) {
            return val[2] / 12;
          },
          itemStyle: {
            normal: {
              color: color[i],
            },
          },

          data: item[1].map(function(dataItem) {
            //console.log(dataItem[1].name, geoCoordMap[dataItem[1].name])
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
            };
          }),
        }
      );
    });

    this.echartsOption = {
      title: {
        text: "迁徙图",
        left: "center",
        textStyle: {
          color: "black",
        },
      },
      
      series: series,
    };
  },
};
</script>
```

:::
