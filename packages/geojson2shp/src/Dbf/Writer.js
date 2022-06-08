/**
 * @module GeoJson2Shp/Dbf/Write
 */

import * as Lib from '../Lib.js'
import * as Field from './Field.js'

/**
 * 根据属性对象与字段定义生成dbf文件流,字段定义可不传,通过属性对象进行生成
 * dbf文件结构
 *
 *           _______________________  _______
 * 00h /   0| 版本号(dBase III)     |  ^
 *          |-----------------------|  |
 * 01h /   1|  最后更新时间(年)     |  |
 * 02h /   2|  最后更新时间(月)     |  |
 * 03h /   3|  最后更新时间(日)     |  |
 *          |-----------------------|  |
 * 04h /   4| 记录数量              | Record
 * 05h /   5|                       | header
 * 06h /   6|                       |  |
 * 07h /   7|                       |  |
 *          |-----------------------|  |
 * 08h /   8| 文件头信息长度        |  |
 * 09h /   9|                       |  |
 *          |-----------------------|  |
 * 0Ah /  10| 每条记录的长度        |  |
 * 0Bh /  11|                       |  |
 *          |-----------------------|  |
 * 0Ch /  12| ( Reserved )        *3|  |
 * 0Dh /  13|                       |  |
 *          |-----------------------|  |
 * 0Eh /  14| Incomplete transac.*12|  |
 *          |-----------------------|  |
 * 0Fh /  15| Encryption flag    *13|  |
 *          |-----------------------|  |
 * 10h /  16| Free record thread    |  |
 * 11h /  17| (reserved for LAN     |  |
 * 12h /  18|  only )               |  |
 * 13h /  19|                       |  |
 *          |-----------------------|  |
 * 14h /  20| ( Reserved for        |  |            _        |=======================| ______
 *          |   multi-user dBASE )  |  |           / 00h /  0| Field name in ASCII   |  ^
 *          : ( dBASE III+ - )      :  |          /          : (terminated by 00h)   :  |
 *          :                       :  |         |           |                       |  |
 * 1Bh /  27|                       |  |         |   0Ah / 10|                       |  |
 *          |-----------------------|  |         |           |-----------------------| For
 * 1Ch /  28| MDX flag (dBASE IV)*14|  |         |   0Bh / 11| Field type (ASCII) *20| each
 *          |-----------------------|  |         |           |-----------------------| field
 * 1Dh /  29| Language driver     *5|  |        /    0Ch / 12| Field data address    |  |
 *          |-----------------------|  |       /             |                     *6|  |
 * 1Eh /  30| ( Reserved )          |  |      /              | (in memory !!!)       |  |
 * 1Fh /  31|                     *3|  |     /       0Fh / 15| (dBASE III+)          |  |
 *          |=======================|__|____/                |-----------------------|  |  -
 * 20h /  32|                       |  |  ^          10h / 16| Field length       *22|  |   |
 *          |- - - - - - - - - - - -|  |  |                  |-----------------------|  |   | *7
 *          |                    *19|  |  |          11h / 17| Decimal count      *23|  |   |
 *          |- - - - - - - - - - - -|  |  Field              |-----------------------|  |  -
 *          |                       |  | Descriptor  12h / 18| ( Reserved for        |  |
 *          :. . . . . . . . . . . .:  |  |array     13h / 19|   multi-user dBASE)*18|  |
 *          :                       :  |  |                  |-----------------------|  |
 *       n  |                       |__|__v_         14h / 20| Work area ID       *16|  |
 *          |-----------------------|  |    \                |-----------------------|  |
 *       n+1| Terminator (0Dh)      |  |     \       15h / 21| ( Reserved for        |  |
 *          |=======================|  |      \      16h / 22|   multi-user dBASE )  |  |
 *       m  | Database Container    |  |       \             |-----------------------|  |
 *          :                    *15:  |        \    17h / 23| Flag for SET FIELDS   |  |
 *          :                       :  |         |           |-----------------------|  |
 *     / m+263                      |  |         |   18h / 24| ( Reserved )          |  |
 *          |=======================|__v_ ___    |           :                       :  |
 *          :                       :    ^       |           :                       :  |
 *          :                       :    |       |           :                       :  |
 *          :                       :    |       |   1Eh / 30|                       |  |
 *          | Record structure      |    |       |           |-----------------------|  |
 *          |                       |    |        \  1Fh / 31| Index field flag    *8|  |
 *          |                       |    |         \_        |=======================| _v_____
 *          |                       | Records
 *          |-----------------------|    |
 *          |                       |    |          _        |=======================| _______
 *          |                       |    |         / 00h /  0| Record deleted flag *9|  ^
 *          |                       |    |        /          |-----------------------|  |
 *          |                       |    |       /           | Data               *10|  One
 *          |                       |    |      /            : (ASCII)            *17: record
 *          |                       |____|_____/             |                       |  |
 *          :                       :    |                   |                       | _v_____
 *          :                       :____|_____              |=======================|
 *          :                       :    |
 *          |                       |    |
 *          |                       |    |
 *          |                       |    |
 *          |                       |    |
 *          |                       |    |
 *          |=======================|    |
 *          |__文件结束标识__________| ___v____  文件结束标识 ( 1Ah )  *11
 * 
 */
