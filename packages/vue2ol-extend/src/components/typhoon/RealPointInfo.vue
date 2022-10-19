<template>
  <vue2ol-overlay
    class="vue2ol-typhoon-realpointinfo"
    v-bind="attrs_"
    v-on="listeners_"
    :position="[data.longitude, data.latitude]"
    positioning="top-left"
    :offset="[10, -12]"
    :options="{ stopEvent: true, insertFirst: false }"
  >
    <div class="title">{{ data.title }}</div>
    <div class="content">
      <div class="item">过去时间：{{ data.dateTime }}</div>
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
      <div class="item">移动方向：{{ data.dir }}</div>
      <div class="item">移动速度：{{ data.moveSpeed }}公里/小时</div>
      <table class="table" v-if="data.wndRadius && data.wndRadius.length > 0">
        <tr>
          <th>风圈半径</th>
          <th>东北</th>
          <th>东南</th>
          <th>西南</th>
          <th>西北</th>
          <th></th>
        </tr>
        <tr v-for="(item, index) in data.wndRadius">
          <td>{{ getRadiusLevel(index) }}</td>
          <td>{{ item.ne }}</td>
          <td>{{ item.es }}</td>
          <td>{{ item.ws }}</td>
          <td>{{ item.wn }}</td>
          <td>(KM)</td>
        </tr>
      </table>
    </div>
  </vue2ol-overlay>
</template>

<script>
import { Style, Fill, Stroke } from "ol/style";
import { Vue2olOverlay } from "@gis-js/vue2ol";
import { ObjectMixin } from "@gis-js/vue2ol";

/**
 * 实际路线节点信息
 */
export default {
  name: "Vue2olTyphoonRealpointinfo",
  mixins: [ObjectMixin],
  components: {
    Vue2olOverlay,
  },
  data() {
    return {};
  },
  props: {
    /**
     * 实际路线节点信息
     * @typeName [PathData](./Main.html#pathdata)
     */
    data: {
      type: Object,
    },
  },
  computed: {},
  mounted() {
  },
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
.vue2ol-typhoon-realpointinfo {
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

.vue2ol-typhoon-realpointinfo:before {
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

.vue2ol-typhoon-realpointinfo {
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

.table {
  width: 100%;
  background: rgba(0, 0, 0, 0);
  font-size: 12px;
  margin-bottom: 0px;
  margin-top: 0px;
  text-align: left;
}

.table tr {
  background: rgba(0, 0, 0, 0);
}

.table th {
  padding: 2px;
  border: 0;
  color: white;
}

.table td {
  padding: 2px;
  border: 0;
  color: white;
  background: rgba(0, 0, 0, 0);
}
</style>
