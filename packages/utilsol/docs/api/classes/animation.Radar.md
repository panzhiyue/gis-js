[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / Radar

# Class: Radar

[animation](../modules/animation.md).Radar

## Hierarchy

- `BaseObject`

  ↳ **`Radar`**

## Table of contents

### Constructors

- [constructor](animation.Radar.md#constructor)

### Properties

- [aId\_](animation.Radar.md#aid_)
- [arcAngle\_](animation.Radar.md#arcangle_)
- [arcFeatures\_](animation.Radar.md#arcfeatures_)
- [arcStyle\_](animation.Radar.md#arcstyle_)
- [centerFeature\_](animation.Radar.md#centerfeature_)
- [centerStyle\_](animation.Radar.md#centerstyle_)
- [center\_](animation.Radar.md#center_)
- [circleFeature\_](animation.Radar.md#circlefeature_)
- [circleStyle\_](animation.Radar.md#circlestyle_)
- [currentAngle\_](animation.Radar.md#currentangle_)
- [loop\_](animation.Radar.md#loop_)
- [period\_](animation.Radar.md#period_)
- [radius\_](animation.Radar.md#radius_)
- [ready](animation.Radar.md#ready)
- [source\_](animation.Radar.md#source_)
- [startAngle\_](animation.Radar.md#startangle_)

### Methods

- [animation\_](animation.Radar.md#animation_)
- [end](animation.Radar.md#end)
- [getArcAngle](animation.Radar.md#getarcangle)
- [getArcFeatures](animation.Radar.md#getarcfeatures)
- [getArcStyle](animation.Radar.md#getarcstyle)
- [getCenetr](animation.Radar.md#getcenetr)
- [getCenterFeature](animation.Radar.md#getcenterfeature)
- [getCenterStyle](animation.Radar.md#getcenterstyle)
- [getCircleFeature](animation.Radar.md#getcirclefeature)
- [getCircleStyle](animation.Radar.md#getcirclestyle)
- [getCurrentAngle](animation.Radar.md#getcurrentangle)
- [getLoop](animation.Radar.md#getloop)
- [getPeriod](animation.Radar.md#getperiod)
- [getRadius](animation.Radar.md#getradius)
- [getSource](animation.Radar.md#getsource)
- [getStartAngle](animation.Radar.md#getstartangle)
- [init\_](animation.Radar.md#init_)
- [renderArc\_](animation.Radar.md#renderarc_)
- [renderCenter\_](animation.Radar.md#rendercenter_)
- [renderCircle\_](animation.Radar.md#rendercircle_)
- [setArcAngle](animation.Radar.md#setarcangle)
- [setArcStyle](animation.Radar.md#setarcstyle)
- [setCenter](animation.Radar.md#setcenter)
- [setCenterStyle](animation.Radar.md#setcenterstyle)
- [setCircleStyle](animation.Radar.md#setcirclestyle)
- [setLoop](animation.Radar.md#setloop)
- [setPeriod](animation.Radar.md#setperiod)
- [setRadius](animation.Radar.md#setradius)
- [setSource](animation.Radar.md#setsource)
- [setStartAngle](animation.Radar.md#setstartangle)
- [start](animation.Radar.md#start)

## Constructors

### constructor

• **new Radar**(`opt_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `RadarOptions` |

#### Overrides

OLObject.constructor

## Properties

### aId\_

• `Private` **aId\_**: `any`

动画

___

### arcAngle\_

• `Private` **arcAngle\_**: `number`

弧角度

___

### arcFeatures\_

• `Private` **arcFeatures\_**: `Feature`<`Polygon`\>[]

弧要素集合

___

### arcStyle\_

• `Private` **arcStyle\_**: `Style`[] \| `StyleFunction`

弧样式

___

### centerFeature\_

• `Private` **centerFeature\_**: `Feature`<`Point`\>

中心点要素

___

### centerStyle\_

• `Private` **centerStyle\_**: `Style`[] \| `StyleFunction`

中心点样式

___

### center\_

• `Private` **center\_**: `Coordinate`

中心点坐标

___

### circleFeature\_

• `Private` **circleFeature\_**: `Feature`<`Circle`\>

圆要素

___

### circleStyle\_

• `Private` **circleStyle\_**: `Style`[] \| `StyleFunction`

圆样式

___

### currentAngle\_

• `Private` **currentAngle\_**: `number` = `0`

当前角度

___

### loop\_

• `Private` **loop\_**: `boolean`

是否循环

___

### period\_

• `Private` **period\_**: `number`

动画周期

___

### radius\_

• `Private` **radius\_**: `number`

半径

___

### ready

• `Private` **ready**: `boolean` = `false`

是否加载完毕

___

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

矢量图层

___

### startAngle\_

• `Private` **startAngle\_**: `number`

起始角度

## Methods

### animation\_

▸ **animation_**(): `void`

#### Returns

`void`

___

### end

▸ **end**(): `void`

#### Returns

`void`

___

### getArcAngle

▸ **getArcAngle**(): `number`

获取弧角度

#### Returns

`number`

___

### getArcFeatures

▸ **getArcFeatures**(): `Feature`<`any`\>[]

获取圆弧要素集合

#### Returns

`Feature`<`any`\>[]

___

### getArcStyle

▸ **getArcStyle**(): `Style`[] \| `StyleFunction`

获取圆弧样式

#### Returns

`Style`[] \| `StyleFunction`

___

### getCenetr

▸ **getCenetr**(): `Coordinate`

获取中心点

#### Returns

`Coordinate`

坐标

___

### getCenterFeature

▸ **getCenterFeature**(): `Feature`<`any`\>

获取中心点要素

#### Returns

`Feature`<`any`\>

___

### getCenterStyle

▸ **getCenterStyle**(): `Style`[] \| `StyleFunction`

获取中心点样式

#### Returns

`Style`[] \| `StyleFunction`

中心点样式

___

### getCircleFeature

▸ **getCircleFeature**(): `Feature`<`any`\>

获取圆弧要素

#### Returns

`Feature`<`any`\>

___

### getCircleStyle

▸ **getCircleStyle**(): `Style`[] \| `StyleFunction`

获取圆样式

#### Returns

`Style`[] \| `StyleFunction`

___

### getCurrentAngle

▸ **getCurrentAngle**(): `number`

获取当前扫描角度

#### Returns

`number`

___

### getLoop

▸ **getLoop**(): `boolean`

获取是否循环

#### Returns

`boolean`

boolean

___

### getPeriod

▸ **getPeriod**(): `number`

获取动画周期

#### Returns

`number`

数值

___

### getRadius

▸ **getRadius**(): `number`

获取半径

#### Returns

`number`

表示半径的数值

___

### getSource

▸ **getSource**(): `VectorSource`<`any`\>

获取矢量数据源

#### Returns

`VectorSource`<`any`\>

矢量数据源

___

### getStartAngle

▸ **getStartAngle**(): `number`

获取起始角度(弧度)

#### Returns

`number`

0-2PI之间的数值

___

### init\_

▸ **init_**(`redraw?`): `void`

初始化

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` | 重新渲染 |

#### Returns

`void`

___

### renderArc\_

▸ **renderArc_**(`redraw?`): `void`

渲染中心点

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` | 重新渲染 |

#### Returns

`void`

___

### renderCenter\_

▸ **renderCenter_**(`redraw?`): `void`

渲染中心点

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` | 重新渲染 |

#### Returns

`void`

___

### renderCircle\_

▸ **renderCircle_**(`redraw?`): `void`

渲染圆

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` | 重新渲染 |

#### Returns

`void`

___

### setArcAngle

▸ **setArcAngle**(`arcAngle`): `void`

设置弧角度

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arcAngle` | `number` | 弧角度 |

#### Returns

`void`

___

### setArcStyle

▸ **setArcStyle**(`style`): `void`

设置圆弧样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` | 样式 |

#### Returns

`void`

___

### setCenter

▸ **setCenter**(`center`): `void`

设置中心点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `center` | `Coordinate` | 中心点 |

#### Returns

`void`

___

### setCenterStyle

▸ **setCenterStyle**(`style`): `void`

设置中心点样式

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` | 样式 |

#### Returns

`void`

___

### setCircleStyle

▸ **setCircleStyle**(`style`): `void`

设置圆样式

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `loop` | `boolean` | 是否循环 |

#### Returns

`void`

___

### setPeriod

▸ **setPeriod**(`period`): `void`

设置动画周期

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `period` | `number` | 动画周期 |

#### Returns

`void`

___

### setRadius

▸ **setRadius**(`radius`): `void`

设置半径

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` | 半径 |

#### Returns

`void`

___

### setSource

▸ **setSource**(`source`): `void`

设置矢量图层

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `VectorSource`<`any`\> | 矢量图层 |

#### Returns

`void`

___

### setStartAngle

▸ **setStartAngle**(`startAngel`): `void`

设置起始角度

#### Parameters

| Name | Type |
| :------ | :------ |
| `startAngel` | `number` |

#### Returns

`void`

___

### start

▸ **start**(): `void`

#### Returns

`void`