class Writer {
    /**
     * 
     * @param {Array.<Object>} data 属性对象
     * @param {Array.<module:GeoJson2Shp/Dbf/Field~Field>} field_meta  字段定义
     */
    constructor(data, field_meta) {

        /**
         * 字段定义
         * @type  {Array.<module:GeoJson2Shp/Dbf/Field~Field>}
         */
        this.field_meta_ = field_meta || Field.multi(data);

        /**
         * 字段定义
         * @type {Array.<Object>}
         */
        this.data_ = data;
    }

    /**
     * 写入dbf文件
     * @param {function} callback 回调函数
     */
    write(callback) {

        /**
         * 字段描述长度
         * @type {number}
         */
        var fieldDescLength = (32 * this.field_meta_.length);

        /**
         * 每条记录所占长度(包括删除标记)
         * @type {number}
         */
        var bytesPerRecord = this.getBytesPerRecord(this.field_meta_);

        /**
         * dbf文件流
         * @type {ArrayBuffer}
         */
        var buffer = new ArrayBuffer(
            // 文件头信息长度
            32 +
            // 字段描述长度
            fieldDescLength +
            //描述信息结束
            1 +
            // 属性数据长度
            (bytesPerRecord * this.data_.length) +
            // 文件结束标识
            1
        );

        /**
         * 当前时间
         * @type {Date}
         */
        var now = new Date();

        /**
         * dbf文件视图
         * @type {DataView}
         */
        var view = new DataView(buffer);

        // 版本号 - dBase III(1)
        view.setUint8(0, 0x03);
        // 最后一次更新日期
        //当前年-1900(1)
        view.setUint8(1, now.getFullYear() - 1900);
        //当前月(1)
        view.setUint8(2, now.getMonth());
        //当前日(1)
        view.setUint8(3, now.getDate());
        // 记录数(4)
        view.setUint32(4, this.data_.length, true);

        // 文件头信息长度(2)
        var headerLength = fieldDescLength + 32 + 1;
        view.setUint16(8, headerLength, true);
        // 每条记录的长度(2)
        view.setUint16(10, bytesPerRecord, true);

        // 描述信息结束(1)
        view.setInt8(32 + fieldDescLength, 0x0D);

        //字段描述(字段数量*32)
        this.field_meta_.forEach(function (f, i) {
            //字段名称占10位
            let name = f.name.slice(0, 10);
            name = Lib.rpad(name, 10, " ");
            let uint8Array = Lib.stringToUint8Array(name);

            for (let index = 0; index < 10; index++) {
                view.setInt8(32 + i * 32 + index, uint8Array[index]);
            }

            // 字段类型(5)
            view.setInt8(32 + i * 32 + 11, f.type.charCodeAt(0));
            // 字段长度(1)
            view.setInt8(32 + i * 32 + 16, f.size);
            if (f.type == 'N') view.setInt8(32 + i * 32 + 17, 3);
        });

        var offset = fieldDescLength + 32 + 1;

        //记录
        this.data_.forEach(function (row, num) {
            // 删除标记
            view.setUint8(offset, 32);
            offset++;
            this.field_meta_.forEach(function (f) {
                var val = row[f.name];
                if (val === null || typeof val === 'undefined') val = '';

                switch (f.type) {
                    // boolean
                    case 'L':
                        view.setUint8(offset, val ? 84 : 70);
                        offset++;
                        break;

                    // date
                    case 'D':
                        offset = this.writeField_(view, 8,
                            Lib.lpad(val.toString(), 8, ' '), offset);
                        break;

                    // number
                    case 'N':
                        offset = this.writeField_(view, f.size,
                            Lib.lpad(val.toString(), f.size, ' ').substr(0, 18),
                            offset);
                        break;

                    // string
                    case 'C':
                        offset = this.writeField_(view, f.size,
                            Lib.rpad(val.toString(), f.size, ' '), offset);
                        break;

                    default:
                        throw new Error('Unknown field type');
                }
            }.bind(this));
        }.bind(this));

        // 文件结束表示
        view.setUint8(offset, 0x1A);

        callback(null, {
            dbf: view
        });
    }

    /**
     * 写入字段
     * @param {DataView} view dbf文件对象
     * @param {number} fieldLength 字段长度
     * @param {string} str 值
     * @param {number} offset 写入位置
     * @returns {number} 写入后流的位置
     */
    writeField_(view, fieldLength, str, offset) {
        let uint8Array = Lib.stringToUint8Array(str);
        for (var i = 0; i < fieldLength; i++) {
            view.setUint8(offset, uint8Array[i]);
            offset++;
        }
        return offset;
    };

    /**
     * 获取每条记录所占字节数(包括删除标记)
     * @param {Array.<module:GeoJson2Shp/Dbf/Field~Field>} fields 字段定义
     * @returns {number} 每条记录所占长度
     */
    getBytesPerRecord(fields) {
        // deleted flag
        return fields.reduce(function (memo, f) { return memo + f.size; }, 1);
    }
}

export default Writer;
