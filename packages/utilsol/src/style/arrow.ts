/**
 * 箭头样式
 */

import defaultArrow from '../assets/images/arrows/arrow.svg'
// let defaultArrow;
// await fetch("../assets/images/arrows/arrow.svg").then((res) => {
//     defaultArrow = res;
// })

import parseStyle from './parseJSON'
import Point from 'ol/geom/Point'
import { Coordinate } from 'ol/coordinate'
import { Style } from 'ol/style'

const defaultSvgSize = 200
const defaultScaleSize = 16

export interface ArrowOptions {
    src?: string;  //图标路径
    anchor?: number[];  //[0.75, 0.5]
    rotateWithView?: boolean;
    rotation?: number;
    color?: string;
    scale?: number;
}

const defaultOptions: ArrowOptions = {
    src: defaultArrow,
    anchor: [0.75, 0.5],
    rotateWithView: true,
    rotation: 0,
    color: '#409eff',
    scale: 1
}

function getOpacity(color = '') {
    if (color === 'transparent') return 0
    const regex = /\.\d*/
    const matches = color.match(regex)
    if (matches && matches[0]) {
        return parseFloat(matches[0])
    }
    return 1

}


/**
 * 构造箭头样式
 * @param start 起点经纬度
 * @param end 终点经纬度
 * @param opts 箭头Icon配置项
 * @return
 */
export const createArrow = (start: Coordinate, end: Coordinate, opts: ArrowOptions | Boolean | String = {}): Style => {
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const icon: any = {
        ...defaultOptions,
        ...(typeof opts === 'string' ? { src: opts } : opts)
    }
    icon.rotation = -Math.atan2(dy, dx)
    icon.scale = defaultScaleSize * icon.scale / defaultSvgSize
    icon.opacity = getOpacity(icon.color)

    return parseStyle({
        geometry: new Point(end),
        icon: icon
    })
}
