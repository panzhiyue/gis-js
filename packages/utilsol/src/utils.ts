import { Coordinate } from "ol/coordinate";
import * as turf from "@turf/turf"



export const Constants = {
    TWO_PI: Math.PI * 2,
    HALF_PI: Math.PI / 2,
    FITTING_COUNT: 100,      //圆的点数
    ZERO_TOLERANCE: 0.0001   //容差
};

/**
 * 阶乘
 * @param num 输入数值
 * @return num的阶乘
 */
export const factorial = (num: number): number => {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

/**
 * 格式化数字，修复精度问题
 * @param number
 * @return
 */
export const parseDecimal = (number: number): number => {
    return parseFloat(number.toFixed(12))
}

/**
 * 检测两个经纬度是否相同
 * @param coordinate1 坐标1
 * @param coordinate2 坐标2
 * @return
 */
export const equal = (coordinate1: Coordinate, coordinate2: Coordinate): boolean => {
    if (coordinate1 === coordinate2) return true
    const [x1, y1] = coordinate1
    const [x2, y2] = coordinate2
    return parseDecimal(x1) === parseDecimal(x2) && parseDecimal(y1) === parseDecimal(y2);
}

/**
 * 2个点之间的距离
 * @param pnt1  第一个点
 * @param pnt2 第二个点
 * @return 距离
 */
export function getDistance(pnt1: Coordinate, pnt2: Coordinate): number {
    return Math.sqrt(Math.pow((pnt1[0] - pnt2[0]), 2) + Math.pow((pnt1[1] - pnt2[1]), 2));
};

/**
 * 线长度
 * @param points 点集
 * @return 长度
 */
export function getLength(points: Array<Coordinate>): number {
    let distance2: number = 0;
    for (var i = 0; i < points.length - 1; i++)
        distance2 += getDistance(points[i], points[i + 1]);
    return distance2;
};

/**
 * 线长度的0.99次方
 * @param points 点集
 * @return 长度
 */
export function getBaseLength(points: Array<Coordinate>): number {
    return Math.pow(getLength(points), 0.99);
};

/**
 * 获取2点的中点
 * @param pnt1 点1
 * @param pnt2 点2
 * @return 2点的中点
 */
export function getMid(pnt1: Coordinate, pnt2: Coordinate): Coordinate {
    return [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2];
};

/**
 * 通过3个点获取圆的中心点
 * @param pnt1 第一个点
 * @param pnt2 第二个点
 * @param pnt3 第三个点
 * @return 圆中心点
 */
export function getCircleCenterOfThreePoints(pnt1: Coordinate, pnt2: Coordinate, pnt3: Coordinate): Coordinate {
    var pntA = [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2];
    var pntB = [pntA[0] - pnt1[1] + pnt2[1], pntA[1] + pnt1[0] - pnt2[0]];
    var pntC = [(pnt1[0] + pnt3[0]) / 2, (pnt1[1] + pnt3[1]) / 2];
    var pntD = [pntC[0] - pnt1[1] + pnt3[1], pntC[1] + pnt1[0] - pnt3[0]];
    return getIntersectPoint(pntA, pntB, pntC, pntD);
};


/**
 * 获取2条线段的交点
 * @param pngA 线段1的起点
 * @param pngB 线段1的终点
 * @param pngC 线段2的起点
 * @param pngD 线段2的终点
 * @return 2条线段的交点
 */
export function getIntersectPoint(pntA: Coordinate, pntB: Coordinate, pntC: Coordinate, pntD: Coordinate): Coordinate {
    if (pntA[1] == pntB[1]) {
        var f = (pntD[0] - pntC[0]) / (pntD[1] - pntC[1]);
        var x = f * (pntA[1] - pntC[1]) + pntC[0];
        var y = pntA[1];
        return [x, y];
    }
    if (pntC[1] == pntD[1]) {
        var e = (pntB[0] - pntA[0]) / (pntB[1] - pntA[1]);
        x = e * (pntC[1] - pntA[1]) + pntA[0];
        y = pntC[1];
        return [x, y];
    }
    e = (pntB[0] - pntA[0]) / (pntB[1] - pntA[1]);
    f = (pntD[0] - pntC[0]) / (pntD[1] - pntC[1]);
    y = (e * pntA[1] - pntA[0] - f * pntC[1] + pntC[0]) / (e - f);
    x = e * y - e * pntA[1] + pntA[0];
    return [x, y];
};

/**
 * 获取线段方位角（正西:0,正南:Math.PI/2,正东:Math.PI,正北:Math.PI*3/2）
 * @param startPnt 起点
 * @param endPnt  终点
 * @return 方位角
 */
export function getAzimuth(startPnt: Coordinate, endPnt: Coordinate): number {
    var azimuth;
    var angle = Math.asin(Math.abs(endPnt[1] - startPnt[1]) / getDistance(startPnt, endPnt));
    if (endPnt[1] >= startPnt[1] && endPnt[0] >= startPnt[0])
        azimuth = angle + Math.PI;
    else if (endPnt[1] >= startPnt[1] && endPnt[0] < startPnt[0])
        azimuth = Constants.TWO_PI - angle;
    else if (endPnt[1] < startPnt[1] && endPnt[0] < startPnt[0])
        azimuth = angle;
    else if (endPnt[1] < startPnt[1] && endPnt[0] >= startPnt[0])
        azimuth = Math.PI - angle;
    return azimuth;
};

/**
 * 获取3点构成的夹角
 * @param pntA
 * @param pntB
 * @param pntC
 * @return 3点构成的夹角弧度
 */
export function getAngleOfThreePoints(pntA: Coordinate, pntB: Coordinate, pntC: Coordinate): number {
    var angle = getAzimuth(pntB, pntA) - getAzimuth(pntB, pntC);
    return (angle < 0 ? angle + Constants.TWO_PI : angle);
};

/**
 * 判断是是否为顺时针
 * @param pnt1 点1
 * @param pnt2 点2
 * @param pnt3 点3
 * @return ture为顺时针,false为逆时针
 */
export function isClockWise(pnt1: Coordinate, pnt2: Coordinate, pnt3: Coordinate): boolean {
    return ((pnt3[1] - pnt1[1]) * (pnt2[0] - pnt1[0]) > (pnt2[1] - pnt1[1]) * (pnt3[0] - pnt1[0]));
};


/**
 * 根据线段，夹角，长度获取点
 * @param startPnt  起点
 * @param endPnt    终点
 * @param angle     夹角弧度
 * @param distance  长度
 * @param clockWise true:顺时针,false:逆时针
 */
export function getThirdPoint(startPnt: Coordinate, endPnt: Coordinate, angle: number, distance: number, clockWise: boolean = true): Coordinate {
    var azimuth = getAzimuth(startPnt, endPnt);
    var alpha = clockWise ? azimuth + angle : azimuth - angle;
    var dx = distance * Math.cos(alpha);
    var dy = distance * Math.sin(alpha);
    return [endPnt[0] + dx, endPnt[1] + dy];
};



/**
 * 返回沿该线指定距离的点。
 * @param coordinates 线的点集合
 * @param distance 距离
 * @param options
 * @return 坐标点
 */
export const getCoordinateByDistance = (coordinates: Array<Coordinate>, distance: number, options: { units?: turf.Units } = { units: "degrees" }): Coordinate => {
    var line = turf.lineString(coordinates);

    var along: turf.Feature<turf.Point> = turf.along(line, distance, options);
    return along.geometry.coordinates as Coordinate;
}

/**
 * 返回沿该线指定比例的点。
 * @param coordinates 线的点集合
 * @param scale 比例 0-1
 * @param options
 * @return 坐标点
 */
export const getCoordinateByScale = (coordinates: Array<Coordinate>, scale: number, options: { units?: turf.Units } = { units: "degrees" }): Coordinate => {
    let line = turf.lineString(coordinates);
    let length = turf.length(line, options);
    let distance = length * scale;

    return getCoordinateByDistance(coordinates, distance);
}

/**
 * 计算点到线段最短间距的点
 * @param coordinates 
 * @param coordinate
 * @return 
 */
export const getCoordinateByPoint = (coordinates: Array<Coordinate> | Array<Array<Coordinate>>, coordinate: Coordinate): Coordinate => {

    let options: { units?: turf.Units } = { units: "degrees" }

    let cs: Array<Array<Coordinate>>;
    if (coordinate[0][0] instanceof Array) {
        cs = coordinates as Array<Array<Coordinate>>;
    } else {
        cs = [coordinates] as Array<Array<Coordinate>>;
    }
    let line = turf.multiLineString(cs);
    let pt = turf.point(coordinate);

    var nearestPoint = turf.nearestPointOnLine(line, pt, options);
    return nearestPoint.geometry.coordinates as Coordinate;
}

/**
 * 根据一条线、起点和终点，返回这些点之间的线段。起止点不需要正好落在直线上。
 * @param coordinates 
 * @param startPt 
 * @param stopPt 
 * @return 
 */
export const sliceByPoint = (coordinates: Array<Coordinate>, startPt: Coordinate, stopPt: Coordinate): Array<Coordinate> => {
    let line = turf.lineString(coordinates);
    let start = turf.point(startPt);
    let stop = turf.point(stopPt);
    let sliced = turf.lineSlice(start, stop, line);
    return sliced.geometry.coordinates as Array<Coordinate>;
}

/**
 * 取一条线，沿该线到起始点的指定距离，以及沿该线到终止点的指定距离，并返回这些点之间的该线的分段。
 * @param coordinates 
 * @param startDist 
 * @param stopDist 
 * @param options 
 * @return 
 */
export const sliceByDistance = (coordinates: Array<Coordinate>, startDist: number, stopDist: number, options: { units?: turf.Units } = { units: "degrees" }): Array<Coordinate> => {
    let start = getCoordinateByDistance(coordinates, startDist, options);
    let stop = getCoordinateByDistance(coordinates, stopDist, options);
    return sliceByPoint(coordinates, start, stop);
}

/**
 * 取一条线，沿该线到起始点的指定比例，以及沿该线到终止点的指定比例，并返回这些点之间的该线的分段。
 * @param coordinates 
 * @param startScale 
 * @param stopScale 
 * @param options 
 * @return 
 */
export const sliceByScale = (coordinates: Array<Coordinate>, startScale: number, stopScale: number, options: { units?: turf.Units } = { units: "degrees" }): Array<Coordinate> => {
    let start = getCoordinateByScale(coordinates, startScale, options);
    let stop = getCoordinateByScale(coordinates, stopScale, options);
    return sliceByPoint(coordinates, start, stop);
}



/**
 * 生成贝塞尔曲线
 * @param points 点集合(数量必须大于等于2)
 * @param space 必须要大于0
 * @return 贝塞尔曲线点集
 */
export const createBezierCurve = (points: Array<Coordinate> = [], space: number = 0.01): Array<Coordinate> => {
    // 大于2个点才能有曲线
    if (points.length <= 2 || space <= 0) return points

    let x: number = 0
    let y: number = 0
    // 控制点个数
    const n: number = points.length - 1
    const line: Array<Coordinate> = [];
    for (let t = 0; t < 1; t = t + space) {
        x = 0;
        y = 0;
        for (let i = 0; i <= n; i++) {
            const [x1, y1] = points[i]
            x += (factorial(n) / (factorial(i) * factorial(n - i))) * Math.pow((1 - t), n - i) * Math.pow(t, i) * x1;
            y += (factorial(n) / (factorial(i) * factorial(n - i))) * Math.pow((1 - t), n - i) * Math.pow(t, i) * y1;
        }
        line.push([x, y]);
    }
    line.push(points[points.length - 1])
    return line;
}

/**
 * 创建曲线
 * @param from 起点
 * @param to 终点
 * @param radius 半径
 * @param angle 角度
 * @param space 
 * @return 曲线点集
 */
export const createCurve = (from: Coordinate, to: Coordinate, radius: number = 0, angle: number = 90, space: number = 0.01): Array<Coordinate> => {
    const [fx, fy] = from
    const [tx, ty] = to
    // 获取圆心坐标
    const ox = (fx + tx) / 2
    const oy = (fy + ty) / 2
    // 线与x轴的夹角
    const dx = (fy - ty) / (fx - tx)
    // 参照直线的夹角
    const r = (angle * Math.PI / 180) + Math.atan(dx)
    // console.log('r', r)
    // 计算得出曲线拐点的坐标
    const x = ox + radius * Math.cos(r)
    const y = oy + radius * Math.sin(r)
    // 得到了线的曲度控制点
    const line = [from, [x, y] as Coordinate, to]
    // 生成曲线的路径坐标集合
    return createBezierCurve(line, space)
}

/**
 * 线性插值（二维坐标）,每隔一段长度插值
 * @param coordinates  线条坐标数组，支持曲线
 * @param space 点的间隔距离，经纬度单位，值越小，增加的点越多
 * @return 插值后线坐标数组
 */
export const linearInterpolate = (coordinates: Array<Coordinate> = [], space: number = 0.01): Array<Coordinate> => {
    const points: Array<Coordinate> = []
    for (let i = 0; i < coordinates.length; i++) {
        if (i >= coordinates.length - 1) break
        const [x1, y1] = coordinates[i]
        const [x2, y2] = coordinates[i + 1]
        // 计算线与x轴的角度
        const k = Math.atan2(Math.abs(y1 - y2), Math.abs(x1 - x2))
        // 0 ~ 90 度之间
        const angle = k * (180 / Math.PI)
        points.push([x1, y1])
        // 大于45度用维度计算，小于45度用经度计算
        if (angle > 45) {
            const diff = space * Math.sign(y2 - y1)
            let y = y1 + diff
            while (diff > 0 ? y < y2 : y > y2) {
                const x = (y - y1) * (x2 - x1) / (y2 - y1) + x1
                points.push([x, y])
                y += diff
            }
        } else {
            const diff = space * Math.sign(x2 - x1)
            let x = x1 + diff
            while (diff > 0 ? x < x2 : x > x2) {
                const y = (y2 - y1) / (x2 - x1) * (x - x1) + y1
                points.push([x, y])
                x += diff
            }
        }
        points.push([x2, y2])
    }
    return [...new Set(points)]
}

/**
 * 获取指定圆弧点集
 * @param center 中心点
 * @param radius 半径
 * @param startAngle 起始弧度
 * @param endAngle 结束弧度
 * @return
 */
export function getArc(center: Coordinate, radius: number, startAngle: number, endAngle: number): Array<Coordinate> {
    var x: number, y: number, pnts: Array<Coordinate> = [];
    var angleDiff = endAngle - startAngle;
    angleDiff = angleDiff < 0 ? angleDiff + Constants.TWO_PI : angleDiff;
    for (var i = 0; i <= Constants.FITTING_COUNT; i++) {
        var angle = startAngle + angleDiff * i / Constants.FITTING_COUNT;
        x = center[0] + radius * Math.cos(angle);
        y = center[1] + radius * Math.sin(angle);
        pnts.push([x, y]);
    }
    return pnts;
};

/**
 * 生成一个guid
 * @returns 
 */
export function newGuid():string {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}