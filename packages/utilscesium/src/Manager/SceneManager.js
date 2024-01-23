/**
 * @module utilscesium/Manager/SceneManager
 */

function icrf(scene, time) {
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return;
    }
    const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
    if (Cesium.defined(icrfToFixed)) {
        const {
            camera
        } = scene;
        const offset = Cesium.Cartesian3.clone(scene.camera.position);
        const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
        camera.lookAtTransform(transform, offset);
    }
}

/**
 * 
 * @author 潘知悦
 * @classdesc
 * 场景管理
 * @api
 */
class ScaneManager {

    /**
     * 构造函数
     * @param {Object} opt_options 
     * @param {module:Cesium/Viewer} 查看器
     */
    constructor(opt_options) {
        let options = Object.assign({
            viewer: undefined
        }, opt_options);
        this.viewer_ = options.viewer;
        this.scene_ = this.viewer_.scene;
        this.ellipsoid_ = this.viewer_.scene.globe.ellipsoid;
    }

    /**
     * 开启自转
     * @param {Object} opt_options
     * @param {boolean} [opt_options.clockwise=true] 是否顺时针 
     * @param {number} [opt_options.time=3 * 60 * 60] 显示1秒表示过去的时间,值越大转的越快 
     */
    openRotation(opt_options) {
        let options = Object.assign({
            clockwise: true,
            time: 3 * 60 * 60
        }, opt_options);
        this.viewer_.camera.flyHome(0);
        this.viewer_.clock.multiplier = options.clockwise ? -options.time : options.time;
        this.viewer_.scene.preRender.addEventListener(icrf);
        this.viewer_.clock._shouldAnimate = true;
    }

    /**
     * 关闭自转
     */
    closeRotation() {
        this.viewer_.scene.preRender.removeEventListener(icrf);
        this.viewer_.clock.multiplier = 1;
        this.viewer_.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }

    /**
     * 切换场景模式
     * @param  {String} sceneMode 场景模式'3D', '2D','COLUMBUS_VIEW'(平面三维)
     * @param  {Number} [duration]  动画持续时间，<=0时，保持场景范围不变
     */
    changeSceneMode(sceneMode, duration) {
        let mSceneMode = null;
        switch (sceneMode) {
            case '3D':
                mSceneMode = Cesium.SceneMode.SCENE3D;
                break;
            case 'COLUMBUS_VIEW':
                mSceneMode = Cesium.SceneMode.COLUMBUS_VIEW;
                break;
            case '2D':
                mSceneMode = Cesium.SceneMode.SCENE2D;
                break;
            default:
                break;
        }
        const mDuraion = Cesium.defaultValue(duration, 2.0);
        if (this.viewer_.scene.mode !== mSceneMode) {
            if (mSceneMode === Cesium.SceneMode.SCENE3D) {
                this.viewer_.scene.morphTo3D(mDuraion);
            } else if (mSceneMode === Cesium.SceneMode.COLUMBUS_VIEW) {
                this.viewer_.scene.morphToColumbusView(mDuraion);
            } else {
                this.viewer_.scene.morphTo2D(mDuraion);
            }
        }
    }

