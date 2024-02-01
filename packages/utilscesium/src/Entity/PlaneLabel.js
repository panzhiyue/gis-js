/**
 *
 *
 * @class PlaneLabel
 * @extends {Cesium.Entity}
 */
class PlaneLabel extends Cesium.Entity {
  /**
   * 创建PlaneLabel的实例
   * @param {Object} opt_options
   * @param {number} [opt_options.size=24] 大小
   * @param {string} [opt_options.color='rgba(255,255,255,1)'] 颜色
   * @param {string} [opt_options.content=''] 内容
   * @param {number} [opt_options.heading]
   * @param {number} [opt_options.pitch]
   * @param {number} [opt_options.roll]
   * @memberof PlaneLabel
   */
  constructor(opt_options) {
    const options = Object.assign(
      {
        size: 24,
        color: "rgba(255,255,255,1)",
        content: "test",
        heading: 0,
        pitch: 0,
        roll: 0,
      },
      opt_options
    );
    const textSize = options.size * 10;
    const canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.font = `${textSize}px sans-serif`;

    let measureText = ctx.measureText(options.content);
    const rectWidth = measureText.width;
    const rectHeight = textSize;
    canvas.width = rectWidth;
    canvas.height = rectHeight;

    ctx = canvas.getContext("2d");
    ctx.textBaseline = "bottom";
    ctx.font = `${textSize}px sans-serif`;
    ctx.fillStyle = options.color;
    ctx.fillText(options.content, 0, rectHeight);

    var headingcone = Cesium.Math.toRadians(options.heading);
    var pitchcone = Cesium.Math.toRadians(options.pitch);
    var rollcone = Cesium.Math.toRadians(options.roll);
    var hprcone = new Cesium.HeadingPitchRoll(headingcone, pitchcone, rollcone);
    //镜头对准方法：
    var orientationcone = Cesium.Transforms.headingPitchRollQuaternion(
      options.position,
      hprcone
    );

    super({
      name: "Red cone",
      position: options.position,
      orientation: orientationcone,
      plane: {
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
        dimensions: new Cesium.Cartesian2(rectWidth / 10, rectHeight / 10),
        material: new Cesium.ImageMaterialProperty({
          image: canvas.toDataURL("image/png"),
          transparent: true,
          color: Cesium.Color.fromCssColorString(options.color),
        }),
      },
    });
  }
}

export default PlaneLabel;
