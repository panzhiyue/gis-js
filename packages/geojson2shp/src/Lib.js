/**
 * @module GeoJson2Shp/Dbf/Lib
 */

/**
 * 左补位
 * @param {string} str 原字符串
 * @param {number} len 目标字符串长度
 * @param {string} char 补位字符
 * @returns {string} 补位后的字符串
 */
export function lpad(str, len, char) {
    while (str.length < len) { str = char + str; } return str;
};

/**
 * 右补位
 * @param {string} str 原字符串
 * @param {number} len 目标字符串长度
 * @param {string} char 补位字符
 * @returns {string} 补位后的字符串
 */
export function rpad(str, len, char) {
    while (str.length < len) { str = str + char; } return str;
};

/**
 * 修改
 * 作者:潘知悦
 * 描述:中文乱码问题
 * @param {object} view
 * @param {number} fieldLength
 * @param {string} str
 * @param {number} offset
 * @returns {number}
 */
export function writeField(view, fieldLength, str, offset) {
    let uint8Array = stringToUint8Array(str);
    for (var i = 0; i < fieldLength; i++) {
        view.setUint8(offset, uint8Array[i]);
        offset++;
    }
    return offset;
};
/**
 * 字符串转Uint8Array
 * @param {string} string
 * @param {Object} options 
 * @param {boolean} [options.stream] 是否为流
 */
export function stringToUint8Array(string, options = { stream: false }) {
    if (options.stream) {
        throw new Error(`Failed to encode: the 'stream' option is unsupported.`);
    }

    let pos = 0;
    const len = string.length;
    const out = [];

    let at = 0;  // output position
    let tlen = Math.max(32, len + (len >> 1) + 7);  // 1.5x size
    let target = new Uint8Array((tlen >> 3) << 3);  // ... but at 8 byte offset

    while (pos < len) {
        let value = string.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff) {
            // high surrogate
            if (pos < len) {
                const extra = string.charCodeAt(pos);
                if ((extra & 0xfc00) === 0xdc00) {
                    ++pos;
                    value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                }
            }
            if (value >= 0xd800 && value <= 0xdbff) {
                continue;  // drop lone surrogate
            }
        }

        // expand the buffer if we couldn't write 4 bytes
        if (at + 4 > target.length) {
            tlen += 8;  // minimum extra
            tlen *= (1.0 + (pos / string.length) * 2);  // take 2x the remaining
            tlen = (tlen >> 3) << 3;  // 8 byte offset

            const update = new Uint8Array(tlen);
            update.set(target);
            target = update;
        }

        if ((value & 0xffffff80) === 0) {  // 1-byte
            target[at++] = value;  // ASCII
            continue;
        } else if ((value & 0xfffff800) === 0) {  // 2-byte
            target[at++] = ((value >> 6) & 0x1f) | 0xc0;
        } else if ((value & 0xffff0000) === 0) {  // 3-byte
            target[at++] = ((value >> 12) & 0x0f) | 0xe0;
            target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else if ((value & 0xffe00000) === 0) {  // 4-byte
            target[at++] = ((value >> 18) & 0x07) | 0xf0;
            target[at++] = ((value >> 12) & 0x3f) | 0x80;
            target[at++] = ((value >> 6) & 0x3f) | 0x80;
        } else {
            // FIXME: do we care
            continue;
        }

        target[at++] = (value & 0x3f) | 0x80;
    }

    return target.slice(0, at);
}