    /**
     * 视距放大，物体缩小
     */
    zoomOut() {
        const cameraHeight = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.viewer_.camera.position).height;
        this.viewer_.camera.zoomOut(cameraHeight / 10);
    }

    /**
     * 视距缩小，物体放大
     */
    zoomIn() {
        const cameraHeight = this.viewer_.scene.globe.ellipsoid.cartesianToCartographic(this.viewer_.camera.position).height;
        this.viewer_.camera.zoomIn(cameraHeight / 10);
    }

    /**
     * 复位
     */
    goHome() {
        this.viewer_.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(104, 30, 15682725)
        });
    }

    //#region  绕点旋转

    /**
     * 绕点旋转 相机绕点飞行一周 或者相机绕自身旋转一周
     * @param {String} [type='rotationAroundPos'] 旋转类型  默认绕相机自身旋转
     * @param {Object} [optionsParam] 附加参数系信息
     * @param {Cartesian3} [optionsParam.position] 要进行围绕旋转的点
     * @param {Number} [optionsParam.pitch=-30] 相机的俯仰角   单位（度）
     * @param {Number} [optionsParam.distance=500000] 相机距离点的距离 单位（米）
     * @param {Number} [optionsParam.duration=10] 绕点飞行一周所用的时间  单位（秒）
     * @param {Number} [optionsParam.ClockRange=Cesium.ClockRange.CLAMPED] 循环方式
     * @returns {Event} 绕点旋转事件
     * @example
     * let opt ={
     *   position:Cesium.Cartesian3.fromDegrees(110,20,100),
     *   pitch:-30,
     *   distance:500000,
     *   duration:10,
     *   ClockRange:Cesium.ClockRange.CLAMPED
     * };
     * let update = commfun.rotationView('rotationAroundPos',opt) ;
     *
     */
    rotationView(type, optionsParam) {
        let options = Object.assign({
            position: null,
            pitch: -30,
            distance: 500000,
            duration: 10,
            ClockRange: Cesium.ClockRange.CLAMPED
        }, optionsParam);
        if (!Cesium.defined(type)) {
            return new Cesium.DeveloperError('必须指定旋转类型');
        }
        //const options = Cesium.defaultValue(optionsParam, {});
        const {
            position
        } = options;
        if (type === 'rotationAroundPos' && !Cesium.defined(position)) {
            return new Cesium.DeveloperError('必须指定旋转点');
        }
        const pitch = Cesium.Math.toRadians(options.pitch);
        const distance = options.distance;
        const duration = options.duration;
        const angle = 360.0 / duration;
        const startTime = Cesium.JulianDate.fromDate(new Date());
        const stopTime = Cesium.JulianDate.addSeconds(startTime, duration, new Cesium.JulianDate());
        this.viewer_.clock.startTime = startTime.clone();
        this.viewer_.clock.stopTime = stopTime.clone();
        this.viewer_.clock.currentTime = startTime.clone();
        this.viewer_.clock.clockRange = Cesium.ClockRange.CLAMPED;
        this.viewer_.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
        const currentHeading = this.viewer_.camera.heading;
        const update = () => {
            const delTime = Cesium.JulianDate.secondsDifference(this.viewer_.clock.currentTime, this.viewer_.clock.startTime);
            const heading = -Cesium.Math.toRadians(delTime * angle) + currentHeading;
            let nowPostion = this.scene_.camera.position;
            if (type === 'rotationAroundPos' && Cesium.defined(position)) {
                nowPostion = position;
            }
            this.scene_.camera.setView({
                destination: nowPostion,
                orientation: {
                    heading,
                    pitch
                }
            });
            this.scene_.camera.moveBackward(distance);
            if (Cesium.JulianDate.compare(this.viewer_.clock.currentTime, this.viewer_.clock.stopTime) >= 0) {
                this.viewer_.clock.onTick.removeEventListener(update);
            }
        };
        this.viewer_.clock.shouldAnimate = true;
        this.viewer_.clock.onTick.addEventListener(update);
        return update;
    }

    /**
     * 移除绕点自旋转事件
     * @param {Event} event 绕点旋转事件
     * @example
     * let opt ={
     *   position:Cesium.Cartesian3.fromDegrees(110,20,100),
     *   pitch:-30,
     *   distance:500000,
     *   duration:10,
     *   ClockRange:Cesium.ClockRange.CLAMPED
     * };
     * let update = commfun.rotationView('rotationAroundPos',opt) ;
     * commfun.removeRotationView(update);
     */
    removeRotationView(event) {
        if (Cesium.defined(event)) {
            this.viewer_.clock.onTick.removeEventListener(event);
            this.viewer_.clock.shouldAnimate = this.shouldAnimate;
        }
    }

    /**
     * 暂停围绕旋转
     * @example
     * //let opt ={
     * //    position:Cesium.Cartesian3.fromDegrees(110,20,100),
     * //    pitch:-30,
     * //    distance:500000,
     * //    duration:10,
     * //    ClockRange:Cesium.ClockRange.CLAMPED
     * //   };
     * //let update = commfun.rotationView('rotationAroundPos',opt) ;
     * commfun.pauseRotationView();
     */
    pauseRotationView() {
        this.viewer_.clock.shouldAnimate = false;
    }

    /**
     * 开始围绕旋转 与暂停配合使用
     * @example
     * //let opt ={
     * //    position:Cesium.Cartesian3.fromDegrees(110,20,100),
     * //    pitch:-30,
     * //    distance:500000,
     * //    duration:10,
     * //    ClockRange:Cesium.ClockRange.CLAMPED
     * //   };
     * //let update = commfun.rotationView('rotationAroundPos',opt) ;
     * //commfun.pauseRotationView();
     * commfun.startRotationAroundPos(update);
     */
    startRotationAroundPos() {
        this.viewer_.clock.shouldAnimate = true;
    }

    //#endregion
    /**
     * 移除球体
     */
    hideGlobe() {
        this.viewer_.scene.globe.show = false;
    }
    
    /**
     * 显示球体
     */
    showGlobe() {
        this.viewer_.scene.globe.show = true;
    }
}

export default ScaneManager;