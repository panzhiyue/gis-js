/**
 * @module utilscesium/Shaders/Rain
 */

import Direction from "../Direction.js"

/**
 * @classdesc
 * 动态雨
 * @api
 */
class Rain {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {boolean} [opt_options.isWind]  是否显示摇摆效果
     * @param {module:utilscesium/Direction} [opt_options.vertical]  纵方向
     * @param {string} [opt_options.verticalSpeed]  纵方向速度(浮点型字符串,如1.0)
     * @param {module:utilscesium/Direction} [opt_options.horizontal]  横方向
     * @param {string} [opt_options.horizontalSpeed]  横方向速度(浮点型字符串,如1.0)
     * @param {string} [opt_options.brightness]  雪白亮度(浮点型字符串,如1.0)
     */
    constructor(opt_options) {
        let options = Object.assign({ isWind: true, vertical: Direction.DOWN, verticalSpeed: '1.0', horizontal: Direction.RIGHT, horizontalSpeed: "1.0", brightness: "1.0" }, opt_options);
        this.isWind_ = options.isWind;
        this.vertical_ = options.vertical;
        this.verticalSpeed_ = options.verticalSpeed;
        this.horizontal_ = options.horizontal;
        this.horizontalSpeed_ = options.horizontalSpeed;
        this.brightness_ = options.brightness;
    }

    /**
     * 生成代码
     * @return {string} 代码
     */
    generate() {
        let str = 'uniform sampler2D colorTexture;';
        str += 'varying vec2 v_textureCoordinates;';
        str += 'float hash(float x){';
        str += 'return fract(sin(x * 133.3) * 13.13);';
        str += '}';
        str += 'void main(void){';
        str += 'float time = czm_frameNumber / 60.0;';
        str += 'vec2 resolution = czm_viewport.zw;';
        str += 'vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);';
        str += 'vec3 c = vec3(.6, .7, .8);';
        str += 'float a = -.4;';
        str += 'float si = sin(a), co = cos(a);';
        str += 'uv *= mat2(co, -si, si, co);';
        str += 'uv *= length(uv + vec2(0, 4.9)) * .3 + 1.;';
        str += 'float v = 1. - sin(hash(floor(uv.x * 100.)) * 2.);';
        str += 'float b = clamp(abs(sin(20. * time * v + uv.y * (5. / (2. + v)))) - .95, 0., 1.) * 20.;';
        str += 'c[0] *=v*b;';
        str += 'c[1] *=v*b;';
        str += 'c[2] *=v*b;';
        // str += 'c *= v * b;';
        str += 'gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c, 1), 0.5);';
        str += '}';
        return str;
    }
}

export default Rain;
