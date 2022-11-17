[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [control](../modules/control.md) / Editor

# Class: Editor

[control](../modules/control.md).Editor

## Hierarchy

- `Control`

  ↳ **`Editor`**

## Table of contents

### Constructors

- [constructor](control.Editor.md#constructor)

### Properties

- [active\_](control.Editor.md#active_)
- [helper\_](control.Editor.md#helper_)
- [isEdit\_](control.Editor.md#isedit_)
- [itemInfos\_](control.Editor.md#iteminfos_)
- [layer\_](control.Editor.md#layer_)

### Methods

- [getActive](control.Editor.md#getactive)
- [getIsEdit](control.Editor.md#getisedit)
- [getItemInfoByType](control.Editor.md#getiteminfobytype)
- [getItemInfos](control.Editor.md#getiteminfos)
- [init](control.Editor.md#init)
- [initEvent](control.Editor.md#initevent)
- [initHTML](control.Editor.md#inithtml)
- [itemClick](control.Editor.md#itemclick)
- [restore](control.Editor.md#restore)
- [setIsEdit](control.Editor.md#setisedit)
- [setItemInfos](control.Editor.md#setiteminfos)
- [setMap](control.Editor.md#setmap)
- [updateItemState](control.Editor.md#updateitemstate)
- [updateItemsState](control.Editor.md#updateitemsstate)

## Constructors

### constructor

• **new Editor**(`opt_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `any` |

#### Overrides

Control.constructor

## Properties

### active\_

• `Protected` **active\_**: `any`

___

### helper\_

• `Protected` **helper\_**: `any`

___

### isEdit\_

• `Protected` **isEdit\_**: `any`

___

### itemInfos\_

• `Protected` **itemInfos\_**: `any`

___

### layer\_

• `Protected` **layer\_**: `any`

## Methods

### getActive

▸ **getActive**(): `any`

#### Returns

`any`

___

### getIsEdit

▸ **getIsEdit**(): `any`

#### Returns

`any`

___

### getItemInfoByType

▸ **getItemInfoByType**(`type`): `any`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `any` |  |

#### Returns

`any`

___

### getItemInfos

▸ **getItemInfos**(): `any`

#### Returns

`any`

___

### init

▸ **init**(): `void`

#### Returns

`void`

___

### initEvent

▸ **initEvent**(): `void`

#### Returns

`void`

___

### initHTML

▸ **initHTML**(): `void`

#### Returns

`void`

___

### itemClick

▸ **itemClick**(`event`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` |  |

#### Returns

`void`

___

### restore

▸ **restore**(): `void`

#### Returns

`void`

___

### setIsEdit

▸ **setIsEdit**(`isEdit`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isEdit` | `any` |  |

#### Returns

`void`

___

### setItemInfos

▸ **setItemInfos**(`itemInfos`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemInfos` | `any` |  |

#### Returns

`void`

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

Control.setMap

___

### updateItemState

▸ **updateItemState**(`type`, `itemState`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `any` |  |
| `itemState` | `any` |  |

#### Returns

`void`

___

### updateItemsState

▸ **updateItemsState**(`types`, `state`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `types` | `any` |  |
| `state` | `any` |  |

#### Returns

`void`
