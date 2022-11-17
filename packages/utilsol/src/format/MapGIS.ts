import Feature from 'ol/Feature';
import * as ol_extent from 'ol/extent';
import BaseObject from 'ol/Object';
import { Geometry, MultiPoint, MultiLineString, Polygon } from "ol/geom"

/**
 * 把MapGIS返回的JSON转为ol对象
 */
class MapGIS {
    constructor() {

    }
    /**
    * 反序列化MapGIS要素，并返回一个ol.Feature数组
    * @param json Zondy.Object.FeatureSet 格式对象或字符串
    **/
    readFeatures(json: string | object): Feature[] | null {
        if (json === undefined) {
            return null;
        }
        var obj = null;
        if (typeof json === 'string') {
            obj = JSON.parse(json);
        } else {
            obj = json;
        }
        if (obj !== null) {
            return this.parseVectors(obj);
        }
        return null;
    }

    /**
     * @param zfeatureset Zondy.IGServer.WebService.REST.IGS.ExtendBaselibClass.SFeatureElementSet
     */
    parseVectors(zfeatureset: any): Feature[] | null {
        // an array of OpenLayers.Feature.Vector
        if (zfeatureset === undefined || zfeatureset.SFEleArray === undefined) {
            return null;
        }
        if (!zfeatureset.SFEleArray) {
            return null;
        }
        if (zfeatureset.SFEleArray.length == 0) {
            return null;
        }
        var results = new Array();

        for (var i = 0, len = zfeatureset.SFEleArray.length; i < len; i++) {
            var zfeature = zfeatureset.SFEleArray[i];
            var attribute = this.parseAttribute(zfeatureset.AttStruct, zfeature.AttValue);
            var geometry: Geometry | null = this.parseGeometry(zfeature.fGeom, zfeature.ftype);
            var feature: Feature = new Feature();
            feature.setGeometry(geometry!);
            feature.setId(zfeature.FID.toString());
            feature.setProperties(attribute!);
            results[i] = feature;
        }
        return results;
    }

    /**
     * bound转为extent
     * @param {object} {xmin,ymin,xmax,ymax}
     */
    parseBound(zBound: any): ol_extent.Extent | null {
        if (zBound === undefined) {
            return null;
        }
        var result = ol_extent.createOrUpdate(zBound.xmin, zBound.ymin, zBound.xmax, zBound.ymax);
        return result;
    }

    /**
     * 解析矢量对象的属性
     * @param attstruct {Zondy.Object.CAttStruct}
     * @param attvalue
     * @returns 
     */
    parseAttribute(attstruct: any, attvalue: any): BaseObject | null {
        if (attstruct === undefined || attvalue === undefined) {
            return null;
        }
        if (attstruct.FldName.length != attvalue.length) {
            return null;
        }
        var attributes = new BaseObject();
        for (var i = 0, len = attstruct.FldName.length; i < len; i++) {
            attributes.set(attstruct.FldName[i], attvalue[i]);
        };
        return attributes;
    }

    /**
     * fGeom :{Zondy.Object.FeatureGeometry}转换为{ol.geom.Geometry}
     * @fGeom {Zondy.Object.FeatureGeometry} fGeom.
     * @type {number} type:{1:点;2:线;3:多边形}.
     * @returns {ol.geom.Geometry}
     */
    parseGeometry(fGeom: any, type: number | string): Geometry | null {
        var result = null;
        if (type == "Unknow") {
            if (fGeom.PntGeom.length > 0) {
                type = 1;
            }
            else if (fGeom.LinGeom.length > 0) {
                type = 2;
            } else {
                type = 3;
            }
        }

        switch (type) {
            case 1:
                result = this.parseGPoint(fGeom.PntGeom);
                break;
            case 2:
                // if the obj is type of Line
                result = this.parseGLine(fGeom.LinGeom);
                break;
            case 3:
                // if the obj is type of Region
                result = this.parseGRegion(fGeom.RegGeom);
                break;
        }
        return result;
    }

    /**
     * gRegions Array{Zondy.Object.GRegion}转换为{ol.geom.Polygon}
     * @param Array{Zondy.Object.GRegion} gRegions.
     * @return {ol.geom.Polygon} 
     */
    parseGRegion(gRegions: any): Polygon | null {
        if (gRegions === undefined || gRegions.length === undefined || gRegions.length == 0) {
            return null;
        }
        var m = 0;
        var results = new Array();
        for (var i = 0; i < gRegions.length; i++) {
            var specifiedGRegion = gRegions[i];
            if (specifiedGRegion === undefined || specifiedGRegion.Rings === undefined) {
                return null;
            }
            var specifiedGRegionLength = specifiedGRegion.Rings.length;
            for (var j = 0, len = specifiedGRegionLength; j < len; j++) {
                var zondyAnyLine = specifiedGRegion.Rings[j];
                var points = new Array();
                var zondyDots = zondyAnyLine.Arcs[0].Dots;
                for (var k = 0, zLen = zondyDots.length; k < zLen; k++) {
                    points[k] = [zondyDots[k].x, zondyDots[k].y];
                }
                results[m++] = points;
            }
        }
        return new Polygon(results);
    }

    /**
     * glines Array{Zondy.Object.GLine}转换为{ol.geom.MultiLineString}
     * @param Array{Zondy.Object.GLine} glines.
     * @return {ol.geom.MultiLineString} .
     * @api stable
     */
    parseGLine(glines: any): MultiLineString | null {
        if (glines === undefined || glines.length === undefined || glines.length == 0) {
            return null;
        }
        var glinesLength;
        var results = []; // an array of ol.geom.LineString;
        if (!glines)
            return null;
        glinesLength = glines.length;
        if (glinesLength === 0)
            return null;
        for (var i = 0, len = glines.length; i < len; i++) {
            var points = new Array();
            var zondyDots = glines[i].Line.Arcs[0].Dots;
            for (var j = 0, dLen = zondyDots.length; j < dLen; j++) {
                points[j] = [zondyDots[j].x, zondyDots[j].y];
            }
            results[i] = points;
        }
        var mulLineString = new MultiLineString(results);
        return mulLineString;
    }

    /**
    * 将gpoint： Array{Zondy.Object.GPoint}转换为{ol.geom.MultiPoint}
    * @param： Array{Zondy.Object.GPoint} gpoint.
    * @return {ol.geom.MultiPoint} .
    * @api stable
    */
    parseGPoint(gpoint: any): MultiPoint | null {
        if (gpoint === undefined || gpoint.length === undefined || gpoint.length == 0) {
            return null;
        }
        var points = [];
        var dot = null;
        for (var i = 0, len = gpoint.length; i < len; i++) {
            dot = gpoint[i].Dot;
            points[i] = [dot.x, dot.y];
        }
        var result = new MultiPoint(points);
        return result;
    }

}

export default MapGIS;