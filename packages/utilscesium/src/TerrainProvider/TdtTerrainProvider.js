/**
 * @module utilscesium/TerrainProvider/TdtTerrainProvider
 */

//需要引用天地图三维sdk(<script type="text/javascript" cesium="true" src="https://api.tianditu.gov.cn/cdn/plugins/cesium/Cesium_ext_min.js"></script>)
if (!Cesium.GeoTerrainProvider) {
  Cesium.GeoTerrainProvider = function() {};
}

/**
 * @classdesc
 * 天地图三维地形
 * @api
 */
class TdtTerrainProvider extends Cesium.GeoTerrainProvider {
  /**
   * 构造函数
   * @param {*} e
   * @param {string} [e.token] token
   * @param {string} [e.urls]
   * @param {string} [e.url] url地址
   * @param {string[]} [e.subdomains] subdomains
   */
  constructor(e = {}) {
    if (!e.urls) {
      const t = e.url || "https://t{s}.tianditu.gov.cn/mapservice/swdx",
        i = e.token;
      let r;
      r = Array.isArray(e.subdomains)
        ? e.subdomains.slice()
        : Cesium.defined(e.subdomains) && e.subdomains.length > 0
        ? e.subdomains.split("")
        : ["0", "1", "2", "3", "4", "5", "6", "7"];
      const n = [];
      r.forEach((e) => {
        const r = t.replace("{s}", e) + "?T=elv_c&tk=" + i;
        n.push(r);
      }),
        (e.urls = n);
    }
    console.log(e);
    super(e), (this._layers = []);
  }
}

export default TdtTerrainProvider;
