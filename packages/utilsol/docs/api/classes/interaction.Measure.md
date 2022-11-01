[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [interaction](../modules/interaction.md) / Measure

# Class: Measure

[interaction](../modules/interaction.md).Measure

## Hierarchy

- `Interaction`

  ↳ **`Measure`**

## Table of contents

### Constructors

- [constructor](interaction.Measure.md#constructor)

### Properties

- [classPrefix\_](interaction.Measure.md#classprefix_)
- [drawStyle\_](interaction.Measure.md#drawstyle_)
- [draw\_](interaction.Measure.md#draw_)
- [helpOverlay\_](interaction.Measure.md#helpoverlay_)
- [layer\_](interaction.Measure.md#layer_)
- [measureResultFunction](interaction.Measure.md#measureresultfunction)
- [pointerMoveHandler\_](interaction.Measure.md#pointermovehandler_)
- [resultOverlayArray\_](interaction.Measure.md#resultoverlayarray_)
- [resultOverlay\_](interaction.Measure.md#resultoverlay_)
- [resultStyle\_](interaction.Measure.md#resultstyle_)
- [sketchFeature\_](interaction.Measure.md#sketchfeature_)

### Methods

- [clear](interaction.Measure.md#clear)
- [createHelpOverlay\_](interaction.Measure.md#createhelpoverlay_)
- [createResultOverlay\_](interaction.Measure.md#createresultoverlay_)
- [end\_](interaction.Measure.md#end_)
- [getType](interaction.Measure.md#gettype)
- [setMap](interaction.Measure.md#setmap)
- [setType](interaction.Measure.md#settype)
- [start\_](interaction.Measure.md#start_)
- [updateHelpOverlay\_](interaction.Measure.md#updatehelpoverlay_)
- [updateState\_](interaction.Measure.md#updatestate_)

## Constructors

### constructor

• **new Measure**(`opt_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | [`MeasureOptions`](../interfaces/interaction.MeasureOptions.md) |

#### Overrides

Interaction.constructor

## Properties

### classPrefix\_

• `Private` **classPrefix\_**: `string`

___

### drawStyle\_

• `Private` **drawStyle\_**: `StyleLike`

___

### draw\_

• `Private` **draw\_**: `Draw`

___

### helpOverlay\_

• `Private` **helpOverlay\_**: `Overlay`

___

### layer\_

• `Private` **layer\_**: `VectorLayer`<`VectorSource`<`MeasureGeometry`\>\>

___

### measureResultFunction

• **measureResultFunction**: `MeasureResultFunction`

___

### pointerMoveHandler\_

• `Private` **pointerMoveHandler\_**: `any`

___

### resultOverlayArray\_

• `Private` **resultOverlayArray\_**: `Overlay`[]

___

### resultOverlay\_

• `Private` **resultOverlay\_**: `Overlay`

___

### resultStyle\_

• `Private` **resultStyle\_**: `StyleLike`

___

### sketchFeature\_

• `Private` **sketchFeature\_**: `Feature`<`Geometry`\>

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

___

### createHelpOverlay\_

▸ `Private` **createHelpOverlay_**(): `void`

#### Returns

`void`

___

### createResultOverlay\_

▸ `Private` **createResultOverlay_**(): `void`

#### Returns

`void`

___

### end\_

▸ **end_**(): `void`

#### Returns

`void`

___

### getType

▸ **getType**(): `any`

#### Returns

`any`

___

### setMap

▸ **setMap**(`map`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `any` |  |

#### Returns

`void`

#### Overrides

Interaction.setMap

___

### setType

▸ **setType**(`type`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`MeasureType`](../enums/interaction.MeasureType.md) |  |

#### Returns

`void`

___

### start\_

▸ **start_**(`type`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`MeasureType`](../enums/interaction.MeasureType.md) |  |

#### Returns

`void`

___

### updateHelpOverlay\_

▸ `Private` **updateHelpOverlay_**(`coordinate`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coordinate` | `any` |  |

#### Returns

`void`

___

### updateState\_

▸ `Private` **updateState_**(): `void`

#### Returns

`void`
