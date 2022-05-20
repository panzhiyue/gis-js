[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [interaction](../modules/interaction.md) / GeomDrag

# Class: GeomDrag

[interaction](../modules/interaction.md).GeomDrag

## Hierarchy

- `PointerInteraction`

  ↳ **`GeomDrag`**

## Table of contents

### Constructors

- [constructor](interaction.GeomDrag.md#constructor)

### Properties

- [coordinate\_](interaction.GeomDrag.md#coordinate_)
- [cursor\_](interaction.GeomDrag.md#cursor_)
- [feature\_](interaction.GeomDrag.md#feature_)
- [previousCursor\_](interaction.GeomDrag.md#previouscursor_)

### Methods

- [handleDownEvent](interaction.GeomDrag.md#handledownevent)
- [handleDragEvent](interaction.GeomDrag.md#handledragevent)
- [handleMoveEvent](interaction.GeomDrag.md#handlemoveevent)
- [handleUpEvent](interaction.GeomDrag.md#handleupevent)

## Constructors

### constructor

• **new GeomDrag**(`opt_options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options?` | `Options` |

#### Inherited from

Pointer.constructor

## Properties

### coordinate\_

• `Private` **coordinate\_**: `Pixel` = `null`

___

### cursor\_

• `Private` **cursor\_**: `string` = `"pointer"`

___

### feature\_

• `Private` **feature\_**: `Feature`<`any`\> \| `RenderFeature` = `null`

___

### previousCursor\_

• `Private` **previousCursor\_**: `string` = `null`

## Methods

### handleDownEvent

▸ **handleDownEvent**(`evt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `MapBrowserEvent`<`any`\> |

#### Returns

`boolean`

#### Overrides

Pointer.handleDownEvent

___

### handleDragEvent

▸ **handleDragEvent**(`evt`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `MapBrowserEvent`<`any`\> |

#### Returns

`void`

#### Overrides

Pointer.handleDragEvent

___

### handleMoveEvent

▸ **handleMoveEvent**(`evt`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `MapBrowserEvent`<`any`\> |

#### Returns

`void`

#### Overrides

Pointer.handleMoveEvent

___

### handleUpEvent

▸ **handleUpEvent**(`evt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `MapBrowserEvent`<`any`\> |

#### Returns

`boolean`

#### Overrides

Pointer.handleUpEvent
