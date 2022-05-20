[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / Track

# Class: Track

[animation](../modules/animation.md).Track

航线

**`author`** 潘知悦

**`since`** v1.1.0

## Hierarchy

- `BaseObject`

  ↳ **`Track`**

## Table of contents

### Constructors

- [constructor](animation.Track.md#constructor)

### Properties

- [aId\_](animation.Track.md#aid_)
- [coordinates\_](animation.Track.md#coordinates_)
- [feature\_](animation.Track.md#feature_)
- [fraction\_](animation.Track.md#fraction_)
- [lineAnimationFeature\_](animation.Track.md#lineanimationfeature_)
- [lineAnimationStyle\_](animation.Track.md#lineanimationstyle_)
- [lineStyle\_](animation.Track.md#linestyle_)
- [loop\_](animation.Track.md#loop_)
- [pointAnimationFeature\_](animation.Track.md#pointanimationfeature_)
- [pointAnimationStyle\_](animation.Track.md#pointanimationstyle_)
- [source\_](animation.Track.md#source_)

### Methods

- [animation\_](animation.Track.md#animation_)
- [createPoints\_](animation.Track.md#createpoints_)
- [end](animation.Track.md#end)
- [getCoordinate](animation.Track.md#getcoordinate)
- [getFeature](animation.Track.md#getfeature)
- [getFraction\_](animation.Track.md#getfraction_)
- [getLineAnimationFeature](animation.Track.md#getlineanimationfeature)
- [getLineAnimationStyle](animation.Track.md#getlineanimationstyle)
- [getLineStyle](animation.Track.md#getlinestyle)
- [getLoop](animation.Track.md#getloop)
- [getPointAnimationFeature](animation.Track.md#getpointanimationfeature)
- [getPointAnimationStyle](animation.Track.md#getpointanimationstyle)
- [getSource](animation.Track.md#getsource)
- [init\_](animation.Track.md#init_)
- [renderLine\_](animation.Track.md#renderline_)
- [renderPoint\_](animation.Track.md#renderpoint_)
- [setCoordinates](animation.Track.md#setcoordinates)
- [setFraction](animation.Track.md#setfraction)
- [setLineAnimationStyle](animation.Track.md#setlineanimationstyle)
- [setLineStyle](animation.Track.md#setlinestyle)
- [setLoop](animation.Track.md#setloop)
- [setPointAnimationStyle](animation.Track.md#setpointanimationstyle)
- [setSource](animation.Track.md#setsource)
- [start](animation.Track.md#start)
- [stop](animation.Track.md#stop)

## Constructors

### constructor

• **new Track**(`opt_options`)

构造函数

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `TrackOptions` |

#### Overrides

OLObject.constructor

## Properties

### aId\_

• `Private` **aId\_**: `any`

动画id

___

### coordinates\_

• `Private` **coordinates\_**: `Coordinate`[]

起点坐标

___

### feature\_

• `Private` **feature\_**: `Feature`<`any`\> = `null`

航线要素

___

### fraction\_

• `Private` **fraction\_**: `number` = `0`

动画索引号

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

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

矢量图层

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

### getCoordinate

▸ **getCoordinate**(): `Coordinate`[]

获取坐标集合

#### Returns

`Coordinate`[]

[[x,y]...[x,y]]

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

### getSource

▸ **getSource**(): `VectorSource`<`any`\>

获取矢量图层

#### Returns

`VectorSource`<`any`\>

___

### init\_

▸ `Private` **init_**(): `void`

初始化

#### Returns

`void`

___

### renderLine\_

▸ `Private` **renderLine_**(`coordinates`, `fraction`, `angle`): `void`

线

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | 航线坐标点集 |
| `fraction` | `number` | 索引号 |
| `angle` | `number` | - |

#### Returns

`void`

___

### renderPoint\_

▸ `Private` **renderPoint_**(`coordinates`, `fraction`, `angle`): `void`

渲染点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | 航线坐标点集 |
| `fraction` | `number` | 索引号 |
| `angle` | `number` | - |

#### Returns

`void`

___

### setCoordinates

▸ **setCoordinates**(`coordinates`): `void`

设置点集

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | [[x,y]...[x,y]] |

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

### setSource

▸ **setSource**(`source`): `void`

设置矢量图层

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `VectorSource`<`any`\> |

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
