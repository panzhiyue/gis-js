[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [plot](../modules/plot.md) / [tool](../modules/plot.tool.md) / PlotDraw

# Class: PlotDraw

[plot](../modules/plot.md).[tool](../modules/plot.tool.md).PlotDraw

## Hierarchy

- `Observable`

  ↳ **`PlotDraw`**

## Table of contents

### Constructors

- [constructor](plot.tool.PlotDraw.md#constructor)

### Properties

- [dblClickZoomInteraction](plot.tool.PlotDraw.md#dblclickzoominteraction)
- [drawLayer](plot.tool.PlotDraw.md#drawlayer)
- [drawSource](plot.tool.PlotDraw.md#drawsource)
- [feature](plot.tool.PlotDraw.md#feature)
- [mapDoubleClickHandlerKey](plot.tool.PlotDraw.md#mapdoubleclickhandlerkey)
- [mapFirstClickHandlerKey](plot.tool.PlotDraw.md#mapfirstclickhandlerkey)
- [mapMouseMoveHandlerKey](plot.tool.PlotDraw.md#mapmousemovehandlerkey)
- [mapNextClickHandlerKey](plot.tool.PlotDraw.md#mapnextclickhandlerkey)
- [map\_](plot.tool.PlotDraw.md#map_)
- [plot](plot.tool.PlotDraw.md#plot)
- [plotParams](plot.tool.PlotDraw.md#plotparams)
- [plotType](plot.tool.PlotDraw.md#plottype)
- [points](plot.tool.PlotDraw.md#points)
- [style](plot.tool.PlotDraw.md#style)

### Methods

- [activate](plot.tool.PlotDraw.md#activate)
- [activateMapTools](plot.tool.PlotDraw.md#activatemaptools)
- [deactivate](plot.tool.PlotDraw.md#deactivate)
- [deactivateMapTools](plot.tool.PlotDraw.md#deactivatemaptools)
- [disconnectEventHandlers](plot.tool.PlotDraw.md#disconnecteventhandlers)
- [drawEnd](plot.tool.PlotDraw.md#drawend)
- [isDrawing](plot.tool.PlotDraw.md#isdrawing)
- [mapDoubleClickHandler](plot.tool.PlotDraw.md#mapdoubleclickhandler)
- [mapFirstClickHandler](plot.tool.PlotDraw.md#mapfirstclickhandler)
- [mapMouseMoveHandler](plot.tool.PlotDraw.md#mapmousemovehandler)
- [mapNextClickHandler](plot.tool.PlotDraw.md#mapnextclickhandler)
- [setMap](plot.tool.PlotDraw.md#setmap)
- [setStyle](plot.tool.PlotDraw.md#setstyle)

## Constructors

### constructor

• **new PlotDraw**(`opt_options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt_options` | `any` |  |

#### Overrides

Observable.constructor

## Properties

### dblClickZoomInteraction

• **dblClickZoomInteraction**: `DoubleClickZoom` = `null`

___

### drawLayer

• **drawLayer**: `VectorLayer`<`any`\> = `null`

___

### drawSource

• **drawSource**: `VectorSource`<`any`\> = `null`

___

### feature

• **feature**: `Feature`<`any`\> = `null`

___

### mapDoubleClickHandlerKey

• **mapDoubleClickHandlerKey**: `EventsKey` = `null`

___

### mapFirstClickHandlerKey

• **mapFirstClickHandlerKey**: `EventsKey` = `null`

___

### mapMouseMoveHandlerKey

• **mapMouseMoveHandlerKey**: `EventsKey` = `null`

___

### mapNextClickHandlerKey

• **mapNextClickHandlerKey**: `EventsKey` = `null`

___

### map\_

• **map\_**: `Map` = `null`

___

### plot

• **plot**: `Geometry` = `null`

___

### plotParams

• **plotParams**: `Object` = `null`

___

### plotType

• **plotType**: [`PlotTypes`](../enums/plot.PlotTypes.md) = `null`

___

### points

• **points**: `Coordinate`[] = `null`

___

### style

• **style**: `Style` = `null`

## Methods

### activate

▸ **activate**(`type`, `params`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`PlotTypes`](../enums/plot.PlotTypes.md) |  |
| `params` | `Object` |  |

#### Returns

`void`

___

### activateMapTools

▸ **activateMapTools**(): `void`

#### Returns

`void`

___

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

___

### deactivateMapTools

▸ **deactivateMapTools**(): `void`

#### Returns

`void`

___

### disconnectEventHandlers

▸ **disconnectEventHandlers**(): `void`

#### Returns

`void`

___

### drawEnd

▸ **drawEnd**(): `void`

#### Returns

`void`

___

### isDrawing

▸ **isDrawing**(): `boolean`

#### Returns

`boolean`

___

### mapDoubleClickHandler

▸ **mapDoubleClickHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### mapFirstClickHandler

▸ **mapFirstClickHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `MapBrowserEvent`<`any`\> |  |

#### Returns

`void`

___

### mapMouseMoveHandler

▸ **mapMouseMoveHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### mapNextClickHandler

▸ **mapNextClickHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### setMap

▸ **setMap**(`map`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map` |  |

#### Returns

`void`

___

### setStyle

▸ **setStyle**(`style`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `any` |

#### Returns

`void`
