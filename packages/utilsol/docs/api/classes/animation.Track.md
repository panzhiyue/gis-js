[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / Track

# Class: Track

[animation](../modules/animation.md).Track

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `TrackOptions` |

#### Overrides

OLObject.constructor

## Properties

### aId\_

• `Private` **aId\_**: `any`

___

### coordinates\_

• `Private` **coordinates\_**: `Coordinate`[]

___

### feature\_

• `Private` **feature\_**: `Feature`<`any`\> = `null`

___

### fraction\_

• `Private` **fraction\_**: `number` = `0`

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

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

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

### getCoordinate

▸ **getCoordinate**(): `Coordinate`[]

#### Returns

`Coordinate`[]

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

### getSource

▸ **getSource**(): `VectorSource`<`any`\>

#### Returns

`VectorSource`<`any`\>

___

### init\_

▸ `Private` **init_**(): `void`

#### Returns

`void`

___

### renderLine\_

▸ `Private` **renderLine_**(`coordinates`, `fraction`, `angle`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] |  |
| `fraction` | `number` |  |
| `angle` | `number` | - |

#### Returns

`void`

___

### renderPoint\_

▸ `Private` **renderPoint_**(`coordinates`, `fraction`, `angle`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] |  |
| `fraction` | `number` |  |
| `angle` | `number` | - |

#### Returns

`void`

___

### setCoordinates

▸ **setCoordinates**(`coordinates`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] |  |

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

### setSource

▸ **setSource**(`source`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `VectorSource`<`any`\> |  |

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
