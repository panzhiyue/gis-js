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

___

### arcAngle\_

• `Private` **arcAngle\_**: `number`

___

### arcFeatures\_

• `Private` **arcFeatures\_**: `Feature`<`Polygon`\>[]

___

### arcStyle\_

• `Private` **arcStyle\_**: `Style`[] \| `StyleFunction`

___

### centerFeature\_

• `Private` **centerFeature\_**: `Feature`<`Point`\>

___

### centerStyle\_

• `Private` **centerStyle\_**: `Style`[] \| `StyleFunction`

___

### center\_

• `Private` **center\_**: `Coordinate`

___

### circleFeature\_

• `Private` **circleFeature\_**: `Feature`<`Circle`\>

___

### circleStyle\_

• `Private` **circleStyle\_**: `Style`[] \| `StyleFunction`

___

### currentAngle\_

• `Private` **currentAngle\_**: `number` = `0`

___

### loop\_

• `Private` **loop\_**: `boolean`

___

### period\_

• `Private` **period\_**: `number`

___

### radius\_

• `Private` **radius\_**: `number`

___

### ready

• `Private` **ready**: `boolean` = `false`

___

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

___

### startAngle\_

• `Private` **startAngle\_**: `number`

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

#### Returns

`number`

___

### getArcFeatures

▸ **getArcFeatures**(): `Feature`<`any`\>[]

#### Returns

`Feature`<`any`\>[]

___

### getArcStyle

▸ **getArcStyle**(): `Style`[] \| `StyleFunction`

#### Returns

`Style`[] \| `StyleFunction`

___

### getCenetr

▸ **getCenetr**(): `Coordinate`

#### Returns

`Coordinate`

___

### getCenterFeature

▸ **getCenterFeature**(): `Feature`<`any`\>

#### Returns

`Feature`<`any`\>

___

### getCenterStyle

▸ **getCenterStyle**(): `Style`[] \| `StyleFunction`

#### Returns

`Style`[] \| `StyleFunction`

___

### getCircleFeature

▸ **getCircleFeature**(): `Feature`<`any`\>

#### Returns

`Feature`<`any`\>

___

### getCircleStyle

▸ **getCircleStyle**(): `Style`[] \| `StyleFunction`

#### Returns

`Style`[] \| `StyleFunction`

___

### getCurrentAngle

▸ **getCurrentAngle**(): `number`

#### Returns

`number`

___

### getLoop

▸ **getLoop**(): `boolean`

#### Returns

`boolean`

___

### getPeriod

▸ **getPeriod**(): `number`

#### Returns

`number`

___

### getRadius

▸ **getRadius**(): `number`

#### Returns

`number`

___

### getSource

▸ **getSource**(): `VectorSource`<`any`\>

#### Returns

`VectorSource`<`any`\>

___

### getStartAngle

▸ **getStartAngle**(): `number`

#### Returns

`number`

___

### init\_

▸ **init_**(`redraw?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` |  |

#### Returns

`void`

___

### renderArc\_

▸ **renderArc_**(`redraw?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` |  |

#### Returns

`void`

___

### renderCenter\_

▸ **renderCenter_**(`redraw?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` |  |

#### Returns

`void`

___

### renderCircle\_

▸ **renderCircle_**(`redraw?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `redraw` | `boolean` | `false` |  |

#### Returns

`void`

___

### setArcAngle

▸ **setArcAngle**(`arcAngle`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arcAngle` | `number` |  |

#### Returns

`void`

___

### setArcStyle

▸ **setArcStyle**(`style`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` |  |

#### Returns

`void`

___

### setCenter

▸ **setCenter**(`center`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `center` | `Coordinate` |  |

#### Returns

`void`

___

### setCenterStyle

▸ **setCenterStyle**(`style`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` |  |

#### Returns

`void`

___

### setCircleStyle

▸ **setCircleStyle**(`style`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` |  |

#### Returns

`void`

___

### setLoop

▸ **setLoop**(`loop`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loop` | `boolean` |  |

#### Returns

`void`

___

### setPeriod

▸ **setPeriod**(`period`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `period` | `number` |  |

#### Returns

`void`

___

### setRadius

▸ **setRadius**(`radius`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` |  |

#### Returns

`void`

___

### setSource

▸ **setSource**(`source`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `VectorSource`<`any`\> |  |

#### Returns

`void`

___

### setStartAngle

▸ **setStartAngle**(`startAngel`): `void`

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
