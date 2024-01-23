/**
 * @module utilscesium/Shaders/Snow
 */

import Direction from "../Direction.js"

/**
 * @classdesc
 * 动态雪 
 * @api
 */
class Snow {
    /**
     * 构造函数
     * @param {Object} opt_options
     * @param {boolean} [opt_options.isWind=true]  是否显示摇摆效果
     * @param {module:utilscesium/Direction} [opt_options.vertical=Direction.DOWN]  纵方向
     * @param {string} [opt_options.verticalSpeed=1.0]  纵方向速度(浮点型字符串,如1.0)
     * @param {module:utilscesium/Direction} [opt_options.horizontal=Direction.RIGHT]  横方向
     * @param {string} [opt_options.horizontalSpeed=1.0]  横方向速度(浮点型字符串,如1.0)
     * @param {string} [opt_options.brightness=1.0]  雪白亮度(浮点型字符串,如1.0)
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
     * 代码
     * @return {string} 代码
     */
    generate() {
        let str = 'uniform sampler2D colorTexture;';
        str += 'varying vec2 v_textureCoordinates;';
        str += 'float snow(vec2 uv, float scale)';
        str += '{';

        str += 'float time = czm_frameNumber / 60.0;';
        str += 'float w = smoothstep(1., 0., -uv.y * (scale / 10.));';
        str += 'if (w < .1) return 0.;';
        //str += 'uv += time / scale;';
        //str += 'uv.y += time * 2. / scale;';
        if (this.horizontal_) {
            if (this.horizontal_ == Direction.LEFT) {
                str += 'uv.x += time * 2. / scale*' + this.horizontalSpeed_ + ';';
            } else if (this.horizontal_ == Direction.RIGHT) {
                str += 'uv.x -= time * 2. / scale*' + this.horizontalSpeed_ + ';';
            }

        }

        if (this.vertical_) {
            if (this.vertical_ == Direction.DOWN) {
                str += 'uv.y += time * 2. / scale*' + this.verticalSpeed_ + ';';
            } else if (this.vertical_ == Direction.UP) {
                str += 'uv.y -= time * 2. / scale*' + this.verticalSpeed_ + ';';
            }

        }
        if (this.isWind_) {
            str += 'uv.x += sin(uv.y + time * .5) / scale;';
        }
        str += 'uv *= scale; vec2 s = floor(uv), f = fract(uv), p; float k = 3., d;';
        str += 'p = .5 + .35 * sin(11. * fract(sin((s + p + scale) * mat2(7, 3, 6, 5)) * 5.)) - f; d = length(p); k = min(d, k);';
        str += 'k = smoothstep(0., k, sin(f.x + f.y) * 0.01);';
        str += 'return k * w*' + this.brightness_ + ';';
        str += '}';

        str += 'void main(void){';
        str += 'vec2 resolution = czm_viewport.zw;';
        str += 'vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);';
        str += 'vec3 finalColor = vec3(0);';
        str += 'float c = 0.0;';
        str += 'c += snow(uv, 30.) * .0;';
        str += 'c += snow(uv, 20.) * .0;';
        str += 'c += snow(uv, 15.) * .0;';
        str += 'c += snow(uv, 10.);';
        str += 'c += snow(uv, 8.);';
        str += 'c += snow(uv, 6.);';
        str += 'c += snow(uv, 5.);';
        str += 'finalColor = (vec3(c));';
        str += 'gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor, 1), 0.5);';
        str += '}';

        return str;
    }
}

export default Snow;