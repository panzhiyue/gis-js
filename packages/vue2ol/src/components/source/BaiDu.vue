<template>
  <div></div>
</template>
<script>
import TileImageSourceMixin from "../../mixins/TileImageSource";
import TileImage from "ol/source/TileImage";
import TileGrid from "ol/tilegrid/TileGrid";
import { optionsMerger, bindListeners, propsBinder,getListeners } from "../../utils/index";
import { createFromTemplates, expandUrl } from "ol/tileurlfunction";
/**
 * 百度地图
 * @see https://blog.csdn.net/u013594477/article/details/83988055
 */
export default {
  name: "Vue2olSourceBaidu",
  mixins: [TileImageSourceMixin],
  data() {
    return {
      newUrl: "",
    };
  },
  props: {
    /**
     * 矢量地图:normal_map,影像地图:satellite_map,影像注记:satellite_annotion
     * @values "normal_map" | "satellite_map" | "satellite_annotion"
     *
     */
    layer: {
      type: String,
      default: "normal_map",
    },
    /**
     * 坐标系
     * @typeName {import('ol/proj').ProjectionLike}
     */
    projection: {
      type: [String, Object],
      default: "EPSG:3857",
    },
  },
  mounted() {
    if (this.layer == "normal_map") {
      this.newUrl = `http://online0.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1`;
    } else if (this.layer == "satellite_map") {
      this.newUrl = `http://shangetu0.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46`;
    } else if (this.layer == "satellite_annotion") {
      this.newUrl = `http://online0.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020`;
    }

    //分辨率
    var resolutions = [];
    for (var i = 0; i < 19; i++) {
      resolutions[i] = Math.pow(2, 18 - i);
    }

    var tileGrid = new TileGrid({
      origin: [0, 0],
      resolutions: resolutions,
    });
    let options = optionsMerger(
      {
        ...(this.tileImageSourceOptions || {}),
        tileGrid,
        projection: this.projection,
        tileUrlFunction: (tileCoord, pixelRatio, proj) => {
          if (!tileCoord) {
            return "";
          }
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = -tileCoord[2] - 1;

          if (x < 0) {
            x = "M" + -x;
          }
          if (y < 0) {
            y = "M" + -y;
          }
          return this.newUrl
            .replace("{x}", x)
            .replace("{y}", y)
            .replace("{z}", z);
        },
      },
      this
    );

    //初始化view对象
    this.mapObject = new TileImage(options);

    //绑定事件
    bindListeners(this.mapObject, getListeners(this));
    //监听props属性
    propsBinder(this, this.mapObject, this.$options.props);

    this.parent.setSource(this.mapObject);

    this.ready = true;
    this.$nextTick(() => {
      /**
       * 组件就绪时触发
       * @type {object}
       * @property {import('ol/source/TileImage').default} mapObject
       */
      this.$emit("ready", this.mapObject);
    });
  },
};
</script>