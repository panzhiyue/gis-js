/**
 * @module utils-ol
 */

 import proj4 from "proj4";
 import Projection from "ol/proj/Projection";
 import * as proj from "ol/proj";
 
 /**
  * 添加坐标系
  * @param {string|number} wkid 坐标系EPSG代码
  */
 export function addCoordinateSystem(wkid) {
   if (wkid instanceof Array) {
     for (let w in wkid) {
       addCoordinateSystem(wkid[w]);
     }
   } else {
     switch (wkid) {
       case "4490":
       case 4490: {
         proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
         let newProj = new Projection({
           code: "EPSG:4490",
           extent: [-180, -90, 180, 90],
           units: "degree",
           axisOrientation: "neu",
           global: true,
         });
         proj.addProjection(newProj);
         break;
       }
       case "4549":
       case 4549: {
         proj4.defs(
           "EPSG:4549",
           "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
         );
         let newProj = new Projection({
           code: "EPSG:4549",
           extent: [347872.25, 2703739.74, 599933.05, 5912395.2],
           units: "m",
         });
         proj.addProjection(newProj);
         break;
       }
       case "2355":
       case 2355: {
         proj4.defs(
           "EPSG:2355",
           "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=21500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs "
         );
         let newProj = new Projection({
           code: "EPSG:2355",
           extent: [347872.25, 2703739.74, 599933.05, 5912395.2],
           units: "m",
         });
         proj.addProjection(newProj);
         break;
       }
     }
     addCoordinateTransforms("4326", wkid);
     addCoordinateTransforms("3857", wkid);
   }
 }
 
 /**
  * 添加坐标系转换
  * 如果不调用次函数,无法把坐标从wkid1转为wkid2
  * @param {string|number} wkid1
  * @param {string|number} wkid2
  */
 export function addCoordinateTransforms(wkid1, wkid2) {
   proj.addCoordinateTransforms(
     "EPSG:" + wkid1,
     "EPSG:" + wkid2,
     function (coordinate) {
       return proj4("EPSG:" + wkid1, "EPSG:" + wkid2, coordinate);
     },
     function (coordinate) {
       return proj4("EPSG:" + wkid2, "EPSG:" + wkid1, coordinate);
     }
   );
 }
 
 /**
  * 添加坐标系转换
  * 如果不调用次函数,无法把坐标从wkid1转为wkid2
  * @param {string} code1
  * @param {string} code2
  */
 export function addCoordinateTransforms2(code1, code2) {
   proj.addCoordinateTransforms(
     code1,
     code2,
     function (coordinate) {
       return proj4(code1, code2, coordinate);
     },
     function (coordinate) {
       return proj4(code2, code1, coordinate);
     }
   );
 }
 