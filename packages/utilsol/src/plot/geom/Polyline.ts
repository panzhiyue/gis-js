/**
 * @module utils-ol/plot/geom/Polyline
 */

import LineString from "ol/geom/LineString"
import { Coordinate } from "ol/coordinate"

import PlotTypes from "../PlotTypes"
import Geometry from "./Geometry"

/**
 * 折线绘标 
 */
class Polyline extends LineString implements Geometry {

    /**
     * 绘标类型
     */
    type: PlotTypes;

    /**
     * 最大点数
     */
    fixPointCount:number=null;

    /**
     * 获取点集
     */
    points: Array<Coordinate> = null;

    /**
     * 构造函数
     * @param points 点集
     */
    constructor(points: Array<Coordinate>) {
        super([]);
        this.type = PlotTypes.POLYLINE;
        this.setPoints(points);
    }

    /**
     * 根据输入点集生成实际点集
     */
    generate() {
        var count = this.getPointCount();
        if (count < 2) {
            return;
        }
        this.setCoordinates(this.points);
    }
    /**
     * 是否为绘标图形
     * @return 始终为true
     */
    isPlot(): boolean {
        return true;
    }
    /**
     * 设置点集
     * @param points 点集
     */
    setPoints(points: Array<Coordinate>) {
        this.points = points ? points : [];
        if (this.points.length >= 1)
            this.generate();
    }
    /**
     * 获取点集 
     * @return 点集
     */
    getPoints(): Array<Coordinate> {
        return this.points.slice(0);
    }
    /**
     * 获取点数量 
     * @return 点数
     */
    getPointCount(): number {
        return this.points.length;
    }


    /**
     * 修改指定索引的点
     * @param point 点
     * @param  要修改的点索引
     */
    updatePoint(point: Coordinate, index: number) {
        if (index >= 0 && index < this.points.length) {
            this.points[index] = point;
            this.generate();
        }
    }

    /**
     * 更新最后一个点集
     * @param point 点
     */
    updateLastPoint(point: Coordinate) {
        this.updatePoint(point, this.points.length - 1);
    }

    /**
     * 结束绘制 
     */
    finishDrawing() {

    }
}

export default Polyline;