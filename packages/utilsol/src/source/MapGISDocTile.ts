import TileImage from 'ol/source/TileImage';
import { assign } from 'ol/obj.js';
import { appendParams } from 'ol/uri.js';
import { buffer, createEmpty, Extent } from 'ol/extent.js';
import { buffer as bufferSize, scale as scaleSize, toSize } from 'ol/size.js';
import { modulo } from 'ol/math.js';
import { hash as tileCoordHash } from 'ol/tilecoord.js';
import { newGuid } from '../utils';
import { Options as TileImageOptions } from "ol/source/TileImage"

export interface MapGISDocTileSourceOptions extends TileImageOptions {
    gutter: number,
    hidpi: boolean,
    //客户端标识，用以服务器缓存地图，一般情况下无需赋值
    guid: string,
    params: Object
}

class MapGISDocTile extends TileImage {

    private gutter_: number;

    private params_: Object;

    private hidpi_: boolean;

    private tmpExtent_: Extent;

    private guid_: string;

    private rlt_: number;

    /**
     * 构造函数
     * @param opt_options 
     */
    constructor(opt_options?: MapGISDocTileSourceOptions) {
        const options: MapGISDocTileSourceOptions = Object.assign({}, opt_options)
        let interpolate =
            options.imageSmoothing !== undefined ? options.imageSmoothing : true;
        if (options.interpolate !== undefined) {
            interpolate = options.interpolate;
        }
        const params = options.params || {};
        // const transparent = 'TRANSPARENT' in params ? params['TRANSPARENT'] : true;

        super({
            attributions: options.attributions,
            attributionsCollapsible: options.attributionsCollapsible,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            interpolate: interpolate,
            opaque: options.opaque,
            projection: options.projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileClass: options.tileClass,
            tileGrid: options.tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            url: options.url,
            urls: options.urls,
            wrapX: options.wrapX !== undefined ? options.wrapX : true,
            transition: options.transition,
            zDirection: options.zDirection,
        })

        /**
     * @private
     * @type {number}
     */
        this.gutter_ = options.gutter !== undefined ? options.gutter : 0;
        /**
         * @private
         * @type {!Object}
         */
        this.params_ = params;

        this.hidpi_ = options.hidpi !== undefined ? options.hidpi : true;

        this.tmpExtent_ = createEmpty();

        this.guid_ = options.guid !== undefined ? options.guid : newGuid();

        this.rlt_ = Math.random();
    }


    override tileUrlFunction(tileCoord, pixelRatio, projection): string | undefined {
        let tileGrid = this.getTileGrid();
        if (!tileGrid) {
            tileGrid = this.getTileGridForProjection(projection);
        }
        if (tileGrid.getResolutions().length <= tileCoord[0]) {
            return undefined;
        }

        // if (pixelRatio != 1 && (!this.hidpi_ || this.serverType_ === undefined)) {
        //     pixelRatio = 1;
        // }

        const tileResolution = tileGrid.getResolution(tileCoord[0]);

        let tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);
        let tileSize = toSize(tileGrid.getTileSize(tileCoord[0]), this.tmpSize);

        const gutter = this.gutter_;
        if (gutter !== 0) {
            tileSize = bufferSize(tileSize, gutter, this.tmpSize);
            tileExtent = buffer(tileExtent, tileResolution * gutter, tileExtent);
        }

        if (pixelRatio != 1) {
            tileSize = scaleSize(tileSize, pixelRatio, this.tmpSize);
        }

        const baseParams = {
            'f': "png",
            'cache': false,
            'rlt': this.rlt_,
            'guid': this.guid_
        };
        assign(baseParams, this.params_);

        return this.getRequestUrl_(
            tileCoord,
            tileSize,
            tileExtent,
            pixelRatio,
            projection,
            baseParams
        );

    }

    /**
    * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
    * @param {import("../size.js").Size} tileSize Tile size.
    * @param {import("../extent.js").Extent} tileExtent Tile extent.
    * @param {number} pixelRatio Pixel ratio.
    * @param {import("../proj/Projection.js").default} projection Projection.
    * @param {Object} params Params.
    * @return {string|undefined} Request URL.
    * @private
    */
    private getRequestUrl_(
        tileCoord,
        tileSize,
        tileExtent,
        pixelRatio,
        projection,
        params
    ) {
        const urls = this.urls;
        if (!urls) {
            return undefined;
        }

        params['w'] = tileSize[0];
        params['h'] = tileSize[1];


        const bbox = tileExtent;
        params['BBOX'] = bbox.join(',');

        let url;
        if (urls.length == 1) {
            url = urls[0];
        } else {
            const index = modulo(tileCoordHash(tileCoord), urls.length);
            url = urls[index];
        }
        return appendParams(url, params);
    }
}

export default MapGISDocTile;

