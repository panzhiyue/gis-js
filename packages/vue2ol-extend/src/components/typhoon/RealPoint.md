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
        <vue2ol-typhoon-realpoint
          v-for="(item, index) in realPathData"
          :data="item"
        ></vue2ol-typhoon-realpoint>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
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
      typhoonData: null,
    };
  },
  computed: {
    realPathData() {
      if (this.typhoonData) {
        let data = this.typhoonData;
        return data[8].map((item) => {
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
        });
      } else {
        return [];
      }
    },
  },
  async mounted() {
    const response = await fetch("/gis-js/vue2ol-extend/data/typhoon.json");
    const body = await response.json();
    this.typhoonData = body.typhoon;
  },
};
</script>
```

:::
