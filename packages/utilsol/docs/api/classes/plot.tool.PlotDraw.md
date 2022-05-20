[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [plot](../modules/plot.md) / [tool](../modules/plot.tool.md) / PlotDraw

# Class: PlotDraw

[plot](../modules/plot.md).[tool](../modules/plot.tool.md).PlotDraw

绘标绘制类

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

构造函数

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt_options` | `any` | 构造参数 |

#### Overrides

Observable.constructor

## Properties

### dblClickZoomInteraction

• **dblClickZoomInteraction**: `DoubleClickZoom` = `null`

地图双击工具备份

___

### drawLayer

• **drawLayer**: `VectorLayer`<`any`\> = `null`

绘标图层

___

### drawSource

• **drawSource**: `VectorSource`<`any`\> = `null`

绘标数据源

___

### feature

• **feature**: `Feature`<`any`\> = `null`

要素

___

### mapDoubleClickHandlerKey

• **mapDoubleClickHandlerKey**: `EventsKey` = `null`

鼠标双击事件key值

___

### mapFirstClickHandlerKey

• **mapFirstClickHandlerKey**: `EventsKey` = `null`

鼠标第一次点击事件key值

___

### mapMouseMoveHandlerKey

• **mapMouseMoveHandlerKey**: `EventsKey` = `null`

鼠标移动事件key值

___

### mapNextClickHandlerKey

• **mapNextClickHandlerKey**: `EventsKey` = `null`

第一次之后的点击事件key值

___

### map\_

• **map\_**: `Map` = `null`

地图对象

___

### plot

• **plot**: `Geometry` = `null`

绘标图形

___

### plotParams

• **plotParams**: `Object` = `null`

绘标参数

___

### plotType

• **plotType**: [`PlotTypes`](../enums/plot.PlotTypes.md) = `null`

绘标类型

___

### points

• **points**: `Coordinate`[] = `null`

点集合

___

### style

• **style**: `Style` = `null`

绘标样式

## Methods

### activate

▸ **activate**(`type`, `params`): `void`

激活绘标

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`PlotTypes`](../enums/plot.PlotTypes.md) | 绘标类型 |
| `params` | `Object` | 绘标参数 |

#### Returns

`void`

___

### activateMapTools

▸ **activateMapTools**(): `void`

激活地图双击工具(结束绘制时激活)

#### Returns

`void`

___

### deactivate

▸ **deactivate**(): `void`

注销绘标

#### Returns

`void`

___

### deactivateMapTools

▸ **deactivateMapTools**(): `void`

注销地图双击工具,并备份(开始绘制时注销)

#### Returns

`void`

___

### disconnectEventHandlers

▸ **disconnectEventHandlers**(): `void`

解除绑定的事件

#### Returns

`void`

___

### drawEnd

▸ **drawEnd**(): `void`

绘制结束

#### Returns

`void`

___

### isDrawing

▸ **isDrawing**(): `boolean`

是否正在绘制

#### Returns

`boolean`

ture:正在绘制,false:不在绘制

___

### mapDoubleClickHandler

▸ **mapDoubleClickHandler**(`e`): `void`

鼠标双击完成绘制

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### mapFirstClickHandler

▸ **mapFirstClickHandler**(`e`): `void`

鼠标首次点击事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MapBrowserEvent`<`any`\> |

#### Returns

`void`

___

### mapMouseMoveHandler

▸ **mapMouseMoveHandler**(`e`): `void`

鼠标移动事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### mapNextClickHandler

▸ **mapNextClickHandler**(`e`): `void`

第一次之后的点击事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### setMap

▸ **setMap**(`map`): `void`

绑定地图对象

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map` | 地图对象 |

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
