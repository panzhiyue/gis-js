/**
 * @module utilscesium/Draw/DrawTool
 */

/**
 * Draw mode.  
 * cousins.
 * @enum {string}
 */
const Mode = {
    POINT: 'Point',
    Polyline: 'Polyline',
    POLYGON: 'Polygon',
    CIRCLE: 'Circle'
};

/**
 * @classdesc
 * 图形绘制工具
 * @api
 */
 class DrawTool {

    constructor(opt_options) {
        let options = Object.assign({ type: "", maxPoints: Infinity }, opt_options);


        this.drawStart_ = new Cesium.Event();
        this.drawEnd_ = new Cesium.Event();
        this.type_ = options.type;
        this.active = false;
        this.maxPoints_ = options.maxPoints;
        this.entities_ = new Cesium.EntityCollection();
        this.point_ = {
            color: Cesium.Color.RED,
            pixelSize: 5,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        };

        /**
         * 定义为私有事件
         */
        Object.defineProperties(this, {
            drawStart: {
                get: function () {
                    return this.drawStart_;
                }
            },
            drawEnd: {
                get: function () {
                    return this.drawEnd_;
                }
            },
            active: {
                set: function (value) {
                    this.active_ = value;
                },
                get: function () {
                    return this.active_;
                }
            },
            type: {
                set: function (value) {
                    switch (value) {
                        case "Point":
                        case "Polyline":
                        case "Polygon":
                        case "Rectangle":
                        case "Circle":
                            {
                                this.type_ = value;
                                break;
                            }
                        default: {
                            throw "Error type " + value;
                            break;
                        }
                    }

                },
                get: function () {
                    return this.type_;
                }

            }

        });

    }

    /**
     * 绑定viewer
     * @param {module:Cesium/Viewer} viewer
     */
    setViewer(viewer) {
        this.viewer_ = viewer;
    }

    startDraw() {
        //定义事件对象
        if (!Cesium.defined(this.handler_)) {
            this.handler_ = new Cesium.ScreenSpaceEventHandler(this.viewer_.scene.canvas);
        }

        //单击鼠标左键画点
        this.handler_.setInputAction(function (event) {
            //获取点击的地图坐标点
            let position = this.getPosition(event);
            this.entities_.add(this.viewer_.entities.add({
                position: position,
                point: point
            }));
        }.bind(this), Cesium.ScreenSpaceEventType.LEFT_CLICK);


    }

    getPosition(event) {
        let ray = this.viewer_.camera.getPickRay(event.position);
        let position = this.viewer_.scene.globe.pick(ray, this.viewer_.scene);
        return position;
    }


}

export default DrawTool;
