---

title: Vue2olTyphoonRealpointinfo

---

# Vue2olTyphoonRealpointinfo

> 实际路线节点信息

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
    <vue2ol-typhoon-realpointinfo
      v-if="realPathData.length"
      :data="realPathData[20]"
    ></vue2ol-typhoon-realpointinfo>
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
        projection: "EPSG:4326" //坐标系
      },
      typhoonData: null
    };
  },
  computed: {
    realPathData() {
      if (this.typhoonData) {
        let data = this.typhoonData;
        return data[8].map(item => {
          return {
            title: `${data[3]} ${data[2]}`,
            dateTime: dayjs(item[2]).format("MM月DD日hh时"),
            longitude: item[4],
            latitude: item[5],
            pres: item[6],
            moveSpeed: item[9],
            dir: item[8]
              .split("")
              .map(item => {
                return typhoonUtil.dirTable[item];
              })
              .join(""),
            speed: item[7],
            wndRadius: item[10].map(tempItem => {
              return {
                speed: tempItem[0],
                ne: tempItem[1],
                es: tempItem[2],
                ws: tempItem[3],
                wn: tempItem[4]
              };
            }),
            forecastPath: [
              item[11].BABJ.map(tempItem => {
                return {
                  title: `${data[3]} ${data[2]}`,
                  oragn: typhoonUtil.organTable["BABJ"],
                  dateTime: dayjs(tempItem[1]).format("MM月DD日hh时"),
                  longitude: tempItem[2],
                  latitude: tempItem[3],
                  pres: tempItem[4],
                  speed: tempItem[5],
                  level: tempItem[7]
                };
              })
            ],

            level: item[3],
            message: `${dayjs(item[2]).format("MM月DD日hh时")}`
          };
        });
      } else {
        return [];
      }
    }
  },
  async mounted() {
    const response = await fetch("../../data/typhoon.json");
    const body = await response.json();
    this.typhoonData = body.typhoon;
  }
};
</script>
```

:::

## Props

| 名称 | 描述             | 类型                             | 取值范围 | 默认值 |
| ---- | ---------------- | -------------------------------- | -------- | ------ |
| data | 实际路线节点信息 | [PathData](./Main.html#pathdata) | -        |        |
