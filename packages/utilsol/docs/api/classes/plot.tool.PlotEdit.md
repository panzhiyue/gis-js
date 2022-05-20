[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [plot](../modules/plot.md) / [tool](../modules/plot.tool.md) / PlotEdit

# Class: PlotEdit

[plot](../modules/plot.md).[tool](../modules/plot.tool.md).PlotEdit

绘标编辑类

**`api`**

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

构造函数

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map` | 地图对象 |

#### Overrides

Observable.constructor

## Properties

### Constants

• **Constants**: `Object`

常数对象

#### Type declaration

| Name | Type |
| :------ | :------ |
| `HELPER_CONTROL_POINT_DIV` | `string` |
| `HELPER_HIDDEN_DIV` | `string` |

___

### activeControlPointId

• **activeControlPointId**: `number` = `null`

激活的控制点的节点id

___

### activePlot

• **activePlot**: `any` = `null`

激活的会标图形

___

### controlPointMouseMoveHandlerKey

• **controlPointMouseMoveHandlerKey**: `EventsKey` = `null`

控制点鼠标移动事件key

___

### controlPointMouseUpHandlerKey

• **controlPointMouseUpHandlerKey**: `EventsKey` = `null`

控制点鼠标抬起事件key

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

地图拖动交互对象

___

### map\_

• **map\_**: `Map` = `null`

地图对象

___

### mouseOver

• **mouseOver**: `boolean` = `false`

鼠标是否悬浮在图形上

___

### plotMouseDownHandlerKey

• **plotMouseDownHandlerKey**: `EventsKey` = `null`

绘标图形鼠标按下事件

___

### plotMouseMoveHandlerKey

• **plotMouseMoveHandlerKey**: `EventsKey` = `null`

绘标图形鼠标移动事件

___

### plotMouseOverOutHandlerKey

• **plotMouseOverOutHandlerKey**: `EventsKey` = `null`

绘标图形鼠标移除事件

___

### plotMouseUpHandlerKey

• **plotMouseUpHandlerKey**: `EventsKey` = `null`

绘标图形鼠标抬起事件

___

### startPoint

• **startPoint**: `Coordinate` = `null`

开始点位,也就是鼠标按下时的经纬度坐标

## Methods

### activate

▸ **activate**(`plot`): `void`

激活

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `plot` | `any` | 激活编辑的要素 |

#### Returns

`void`

___

### controlPointMouseDownHandler

▸ **controlPointMouseDownHandler**(`e`): `void`

控制点鼠标按下事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### controlPointMouseMoveHandler

▸ **controlPointMouseMoveHandler**(`e`): `void`

控制点移动事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### controlPointMouseMoveHandler2

▸ **controlPointMouseMoveHandler2**(`e`): `void`

控制节点移动

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### controlPointMouseUpHandler

▸ **controlPointMouseUpHandler**(`e`): `void`

控制点鼠标弹起事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### deactivate

▸ **deactivate**(): `void`

注销激活事件

#### Returns

`void`

___

### destroyHelperDom

▸ **destroyHelperDom**(): `void`

销毁element

#### Returns

`void`

___

### disableMapDragPan

▸ **disableMapDragPan**(): `void`

不允许地图拖拽

#### Returns

`void`

___

### disconnectEventHandlers

▸ **disconnectEventHandlers**(): `void`

注销事件

#### Returns

`void`

___

### enableMapDragPan

▸ **enableMapDragPan**(): `void`

允许地图拖拽

#### Returns

`void`

___

### getControlPoints

▸ **getControlPoints**(): `any`

获取控制点

#### Returns

`any`

___

### getMapParentElement

▸ **getMapParentElement**(): `ParentNode`

获取地图容器父节点

#### Returns

`ParentNode`

___

### initControlPoints

▸ **initControlPoints**(): `void`

初始化控制点

#### Returns

`void`

___

### initHelperDom

▸ **initHelperDom**(): `void`

初始化节点

#### Returns

`void`

___

### plotMouseDownHandler

▸ **plotMouseDownHandler**(`e`): `void`

编辑要素鼠标按下事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### plotMouseMoveHandler

▸ **plotMouseMoveHandler**(`e`): `void`

编辑要素鼠标移动事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### plotMouseOverOutHandler

▸ **plotMouseOverOutHandler**(`e`): `void`

鼠标移入移出控制要素事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### plotMouseUpHandler

▸ **plotMouseUpHandler**(`e`): `void`

编辑要素鼠标弹起事件

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
