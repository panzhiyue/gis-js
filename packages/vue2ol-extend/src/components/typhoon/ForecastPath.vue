<template>
  <div>
    <vue2ol-feature
      v-for="(item, index) in lines"
      :style-obj="style"
      :options="item"
      v-bind="attrs_"
      v-on="listeners_"
    >
      <vue2ol-geom-linestring
        :coordinates="item.coordinates"
      ></vue2ol-geom-linestring>
    </vue2ol-feature>
  </div>
</template>

<script>
import { Style, Stroke } from "ol/style";
import { BaseObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomLinestring } from "@gis-js/vue2ol";
import { getTyphoonLevel, colorTable } from "../../utils/typhoon";
/**
 * 预测路线轨迹
 */
export default {
  name: "Vue2olTyphoonForecastpath",
  mixins: [BaseObjectMixin],
  components: {
    Vue2olFeature,
    Vue2olGeomLinestring,
  },
  data() {
    return {
      style: (feature) => {
        let properties = feature.getProperties();
        return new Style({
          stroke: new Stroke({
            color: "#ff0000",
            width: 1,
            lineDash: [5, 5],
          }),
        });
      },
    };
  },
  props: {
    /**
     * 预报路径信息
     * @typeName Array<[ForecastPathData](./Main.html#forecastdata)>
     */
    data: {
      type: Array,
      require: true,
    },
  },
  computed: {
    lines() {
      if (this.data) {
        let ls = [];
        for (let i = 1; i < this.data.length; i++) {
          let item1 = this.data[i - 1];
          let item2 = this.data[i];
          ls.push({
            coordinates: [
              [item1.longitude, item1.latitude],
              [item2.longitude, item2.latitude],
            ],
            ...item2,
          });
        }
        return ls;
      } else {
        return [];
      }
    },
  },
};
</script>

<style></style>
