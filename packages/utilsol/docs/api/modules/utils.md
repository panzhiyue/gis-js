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

生成贝塞尔曲线

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `points` | `Coordinate`[] | `[]` | 点集合(数量必须大于等于2) |
| `space` | `number` | `0.01` | 必须要大于0 |

#### Returns

`Coordinate`[]

贝塞尔曲线点集

___

### createCurve

▸ **createCurve**(`from`, `to`, `radius?`, `angle?`, `space?`): `Coordinate`[]

创建曲线

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `from` | `Coordinate` | `undefined` | 起点 |
| `to` | `Coordinate` | `undefined` | 终点 |
| `radius` | `number` | `0` | 半径 |
| `angle` | `number` | `90` | 角度 |
| `space` | `number` | `0.01` |  |

#### Returns

`Coordinate`[]

曲线点集

___

### equal

▸ **equal**(`coordinate1`, `coordinate2`): `boolean`

检测两个经纬度是否相同

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinate1` | `Coordinate` | 坐标1 |
| `coordinate2` | `Coordinate` | 坐标2 |

#### Returns

`boolean`

___

### factorial

▸ **factorial**(`num`): `number`

阶乘

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` | 输入数值 |

#### Returns

`number`

num的阶乘

___

### getAngleOfThreePoints

▸ **getAngleOfThreePoints**(`pntA`, `pntB`, `pntC`): `number`

获取3点构成的夹角

#### Parameters

| Name | Type |
| :------ | :------ |
| `pntA` | `Coordinate` |
| `pntB` | `Coordinate` |
| `pntC` | `Coordinate` |

#### Returns

`number`

3点构成的夹角弧度

___

### getArc

▸ **getArc**(`center`, `radius`, `startAngle`, `endAngle`): `Coordinate`[]

获取指定圆弧点集

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `center` | `Coordinate` | 中心点 |
| `radius` | `number` | 半径 |
| `startAngle` | `number` | 起始弧度 |
| `endAngle` | `number` | 结束弧度 |

#### Returns

`Coordinate`[]

___

### getAzimuth

▸ **getAzimuth**(`startPnt`, `endPnt`): `number`

获取线段方位角

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startPnt` | `Coordinate` | 起点 |
| `endPnt` | `Coordinate` | 终点 |

#### Returns

`number`

方位角

___

### getBaseLength

▸ **getBaseLength**(`points`): `number`

线长度的0.99次方

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `points` | `Coordinate`[] | 点集 |

#### Returns

`number`

长度

___

### getCircleCenterOfThreePoints

▸ **getCircleCenterOfThreePoints**(`pnt1`, `pnt2`, `pnt3`): `Coordinate`

通过3个点获取圆的中心点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` | 第一个点 |
| `pnt2` | `Coordinate` | 第二个点 |
| `pnt3` | `Coordinate` | 第三个点 |

#### Returns

`Coordinate`

圆中心点

___

### getCoordinateByDistance

▸ **getCoordinateByDistance**(`coordinates`, `distance`, `options?`): `Coordinate`

返回沿该线指定距离的点。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | 线的点集合 |
| `distance` | `number` | 距离 |
| `options` | `Object` |  |
| `options.units?` | `Units` | - |

#### Returns

`Coordinate`

坐标点

___

### getCoordinateByPoint

▸ **getCoordinateByPoint**(`coordinates`, `coordinate`): `Coordinate`

计算点到线段最短间距的点

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

返回沿该线指定比例的点。

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | 线的点集合 |
| `scale` | `number` | 比例 0-1 |
| `options` | `Object` |  |
| `options.units?` | `Units` | - |

#### Returns

`Coordinate`

坐标点

___

### getDistance

▸ **getDistance**(`pnt1`, `pnt2`): `number`

2个点之间的距离

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` | 第一个点 |
| `pnt2` | `Coordinate` | 第二个点 |

#### Returns

`number`

距离

___

### getIntersectPoint

▸ **getIntersectPoint**(`pntA`, `pntB`, `pntC`, `pntD`): `Coordinate`

获取2条线段的交点

#### Parameters

| Name | Type |
| :------ | :------ |
| `pntA` | `Coordinate` |
| `pntB` | `Coordinate` |
| `pntC` | `Coordinate` |
| `pntD` | `Coordinate` |

#### Returns

`Coordinate`

2条线段的交点

___

### getLength

▸ **getLength**(`points`): `number`

线长度

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `points` | `Coordinate`[] | 点集 |

#### Returns

`number`

长度

___

### getMid

▸ **getMid**(`pnt1`, `pnt2`): `Coordinate`

获取2点的中点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` | 点1 |
| `pnt2` | `Coordinate` | 点2 |

#### Returns

`Coordinate`

2点的中点

___

### getThirdPoint

▸ **getThirdPoint**(`startPnt`, `endPnt`, `angle`, `distance`, `clockWise?`): `Coordinate`

根据线段，夹角，长度获取点

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `startPnt` | `Coordinate` | `undefined` | 起点 |
| `endPnt` | `Coordinate` | `undefined` | 终点 |
| `angle` | `number` | `undefined` | 夹角弧度 |
| `distance` | `number` | `undefined` | 长度 |
| `clockWise` | `boolean` | `true` | true:顺时针,false:逆时针 |

#### Returns

`Coordinate`

___

### isClockWise

▸ **isClockWise**(`pnt1`, `pnt2`, `pnt3`): `boolean`

判断是是否为顺时针

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pnt1` | `Coordinate` | 点1 |
| `pnt2` | `Coordinate` | 点2 |
| `pnt3` | `Coordinate` | 点3 |

#### Returns

`boolean`

ture为顺时针,false为逆时针

___

### linearInterpolate

▸ **linearInterpolate**(`coordinates?`, `space?`): `Coordinate`[]

线性插值（二维坐标）,每隔一段长度插值

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `coordinates` | `Coordinate`[] | `[]` | 线条坐标数组，支持曲线 |
| `space` | `number` | `0.01` | 点的间隔距离，经纬度单位，值越小，增加的点越多 |

#### Returns

`Coordinate`[]

插值后线坐标数组

___

### parseDecimal

▸ **parseDecimal**(`number`): `number`

格式化数字，修复精度问题

#### Parameters

| Name | Type |
| :------ | :------ |
| `number` | `number` |

#### Returns

`number`

___

### sliceByDistance

▸ **sliceByDistance**(`coordinates`, `startDist`, `stopDist`, `options?`): `Coordinate`[]

取一条线，沿该线到起始点的指定距离，以及沿该线到终止点的指定距离，并返回这些点之间的该线的分段。

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

根据一条线、起点和终点，返回这些点之间的线段。起止点不需要正好落在直线上。

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

取一条线，沿该线到起始点的指定比例，以及沿该线到终止点的指定比例，并返回这些点之间的该线的分段。

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
