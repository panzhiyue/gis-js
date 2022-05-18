import { Geometry, Point } from "ol/geom"
import { getCenter } from "ol/extent";
import { Coordinate } from "ol/coordinate";

/**
 * 获取图形中心点
 * @param geom 图形
 * @return 
 */
export const getGeomCenter = (geom: Geometry): Coordinate => {
    return getCenter(geom.getExtent());
}