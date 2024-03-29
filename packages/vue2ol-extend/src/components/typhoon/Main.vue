<template>
  <div>
    <vue2ol-typhoon-realpointinfo
      v-if="hoverRealPoint"
      :data="hoverRealPoint"
    ></vue2ol-typhoon-realpointinfo>
    <vue2ol-typhoon-forecastpointinfo
      v-if="hoverForecastPoint"
      :data="hoverForecastPoint"
    ></vue2ol-typhoon-forecastpointinfo>
    <vue2ol-typhoon-name
      :position="[firstPoint.longitude, firstPoint.latitude]"
      :name="data.name"
    ></vue2ol-typhoon-name>

    <vue2ol-typhoon-currentinfo
      :position="[currentPoint.longitude, currentPoint.latitude]"
      :message="currentPoint.message"
    ></vue2ol-typhoon-currentinfo>

    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-typhoon-picketline24></vue2ol-typhoon-picketline24>
        <vue2ol-typhoon-picketline48></vue2ol-typhoon-picketline48>
        <vue2ol-typhoon-windcircle
          v-for="(item, index) in currentPoint.wndRadius"
          :position="[currentPoint.longitude, currentPoint.latitude]"
          :wndRadius="item"
          :key="`vue2ol-typhoon-windcircle${index}`"
        ></vue2ol-typhoon-windcircle>
        <vue2ol-typhoon-realpath :data="path"></vue2ol-typhoon-realpath>
        <vue2ol-typhoon-realpoint
          v-for="(item, index) in path"
          :data="item"
          :options="{ _featureName: 'realpoint', _index: index, ...item }"
          :key="`vue2ol-typhoon-realpoint${index}`"
        ></vue2ol-typhoon-realpoint>

        <div v-for="(forecastPath, index) in currentPoint.forecastPath">
          <vue2ol-typhoon-forecastpath
            :data="[currentPoint].concat(forecastPath)"
            :key="`vue2ol-typhoon-forecastpath${index}`"
          ></vue2ol-typhoon-forecastpath>

          <vue2ol-typhoon-forecastpoint
            v-for="(item, index2) in forecastPath"
            :data="item"
            :options="{ _featureName: 'forecastpoint', ...item }"
            :key="`vue2ol-typhoon-forecastpoint${index}-${index2}`"
          ></vue2ol-typhoon-forecastpoint>
        </div>
        <vue2ol-typhoon-marker
          :position="[currentPoint.longitude, currentPoint.latitude]"
          :duration="5000"
          :clockwise="false"
        ></vue2ol-typhoon-marker>
      </vue2ol-source-vector>
      <vue2ol-event-vector
        @on-pointermove="handlePointerMove"
        @on-singleclick="handleSingleClick"
      ></vue2ol-event-vector>
    </vue2ol-layer-vector>
  </div>
</template>

<script>
import { Style, Icon } from "ol/style";
import { BaseObjectMixin } from "@gis-js/vue2ol";
import { Vue2olLayerVector, Vue2olSourceVector } from "@gis-js/vue2ol";

/**
 * 台风
 */
export default {
  name: "Vue2olTyphoonMain",
  mixins: [BaseObjectMixin],
  components: {
    Vue2olLayerVector,
    Vue2olSourceVector,
  },
  data() {
    return {
      hoverRealPoint: null,
      hoverForecastPoint: null,
    };
  },
  emits: ["on-change-index"],
  props: {
    /**
     * 台风数据
     * @typeName [TyphoonData](./Main.html#typhoondata)
     */
    data: {
      type: Object,
    },
    /**
     * 节点索引号
     */
    index: {
      type: Number,
      default: 0,
    },
    /**
     * 是否显示所有路径节点,为false只显示到指定索引节点
     */
    showAll: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    firstPoint() {
      return this.data.path[0];
    },
    lastPoint() {
      return this.data.path[this.data.path.length - 1];
    },
    currentPoint() {
      return this.data.path[this.index];
    },
    path() {
      if (this.showAll) {
        return this.data.path;
      } else {
        return this.data.path.slice(0, this.index + 1);
      }
    },
  },
  mounted() {
  },
  methods: {
    handlePointerMove(result) {
      if (result.features.length) {
        let feature = result.features[0];
        if (feature.get("_featureName") == "realpoint") {
          this.hoverRealPoint = feature.getProperties();
        } else {
          this.hoverRealPoint = null;
        }

        if (feature.get("_featureName") == "forecastpoint") {
          this.hoverForecastPoint = feature.getProperties();
        } else {
          this.hoverForecastPoint = null;
        }
      } else {
        this.hoverRealPoint = null;
        this.hoverForecastPoint = null;
      }
    },
    handleSingleClick(result) {
      if (result.features.length) {
        let feature = result.features[0];
        if (feature.get("_featureName") == "realpoint") {
          this.$emit("on-change-index", feature.get("_index"));
        }
      }
    },
  },
};
</script>

<style></style>
