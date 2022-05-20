[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / Flight

# Class: Flight

[animation](../modules/animation.md).Flight

航线

**`author`** 潘知悦

**`since`** v1.1.0

## Hierarchy

- `BaseObject`

  ↳ **`Flight`**

## Table of contents

### Constructors

- [constructor](animation.Flight.md#constructor)

### Properties

- [aId\_](animation.Flight.md#aid_)
- [angle\_](animation.Flight.md#angle_)
- [animationArrow\_](animation.Flight.md#animationarrow_)
- [endArrow\_](animation.Flight.md#endarrow_)
- [feature\_](animation.Flight.md#feature_)
- [fraction\_](animation.Flight.md#fraction_)
- [from\_](animation.Flight.md#from_)
- [lineAnimationFeature\_](animation.Flight.md#lineanimationfeature_)
- [lineAnimationStyle\_](animation.Flight.md#lineanimationstyle_)
- [lineStyle\_](animation.Flight.md#linestyle_)
- [loop\_](animation.Flight.md#loop_)
- [pointAnimationFeature\_](animation.Flight.md#pointanimationfeature_)
- [pointAnimationStyle\_](animation.Flight.md#pointanimationstyle_)
- [radius\_](animation.Flight.md#radius_)
- [ready](animation.Flight.md#ready)
- [smooth\_](animation.Flight.md#smooth_)
- [source\_](animation.Flight.md#source_)
- [space\_](animation.Flight.md#space_)
- [to\_](animation.Flight.md#to_)

### Methods

- [animation\_](animation.Flight.md#animation_)
- [createPoints\_](animation.Flight.md#createpoints_)
- [end](animation.Flight.md#end)
- [getAngle](animation.Flight.md#getangle)
- [getAnimationArrow](animation.Flight.md#getanimationarrow)
- [getEndArrow](animation.Flight.md#getendarrow)
- [getFeature](animation.Flight.md#getfeature)
- [getFraction\_](animation.Flight.md#getfraction_)
- [getFrom](animation.Flight.md#getfrom)
- [getLineAnimationFeature](animation.Flight.md#getlineanimationfeature)
- [getLineAnimationStyle](animation.Flight.md#getlineanimationstyle)
- [getLineStyle](animation.Flight.md#getlinestyle)
- [getLoop](animation.Flight.md#getloop)
- [getPointAnimationFeature](animation.Flight.md#getpointanimationfeature)
- [getPointAnimationStyle](animation.Flight.md#getpointanimationstyle)
- [getRadius](animation.Flight.md#getradius)
- [getSmooth](animation.Flight.md#getsmooth)
- [getSource](animation.Flight.md#getsource)
- [getSpace](animation.Flight.md#getspace)
- [getTo](animation.Flight.md#getto)
- [initLineFeature\_](animation.Flight.md#initlinefeature_)
- [init\_](animation.Flight.md#init_)
- [renderLine\_](animation.Flight.md#renderline_)
- [renderPoint\_](animation.Flight.md#renderpoint_)
- [setAngle](animation.Flight.md#setangle)
- [setAnimationArrow](animation.Flight.md#setanimationarrow)
- [setEndArrow](animation.Flight.md#setendarrow)
- [setFraction](animation.Flight.md#setfraction)
- [setFrom](animation.Flight.md#setfrom)
- [setLineAnimationStyle](animation.Flight.md#setlineanimationstyle)
- [setLineStyle](animation.Flight.md#setlinestyle)
- [setLoop](animation.Flight.md#setloop)
- [setPointAnimationStyle](animation.Flight.md#setpointanimationstyle)
- [setRadius](animation.Flight.md#setradius)
- [setSmooth](animation.Flight.md#setsmooth)
- [setSource](animation.Flight.md#setsource)
- [setSpace](animation.Flight.md#setspace)
- [setTo](animation.Flight.md#setto)
- [start](animation.Flight.md#start)
- [stop](animation.Flight.md#stop)

## Constructors

### constructor

• **new Flight**(`opt_options`)

构造函数

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `FlightOptions` |

#### Overrides

OLObject.constructor

## Properties

### aId\_

• `Private` **aId\_**: `any`

动画id

___

### angle\_

• `Private` **angle\_**: `number`

曲线角度，radius与 angle结合可定义曲线的形状

___

### animationArrow\_

• `Private` **animationArrow\_**: `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

动画箭头

___

### endArrow\_

• `Private` **endArrow\_**: `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

终点箭头

___

### feature\_

• `Private` **feature\_**: `Feature`<`any`\> = `null`

航线要素

___

### fraction\_

• `Private` **fraction\_**: `number` = `0`

动画索引号

___

### from\_

• `Private` **from\_**: `Coordinate`

起点坐标

___

### lineAnimationFeature\_

• `Private` **lineAnimationFeature\_**: `Feature`<`any`\> = `null`

动画线要素

___

### lineAnimationStyle\_

• `Private` **lineAnimationStyle\_**: `Style`[] \| `StyleFunction`

动画线样式

___

### lineStyle\_

• `Private` **lineStyle\_**: `Style`[] \| `StyleFunction`

固定航线线样式

___

### loop\_

• `Private` **loop\_**: `boolean`

动画循环

___

### pointAnimationFeature\_

• `Private` **pointAnimationFeature\_**: `Feature`<`any`\> = `null`

动画点要素

___

### pointAnimationStyle\_

• `Private` **pointAnimationStyle\_**: `Style`[] \| `StyleFunction`

动画点样式

___

### radius\_

• `Private` **radius\_**: `number`

曲线半径度数, 默认为0,直线

___

### ready

• `Private` **ready**: `boolean` = `false`

是否初始化

___

### smooth\_

• `Private` **smooth\_**: `number`

平滑度，越小线越平滑

___

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

矢量图层

___

### space\_

• `Private` **space\_**: `number`

分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快

___

### to\_

• `Private` **to\_**: `Coordinate`

终点坐标

## Methods

### animation\_

▸ `Private` **animation_**(): `void`

渲染

#### Returns

`void`

___

### createPoints\_

▸ `Private` **createPoints_**(): `Coordinate`[]

创建航线路线点集

#### Returns

`Coordinate`[]

___

### end

▸ **end**(): `void`

结束

#### Returns

`void`

___

### getAngle

▸ **getAngle**(): `number`

获取曲线半径度数

#### Returns

`number`

___

### getAnimationArrow

▸ **getAnimationArrow**(): `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

获取动画箭头

#### Returns

`Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

___

### getEndArrow

▸ **getEndArrow**(): `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

获取终点箭头

#### Returns

`Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

___

### getFeature

▸ **getFeature**(): `Feature`<`any`\>

获取默认线要素

#### Returns

`Feature`<`any`\>

___

### getFraction\_

▸ **getFraction_**(): `number`

获取动画执行部分

#### Returns

`number`

___

### getFrom

▸ **getFrom**(): `Coordinate`

获取起点坐标

#### Returns

`Coordinate`

___

### getLineAnimationFeature

▸ **getLineAnimationFeature**(): `Feature`<`any`\>

获取动画线要素

#### Returns

`Feature`<`any`\>

___

### getLineAnimationStyle

▸ **getLineAnimationStyle**(): `Style`[] \| `StyleFunction`

获取动画线样式

#### Returns

`Style`[] \| `StyleFunction`

___

### getLineStyle

▸ **getLineStyle**(): `Style`[] \| `StyleFunction`

获取默认线样式

#### Returns

`Style`[] \| `StyleFunction`

___

### getLoop

▸ **getLoop**(): `boolean`

获取是否循环

#### Returns

`boolean`

布尔值

___

### getPointAnimationFeature

▸ **getPointAnimationFeature**(): `Feature`<`any`\>

获取动画点要素

#### Returns

`Feature`<`any`\>

___

### getPointAnimationStyle

▸ **getPointAnimationStyle**(): `Style`[] \| `StyleFunction`

获取动画点样式

#### Returns

`Style`[] \| `StyleFunction`

___

### getRadius

▸ **getRadius**(): `number`

获取曲线半径度数

#### Returns

`number`

___

### getSmooth

▸ **getSmooth**(): `number`

获取平滑度，越小线越平滑

#### Returns

`number`

___

### getSource

▸ **getSource**(): `VectorSource`<`any`\>

获取矢量数据源

#### Returns

`VectorSource`<`any`\>

___

### getSpace

▸ **getSpace**(): `number`

获取分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快

#### Returns

`number`

___

### getTo

▸ **getTo**(): `Coordinate`

获取终点坐标

#### Returns

`Coordinate`

___

### initLineFeature\_

▸ `Private` **initLineFeature_**(): `void`

初始化航线要素

#### Returns

`void`

___

### init\_

▸ `Private` **init_**(): `void`

初始化

#### Returns

`void`

___

### renderLine\_

▸ `Private` **renderLine_**(`coordinates`, `fraction`): `void`

线

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | 航线坐标点集 |
| `fraction` | `number` | 索引号 |

#### Returns

`void`

___

### renderPoint\_

▸ `Private` **renderPoint_**(`coordinates`, `fraction`): `void`

渲染点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | 航线坐标点集 |
| `fraction` | `number` | 索引号 |

#### Returns

`void`

___

### setAngle

▸ **setAngle**(`angle`): `void`

设置曲线角度，radius与 angle结合可定义曲线的形状

#### Parameters

| Name | Type |
| :------ | :------ |
| `angle` | `number` |

#### Returns

`void`

___

### setAnimationArrow

▸ **setAnimationArrow**(`arrow`): `void`

设置动画箭头

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrow` | `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md) |

#### Returns

`void`

___

### setEndArrow

▸ **setEndArrow**(`arrow`): `void`

设置终点箭头

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrow` | `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md) |

#### Returns

`void`

___

### setFraction

▸ **setFraction**(`fraction`): `void`

设置动画进程

#### Parameters

| Name | Type |
| :------ | :------ |
| `fraction` | `number` |

#### Returns

`void`

___

### setFrom

▸ **setFrom**(`from`): `void`

设置起点

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `Coordinate` |

#### Returns

`void`

___

### setLineAnimationStyle

▸ **setLineAnimationStyle**(`style`): `void`

设置动画轨迹样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` | 样式 |

#### Returns

`void`

___

### setLineStyle

▸ **setLineStyle**(`style`): `void`

设置默认轨迹样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` | 样式 |

#### Returns

`void`

___

### setLoop

▸ **setLoop**(`loop`): `void`

设置是否循环

#### Parameters

| Name | Type |
| :------ | :------ |
| `loop` | `boolean` |

#### Returns

`void`

___

### setPointAnimationStyle

▸ **setPointAnimationStyle**(`style`): `void`

设置动画点样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` | 样式 |

#### Returns

`void`

___

### setRadius

▸ **setRadius**(`radius`): `void`

设置曲线半径读书，默认为0，直线

#### Parameters

| Name | Type |
| :------ | :------ |
| `radius` | `number` |

#### Returns

`void`

___

### setSmooth

▸ **setSmooth**(`smooth`): `void`

平滑度，越小线越平滑

#### Parameters

| Name | Type |
| :------ | :------ |
| `smooth` | `number` |

#### Returns

`void`

___

### setSource

▸ **setSource**(`source`): `void`

设置矢量数据源

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `VectorSource`<`any`\> |

#### Returns

`void`

___

### setSpace

▸ **setSpace**(`space`): `void`

分割点的距离，可通过改设置控制动画移动的速度，值越大速度越快

#### Parameters

| Name | Type |
| :------ | :------ |
| `space` | `number` |

#### Returns

`void`

___

### setTo

▸ **setTo**(`to`): `void`

设置终点

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | `Coordinate` |

#### Returns

`void`

___

### start

▸ **start**(): `void`

开始

#### Returns

`void`

___

### stop

▸ **stop**(): `void`

暂停

#### Returns

`void`
