## 基础用法

::: demo

```vue
<template>
  <button @click="animation = !animation">开始/停止</button>
  <vue2ol-map style="height:400px;">
    <vue2ol-view :zoom="zoom" :center="center" :options="viewOptions">
    </vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
    <vue2ol-typhoon-main
      v-if="typhoonData"
      :data="typhoonData"
      :index="index"
      :showAll="false"
      @on-change-index="handleChangeIndex"
    ></vue2ol-typhoon-main>
  </vue2ol-map>
</template>

<script>
import dayjs from "dayjs";
import { typhoonUtil } from "@gis-js/vue2ol-extend";
export default {
  data() {
    return {
      zoom: 4, //级别
      center: [124.7, 26.6], //中心点
      viewOptions: {
        projection: "EPSG:4326", //坐标系
      },
      data: null,
      index: 0,
      animation: false,
    };
  },
  computed: {
    typhoonData() {
      let data = this.data;
      if (data) {
        return {
          id: data[3],
          iname: data[1],
          name: data[2],
          status: data[7],
          path: data[8].map((item) => {
            return {
              title: `${data[3]} ${data[2]}`,
              dateTime: dayjs(item[2]).format("MM月DD日hh时"),
              longitude: item[4],
              latitude: item[5],
              pres: item[6],
              moveSpeed: item[9],
              dir: item[8]
                .split("")
                .map((item) => {
                  return typhoonUtil.dirTable[item];
                })
                .join(""),
              speed: item[7],
              wndRadius: item[10].map((tempItem) => {
                return {
                  speed: tempItem[0],
                  ne: tempItem[1],
                  es: tempItem[2],
                  ws: tempItem[3],
                  wn: tempItem[4],
                };
              }),
              forecastPath: [
                item[11].BABJ.map((tempItem) => {
                  return {
                    title: `${data[3]} ${data[2]}`,
                    oragn: typhoonUtil.organTable["BABJ"],
                    dateTime: dayjs(tempItem[1]).format("MM月DD日hh时"),
                    longitude: tempItem[2],
                    latitude: tempItem[3],
                    pres: tempItem[4],
                    speed: tempItem[5],
                    level: tempItem[7],
                  };
                }),
              ],

              level: item[3],
              message: `${dayjs(item[2]).format("MM月DD日hh时")}`,
            };
          }),
        };
      } else {
        return null;
      }
    },
  },
  async mounted() {
    const response = await fetch("/gis-js/vue2ol-extend/data/typhoon.json");
    const body = await response.json();
    this.data = body.typhoon;

    setInterval(() => {
      if (this.animation) {
        this.index =
          this.index >= this.typhoonData.path.length - 1 ? 0 : this.index + 1;
      }
    }, 200);

  },
  methods: {
    handleChangeIndex(index) {
      this.index = index;
    },
  },
};
</script>
```
:::


## API
### TyphoonData

| 名称   | 描述     | 类型       |
| ------ | -------- | ---------- |
| id     | 台风id   | String     |
| iname  | 英文名称 | String     |
| name   | 中文名称 | String     |
| status | 状态     | start/stop |
| path   | 真实路径 | PathData[] |

### PathData

| 名称         | 描述         | 类型           |
| ------------ | ------------ | -------------- |
| title        | 标题         | String         |
| dateTime     | 过去时间     | String         |
| longitude    | 经度         | Number         |
| latitude     | 纬度         | Number         |
| pres         | 中心气压     | Number         |
| moveSpeed    | 移动速度     | Number         |
| dir          | 移动方向     | Number         |
| speed        | 最大风速     | Number         |
| wndRadius    | 风圈数组     | WndRadius[]    |
| forecastPath | 预测路径数组 | ForecastPath[] |
| level        | 台风级别     | String         |
| message      | 显示信息     | String         |

### ForecastPathData

| 名称      | 描述     | 类型   |
| --------- | -------- | ------ |
| title     | 标题     | String |
| oragn     | 预报机构 | String |
| dateTime  | 到达时间 | String |
| longitude | 经度     | Number |
| latitude  | 纬度     | Number |
| pres      | 中心气压 | Number |
| speed     | 最大风速 | Number |
| level     | 台风级别 | String |

### WndRaiuds

| 名称 | 描述     | 类型   |
| ---- | -------- | ------ |
| ne   | 东北半径 | Number |
| es   | 东南半径 | Number |
| ws   | 西南半径 | Number |
| wn   | 西北半径 | Number |





## 方法

```javascript
import typhoonUtil from "@gis-js/vue2ol-extend"
```

### parseWndRadius(wndRadius, center)

根据中心点与风圈信息获取风圈点集

**参数**

- `wndRadius<WndRadius>`风圈信息
- `center<ol/Coordinates>`：中心点

**返回值**

`Array<ol/Coordinate>`风圈点集

### getTyphoonLevel(windSpeed:String|Number)

根据风速获取

**参数**

- `windSpeed<Number>`：风速

**返回值**

`<String>`台风级别

## 枚举

### colorTable

台风级别对应颜色

### levelTable

台风级别对应名称

### dirTable

风向名称

### organTable

预报机构名称
