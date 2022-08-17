[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / Scatter

# Class: Scatter

[animation](../modules/animation.md).Scatter

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt_options` | `ScatterOptions` |  |

#### Overrides

OLObject.constructor

## Properties

### aId\_

• `Private` **aId\_**: `any`

___

### centerStyle\_

• `Private` **centerStyle\_**: `Style`[] \| `StyleFunction`

___

### coordinate\_

• `Private` **coordinate\_**: `Coordinate`

___

### feature\_

• `Private` **feature\_**: `Feature`<`any`\>

___

### innerOpacity\_

• `Private` **innerOpacity\_**: `number`

___

### innerRadius\_

• `Private` **innerRadius\_**: `number`

___

### loop\_

• `Private` **loop\_**: `boolean`

___

### outerOpacity\_

• `Private` **outerOpacity\_**: `number`

___

### outerRadius\_

• `Private` **outerRadius\_**: `number`

___

### period\_

• `Private` **period\_**: `number`

___

### rippleStyle\_

• `Private` **rippleStyle\_**: `Style`[] \| `StyleFunction`

___

### source\_

• `Private` **source\_**: `VectorSource`<`any`\>

## Methods

### animation\_

▸ `Private` **animation_**(): `void`

#### Returns

`void`

___

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Overrides

OLObject.dispose

___

### end

▸ **end**(): `void`

#### Returns

`void`

___

### getCenterStyle

▸ **getCenterStyle**(): `Style`[] \| `StyleFunction`

#### Returns

`Style`[] \| `StyleFunction`

___

### getCoordinate

▸ **getCoordinate**(): `Coordinate`

#### Returns

`Coordinate`

___

### getFeature

▸ **getFeature**(): `Feature`<`any`\>

#### Returns

`Feature`<`any`\>

___

### getInnerOpacity

▸ **getInnerOpacity**(): `number`

#### Returns

`number`

___

### getInnerRadius

▸ **getInnerRadius**(): `number`

#### Returns

`number`

___

### getLoop

▸ **getLoop**(): `boolean`

#### Returns

`boolean`

___

### getOuterOpacity

▸ **getOuterOpacity**(): `number`

#### Returns

`number`

___

### getOuterRadius

▸ **getOuterRadius**(): `number`

#### Returns

`number`

___

### getPeriod

▸ **getPeriod**(): `number`

#### Returns

`number`

___

### getRippleStyle

▸ **getRippleStyle**(): `Style`[] \| `StyleFunction`

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

### setCenterStyle

▸ **setCenterStyle**(`style`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `style` | `Object` \| `Style` \| `Style`[] \| `StyleFunction` |  |

#### Returns

`void`

___

### setCoordinate

▸ **setCoordinate**(`coordinate`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinate` | `Coordinate` |  |

#### Returns

`void`

___

### setInnerOpacity

▸ **setInnerOpacity**(`opacity`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opacity` | `number` |  |

#### Returns

`void`

___

### setInnerRadius

▸ **setInnerRadius**(`radius`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` |  |

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

### setOuterOpacity

▸ **setOuterOpacity**(`opacity`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opacity` | `number` |  |

#### Returns

`void`

___

### setOuterRadius

▸ **setOuterRadius**(`radius`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `radius` | `number` |  |

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

### setRippleStyle

▸ **setRippleStyle**(`style`): `void`

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
