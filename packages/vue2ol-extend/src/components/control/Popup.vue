<template>
  <vue2ol-overlay
    class="vue2ol-control-popup"
    :class="['vue2ol-control-popup-' + direction]"
    v-bind="$attrs"
    :parentMap="parentMap"
    :position="position"
    :positioning="positioning"
    :offset="offset"
    v-show="visible"
  >
    <div class="vue2ol-control-popup-content-wrapper">
      <div class="vue2ol-control-popup-content">
        <slot></slot>
      </div>
    </div>
    <div class="vue2ol-control-popup-tip-container">
      <div class="vue2ol-control-popup-tip"></div>
    </div>
    <span
      class="vue2ol-control-popup-close-button"
      v-if="showClose"
      @click="close"
      >×</span
    >
  </vue2ol-overlay>
</template>

<script>
import { findRealParent, Vue2olOverlay } from "@gis-js/vue2ol";

/**
 * 弹框
 * @since v1.0.0
 */
export default {
  name: "Vue2olControlPopup",
  inheritAttrs: false,
  components: {
    Vue2olOverlay,
  },
  provide() {
    return {
      control: this,
    };
  },
  props: {
    /**
     * 地图,如果为null则从parent中获取
     * @typeName {import('ol/Map').default}
     */
    parentMap: {
      type: Object,
    },
    /**
     * 弹框显示位置
     * @values "left"|"right"|"top"|"bottom"
     */
    direction: {
      type: String,
      default: "top",
    },
    /**
     * 弹框位置
     * @typeName {import('ol/coordinate').Coordinate}
     */
    position: {
      type: Array,
    },
    /**
     * 是否显示关闭按钮
     */
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      parent: null,
      visible: false,
    };
  },
  watch: {
    position() {
      this.visible = true;
    },
  },
  computed: {
    positioning() {
      if (this.direction == "top") {
        return "bottom-center";
      } else if (this.direction == "bottom") {
        return "top-center";
      } else if (this.direction == "left") {
        return "center-right";
      } else if (this.direction == "right") {
        return "center-left";
      }
    },
    offset() {
      if (this.direction == "top") {
        return [0, -10];
      } else if (this.direction == "bottom") {
        return [0, 10];
      } else if (this.direction == "left") {
        return [-10, 0];
      } else if (this.direction == "right") {
        return [10, 0];
      }
    },
  },
  mounted() {
    if (this.parentMap) {
      this.parent = this.parentMap;
    } else {
      this.parent = findRealParent(this.$parent).mapObject;
    }
  },
  methods: {
    close() {
      this.visible = false;
    },
  },
};
</script>
<style scoped>
.vue2ol-control-popup {
}
.vue2ol-control-popup-content-wrapper {
  background: white;
  color: #333;
  box-shadow: 0 3px 14px rgb(0, 0, 0);
  padding: 1px;
  text-align: left;
  border-radius: 12px;
}

.vue2ol-control-popup-content {
  margin: 13px 19px;
  line-height: 1.4;
  min-width: 100px;
  min-height: 20px;
}

.vue2ol-control-popup-tip-container {
  width: 40px;
  height: 10px;
  position: absolute;
  left: 50%;
  margin-left: -20px;
  overflow: hidden;
  pointer-events: none;
}

.vue2ol-control-popup-tip {
  background: white;
  color: #333;
  width: 17px;
  height: 17px;
  padding: 1px;
  margin: -10px auto 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.vue2ol-control-popup-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 4px 0 0;
  border: none;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  color: #c3c3c3;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
}

.vue2ol-control-popup-bottom {
}
.vue2ol-control-popup-bottom .vue2ol-control-popup-tip-container {
  top: -10px;
}
.vue2ol-control-popup-bottom
  .vue2ol-control-popup-tip-container
  .vue2ol-control-popup-tip {
  margin-top: 1px;
}
.vue2ol-control-popup-left {
}

.vue2ol-control-popup-left .vue2ol-control-popup-tip-container {
  width: 10px;
  height: 40px;
  left: 100%;
  top: 50%;
  margin-left: -0px;
  margin-top: -20px;
}

.vue2ol-control-popup-left
  .vue2ol-control-popup-tip-container
  .vue2ol-control-popup-tip {
  margin-top: 10px;
  margin-left: -10px;
}

.vue2ol-control-popup-right {
}

.vue2ol-control-popup-right .vue2ol-control-popup-tip-container {
  width: 10px;
  height: 40px;
  left: -10px;
  top: 50%;
  margin-left: -0px;
  margin-top: -20px;
}

.vue2ol-control-popup-right
  .vue2ol-control-popup-tip-container
  .vue2ol-control-popup-tip {
  margin-top: 10px;
  margin-left: 3px;
}
</style>
