<template>
  <vue2ol-control-drag
    v-if="visible"
    class="vue2ol-control-panel"
    v-bind="dragOptions"
    :class="classes"
    :style="wrapperStyle"
  >
    <vue2ol-control-resize v-bind="resizeOptions" :style="panelSize">
      <div
        v-if="title || $slots.title || $slots.toolbar"
        ref="header"
        class="vue2ol-control-panel__header"
      >
        <div class="vue2ol-control-panel__title">
          <!-- <MyIcon v-if="icon" v-bind="iconOptions"></MyIcon> -->
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="$slots.toolbar" :class="toolbarClass">
          <slot name="toolbar"></slot>
        </div>
        <i
          v-if="closable"
          @click="handleClose"
          class="vue2ol-control-panel__close el-icon-close"
        ></i>
      </div>
      <div class="vue2ol-control-panel__body">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" ref="footer" :class="footerClass">
        <slot name="footer"></slot>
      </div>
      <slot name="append"></slot>
    </vue2ol-control-resize>
  </vue2ol-control-drag>
</template>
<script>
import Vue2olControlResize from "./Resize.vue";
import Vue2olControlDrag from "./Drag.vue";

/**
 * 面板组件
 * @module $ui/map/my-map-panel
 */
export default {
  name: "Vue2olControlPanel",
  components: {
    Vue2olControlResize,
    Vue2olControlDrag,
  },
  data() {
    return {};
  },
};
</script>
<style scoped></style>
