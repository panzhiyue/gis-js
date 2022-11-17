[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [editor](../modules/editor.md) / VectorHelper

# Class: VectorHelper

[editor](../modules/editor.md).VectorHelper

## Hierarchy

- [`BaseHelper`](editor.BaseHelper.md)

  ↳ **`VectorHelper`**

## Table of contents

### Constructors

- [constructor](editor.VectorHelper.md#constructor)

### Properties

- [editStyle\_](editor.VectorHelper.md#editstyle_)
- [editorBLL\_](editor.VectorHelper.md#editorbll_)
- [editorControl\_](editor.VectorHelper.md#editorcontrol_)
- [layer\_](editor.VectorHelper.md#layer_)
- [map\_](editor.VectorHelper.md#map_)
- [maxEMapEditFeatureId\_](editor.VectorHelper.md#maxemapeditfeatureid_)

### Methods

- [BCTB](editor.VectorHelper.md#bctb)
- [BJTB](editor.VectorHelper.md#bjtb)
- [CJTB](editor.VectorHelper.md#cjtb)
- [HBTB](editor.VectorHelper.md#hbtb)
- [JSBJ](editor.VectorHelper.md#jsbj)
- [KSBJ](editor.VectorHelper.md#ksbj)
- [LRSX](editor.VectorHelper.md#lrsx)
- [QGTB](editor.VectorHelper.md#qgtb)
- [QXCZ](editor.VectorHelper.md#qxcz)
- [SCTB](editor.VectorHelper.md#sctb)
- [XQTB](editor.VectorHelper.md#xqtb)
- [addEditFeature](editor.VectorHelper.md#addeditfeature)
- [clear](editor.VectorHelper.md#clear)
- [getEMapEditFeatureId](editor.VectorHelper.md#getemapeditfeatureid)
- [getFeaturesIntersectGeometry](editor.VectorHelper.md#getfeaturesintersectgeometry)
- [getStyle](editor.VectorHelper.md#getstyle)
- [message](editor.VectorHelper.md#message)
- [openSXLR](editor.VectorHelper.md#opensxlr)
- [refreshEditItem](editor.VectorHelper.md#refreshedititem)
- [refreshEditLayer](editor.VectorHelper.md#refresheditlayer)
- [save](editor.VectorHelper.md#save)
- [setEditorBLL](editor.VectorHelper.md#seteditorbll)
- [setEditorControl](editor.VectorHelper.md#seteditorcontrol)
- [setLayer](editor.VectorHelper.md#setlayer)
- [transaction](editor.VectorHelper.md#transaction)

## Constructors

### constructor

• **new VectorHelper**(`opt_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `any` |

#### Overrides

[BaseHelper](editor.BaseHelper.md).[constructor](editor.BaseHelper.md#constructor)

## Properties

### editStyle\_

• `Protected` **editStyle\_**: `any`

___

### editorBLL\_

• `Protected` **editorBLL\_**: `any`

#### Inherited from

[BaseHelper](editor.BaseHelper.md).[editorBLL_](editor.BaseHelper.md#editorbll_)

___

### editorControl\_

• `Protected` **editorControl\_**: `any`

#### Inherited from

[BaseHelper](editor.BaseHelper.md).[editorControl_](editor.BaseHelper.md#editorcontrol_)

___

### layer\_

• `Protected` **layer\_**: `VectorLayer`<`VectorSource`<`any`\>\>

___

### map\_

• `Protected` **map\_**: `any`

#### Inherited from

[BaseHelper](editor.BaseHelper.md).[map_](editor.BaseHelper.md#map_)

___

### maxEMapEditFeatureId\_

• `Protected` **maxEMapEditFeatureId\_**: `number`

## Methods

### BCTB

▸ **BCTB**(`callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[BCTB](editor.BaseHelper.md#bctb)

___

### BJTB

▸ **BJTB**(`features`, `callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `features` | `any` |  |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[BJTB](editor.BaseHelper.md#bjtb)

___

### CJTB

▸ **CJTB**(`feature`, `callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `any` |  |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[CJTB](editor.BaseHelper.md#cjtb)

___

### HBTB

▸ **HBTB**(`callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[HBTB](editor.BaseHelper.md#hbtb)

___

### JSBJ

▸ **JSBJ**(`callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[JSBJ](editor.BaseHelper.md#jsbj)

___

### KSBJ

▸ **KSBJ**(`callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[KSBJ](editor.BaseHelper.md#ksbj)

___

### LRSX

▸ **LRSX**(`feature`, `callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `any` |  |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[LRSX](editor.BaseHelper.md#lrsx)

___

### QGTB

▸ **QGTB**(`feature`, `callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `any` |  |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[QGTB](editor.BaseHelper.md#qgtb)

___

### QXCZ

▸ **QXCZ**(`callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[QXCZ](editor.BaseHelper.md#qxcz)

___

### SCTB

▸ **SCTB**(`feature`, `callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `any` |  |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[SCTB](editor.BaseHelper.md#sctb)

___

### XQTB

▸ **XQTB**(`feature`, `callback`, `errorback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `any` | - |
| `callback` | `any` |  |
| `errorback` | `any` |  |

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[XQTB](editor.BaseHelper.md#xqtb)

___

### addEditFeature

▸ **addEditFeature**(`feature`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `any` |  |

#### Returns

`void`

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

___

### getEMapEditFeatureId

▸ **getEMapEditFeatureId**(): `number`

#### Returns

`number`

___

### getFeaturesIntersectGeometry

▸ **getFeaturesIntersectGeometry**(`layer`, `geometry`, `callback`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `any` |  |
| `geometry` | `any` |  |
| `callback` | `any` |  |

#### Returns

`void`

___

### getStyle

▸ **getStyle**(`feature`, `index`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `feature` | `any` |
| `index` | `any` |

#### Returns

`any`

___

### message

▸ **message**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `any` |

#### Returns

`void`

___

### openSXLR

▸ **openSXLR**(`feature`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `feature` | `any` |  |

#### Returns

`void`

___

### refreshEditItem

▸ **refreshEditItem**(): `void`

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[refreshEditItem](editor.BaseHelper.md#refreshedititem)

___

### refreshEditLayer

▸ **refreshEditLayer**(): `void`

#### Returns

`void`

#### Overrides

[BaseHelper](editor.BaseHelper.md).[refreshEditLayer](editor.BaseHelper.md#refresheditlayer)

___

### save

▸ **save**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `any` |

#### Returns

`void`

___

### setEditorBLL

▸ **setEditorBLL**(`editorBLL`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editorBLL` | `any` |  |

#### Returns

`void`

#### Inherited from

[BaseHelper](editor.BaseHelper.md).[setEditorBLL](editor.BaseHelper.md#seteditorbll)

___

### setEditorControl

▸ **setEditorControl**(`editorControl`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editorControl` | `any` |  |

#### Returns

`void`

#### Inherited from

[BaseHelper](editor.BaseHelper.md).[setEditorControl](editor.BaseHelper.md#seteditorcontrol)

___

### setLayer

▸ **setLayer**(`layer`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `any` |  |

#### Returns

`void`

___

### transaction

▸ **transaction**(`addFeatures`, `updateFeatures`, `removeFeatures`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `addFeatures` | `any` |
| `updateFeatures` | `any` |
| `removeFeatures` | `any` |
| `callback` | `any` |

#### Returns

`void`
