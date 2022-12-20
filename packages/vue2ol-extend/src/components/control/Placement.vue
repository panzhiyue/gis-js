<template>
  <div class="vue2ol-control-placement" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
/**
 * 定位日期
 */
export default {
  name: "Vue2olControlPlacement",
  props: {
    /**
     * 停泊位置，可选值'left-top', 'center-top', 'right-top'，'left-center', 'center-center', 'right-center''left-bottom', 'center-bottom', 'right-bottom'
     * @typeName String
     */
    placement: {
      type: String,
      default: "left-bottom",
      validator(val) {
        return [
          "left-top",
          "center-top",
          "right-top",
          "left-center",
          "center-center",
          "right-center",
          "left-bottom",
          "center-bottom",
          "right-bottom",
        ].includes(val);
      },
    },
    /**
     * 层级
     */
    zIndex: {
      type: Number,
      default: 1,
    },
    /**
     * 外边距
     */
    margin: {
      type: [Array, Number],
      default: 10,
    },
  },
  computed: {
    styles() {
      return {
        zIndex: this.zIndex,
        margin: []
          .concat(this.margin)
          .map((n) => `${n}px`)
          .join(" "),
      };
    },
    classes() {
      return [this.placement];
    },
  },
};
</script>
<style scoped>
.vue2ol-control-placement {
  position: absolute;
  border-radius: 2px;
  background: hsla(0, 0%, 100%, 0.9);
  color: #5f6477;
  -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.vue2ol-control-placement.left-top {
  left: 0;
  top: 0;
}
.vue2ol-control-placement.center-top {
  left: 50%;
  top: 0;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.vue2ol-control-placement.right-top {
  right: 0;
  top: 0;
}
.vue2ol-control-placement.left-center {
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.vue2ol-control-placement.center-center {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.vue2ol-control-placement.right-center {
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.vue2ol-control-placement.left-bottom {
  left: 0;
  bottom: 0;
}
.vue2ol-control-placement.center-bottom {
  left: 50%;
  bottom: 0;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.vue2ol-control-placement.right-bottom {
  right: 0;
  bottom: 0;
}
</style>
