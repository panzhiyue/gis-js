[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [plot](../modules/plot.md) / [tool](../modules/plot.tool.md) / PlotEdit

# Class: PlotEdit

[plot](../modules/plot.md).[tool](../modules/plot.tool.md).PlotEdit

## Hierarchy

- `Observable`

  ↳ **`PlotEdit`**

## Table of contents

### Constructors

- [constructor](plot.tool.PlotEdit.md#constructor)

### Properties

- [Constants](plot.tool.PlotEdit.md#constants)
- [activeControlPointId](plot.tool.PlotEdit.md#activecontrolpointid)
- [activePlot](plot.tool.PlotEdit.md#activeplot)
- [controlPointMouseMoveHandlerKey](plot.tool.PlotEdit.md#controlpointmousemovehandlerkey)
- [controlPointMouseUpHandlerKey](plot.tool.PlotEdit.md#controlpointmouseuphandlerkey)
- [controlPoints](plot.tool.PlotEdit.md#controlpoints)
- [elementTable](plot.tool.PlotEdit.md#elementtable)
- [ghostControlPoints](plot.tool.PlotEdit.md#ghostcontrolpoints)
- [mapDragPan](plot.tool.PlotEdit.md#mapdragpan)
- [map\_](plot.tool.PlotEdit.md#map_)
- [mouseOver](plot.tool.PlotEdit.md#mouseover)
- [plotMouseDownHandlerKey](plot.tool.PlotEdit.md#plotmousedownhandlerkey)
- [plotMouseMoveHandlerKey](plot.tool.PlotEdit.md#plotmousemovehandlerkey)
- [plotMouseOverOutHandlerKey](plot.tool.PlotEdit.md#plotmouseoverouthandlerkey)
- [plotMouseUpHandlerKey](plot.tool.PlotEdit.md#plotmouseuphandlerkey)
- [startPoint](plot.tool.PlotEdit.md#startpoint)

### Methods

- [activate](plot.tool.PlotEdit.md#activate)
- [controlPointMouseDownHandler](plot.tool.PlotEdit.md#controlpointmousedownhandler)
- [controlPointMouseMoveHandler](plot.tool.PlotEdit.md#controlpointmousemovehandler)
- [controlPointMouseMoveHandler2](plot.tool.PlotEdit.md#controlpointmousemovehandler2)
- [controlPointMouseUpHandler](plot.tool.PlotEdit.md#controlpointmouseuphandler)
- [deactivate](plot.tool.PlotEdit.md#deactivate)
- [destroyHelperDom](plot.tool.PlotEdit.md#destroyhelperdom)
- [disableMapDragPan](plot.tool.PlotEdit.md#disablemapdragpan)
- [disconnectEventHandlers](plot.tool.PlotEdit.md#disconnecteventhandlers)
- [enableMapDragPan](plot.tool.PlotEdit.md#enablemapdragpan)
- [getControlPoints](plot.tool.PlotEdit.md#getcontrolpoints)
- [getMapParentElement](plot.tool.PlotEdit.md#getmapparentelement)
- [initControlPoints](plot.tool.PlotEdit.md#initcontrolpoints)
- [initHelperDom](plot.tool.PlotEdit.md#inithelperdom)
- [plotMouseDownHandler](plot.tool.PlotEdit.md#plotmousedownhandler)
- [plotMouseMoveHandler](plot.tool.PlotEdit.md#plotmousemovehandler)
- [plotMouseOverOutHandler](plot.tool.PlotEdit.md#plotmouseoverouthandler)
- [plotMouseUpHandler](plot.tool.PlotEdit.md#plotmouseuphandler)
- [setMap](plot.tool.PlotEdit.md#setmap)

## Constructors

### constructor

• **new PlotEdit**(`map`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map` |  |

#### Overrides

Observable.constructor

## Properties

### Constants

• **Constants**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `HELPER_CONTROL_POINT_DIV` | `string` |
| `HELPER_HIDDEN_DIV` | `string` |

___

### activeControlPointId

• **activeControlPointId**: `number` = `null`

___

### activePlot

• **activePlot**: `any` = `null`

___

### controlPointMouseMoveHandlerKey

• **controlPointMouseMoveHandlerKey**: `EventsKey` = `null`

___

### controlPointMouseUpHandlerKey

• **controlPointMouseUpHandlerKey**: `EventsKey` = `null`

___

### controlPoints

• **controlPoints**: `Overlay`[] = `null`

___

### elementTable

• **elementTable**: `Object` = `{}`

___

### ghostControlPoints

• **ghostControlPoints**: `Coordinate`[] = `null`

___

### mapDragPan

• **mapDragPan**: `DragPan` = `null`

___

### map\_

• **map\_**: `Map` = `null`

___

### mouseOver

• **mouseOver**: `boolean` = `false`

___

### plotMouseDownHandlerKey

• **plotMouseDownHandlerKey**: `EventsKey` = `null`

___

### plotMouseMoveHandlerKey

• **plotMouseMoveHandlerKey**: `EventsKey` = `null`

___

### plotMouseOverOutHandlerKey

• **plotMouseOverOutHandlerKey**: `EventsKey` = `null`

___

### plotMouseUpHandlerKey

• **plotMouseUpHandlerKey**: `EventsKey` = `null`

___

### startPoint

• **startPoint**: `Coordinate` = `null`

## Methods

### activate

▸ **activate**(`plot`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plot` | `any` |  |

#### Returns

`void`

___

### controlPointMouseDownHandler

▸ **controlPointMouseDownHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### controlPointMouseMoveHandler

▸ **controlPointMouseMoveHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### controlPointMouseMoveHandler2

▸ **controlPointMouseMoveHandler2**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### controlPointMouseUpHandler

▸ **controlPointMouseUpHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### deactivate

▸ **deactivate**(): `void`

#### Returns

`void`

___

### destroyHelperDom

▸ **destroyHelperDom**(): `void`

#### Returns

`void`

___

### disableMapDragPan

▸ **disableMapDragPan**(): `void`

#### Returns

`void`

___

### disconnectEventHandlers

▸ **disconnectEventHandlers**(): `void`

#### Returns

`void`

___

### enableMapDragPan

▸ **enableMapDragPan**(): `void`

#### Returns

`void`

___

### getControlPoints

▸ **getControlPoints**(): `any`

#### Returns

`any`

___

### getMapParentElement

▸ **getMapParentElement**(): `ParentNode`

#### Returns

`ParentNode`

___

### initControlPoints

▸ **initControlPoints**(): `void`

#### Returns

`void`

___

### initHelperDom

▸ **initHelperDom**(): `void`

#### Returns

`void`

___

### plotMouseDownHandler

▸ **plotMouseDownHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### plotMouseMoveHandler

▸ **plotMouseMoveHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### plotMouseOverOutHandler

▸ **plotMouseOverOutHandler**(`e`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` |  |

#### Returns

`void`

___

### plotMouseUpHandler

▸ **plotMouseUpHandler**(`e`): `void`

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
