import { Coordinate } from "ol/coordinate"

/**
 * 绘标工厂
 * @module utils-ol/plot/PlotUtils
 */

import Constants from "./Constants"

/**
 * 2个点之间的距离
 * @param pnt1  第一个点
 * @param pnt2 第二个点
 * @return 距离
 */
export function distance(pnt1: Coordinate, pnt2: Coordinate): number {
    return Math.sqrt(Math.pow((pnt1[0] - pnt2[0]), 2) + Math.pow((pnt1[1] - pnt2[1]), 2));
};

/**
 * 线长度
 * @param points 点集
 * @return 长度
 */
export function wholeDistance(points: Array<Coordinate>): number {
    let distance2: number = 0;
    for (var i = 0; i < points.length - 1; i++)
        distance2 += distance(points[i], points[i + 1]);
    return distance2;
};

/**
 * 线长度的0.99次方
 * @param points 点集
 * @return 长度
 */
export function getBaseLength(points: Array<Coordinate>): number {
    return Math.pow(wholeDistance(points), 0.99);
};

/**
 * 获取2点的中点
 * @param pnt1 点1
 * @param pnt2 点2
 * @return 2点的中点
 */
export function mid(pnt1: Coordinate, pnt2: Coordinate): Coordinate {
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
 * 获取线段方位角
 * @param startPnt 起点
 * @param endPnt  终点
 * @return 方位角
 */
export function getAzimuth(startPnt: Coordinate, endPnt: Coordinate): number {
    var azimuth;
    var angle = Math.asin(Math.abs(endPnt[1] - startPnt[1]) / distance(startPnt, endPnt));
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
 * 获取线段上指定比例的一个点
 * @param t 比例
 * @param startPnt 线段起点
 * @param endPnt 线段终点
 * @return 线段上指定比例的一个点
 */
export function getPointOnLine(t: number, startPnt: Coordinate, endPnt: Coordinate): Coordinate {
    var x = startPnt[0] + (t * (endPnt[0] - startPnt[0]));
    var y = startPnt[1] + (t * (endPnt[1] - startPnt[1]));
    return [x, y];
};

/**
 * 
 * @param t
 * @param startPnt
 * @param cPnt1
 * @param cPnt2
 * @param endPnt
 * @return 
 */
export function getCubicValue(t: number, startPnt: Coordinate, cPnt1: Coordinate, cPnt2: Coordinate, endPnt: Coordinate): Coordinate {
    t = Math.max(Math.min(t, 1), 0);
    var tp = 1 - t;
    var t2 = t * t;
    var t3 = t2 * t;
    var tp2 = tp * tp;
    var tp3 = tp2 * tp;
    var x = (tp3 * startPnt[0]) + (3 * tp2 * t * cPnt1[0]) + (3 * tp * t2 * cPnt2[0]) + (t3 * endPnt[0]);
    var y = (tp3 * startPnt[1]) + (3 * tp2 * t * cPnt1[1]) + (3 * tp * t2 * cPnt2[1]) + (t3 * endPnt[1]);
    return [x, y];
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
 * 获取指定圆弧点集
 * @param center 中心点
 * @param radius 半径
 * @param startAngle 起始弧度
 * @param endAngle 结束弧度
 * @return
 */
export function getArcPoints(center: Coordinate, radius: number, startAngle: number, endAngle: number): Array<Coordinate> {
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

export function getBisectorNormals(t, pnt1, pnt2, pnt3) {
    var normal = getNormal(pnt1, pnt2, pnt3);
    var dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
    var uX = normal[0] / dist;
    var uY = normal[1] / dist;
    var d1 = distance(pnt1, pnt2);
    var d2 = distance(pnt2, pnt3);
    if (dist > Constants.ZERO_TOLERANCE) {
        if (isClockWise(pnt1, pnt2, pnt3)) {
            var dt = t * d1;
            var x = pnt2[0] - dt * uY;
            var y = pnt2[1] + dt * uX;
            var bisectorNormalRight = [x, y];
            dt = t * d2;
            x = pnt2[0] + dt * uY;
            y = pnt2[1] - dt * uX;
            var bisectorNormalLeft = [x, y];
        } else {
            dt = t * d1;
            x = pnt2[0] + dt * uY;
            y = pnt2[1] - dt * uX;
            bisectorNormalRight = [x, y];
            dt = t * d2;
            x = pnt2[0] - dt * uY;
            y = pnt2[1] + dt * uX;
            bisectorNormalLeft = [x, y];
        }
    } else {
        x = pnt2[0] + t * (pnt1[0] - pnt2[0]);
        y = pnt2[1] + t * (pnt1[1] - pnt2[1]);
        bisectorNormalRight = [x, y];
        x = pnt2[0] + t * (pnt3[0] - pnt2[0]);
        y = pnt2[1] + t * (pnt3[1] - pnt2[1]);
        bisectorNormalLeft = [x, y];
    }
    return [bisectorNormalRight, bisectorNormalLeft];
};

export function getNormal(pnt1, pnt2, pnt3) {
    var dX1 = pnt1[0] - pnt2[0];
    var dY1 = pnt1[1] - pnt2[1];
    var d1 = Math.sqrt(dX1 * dX1 + dY1 * dY1);
    dX1 /= d1;
    dY1 /= d1;

    var dX2 = pnt3[0] - pnt2[0];
    var dY2 = pnt3[1] - pnt2[1];
    var d2 = Math.sqrt(dX2 * dX2 + dY2 * dY2);
    dX2 /= d2;
    dY2 /= d2;

    var uX = dX1 + dX2;
    var uY = dY1 + dY2;
    return [uX, uY];
};

export function getCurvePoints(t, controlPoints) {
    var leftControl = getLeftMostControlPoint(controlPoints);
    var normals = [leftControl];
    for (var i = 0; i < controlPoints.length - 2; i++) {
        var pnt1: Coordinate = controlPoints[i];
        var pnt2: Coordinate = controlPoints[i + 1];
        var pnt3: Coordinate = controlPoints[i + 2];
        var normalPoints = getBisectorNormals(t, pnt1, pnt2, pnt3);
        normals = normals.concat(normalPoints);
    }
    var rightControl = getRightMostControlPoint(controlPoints);
    normals.push(rightControl);
    var points: Array<Coordinate> = [];
    for (i = 0; i < controlPoints.length - 1; i++) {
        let pnt1: Coordinate = controlPoints[i];
        let pnt2 = controlPoints[i + 1];
        points.push(pnt1);
        for (let t: number = 0; t < Constants.FITTING_COUNT; t++) {
            var pnt = getCubicValue(t / Constants.FITTING_COUNT, pnt1, normals[i * 2], normals[i * 2 + 1], pnt2);
            points.push(pnt);
        }
        points.push(pnt2);
    }
    return points;
};

/**
 * 
 * @param controlPoints 
 * @param t 
 * @returns 
 */
export function getLeftMostControlPoint(controlPoints: Array<Coordinate>, t: number = 1) {
    var pnt1 = controlPoints[0];
    var pnt2 = controlPoints[1];
    var pnt3 = controlPoints[2];
    var pnts = getBisectorNormals(0, pnt1, pnt2, pnt3);
    var normalRight = pnts[0];
    var normal = getNormal(pnt1, pnt2, pnt3);
    var dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
    if (dist > Constants.ZERO_TOLERANCE) {
        var midP = mid(pnt1, pnt2);
        var pX = pnt1[0] - midP[0];
        var pY = pnt1[1] - midP[1];

        var d1 = distance(pnt1, pnt2);
        // normal at midpoint
        var n = 2.0 / d1;
        var nX = -n * pY;
        var nY = n * pX;

        // upper triangle of symmetric transform matrix
        var a11 = nX * nX - nY * nY
        var a12 = 2 * nX * nY;
        var a22 = nY * nY - nX * nX;

        var dX = normalRight[0] - midP[0];
        var dY = normalRight[1] - midP[1];

        // coordinates of reflected vector
        var controlX = midP[0] + a11 * dX + a12 * dY;
        var controlY = midP[1] + a12 * dX + a22 * dY;
    } else {
        controlX = pnt1[0] + t * (pnt2[0] - pnt1[0]);
        controlY = pnt1[1] + t * (pnt2[1] - pnt1[1]);
    }
    return [controlX, controlY];
};

/**
 * 
 * @param controlPoints 
 * @param t 
 * @returns 
 */
export function getRightMostControlPoint(controlPoints: Array<Coordinate>, t: number = 1) {
    var count = controlPoints.length;
    var pnt1 = controlPoints[count - 3];
    var pnt2 = controlPoints[count - 2];
    var pnt3 = controlPoints[count - 1];
    var pnts = getBisectorNormals(0, pnt1, pnt2, pnt3);
    var normalLeft = pnts[1];
    var normal = getNormal(pnt1, pnt2, pnt3);
    var dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
    if (dist > Constants.ZERO_TOLERANCE) {
        var midP = mid(pnt2, pnt3);
        var pX = pnt3[0] - midP[0];
        var pY = pnt3[1] - midP[1];

        var d1 = distance(pnt2, pnt3);
        // normal at midpoint
        var n = 2.0 / d1;
        var nX = -n * pY;
        var nY = n * pX;

        // upper triangle of symmetric transform matrix
        var a11 = nX * nX - nY * nY
        var a12 = 2 * nX * nY;
        var a22 = nY * nY - nX * nX;

        var dX = normalLeft[0] - midP[0];
        var dY = normalLeft[1] - midP[1];

        // coordinates of reflected vector
        var controlX = midP[0] + a11 * dX + a12 * dY;
        var controlY = midP[1] + a12 * dX + a22 * dY;
    } else {
        controlX = pnt3[0] + t * (pnt2[0] - pnt3[0]);
        controlY = pnt3[1] + t * (pnt2[1] - pnt3[1]);
    }
    return [controlX, controlY];
};

/**
 * 获取贝塞尔曲线点集
 * @param points 输入点集
 * @return 贝塞尔曲线点集
 */
export function getBezierPoints(points: Array<Coordinate>): Array<Coordinate> {
    if (points.length <= 2)
        return points;

    let bezierPoints: Array<Coordinate> = [];
    let n = points.length - 1;
    for (var t = 0; t <= 1; t += 0.01) {
        var x = 0,
            y = 0;
        for (var index = 0; index <= n; index++) {
            var factor = getBinomialFactor(n, index);
            var a = Math.pow(t, index);
            var b = Math.pow((1 - t), (n - index));
            x += factor * a * b * points[index][0];
            y += factor * a * b * points[index][1];
        }
        bezierPoints.push([x, y]);
    }
    bezierPoints.push(points[n]);
    return bezierPoints;
};

export function getBinomialFactor(n, index) {
    return getFactorial(n) / (getFactorial(index) * getFactorial(n - index));
};

/**
 * 获取n的阶乘
 * @param n 输入数值
 * @return 阶乘值
 */
export function getFactorial(n: number): number {
    if (n <= 1)
        return 1;
    if (n == 2)
        return 2;
    if (n == 3)
        return 6;
    if (n == 4)
        return 24;
    if (n == 5)
        return 120;
    var result = 1;
    for (var i = 1; i <= n; i++)
        result *= i;
    return result;
};

export function getQBSplinePoints(points: Array<Coordinate>) {
    if (points.length <= 2)
        return points;

    let n = 2;

    let bSplinePoints: Array<Coordinate> = [];
    let m = points.length - n - 1;
    bSplinePoints.push(points[0]);
    for (var i = 0; i <= m; i++) {
        for (var t = 0; t <= 1; t += 0.05) {
            var x = 0,
                y = 0;
            for (var k = 0; k <= n; k++) {
                var factor = getQuadricBSplineFactor(k, t);
                x += factor * points[i + k][0];
                y += factor * points[i + k][1];
            }
            bSplinePoints.push([x, y]);
        }
    }
    bSplinePoints.push(points[points.length - 1]);
    return bSplinePoints;
};

export function getQuadricBSplineFactor(k, t) {
    if (k == 0)
        return Math.pow(t - 1, 2) / 2;
    if (k == 1)
        return (-2 * Math.pow(t, 2) + 2 * t + 1) / 2;
    if (k == 2)
        return Math.pow(t, 2) / 2;
    return 0;
};