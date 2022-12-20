<template>
  <vue2ol-control-panel
    class="vue2ol-control-palette"
    title="调色板"
    width="300px"
    resizable
    :draggable="{
      target: $parent.$el,
    }"
  >
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">色相</div>
      <input type="range" :max="360" v-model="model.hueRotate" />
    </div>
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">亮度</div>
      <input type="range" :max="2" :step="0.01" v-model="model.brightness" />
    </div>
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">对比度</div>
      <input type="range" :max="2" :step="0.01" v-model="model.contrast" />
    </div>
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">饱和度</div>
      <input
        type="range"
        :max="10"
        :step="0.01"
        :min="1"
        v-model="model.saturate"
      />
    </div>
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">透明度</div>
      <input type="range" :max="1" :step="0.01" v-model="model.opacity" />
    </div>
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">灰度</div>
      <input type="range" :max="1" :step="0.01" v-model="model.grayscale" />
    </div>
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">反相</div>
      <input type="range" :max="1" :step="0.01" v-model="model.invert" />
    </div>
    <div class="vue2ol-control-palette__item">
      <div class="vue2ol-control-palette__title">深褐色</div>
      <input type="range" :max="1" :step="0.01" v-model="model.sepia" />
    </div>
  </vue2ol-control-panel>
</template>
<script>
import Vue2olControlPanel from "./Panel.vue";
const defaultModel = {
  // 亮度
  brightness: 1,
  // 对比度
  contrast: 1,
  // 灰度
  grayscale: 0,
  // 色相旋转
  hueRotate: 0,
  // 透明度
  opacity: 1,
  // 饱和度
  saturate: 1,
  // 将图像转换为深褐色
  sepia: 0,
  // 反相
  invert: 0,
};
/**
 * 调色板
 */
export default {
  name: "Vue2olControlPalette",
  components: {
    Vue2olControlPanel,
  },
  /**
   * @typeName 
   */
  props: {
    value: Object,
  },
  data() {
    return {
      model: {
        ...defaultModel,
        ...this.value,
      },
    };
  },
  watch: {
    model: {
      deep: true,
      handler(val) {
        this.$emit("change", val);
      },
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style>
.vue2ol-control-palette input {
  width: 100%;
}
</style>
