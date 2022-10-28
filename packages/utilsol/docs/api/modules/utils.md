[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / utils

# Namespace: utils

## Table of contents

### Variables

- [Constants](utils.md#constants)

### Functions

- [createBezierCurve](utils.md#createbeziercurve)
- [createCurve](utils.md#createcurve)
- [equal](utils.md#equal)
- [factorial](utils.md#factorial)
- [getAngleOfThreePoints](utils.md#getangleofthreepoints)
- [getArc](utils.md#getarc)
- [getAzimuth](utils.md#getazimuth)
- [getBaseLength](utils.md#getbaselength)
- [getCircleCenterOfThreePoints](utils.md#getcirclecenterofthreepoints)
- [getCoordinateByDistance](utils.md#getcoordinatebydistance)
- [getCoordinateByPoint](utils.md#getcoordinatebypoint)
- [getCoordinateByScale](utils.md#getcoordinatebyscale)
- [getDistance](utils.md#getdistance)
- [getIntersectPoint](utils.md#getintersectpoint)
- [getLength](utils.md#getlength)
- [getMid](utils.md#getmid)
- [getThirdPoint](utils.md#getthirdpoint)
- [isClockWise](utils.md#isclockwise)
- [linearInterpolate](utils.md#linearinterpolate)
- [newGuid](utils.md#newguid)
- [parseDecimal](utils.md#parsedecimal)
- [sliceByDistance](utils.md#slicebydistance)
- [sliceByPoint](utils.md#slicebypoint)
- [sliceByScale](utils.md#slicebyscale)

## Variables

### Constants

• `Const` **Constants**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `FITTING_COUNT` | `number` |
| `HALF_PI` | `number` |
| `TWO_PI` | `number` |
| `ZERO_TOLERANCE` | `number` |

## Functions

### createBezierCurve

▸ **createBezierCurve**(`points?`, `space?`): `Coordinate`[]

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `points` | `Coordinate`[] | `[]` |  |
| `space` | `number` | `0.01` |  |

#### Returns

`Coordinate`[]

___

### createCurve

▸ **createCurve**(`from`, `to`, `radius?`, `angle?`, `space?`): `Coordinate`[]

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `from` | `Coordinate` | `undefined` |  |
| `to` | `Coordinate` | `undefined` |  |
| `radius` | `number` | `0` |  |
| `angle` | `number` | `90` |  |
| `space` | `number` | `0.01` |  |

#### Returns

`Coordinate`[]

___

### equal

▸ **equal**(`coordinate1`, `coordinate2`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinate1` | `Coordinate` |  |
| `coordinate2` | `Coordinate` |  |

#### Returns

`boolean`

___

### factorial

▸ **factorial**(`num`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` |  |

#### Returns

`number`

___

### getAngleOfThreePoints

▸ **getAngleOfThreePoints**(`pntA`, `pntB`, `pntC`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pntA` | `Coordinate` |
| `pntB` | `Coordinate` |
| `pntC` | `Coordinate` |

#### Returns

`number`

___

### getArc

▸ **getArc**(`center`, `radius`, `startAngle`, `endAngle`): `Coordinate`[]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `center` | `Coordinate` |  |
| `radius` | `number` |  |
| `startAngle` | `number` |  |
| `endAngle` | `number` |  |

#### Returns

`Coordinate`[]

___

### getAzimuth

▸ **getAzimuth**(`startPnt`, `endPnt`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startPnt` | `Coordinate` |  |
| `endPnt` | `Coordinate` |  |

#### Returns

`number`

___

### getBaseLength

▸ **getBaseLength**(`points`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `points` | `Coordinate`[] |  |

#### Returns

`number`

___

### getCircleCenterOfThreePoints

▸ **getCircleCenterOfThreePoints**(`pnt1`, `pnt2`, `pnt3`): `Coordinate`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` |  |
| `pnt2` | `Coordinate` |  |
| `pnt3` | `Coordinate` |  |

#### Returns

`Coordinate`

___

### getCoordinateByDistance

▸ **getCoordinateByDistance**(`coordinates`, `distance`, `options?`): `Coordinate`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] |  |
| `distance` | `number` |  |
| `options` | `Object` |  |
| `options.units?` | `Units` | - |

#### Returns

`Coordinate`

___

### getCoordinateByPoint

▸ **getCoordinateByPoint**(`coordinates`, `coordinate`): `Coordinate`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | `Coordinate`[] \| `Coordinate`[][] |
| `coordinate` | `Coordinate` |

#### Returns

`Coordinate`

___

### getCoordinateByScale

▸ **getCoordinateByScale**(`coordinates`, `scale`, `options?`): `Coordinate`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] |  |
| `scale` | `number` |  |
| `options` | `Object` |  |
| `options.units?` | `Units` | - |

#### Returns

`Coordinate`

___

### getDistance

▸ **getDistance**(`pnt1`, `pnt2`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` |  |
| `pnt2` | `Coordinate` |  |

#### Returns

`number`

___

### getIntersectPoint

▸ **getIntersectPoint**(`pntA`, `pntB`, `pntC`, `pntD`): `Coordinate`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pntA` | `Coordinate` |
| `pntB` | `Coordinate` |
| `pntC` | `Coordinate` |
| `pntD` | `Coordinate` |

#### Returns

`Coordinate`

___

### getLength

▸ **getLength**(`points`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `points` | `Coordinate`[] |  |

#### Returns

`number`

___

### getMid

▸ **getMid**(`pnt1`, `pnt2`): `Coordinate`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` |  |
| `pnt2` | `Coordinate` |  |

#### Returns

`Coordinate`

___

### getThirdPoint

▸ **getThirdPoint**(`startPnt`, `endPnt`, `angle`, `distance`, `clockWise?`): `Coordinate`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `startPnt` | `Coordinate` | `undefined` |  |
| `endPnt` | `Coordinate` | `undefined` |  |
| `angle` | `number` | `undefined` |  |
| `distance` | `number` | `undefined` |  |
| `clockWise` | `boolean` | `true` |  |

#### Returns

`Coordinate`

___

### isClockWise

▸ **isClockWise**(`pnt1`, `pnt2`, `pnt3`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` |  |
| `pnt2` | `Coordinate` |  |
| `pnt3` | `Coordinate` |  |

#### Returns

`boolean`

___

### linearInterpolate

▸ **linearInterpolate**(`coordinates?`, `space?`): `Coordinate`[]

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | `[]` |  |
| `space` | `number` | `0.01` |  |

#### Returns

`Coordinate`[]

___

### newGuid

▸ **newGuid**(): `string`

#### Returns

`string`

___

### parseDecimal

▸ **parseDecimal**(`number`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `number` |

#### Returns

`number`

___

### sliceByDistance

▸ **sliceByDistance**(`coordinates`, `startDist`, `stopDist`, `options?`): `Coordinate`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | `Coordinate`[] |
| `startDist` | `number` |
| `stopDist` | `number` |
| `options` | `Object` |
| `options.units?` | `Units` |

#### Returns

`Coordinate`[]

___

### sliceByPoint

▸ **sliceByPoint**(`coordinates`, `startPt`, `stopPt`): `Coordinate`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | `Coordinate`[] |
| `startPt` | `Coordinate` |
| `stopPt` | `Coordinate` |

#### Returns

`Coordinate`[]

___

### sliceByScale

▸ **sliceByScale**(`coordinates`, `startScale`, `stopScale`, `options?`): `Coordinate`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | `Coordinate`[] |
| `startScale` | `number` |
| `stopScale` | `number` |
| `options` | `Object` |
| `options.units?` | `Units` |

#### Returns

`Coordinate`[]
