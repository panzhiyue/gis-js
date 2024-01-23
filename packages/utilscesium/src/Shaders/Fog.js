/**
 * @module utilscesium/Shaders/Fog
 */

/**
 * @classdesc
 * 动态雾
 * @api
 */
class Fog {
    /**
     * 构造函数
     * @param {Object} opt_options
     */
    constructor(opt_options) {
        let options = Object.assign({}, opt_options);
    }

    /**
     * 生成代码
     * @return {string} 代码
     */
    generate() {
        let str = 'uniform sampler2D colorTexture;';
        str += 'uniform sampler2D depthTexture;';
        str += 'varying vec2 v_textureCoordinates;';
        str += 'void main(void)';
        str += '{';
        str += 'vec4 origcolor = texture2D(colorTexture, v_textureCoordinates);';
        str += 'vec4 fogcolor = vec4(0.8, 0.8, 0.8, 0.5);';
        str += 'float depth = czm_readDepth(depthTexture, v_textureCoordinates);';
        str += 'vec4 depthcolor = texture2D(depthTexture, v_textureCoordinates);';
        str += 'float f = (depthcolor.r - 0.22) / 0.2;';
        str += 'if (f < 0.0) f = 0.0;';
        str += 'else if (f > 1.0) f = 1.0;';
        str += 'gl_FragColor = mix(origcolor, fogcolor, f/1.0);';
        str += '}';
        return str;
    }
}

export default Fog;