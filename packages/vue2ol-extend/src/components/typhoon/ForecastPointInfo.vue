<template>
  <vue2ol-overlay
    class="vue2ol-typhoon-forecastpointinfo"
    v-bind="attrs_"
    v-on="listeners_"
    :position="[data.longitude, data.latitude]"
    positioning="top-left"
    :offset="[10, -12]"
    :options="{ stopEvent: true, insertFirst: false }"
  >
    <div class="title">{{ data.title }}</div>
    <div class="content">
      <div class="item">预报机构{{ data.oragn }}</div>
      <div class="item">到达时间：{{ data.dateTime }}</div>
      <div class="item">
        中心位置：{{ data.latitude }}N/{{ data.longitude }}E
      </div>
      <div class="item">
        最大风速：{{ data.speed }}米/秒
        <vue2ol-typhoon-levelname
          :level="data.level"
        ></vue2ol-typhoon-levelname>
      </div>
      <div class="item">中心气压：{{ data.pres }}百帕</div>
    </div>
  </vue2ol-overlay>
</template>

<script>
import { Style, Fill, Stroke } from "ol/style";
import { Vue2olOverlay } from "@gis-js/vue2ol";
import { ObjectMixin } from "@gis-js/vue2ol";

/**
 * 预报节点信息
 */
export default {
  name: "Vue2olTyphoonForecastpointinfo",
  mixins: [ObjectMixin],
  components: {
    Vue2olOverlay,
  },
  data() {
    return {};
  },
  props: {
    /**
     * 预报节点数据
     */
    data: {
      type: Object,
    },
  },
  computed: {},
  mounted() {},
  methods: {
    getRadiusLevel(index) {
      switch (index) {
        case 0: {
          return "七级";
        }
        case 1: {
          return "十级";
        }
        case 2: {
          return "十二级";
        }
      }
    },
  },
};
</script>

<style scoped>
.vue2ol-typhoon-forecastpointinfo {
  /* background: #363636; */
  /* background: rgb(55, 45, 131); */
  border: 1px solid transparent;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: black;
  font: 12px/18px "Helvetica Neue", Arial, Helvetica, sans-serif;
  /* margin-left: 20px; */
  /* margin-top: -15px; */
  /* position: absolute; */
  visibility: inherit;
  white-space: nowrap;
  z-index: 200;
  /* min-height: 20px; */
}

.vue2ol-typhoon-forecastpointinfo:before {
  border-right: 6px solid black;
  border-right-color: rgb(55, 45, 131);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  content: "";
  position: absolute;
  top: 12px;
  margin-top: -6px;
  left: -5px;
}

.vue2ol-typhoon-forecastpointinfo {
  width: 240px;
  color: white;
}

.title {
  background: rgb(55, 45, 131);
  height: 24px;
  line-height: 24px;
  width: 100%;
  color: #fff;
  padding-left: 10px;
  box-sizing: border-box;
}

.content {
  padding: 10px;
  background-color: #465996;
}
</style>
