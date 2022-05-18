import { Coordinate } from "ol/coordinate"

interface Geometry {
    /**
     * 最大点数
     */
    fixPointCount?: number;

    /**
     * 是否自由绘制
     */
    freehand?: boolean;

    /**
     * 获取点数
     */
    getPointCount: () => number;

    /**
     * 设置点集
     */
    setPoints: (points: Array<Coordinate>) => void;

    /**
     * 结束绘制
     */
    finishDrawing: () => void;
}

export default Geometry;