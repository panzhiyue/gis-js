[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / interaction

# Namespace: interaction

## Table of contents

### Enumerations

- [MeasureEventType](../enums/interaction.MeasureEventType.md)
- [MeasureType](../enums/interaction.MeasureType.md)

### Classes

- [GeomDrag](../classes/interaction.GeomDrag.md)
- [Measure](../classes/interaction.Measure.md)
- [MeasureEvent](../classes/interaction.MeasureEvent.md)

### Interfaces

- [MeasureOptions](../interfaces/interaction.MeasureOptions.md)

### Functions

- [measureArea](interaction.md#measurearea)
- [measureLength](interaction.md#measurelength)

## Functions

### measureArea

▸ **measureArea**(`polygon`, `projection`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `polygon` | `Polygon` |  |
| `projection` | `Projection` | - |

#### Returns

`number`

___

### measureLength

▸ **measureLength**(`line`, `projection`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `line` | `LineString` |  |
| `projection` | `Projection` | - |

#### Returns

`number`
