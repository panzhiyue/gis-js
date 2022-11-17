import * as geom from "ol/geom"
import * as format from "ol/format"
import * as turf from "@turf/turf"
class GeometryService {
    protected format_;
    constructor(opt_options) {
        let options = Object.assign({ format: new format.GeoJSON() }, opt_options);
        this.format_ - options.format;
    }

    /**
     * 相交操作(返回相交图形)
     * @param  geometry1  被相交图形
     * @param  geometry2  相交图形
     */
    intersection(geometry1: geom.Geometry, geometry2: geom.Geometry): Promise<any> {
        return buildResult(() => {
            let geometryGeoJSON1 = this.format_.writeGeometry(geometry1);
            let geometryGeoJSON2 = this.format_.writeGeometry(geometry2);
            return turf.intersect(geometryGeoJSON1, geometryGeoJSON2);
        })
    }

    /**
     * 相交操作(返回相交图形)
     * @param  geometries  被相交图形集合
     * @param  geometry  相交图形
     */
    intersections(geometries: geom.Geometry[], geometry: geom.Geometry): Promise<Array<any>> {
        return buildResult(() => {
            return geometries.map((item) => {
                let geometryGeoJSON1 = this.format_.writeGeometry(item);
                let geometryGeoJSON2 = this.format_.writeGeometry(geometry);
                return turf.intersect(geometryGeoJSON1, geometryGeoJSON2);
            })
        })
    }

    /**
     * 判断是否相交
     * @param geometry1 相交图形1
     * @param geometry2 相交图形2
     * @param callback 回调函数
     */
    intersect(geometry1: geom.Geometry, geometry2: geom.Geometry): Promise<boolean> {
        return buildResult(() => {
            let geometryGeoJSON1 = this.format_.writeGeometry(geometry1);
            let geometryGeoJSON2 = this.format_.writeGeometry(geometry2);
            return !turf.booleanDisjoint(geometryGeoJSON1, geometryGeoJSON2);
        })
    }

    /**
     * 判断是否相交
     * @param geometries 被相交图形集合
     * @param geometry 相交图形
     */
    intersects(geometries: geom.Geometry[], geometry: geom.Geometry): Promise<Array<boolean>> {
        return buildResult(() => {
            return geometries.map((item) => {
                let geometryGeoJSON1 = this.format_.writeGeometry(item);
                let geometryGeoJSON2 = this.format_.writeGeometry(geometry);
                return !turf.booleanDisjoint(geometryGeoJSON1, geometryGeoJSON2);
            })
        })
    }

    /**
     * 合并操作
     * @param geometries 合并图形集合
     */
    union(geometries: geom.Geometry[]): Promise<any> {
        return buildResult(() => {
            let gs = geometries.map((item) => {
                return this.format_.writeGeometry(item);
            })
            return turf.union.apply(gs);
        })
    }

    /**
     * 擦除（geometry1去掉与geometry2相交的部分）
     * @param geometry1 
     * @param geometry2 
     */
    difference(geometry1: geom.Geometry, geometry2: geom.Geometry): Promise<any> {
        return buildResult(() => {
            let geometryGeoJSON1 = this.format_.writeGeometry(geometry1);
            let geometryGeoJSON2 = this.format_.writeGeometry(geometry2);
            return turf.difference(geometryGeoJSON1, geometryGeoJSON2);
        })
    }

    /**
     * 擦除（geometries去掉与geometry2相交的部分）
     * @param geometries
     * @param geometry
     */
    differences(geometries: geom.Geometry[], geometry: geom.Geometry): Promise<Array<any>> {
        return buildResult(() => {
            return geometries.map((item) => {
                let geometryGeoJSON1 = this.format_.writeGeometry(item);
                let geometryGeoJSON2 = this.format_.writeGeometry(geometry);
                return turf.difference(geometryGeoJSON1, geometryGeoJSON2);
            })
        })
    }

    /**
     * 获取几何面积(单位平方米)
     * @param geometry 输入几何
     * @returns 
     */
    area(geometry: geom.Polygon | geom.MultiPolygon): Promise<number> {
        return buildResult(() => {
            let geometryGeoJSON = this.format_.writeGeometry(geometry);
            return turf.area(geometryGeoJSON);
        })
    }

    /**
     * 获取几何面积(单位平方米)
     * @param geometries 输入几何集合
     * @returns 
     */
    areas(geometries: (geom.Polygon | geom.MultiPolygon)[]): Promise<Array<number>> {
        return buildResult(() => {
            return geometries.map((item) => {
                let geometryGeoJSON = this.format_.writeGeometry(item);
                return turf.area(geometryGeoJSON);
            })
        })
    }
}

export default GeometryService;

export const buildResult = (callback: Function): Promise<any> => {
    return new Promise((inject, reject) => {
        try {
            let result = callback();
            inject(result);
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
