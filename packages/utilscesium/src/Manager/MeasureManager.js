// /**
//  * @module utilscesium/Manager/MeasureManager 
//  */


// /**
//  * @classdesc
//  * 量算管理类
//  * @api
//  */
// class MeasureManager {
//     /**
//      * 构造函数
//      * @param {Object} opt_options 
//      * @param {module:Cesium/Viewer} 查看器
//      */
//     constructor(opt_options) {
//         let options = Object.assign({
//             viewer: undefined
//         }, opt_options);
//         this.viewer_ = options.viewer;
//     }


//     getSpaceDistance(positions) {
//         var distance = 0;
//         for (var i = 0; i < positions.length - 1; i++) {

//             var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
//             var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
//             /**根据经纬度计算出距离**/
//             var geodesic = new Cesium.EllipsoidGeodesic();
//             geodesic.setEndPoints(point1cartographic, point2cartographic);
//             var s = geodesic.surfaceDistance;
//             //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
//             //返回两点之间的距离
//             s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
//             distance = distance + s;
//         }
//         return distance.toFixed(2);
//     }

//     getArea(positions) {
//         var res = 0;
//         //拆分三角曲面

//         for (var i = 0; i < positions.length - 2; i++) {
//             var j = (i + 1) % positions.length;
//             var k = (i + 2) % positions.length;
//             var totalAngle = Angle(points[i], points[j], points[k]);


//             var dis_temp1 = distance(positions[i], positions[j]);
//             var dis_temp2 = distance(positions[j], positions[k]);
//             res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
//             console.log(res);
//         }


//         return (res / 1000000.0).toFixed(4);
//     }
// }

// export default MeasureManager;

// /*角度*/
// function Angle(p1, p2, p3) {
//     var bearing21 = Bearing(p2, p1);
//     var bearing23 = Bearing(p2, p3);
//     var angle = bearing21 - bearing23;
//     if (angle < 0) {
//         angle += 360;
//     }
//     return angle;
// }

// function distance(point1, point2) {
//     var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
//     var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
//     /**根据经纬度计算出距离**/
//     var geodesic = new Cesium.EllipsoidGeodesic();
//     geodesic.setEndPoints(point1cartographic, point2cartographic);
//     var s = geodesic.surfaceDistance;
//     //返回两点之间的距离
//     s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
//     return s;
// }

// /*方向*/
// function Bearing(from, to) {
//     var lat1 = from.lat * radiansPerDegree;
//     var lon1 = from.lon * radiansPerDegree;
//     var lat2 = to.lat * radiansPerDegree;
//     var lon2 = to.lon * radiansPerDegree;
//     var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
//     if (angle < 0) {
//         angle += Math.PI * 2.0;
//     }
//     angle = angle * degreesPerRadian; //角度
//     return angle;
// }

// var radiansPerDegree = Math.PI / 180.0;//角度转化为弧度(rad) 
// var degreesPerRadian = 180.0 / Math.PI;//弧度转化为角度