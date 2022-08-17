[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / ArrowLine

# Class: ArrowLine

[animation](../modules/animation.md).ArrowLine

## Table of contents

### Constructors

- [constructor](animation.ArrowLine.md#constructor)

### Properties

- [arrowStyle\_](animation.ArrowLine.md#arrowstyle_)
- [coordinates\_](animation.ArrowLine.md#coordinates_)
- [feature\_](animation.ArrowLine.md#feature_)
- [fraction](animation.ArrowLine.md#fraction)
- [interval\_](animation.ArrowLine.md#interval_)
- [lineStyle\_](animation.ArrowLine.md#linestyle_)
- [ready](animation.ArrowLine.md#ready)
- [source\_](animation.ArrowLine.md#source_)
- [speed](animation.ArrowLine.md#speed)
- [timer\_](animation.ArrowLine.md#timer_)

### Methods

- [dispose](animation.ArrowLine.md#dispose)
- [end](animation.ArrowLine.md#end)
- [getInterval](animation.ArrowLine.md#getinterval)
- [getLineStyle](animation.ArrowLine.md#getlinestyle)
- [getStyle\_](animation.ArrowLine.md#getstyle_)
- [init\_](animation.ArrowLine.md#init_)
- [setArrowStyle](animation.ArrowLine.md#setarrowstyle)
- [setCoordinates](animation.ArrowLine.md#setcoordinates)
- [setInterval](animation.ArrowLine.md#setinterval)
- [setLineStyle](animation.ArrowLine.md#setlinestyle)
- [setSource](animation.ArrowLine.md#setsource)
- [start](animation.ArrowLine.md#start)

## Constructors

### constructor

• **new ArrowLine**(`opt_options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt_options` | `ArrowLineOptions` |  |

## Properties

### arrowStyle\_

• **arrowStyle\_**: `Function` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md)

___

### coordinates\_

• **coordinates\_**: `Coordinate`[]

___

### feature\_

• **feature\_**: `Feature`<`LineString`\>

___

### fraction

• **fraction**: `number` = `0`

___

### interval\_

• **interval\_**: `number`

___

### lineStyle\_

• **lineStyle\_**: `Object` \| `Style` \| `StyleFunction`

___

### ready

• `Private` **ready**: `boolean` = `false`

___

### source\_

• **source\_**: `VectorSource`<`any`\>

___

### speed

• **speed**: `number` = `1`

___

### timer\_

• **timer\_**: `any`

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

___

### end

▸ **end**(): `void`

#### Returns

`void`

___

### getInterval

▸ **getInterval**(): `number`

#### Returns

`number`

___

### getLineStyle

▸ **getLineStyle**(): `Object` \| `Style` \| `StyleFunction`

#### Returns

`Object` \| `Style` \| `StyleFunction`

___

### getStyle\_

▸ **getStyle_**(`startIndex`): (`feature`: `any`, `resolution`: `any`) => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `startIndex` | `number` |

#### Returns

`fn`

▸ (`feature`, `resolution`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `feature` | `any` |
| `resolution` | `any` |

##### Returns

`any`

___

### init\_

▸ **init_**(): `void`

#### Returns

`void`

___

### setArrowStyle

▸ **setArrowStyle**(`arrow`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrow` | `Function` \| [`ArrowOptions`](../interfaces/style.arrow.ArrowOptions.md) |  |

#### Returns

`void`

___

### setCoordinates

▸ **setCoordinates**(`coordinates`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `any` |  |

#### Returns

`void`

___

### setInterval

▸ **setInterval**(`interval`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interval` | `number` |  |

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

### setSource

▸ **setSource**(`source`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `any` |  |

#### Returns

`void`

___

### start

▸ **start**(): `void`

#### Returns

`void`
