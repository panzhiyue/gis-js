---

title: Vue2olTyphoonForecastpoint

---

# Vue2olTyphoonForecastpoint

> 预测路线节点

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
        <vue2ol-typhoon-forecastpoint
          v-for="(item, index) in forecastPathData"
          :data="item"
        ></vue2ol-typhoon-forecastpoint>
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
        projection: "EPSG:4326" //坐标系
      },
      typhoonData: null
    };
  },
  computed: {
    forecastPathData() {
      if (this.typhoonData) {
        let data = this.typhoonData;
        return data[8][0][11].BABJ.map(tempItem => {
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

| 名称       | 描述             | 类型                                             | 取值范围 | 默认值 |
| ---------- | ---------------- | ------------------------------------------------ | -------- | ------ |
| properties | 属性             | object                                           | -        |        |
| data       | 预测路线节点数据 | [ForecastPathData](./Main.html#forecastpathdata) | -        |        |
