
/**
 * 绘标工厂
 * @module utils-ol/plot/PlotFactory
 */
import { Coordinate } from "ol/Coordinate"

import PlotTypes from "./PlotTypes"

import Arc from "./geom/Arc"
import AssaultDirection from "./geom/AssaultDirection"
import AttackArrow from "./geom/AttackArrow"
import Circle from "./geom/Circle"
import ClosedCurve from "./geom/ClosedCurve"
import Curve from "./geom/Curve"
import DoubleArrow from "./geom/DoubleArrow"
import Ellipse from "./geom/Ellipse"
import FineArrow from "./geom/FineArrow"
import FreehandLine from "./geom/FreehandLine"
import FreehandPolygon from "./geom/FreehandPolygon"
import GatheringPlace from "./geom/GatheringPlace"
import Lune from "./geom/Lune"
import Point from "./geom/Point"
import Polygon from "./geom/Polygon"
import Polyline from "./geom/Polyline"
import Rectangle from "./geom/Rectangle"
import Sector from "./geom/Sector"
import SquadCombat from "./geom/SquadCombat"
import StraightArrow from "./geom/StraightArrow"
import TailedAttackArrow from "./geom/TailedAttackArrow"
import TailedSquadCombat from "./geom/TailedSquadCombat"
import Triangle from "./geom/Triangle"
import RegularPolygon from "./geom/RegularPolygon"
import Diamond from "./geom/Diamond"
import Geometry from "./geom/Geometry"
/**
 * 根据类型与点集创建绘标图形
 * @param type    类型
 * @param points 点集
 * @param options 其他参数
 */
export function createPlot(type: PlotTypes, points: Array<Coordinate>, options: Object): Geometry | null {
    switch (type) {
        case PlotTypes.ARC:
            return new Arc(points);
        case PlotTypes.ELLIPSE:
            return new Ellipse(points);
        case PlotTypes.CURVE:
            return new Curve(points);
        case PlotTypes.CLOSED_CURVE:
            return new ClosedCurve(points);
        case PlotTypes.LUNE:
            return new Lune(points);
        case PlotTypes.SECTOR:
            return new Sector(points);
        case PlotTypes.GATHERING_PLACE:
            return new GatheringPlace(points);
        case PlotTypes.STRAIGHT_ARROW:
            return new StraightArrow(points);
        case PlotTypes.ASSAULT_DIRECTION:
            return new AssaultDirection(points);
        case PlotTypes.ATTACK_ARROW:
            return new AttackArrow(points);
        case PlotTypes.FINE_ARROW:
            return new FineArrow(points);
        case PlotTypes.CIRCLE:
            return new Circle(points);
        case PlotTypes.DOUBLE_ARROW:
            return new DoubleArrow(points);
        case PlotTypes.TAILED_ATTACK_ARROW:
            return new TailedAttackArrow(points);
        case PlotTypes.SQUAD_COMBAT:
            return new SquadCombat(points);
        case PlotTypes.TAILED_SQUAD_COMBAT:
            return new TailedSquadCombat(points);
        case PlotTypes.FREEHAND_LINE:
            return new FreehandLine(points);
        case PlotTypes.FREEHAND_POLYGON:
            return new FreehandPolygon(points);
        case PlotTypes.POLYGON:
            return new Polygon(points);
        case PlotTypes.POINT:
            return new Point(points);
        case PlotTypes.RECTANGLE:
            return new Rectangle(points);
        case PlotTypes.POLYLINE:
            return new Polyline(points);
        case PlotTypes.TRIANGLE:
            return new Triangle(points);
        case PlotTypes.REGULARPOLYGON:
            return new RegularPolygon(points, options);
        case PlotTypes.DIAMOND:
            // return new Diamond(points, options);
            return new Diamond(points);
    }
    return null;
}
