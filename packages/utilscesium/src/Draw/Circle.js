/**
 * @module utilscesium/Draw/Circle
 */

import DrawModel from "./DrawModel.js"
import PlotTypes from "../Plot/PlotTypes"

/**
 * @classdesc
 * 圆绘制
 * @api
 */
 class Circle extends DrawModel {

    constructor(opt_options) {
        let options = Object.assign({
            ellipseGraphics: {
                material: Cesium.Color.BLACK.withAlpha(0.4),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        }, opt_options);
        super(options);
        this.entity_ = undefined;
        this.radius_ = undefined;
        /**
         * 矩形样式
         * @type {Cesium.RectangleGraphics}
         */
        this.ellipseGraphics_ = options.ellipseGraphics;

        this.geometryType = PlotTypes.CIRCLE;
    }

    /**
    * 绘图控件激活
    * @param {boolean} bool true:激活,false:取消
    */
    setActive(bool) {
        if (!Cesium.defined(this.handler_)) {
            this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
        }
        if (bool) {
            this.activeEvent.raiseEvent({ type: "active" });
            //鼠标左键单击画点
            this.handler_.setInputAction(function (event) {
                if (!Cesium.defined(this.radius_)) {
                    this.drawStart.raiseEvent({ type: "drawStart" });
                    this.position_=this.screenPositionToCartesian(event.position);
                }
            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            this.handler_.setInputAction(function (event) {
                if (!Cesium.defined(this.position_)) {
                    return;
                }
                let position=this.screenPositionToCartesian(event.endPosition);

                let point1cartographic = Cesium.Cartographic.fromCartesian(this.position_);
                let point2cartographic = Cesium.Cartographic.fromCartesian(position);

                /**根据经纬度计算出距离**/
                let geodesic = new Cesium.EllipsoidGeodesic();
                geodesic.setEndPoints(point1cartographic, point2cartographic);
                this.radius_ = geodesic.surfaceDistance;

                if (!this.entity_) {
                    this.ellipseGraphics_.semiMinorAxis = this.radius_;
                    this.ellipseGraphics_.semiMajorAxis = this.radius_;
                    this.entity_ = new Cesium.Entity({
                        position: this.position_,
                        ellipse: this.ellipseGraphics_
                    });

                    this.viewer_.entities.add(this.entity_);
                } else {
                    this.entity_.ellipse.semiMinorAxis = new Cesium.CallbackProperty(function () {
                        return this.radius_;
                    }.bind(this), false);
                    this.entity_.ellipse.semiMajorAxis = new Cesium.CallbackProperty(function () {
                        return this.radius_;
                    }.bind(this), false);
                }
            }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);



            //双击鼠标左键结束
            this.handler_.setInputAction(function (event) {
                if (!Cesium.defined(this.position_) || !Cesium.defined(this.radius_)) {
                    return;
                }
                this.drawEnd.raiseEvent({ type: "drawEnd", position: this.position_, radius: this.radius_ });
                this.viewer_.entities.remove(this.entity_);
                this.entity_ = null;
                this.position_ = null;
                this.radius_ = null;

            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


        } else {
            this.deActiveEvent.raiseEvent({ type: "deActive" });
            if (Cesium.defined(this.handler_)) {
                this.handler_.destroy();
                this.handler_ = null;
            }
        }
    }

}

export default Circle;