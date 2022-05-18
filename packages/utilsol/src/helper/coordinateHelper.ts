import { Coordinate } from "ol/coordinate";

/**
 * 获取平面坐标集合
 * @param coordinates 坐标点集
 */
export const getFlatCoordinates = (coordinates: Coordinate | Coordinate[] | Coordinate[][] | Coordinate[][][]): Number[] => {
    let flatCoordinates: Array<Number> = [];
    if (typeof (coordinates[0]) === "number") {
        flatCoordinates = flatCoordinates.concat(coordinates as Coordinate)
    } else {
        coordinates.forEach((item) => {
            flatCoordinates = flatCoordinates.concat(getFlatCoordinates(item))
        })
    }
    return flatCoordinates;
}