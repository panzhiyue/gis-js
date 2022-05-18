import { Feature, MapBrowserEvent } from "ol";
import Pointer from "ol/interaction/Pointer"
import { Pixel } from "ol/pixel";
import RenderFeature from "ol/render/Feature";

class GeomDrag extends Pointer {
    private coordinate_: Pixel = null;
    private cursor_: string | undefined = "pointer";
    private feature_: RenderFeature | Feature<any> = null;
    private previousCursor_: string | undefined = null;

    handleDownEvent(evt: MapBrowserEvent<any>): boolean {
        var map = evt.map;

        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });

        if (feature) {
            this.coordinate_ = evt.coordinate;
            this.feature_ = feature;
        }

        return !!feature;
    }

    handleDragEvent(evt: MapBrowserEvent<any>) {
        var map = evt.map;

        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            });

        var deltaX = evt.coordinate[0] - this.coordinate_[0];
        var deltaY = evt.coordinate[1] - this.coordinate_[1];

        var geometry = /** @type {ol.geom.SimpleGeometry} */
            (this.feature_.getGeometry());
        geometry.translate(deltaX, deltaY);

        this.coordinate_[0] = evt.coordinate[0];
        this.coordinate_[1] = evt.coordinate[1];
    }


    handleMoveEvent(evt: MapBrowserEvent<any>) {
        if (this.cursor_) {
            var map = evt.map;
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function (feature, layer) {
                    return feature;
                });
            var element = evt.map.getTargetElement();
            if (feature) {
                if (element.style.cursor != this.cursor_) {
                    this.previousCursor_ = element.style.cursor;
                    element.style.cursor = this.cursor_;
                }
            } else if (this.previousCursor_ !== undefined) {
                element.style.cursor = this.previousCursor_;
                this.previousCursor_ = undefined;
            }
        }
    }

    handleUpEvent(evt: MapBrowserEvent<any>) {
        this.coordinate_ = null;
        this.feature_ = null;
        return false;
    }
}

export default GeomDrag;