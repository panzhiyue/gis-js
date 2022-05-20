[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / Scatter

# Class: Scatter

[animation](../modules/animation.md).Scatter

散点

**`author`** 潘知悦

**`since`** v1.1.0

## Hierarchy

- `BaseObject`

  ↳ **`Scatter`**

## Table of contents

### Constructors

- [constructor](animation.Scatter.md#constructor)

### Properties

- [aId\_](animation.Scatter.md#aid_)
- [centerStyle\_](animation.Scatter.md#centerstyle_)
- [coordinate\_](animation.Scatter.md#coordinate_)
- [feature\_](animation.Scatter.md#feature_)
- [innerOpacity\_](animation.Scatter.md#inneropacity_)
- [innerRadius\_](animation.Scatter.md#innerradius_)
- [loop\_](animation.Scatter.md#loop_)
- [outerOpacity\_](animation.Scatter.md#outeropacity_)
- [outerRadius\_](animation.Scatter.md#outerradius_)
- [period\_](animation.Scatter.md#period_)
- [rippleStyle\_](animation.Scatter.md#ripplestyle_)
- [source\_](animation.Scatter.md#source_)

### Methods

- [animation\_](animation.Scatter.md#animation_)
- [dispose](animation.Scatter.md#dispose)
- [end](animation.Scatter.md#end)
- [getCenterStyle](animation.Scatter.md#getcenterstyle)
- [getCoordinate](animation.Scatter.md#getcoordinate)
- [getFeature](animation.Scatter.md#getfeature)
- [getInnerOpacity](animation.Scatter.md#getinneropacity)
- [getInnerRadius](animation.Scatter.md#getinnerradius)
- [getLoop](animation.Scatter.md#getloop)
- [getOuterOpacity](animation.Scatter.md#getouteropacity)
- [getOuterRadius](animation.Scatter.md#getouterradius)
- [getPeriod](animation.Scatter.md#getperiod)
- [getRippleStyle](animation.Scatter.md#getripplestyle)
- [getSource](animation.Scatter.md#getsource)
- [init\_](animation.Scatter.md#init_)
- [setCenterStyle](animation.Scatter.md#setcenterstyle)
- [setCoordinate](animation.Scatter.md#setcoordinate)
- [setInnerOpacity](animation.Scatter.md#setinneropacity)
- [setInnerRadius](animation.Scatter.md#setinnerradius)
- [setLoop](animation.Scatter.md#setloop)
- [setOuterOpacity](animation.Scatter.md#setouteropacity)
- [setOuterRadius](animation.Scatter.md#setouterradius)
- [setPeriod](animation.Scatter.md#setperiod)
- [setRippleStyle](animation.Scatter.md#setripplestyle)
- [setSource](animation.Scatter.md#setsource)
- [start](animation.Scatter.md#start)

## Constructors

### constructor

• **new Scatter**(`opt_options`)

构造函数

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `ScatterOptions` |

#### Overrides

OLObject.constructor

## Properties

### aId\_

• `Private` **aId\_**: `any`

动画主键

___

### centerStyle\_

• `Private` **centerStyle\_**: `Style`[] \| `StyleFunction`

中心点样式

___

### coordinate\_

• `Private` **coordinate\_**: `Coordinate`

坐标

___

### feature\_

• `Private` **feature\_**: `Feature`<`any`\>

要素

___

### innerOpacity\_

• `Private` **innerOpacity\_**: `number`

散点内圈透明度

___

### innerRadius\_

• `Private` **innerRadius\_**: `number`

散点内圈半径

___

### loop\_

• `Private` **loop\_**: `boolean`

动画循环

___

### outerOpacity\_

• `Private` **outerOpacity\_**: `number`

散点外圈透明度

___

### outerRadius\_

• `Private` **outerRadius\_**: `number`

散点外圈半径

___

### period\_

• `Private` **period\_**: `number`

动画周期，秒数

___

### rippleStyle\_

• `Private` **rippleStyle\_**: `Style`[] \| `StyleFunction`

散点样式

___

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

图层

## Methods

### animation\_

▸ `Private` **animation_**(): `void`

动画

#### Returns

`void`

___

### dispose

▸ **dispose**(): `void`

销毁

#### Returns

`void`

#### Overrides

OLObject.dispose

___

### end

▸ **end**(): `void`

结束动画

#### Returns

`void`

___

### getCenterStyle

▸ **getCenterStyle**(): `Style`[] \| `StyleFunction`

中心点样式

#### Returns

`Style`[] \| `StyleFunction`

样式

___

### getCoordinate

▸ **getCoordinate**(): `Coordinate`

获取坐标值

#### Returns

`Coordinate`

___

### getFeature

▸ **getFeature**(): `Feature`<`any`\>

获取要素

#### Returns

`Feature`<`any`\>

___

### getInnerOpacity

▸ **getInnerOpacity**(): `number`

获取散点内圈透明度

#### Returns

`number`

0-1的数值

___

### getInnerRadius

▸ **getInnerRadius**(): `number`

获取散点内圈半径

#### Returns

`number`

大于0的数值

___

### getLoop

▸ **getLoop**(): `boolean`

设置是否循环

#### Returns

`boolean`

boolean值

___

### getOuterOpacity

▸ **getOuterOpacity**(): `number`

获取散点外圈透明度

#### Returns

`number`

0-1的数值

___

### getOuterRadius

▸ **getOuterRadius**(): `number`

获取散点外圈半径

#### Returns

`number`

大于0的数值

___

### getPeriod

▸ **getPeriod**(): `number`

设置动画周期

#### Returns

`number`

大于0的数值

___

### getRippleStyle

▸ **getRippleStyle**(): `Style`[] \| `StyleFunction`

散点样式

#### Returns

`Style`[] \| `StyleFunction`

样式

___

### getSource

▸ **getSource**(): `VectorSource`<`any`\>

矢量数据源

#### Returns

`VectorSource`<`any`\>

矢量数据源

___

### init\_

▸ `Private` **init_**(): `void`

初始化

#### Returns

`void`

___

### setCenterStyle

▸ **setCenterStyle**(`style`): `void`

中心点样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` | 样式 |

#### Returns

`void`

___

### setCoordinate

▸ **setCoordinate**(`coordinate`): `void`

设置坐标值

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinate` | `Coordinate` | 坐标 |

#### Returns

`void`

___

### setInnerOpacity

▸ **setInnerOpacity**(`opacity`): `void`

设置散点内圈透明度

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opacity` | `number` | 透明度 |

#### Returns

`void`

___

### setInnerRadius

▸ **setInnerRadius**(`radius`): `void`

设置散点内圈

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` | 半径 |

#### Returns

`void`

___

### setLoop

▸ **setLoop**(`loop`): `void`

设置是否循环

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loop` | `boolean` | 是否循环 |

#### Returns

`void`

___

### setOuterOpacity

▸ **setOuterOpacity**(`opacity`): `void`

设置散点外圈透明度

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opacity` | `number` | 透明度 |

#### Returns

`void`

___

### setOuterRadius

▸ **setOuterRadius**(`radius`): `void`

设置散点外圈

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` | 半径 |

#### Returns

`void`

___

### setPeriod

▸ **setPeriod**(`period`): `void`

设置动画周期

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `period` | `number` | 数值，单位为秒 |

#### Returns

`void`

___

### setRippleStyle

▸ **setRippleStyle**(`style`): `void`

散点样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` | 样式 |

#### Returns

`void`

___

### setSource

▸ **setSource**(`source`): `void`

矢量数据源

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `VectorSource`<`any`\> | 矢量数据源 |

#### Returns

`void`

___

### start

▸ **start**(): `void`

开始动画

#### Returns

`void`
