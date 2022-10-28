[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / [source](../modules/source.md) / MapGISDocTile

# Class: MapGISDocTile

[source](../modules/source.md).MapGISDocTile

## Hierarchy

- `TileImage`

  ↳ **`MapGISDocTile`**

## Table of contents

### Constructors

- [constructor](source.MapGISDocTile.md#constructor)

### Properties

- [guid\_](source.MapGISDocTile.md#guid_)
- [gutter\_](source.MapGISDocTile.md#gutter_)
- [hidpi\_](source.MapGISDocTile.md#hidpi_)
- [params\_](source.MapGISDocTile.md#params_)
- [rlt\_](source.MapGISDocTile.md#rlt_)
- [tmpExtent\_](source.MapGISDocTile.md#tmpextent_)

### Methods

- [getRequestUrl\_](source.MapGISDocTile.md#getrequesturl_)
- [tileUrlFunction](source.MapGISDocTile.md#tileurlfunction)

## Constructors

### constructor

• **new MapGISDocTile**(`opt_options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opt_options` | [`MapGISDocTileSourceOptions`](../interfaces/source.MapGISDocTileSourceOptions.md) |  |

#### Overrides

TileImage.constructor

## Properties

### guid\_

• `Private` **guid\_**: `string`

___

### gutter\_

• `Private` **gutter\_**: `number`

___

### hidpi\_

• `Private` **hidpi\_**: `boolean`

___

### params\_

• `Private` **params\_**: `Object`

___

### rlt\_

• `Private` **rlt\_**: `number`

___

### tmpExtent\_

• `Private` **tmpExtent\_**: `Extent`

## Methods

### getRequestUrl\_

▸ `Private` **getRequestUrl_**(`tileCoord`, `tileSize`, `tileExtent`, `pixelRatio`, `projection`, `params`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tileCoord` | `any` |  |
| `tileSize` | `any` |  |
| `tileExtent` | `any` |  |
| `pixelRatio` | `any` |  |
| `projection` | `any` |  |
| `params` | `any` |  |

#### Returns

`string`

___

### tileUrlFunction

▸ **tileUrlFunction**(`tileCoord`, `pixelRatio`, `projection`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tileCoord` | `any` |
| `pixelRatio` | `any` |
| `projection` | `any` |

#### Returns

`string`

#### Overrides

TileImage.tileUrlFunction
