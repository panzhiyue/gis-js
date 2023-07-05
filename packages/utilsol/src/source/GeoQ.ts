import XYZ from "ol/source/XYZ"
import { Options as XYZOptions } from "ol/source/XYZ"

export interface GeoQOptions extends XYZOptions {
  /**
   * 矢量地图:normal_map,午夜蓝:normal_purplishblue,灰色:normal_gray,暖色:normal_warm,水系:theme_hydro
   */
  layer?: string,
}

/**
 * 智图的图层数据源
 */
class GeoQ extends XYZ {
  /**
   * 
   * @param options 
   */
  constructor(opt_options: GeoQOptions) {
    const options: GeoQOptions = opt_options || {};
    let layer = options.layer === undefined ? 'normal_map' : options.layer;
    let url;
    if (layer == "normal_map") {
      url = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}`;
    } else if (layer == "normal_purplishblue") {
      url = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`;
    } else if (layer == "normal_gray") {
      url = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}`;
    } else if (layer == "normal_warm") {
      url = `http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}`;
    } else if (layer == "theme_hydro") {
      url = `http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}`;
    }


    super({
      ...options,
      url,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 18,
    });

  }
}

export default GeoQ;