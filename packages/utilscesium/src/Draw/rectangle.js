/**
 * @module utilscesium/Draw/Rectangle
 */

import DrawModel from "./DrawModel.js"
import PlotTypes from "../Plot/PlotTypes"
/**
 * @classdesc
 * 矩形
 * @api
 */
 class Rectangle extends DrawModel {

    constructor(opt_options) {
        let options = Object.assign({
            rectangleGraphics: {
                material: Cesium.Color.BLACK.withAlpha(0.4),
                outline: true,
                outlineWidth: 2,
                outlineColor: Cesium.Color.RED,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        }, opt_options);
        super(options);
        this.positions_ = [];
        this.poly_ = undefined;

        /**
         * 矩形样式
         * @type {Cesium.RectangleGraphics}
         */
        this.rectangleGraphics_ = options.rectangleGraphics;

        this.geometryType = PlotTypes.RECTANGLE;
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
                if (this.positions_.length == 0) {
                    this.drawStart.raiseEvent({ type: "drawStart" });

                    let position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.screenPositionToCartesian(event.position));
                    
                    this.positions_.push(position);
                }
            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //鼠标移动
            this.handler_.setInputAction(function (event) {
                if (this.positions_.length == 0) {
                    return;
                }
                let position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.screenPositionToCartesian(event.endPosition));

                let rect = Cesium.Rectangle.fromCartographicArray([position, this.positions_[0]]);
                if (!this.poly_) {
                    this.rectangleGraphics_.coordinates = rect;
                    this.poly_ = new Cesium.Entity({
                        rectangle: this.rectangleGraphics_
                    });

                    this.viewer_.entities.add(this.poly_);
                } else {
                    this.poly_.rectangle.coordinates = new Cesium.CallbackProperty(function () {
                        return rect;
                    }, false);;
                }
            }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            //双击鼠标左键结束
            this.handler_.setInputAction(function (event) {
                if (this.positions_.length == 1) {
                    let position = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.screenPositionToCartesian(event.position));

                    let rect = Cesium.Rectangle.fromCartographicArray([position, this.positions_[0]]);
                    this.drawEnd.raiseEvent({ type: "drawEnd", rect: rect });
                    this.positions_ = [];
                    this.viewer_.entities.remove(this.poly_);
                    this.poly_ = null;
                }
            }.bind(this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        } else {
            this.deActiveEvent.raiseEvent({ type: "deActive" });
            if (Cesium.defined(this.handler_)) {
                this.handler_.destroy();
                this.handler_ = null;
                this.positions_ = [];
                if (Cesium.defined) {
                    this.viewer_.entities.remove(this.poly_);
                    this.poly_ = null;
                }
            }
        }
    }
}

export default Rectangle;