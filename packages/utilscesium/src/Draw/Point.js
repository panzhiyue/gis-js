/**
 * @module utilscesium/Draw/Point
 */

import DrawModel from "./DrawModel.js";
import PlotTypes from "../Plot/PlotTypes";

/**
 * @classdesc
 * 点绘制
 * @api
 */
class Point extends DrawModel {
  constructor(opt_options) {
    let options = Object.assign({}, opt_options);
    super(options);

    this.geometryType = PlotTypes.POINT;
  }

  /**
   * 绘图控件激活
   * @param {boolean} bool true:激活,false:取消
   */
  setActive(bool) {
    //定义事件对象
    if (!Cesium.defined(this.handler_)) {
      this.handler_ = new Cesium.ScreenSpaceEventHandler(
        this.viewer_.scene.canvas
      );
    }
    //激活
    if (bool) {
      this.activeEvent.raiseEvent({ type: "active" });
      //单击鼠标左键画点
      this.handler_.setInputAction(
        function(event) {
          //获取点击的地图坐标点
          let position = this.screenPositionToCartesian(event.position);
          if (!Cesium.defined(position)) {
            return;
          }
          //触发开始绘制事件
          this.drawStart.raiseEvent({ type: "drawStart" });

          //触发结束绘制事件
          this.drawEnd.raiseEvent({ type: "drawEnd", position: position });
        }.bind(this),
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );
    } else {
      //取消激活
      this.deActiveEvent.raiseEvent({ type: "deActive" });
      //注销事件对象
      if (Cesium.defined(this.handler_)) {
        this.handler_.destroy();
        this.handler_ = null;
      }
    }
  }
}

export default Point;
