/**
 * @module utilscesium/Analysis/Clipping 
 */

/**
 * @classdesc
 * 裁切分析类
 * @api
 */
class Clipping {
    /**
     * 构造函数
     * @param {Object} opt_options 
     * @param {module:Cesium/Viewer} 查看器
     */
    constructor(opt_options) {
        let options = Object.assign({ viewer: undefined }, opt_options);
        this.viewer_ = options.viewer;
    }

    /**
     * 计算坐标转换需要用到的矩阵的方法：
     * @param {*} tileSet
     * @return {*} 
     * @memberof Clipping
     */
    getInverseTransform(tileSet) {
        let transform;
        let tmp = tileSet.root.transform;
        if ((tmp && tmp.equals(Cesium.Matrix4.IDENTITY)) || !tmp) {
            // 如果root.transform不存在，则3DTiles的原点变成了boundingSphere.center
            transform = Cesium.Transforms.eastNorthUpToFixedFrame(
                tileSet.boundingSphere.center
            );
        } else {
            transform = Cesium.Matrix4.fromArray(tileSet.root.transform);
        }
        return Cesium.Matrix4.inverseTransformation(transform, new Cesium.Matrix4());
    }

    /**
     *对点坐标进行转换
     * @param {*} point
     * @param {*} inverseTransform
     * @return {*} 
     * @memberof Clipping
     */
    getOriginCoordinateSystemPoint(point, inverseTransform) {
        let val = Cesium.Cartesian3.fromDegrees(point[0], point[1]);
        return Cesium.Matrix4.multiplyByPoint(
            inverseTransform,
            val,
            new Cesium.Cartesian3(0, 0, 0)
        );
    }



    /**
     * 创建裁切面
     * @param {*} p1
     * @param {*} p2
     * @param {*} tileset
     * @return {*} 
     * @memberof Clipping
     */
    getClippingPlane(p1, p2, tileset) {
        if (Cesium.defined(tileset)) {
            let p1C3, p2C3;

            let inverseTransform = this.getInverseTransform(tileset);
            // 将仅包含经纬度信息的p1,p2，转换为相应坐标系的cartesian3对象
            p1C3 = getOriginCoordinateSystemPoint(p1, inverseTransform);
            p2C3 = getOriginCoordinateSystemPoint(p2, inverseTransform);


            // 定义一个垂直向上的向量up
            let up = new Cesium.Cartesian3(0, 0, 10);
            //  right 实际上就是由p1指向p2的向量
            let right = Cesium.Cartesian3.subtract(p2C3, p1C3, new Cesium.Cartesian3());

            // 计算normal， right叉乘up，得到平面法向量，这个法向量指向right的右侧
            let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
            normal = Cesium.Cartesian3.normalize(normal, normal);

            //由于已经获得了法向量和过平面的一点，因此可以直接构造Plane,并进一步构造ClippingPlane
            let planeTmp = Cesium.Plane.fromPointNormal(p1C3, normal);
            return Cesium.ClippingPlane.fromPlane(planeTmp);
        } else {
            //获取中间点
            var midpoint = Cesium.Cartesian3.add(
                p1,
                p2,
                new Cesium.Cartesian3()
            );
            //获取圆心到中点的法线
            var up = Cesium.Cartesian3.normalize(
                midpoint,
                new Cesium.Cartesian3()
            );
            //获取逆时针法线
            var right = Cesium.Cartesian3.subtract(
                p2,
                midpoint,
                new Cesium.Cartesian3()
            );
            //normalize：按比例把x,y,z限制在-1~1
            right = Cesium.Cartesian3.normalize(right, right);

            //计算up与right的叉积=2个向量构成的平面的法向量，这个法向量指向right的右侧
            var normal = Cesium.Cartesian3.cross(
                right,
                up,
                new Cesium.Cartesian3()
            );
         
            normal = Cesium.Cartesian3.normalize(normal, normal);

            var originCenteredPlane = new Cesium.Plane(normal, 0.0);
            //计算中点与裁剪平面的距离
            var distance = Cesium.Plane.getPointDistance(
                originCenteredPlane,
                midpoint
            );
            return new Cesium.ClippingPlane(normal, distance);
        }
    }

    /**
     * 获取裁剪面集合
     * @param {Array} positions
     * @param {*} tileset
     * @returns {Array} clippingPlanes 返回裁剪面集合
     */
    getClippingPlanes(positions, tileset) {
        if (!positions) {
            return undefined;
        }
        const pointsLength = positions.length;
        if (pointsLength < 2) {
            return undefined;
        }

        const clippingPlanes = [];
        for (let i = 0; i < pointsLength; i += 1) {
            const nextIndex = (i + 1) % pointsLength;
            clippingPlanes.push(this.getClippingPlane(positions[i], positions[nextIndex], tileset));
        }
        return clippingPlanes;
    }

}

export default Clipping;