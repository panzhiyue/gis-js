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

- [layer\_](interaction.Measure.md#layer_)
- [sketchCoords\_](interaction.Measure.md#sketchcoords_)
- [sketchFeature\_](interaction.Measure.md#sketchfeature_)

### Methods

- [addCoordinates\_](interaction.Measure.md#addcoordinates_)
- [drawEnd\_](interaction.Measure.md#drawend_)
- [handleEvent](interaction.Measure.md#handleevent)
- [setMap](interaction.Measure.md#setmap)
- [updateState\_](interaction.Measure.md#updatestate_)

## Constructors

### constructor

• **new Measure**(`opt_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `any` |

#### Overrides

Interaction.constructor

## Properties

### layer\_

• `Private` **layer\_**: `VectorLayer`<`VectorSource`<`Geometry`\>\>

___

### sketchCoords\_

• `Private` **sketchCoords\_**: `Coordinate`[]

___

### sketchFeature\_

• `Private` **sketchFeature\_**: `Feature`<`Geometry`\>

## Methods

### addCoordinates\_

▸ `Private` **addCoordinates_**(`coordinates`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | `any` |

#### Returns

`void`

___

### drawEnd\_

▸ `Private` **drawEnd_**(): `void`

#### Returns

`void`

___

### handleEvent

▸ **handleEvent**(`mapBrowserEvent`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapBrowserEvent` | `MapBrowserEvent`<`any`\> |

#### Returns

`boolean`

#### Overrides

Interaction.handleEvent

___

### setMap

▸ **setMap**(`map`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | `any` |

#### Returns

`void`

#### Overrides

Interaction.setMap

___

### updateState\_

▸ `Private` **updateState_**(): `void`

#### Returns

`void`
