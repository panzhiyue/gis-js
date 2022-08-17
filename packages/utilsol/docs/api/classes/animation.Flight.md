[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / Flight

# Class: Flight

[animation](../modules/animation.md).Flight

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `FlightOptions` |

#### Overrides

OLObject.constructor

## Properties

### aId\_

• `Private` **aId\_**: `any`

___

### angle\_

• `Private` **angle\_**: `number`

___

### animationArrow\_

• `Private` **animationArrow\_**: `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

___

### endArrow\_

• `Private` **endArrow\_**: `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

___

### feature\_

• `Private` **feature\_**: `Feature`<`any`\> = `null`

___

### fraction\_

• `Private` **fraction\_**: `number` = `0`

___

### from\_

• `Private` **from\_**: `Coordinate`

___

### lineAnimationFeature\_

• `Private` **lineAnimationFeature\_**: `Feature`<`any`\> = `null`

___

### lineAnimationStyle\_

• `Private` **lineAnimationStyle\_**: `Style`[] \| `StyleFunction`

___

### lineStyle\_

• `Private` **lineStyle\_**: `Style`[] \| `StyleFunction`

___

### loop\_

• `Private` **loop\_**: `boolean`

___

### pointAnimationFeature\_

• `Private` **pointAnimationFeature\_**: `Feature`<`any`\> = `null`

___

### pointAnimationStyle\_

• `Private` **pointAnimationStyle\_**: `Style`[] \| `StyleFunction`

___

### radius\_

• `Private` **radius\_**: `number`

___

### ready

• `Private` **ready**: `boolean` = `false`

___

### smooth\_

• `Private` **smooth\_**: `number`

___

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

___

### space\_

• `Private` **space\_**: `number`

___

### to\_

• `Private` **to\_**: `Coordinate`

## Methods

### animation\_

▸ `Private` **animation_**(): `void`

#### Returns

`void`

___

### createPoints\_

▸ `Private` **createPoints_**(): `Coordinate`[]

#### Returns

`Coordinate`[]

___

### end

▸ **end**(): `void`

#### Returns

`void`

___

### getAngle

▸ **getAngle**(): `number`

#### Returns

`number`

___

### getAnimationArrow

▸ **getAnimationArrow**(): `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

#### Returns

`Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

___

### getEndArrow

▸ **getEndArrow**(): `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

#### Returns

`Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

___

### getFeature

▸ **getFeature**(): `Feature`<`any`\>

#### Returns

`Feature`<`any`\>

___

### getFraction\_

▸ **getFraction_**(): `number`

#### Returns

`number`

___

### getFrom

▸ **getFrom**(): `Coordinate`

#### Returns

`Coordinate`

___

### getLineAnimationFeature

▸ **getLineAnimationFeature**(): `Feature`<`any`\>

#### Returns

`Feature`<`any`\>

___

### getLineAnimationStyle

▸ **getLineAnimationStyle**(): `Style`[] \| `StyleFunction`

#### Returns

`Style`[] \| `StyleFunction`

___

### getLineStyle

▸ **getLineStyle**(): `Style`[] \| `StyleFunction`

#### Returns

`Style`[] \| `StyleFunction`

___

### getLoop

▸ **getLoop**(): `boolean`

#### Returns

`boolean`

___

### getPointAnimationFeature

▸ **getPointAnimationFeature**(): `Feature`<`any`\>

#### Returns

`Feature`<`any`\>

___

### getPointAnimationStyle

▸ **getPointAnimationStyle**(): `Style`[] \| `StyleFunction`

#### Returns

`Style`[] \| `StyleFunction`

___

### getRadius

▸ **getRadius**(): `number`

#### Returns

`number`

___

### getSmooth

▸ **getSmooth**(): `number`

#### Returns

`number`

___

### getSource

▸ **getSource**(): `VectorSource`<`any`\>

#### Returns

`VectorSource`<`any`\>

___

### getSpace

▸ **getSpace**(): `number`

#### Returns

`number`

___

### getTo

▸ **getTo**(): `Coordinate`

#### Returns

`Coordinate`

___

### initLineFeature\_

▸ `Private` **initLineFeature_**(): `void`

#### Returns

`void`

___

### init\_

▸ `Private` **init_**(): `void`

#### Returns

`void`

___

### renderLine\_

▸ `Private` **renderLine_**(`coordinates`, `fraction`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] |  |
| `fraction` | `number` |  |

#### Returns

`void`

___

### renderPoint\_

▸ `Private` **renderPoint_**(`coordinates`, `fraction`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] |  |
| `fraction` | `number` |  |

#### Returns

`void`

___

### setAngle

▸ **setAngle**(`angle`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angle` | `number` |  |

#### Returns

`void`

___

### setAnimationArrow

▸ **setAnimationArrow**(`arrow`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrow` | `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md) |  |

#### Returns

`void`

___

### setEndArrow

▸ **setEndArrow**(`arrow`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrow` | `Function` \| `Boolean` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md) |  |

#### Returns

`void`

___

### setFraction

▸ **setFraction**(`fraction`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fraction` | `number` |  |

#### Returns

`void`

___

### setFrom

▸ **setFrom**(`from`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `Coordinate` |  |

#### Returns

`void`

___

### setLineAnimationStyle

▸ **setLineAnimationStyle**(`style`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` |  |

#### Returns

`void`

___

### setLineStyle

▸ **setLineStyle**(`style`): `void`

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

### setPointAnimationStyle

▸ **setPointAnimationStyle**(`style`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` |  |

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

### setSmooth

▸ **setSmooth**(`smooth`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `smooth` | `number` |  |

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

### setSpace

▸ **setSpace**(`space`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `space` | `number` |  |

#### Returns

`void`

___

### setTo

▸ **setTo**(`to`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | `Coordinate` |  |

#### Returns

`void`

___

### start

▸ **start**(): `void`

#### Returns

`void`

___

### stop

▸ **stop**(): `void`

#### Returns

`void`
