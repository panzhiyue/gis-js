/**
 * @module utilscesium/Draw/PolylineBuffer
 */

 import Polygon from "./Polygon.js"
 import PlotHelper from "../Plot/PolylineBuffer"
 import * as Coordinate from "../Coordinate"
 import PlotTypes from "../Plot/PlotTypes"

 /**
  * @classdesc
  * 细直箭头
  * 用两点绘制直箭头。
  * @api
  */
 class PolylineBuffer extends Polygon {
 
     /**
     * 构造函数
     * @param {Object} opt_options
     */
     constructor(opt_options) {
         let options = Object.assign({}, opt_options);
 
         super(options);
 
         this.geometryType = PlotTypes.POLYLINE_BUFFER;
     }
 
 
     /**
      * 重写了父类的方法
      * 用于通过控制点计算直箭头的所有绘制点
      * @param {Array<Cesium.Cartesian3>} positions
      */
     calcPositions_(positions) {
         if (positions.length < 2) {
             return;
         }
         let coordinates = Coordinate.fromCartesian3Array(positions);
         return new PlotHelper({ points: coordinates }).generate();
     }
 }
 
 export default PolylineBuffer;