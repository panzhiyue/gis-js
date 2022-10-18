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
import { ObjectMixin } from "@gis-js/vue2ol";
import { Vue2olFeature, Vue2olGeomLinestring } from "@gis-js/vue2ol";
import { getTyphoonLevel, colorTable } from "../../utils/typhoon";
/**
 *
 */
export default {
  name: "Vue2olTyphoonRealpath",
  mixins: [ObjectMixin],
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
            color: colorTable[getTyphoonLevel(properties.speed)],
            width: 2,
          }),
        });
      },
    };
  },
  props: {
    /**
     * 警戒线坐标集合
     * @typeName Array 坐标集合
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
              [item1.lng, item1.lat],
              [item2.lng, item2.lat],
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
