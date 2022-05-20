[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [animation](../modules/animation.md) / DynamicLine

# Class: DynamicLine

[animation](../modules/animation.md).DynamicLine

动态线

## Table of contents

### Constructors

- [constructor](animation.DynamicLine.md#constructor)

### Properties

- [coordinates\_](animation.DynamicLine.md#coordinates_)
- [feature\_](animation.DynamicLine.md#feature_)
- [innerlineColor\_](animation.DynamicLine.md#innerlinecolor_)
- [innerlineDashOffset\_](animation.DynamicLine.md#innerlinedashoffset_)
- [innerlineDash\_](animation.DynamicLine.md#innerlinedash_)
- [innerlineWidth\_](animation.DynamicLine.md#innerlinewidth_)
- [outlineColor\_](animation.DynamicLine.md#outlinecolor_)
- [outlineWidth\_](animation.DynamicLine.md#outlinewidth_)
- [source\_](animation.DynamicLine.md#source_)
- [timer\_](animation.DynamicLine.md#timer_)

### Methods

- [dispose](animation.DynamicLine.md#dispose)
- [end](animation.DynamicLine.md#end)
- [getStyle\_](animation.DynamicLine.md#getstyle_)
- [init\_](animation.DynamicLine.md#init_)
- [setCoordinates](animation.DynamicLine.md#setcoordinates)
- [setInnerlineColor](animation.DynamicLine.md#setinnerlinecolor)
- [setInnerlineDash](animation.DynamicLine.md#setinnerlinedash)
- [setInnerlineDashOffset](animation.DynamicLine.md#setinnerlinedashoffset)
- [setInnerlineWidth](animation.DynamicLine.md#setinnerlinewidth)
- [setOutlineColor](animation.DynamicLine.md#setoutlinecolor)
- [setOutlineWidth](animation.DynamicLine.md#setoutlinewidth)
- [setSource](animation.DynamicLine.md#setsource)
- [start](animation.DynamicLine.md#start)

## Constructors

### constructor

• **new DynamicLine**(`opt_options`)

构造函数

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt_options` | `DynamicLineOptions` | 构造参数 |

## Properties

### coordinates\_

• **coordinates\_**: `Coordinate`[]

轨迹点

___

### feature\_

• **feature\_**: `Feature`<`LineString`\>

___

### innerlineColor\_

• **innerlineColor\_**: `string`

___

### innerlineDashOffset\_

• **innerlineDashOffset\_**: `number`

___

### innerlineDash\_

• **innerlineDash\_**: `number`[]

___

### innerlineWidth\_

• **innerlineWidth\_**: `number`

___

### outlineColor\_

• **outlineColor\_**: `string`

___

### outlineWidth\_

• **outlineWidth\_**: `number`

___

### source\_

• **source\_**: `VectorSource`<`any`\>

___

### timer\_

• **timer\_**: `any`

计时器

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

___

### end

▸ **end**(): `void`

结束动画

#### Returns

`void`

___

### getStyle\_

▸ **getStyle_**(`dashOffset`): `Style`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dashOffset` | `any` |

#### Returns

`Style`[]

___

### init\_

▸ **init_**(): `void`

#### Returns

`void`

___

### setCoordinates

▸ **setCoordinates**(`coordinates`): `void`

设置轨迹坐标

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | `any` |

#### Returns

`void`

___

### setInnerlineColor

▸ **setInnerlineColor**(`innerlineColor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `innerlineColor` | `any` |

#### Returns

`void`

___

### setInnerlineDash

▸ **setInnerlineDash**(`innerlineDash`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `innerlineDash` | `any` |

#### Returns

`void`

___

### setInnerlineDashOffset

▸ **setInnerlineDashOffset**(`innerlineDashOffset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `innerlineDashOffset` | `any` |

#### Returns

`void`

___

### setInnerlineWidth

▸ **setInnerlineWidth**(`innerlineWidth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `innerlineWidth` | `any` |

#### Returns

`void`

___

### setOutlineColor

▸ **setOutlineColor**(`outlineColor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `outlineColor` | `any` |

#### Returns

`void`

___

### setOutlineWidth

▸ **setOutlineWidth**(`outlineWidth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `outlineWidth` | `any` |

#### Returns

`void`

___

### setSource

▸ **setSource**(`source`): `void`

设置矢量图层

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `any` |

#### Returns

`void`

___

### start

▸ **start**(): `void`

开始动画

#### Returns

`void`
