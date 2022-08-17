[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / EShapeFile

# Class: EShapeFile

## Hierarchy

- `BaseObject`

  ↳ **`EShapeFile`**

## Table of contents

### Constructors

- [constructor](EShapeFile.md#constructor)

### Properties

- [cpg\_](EShapeFile.md#cpg_)
- [featureCollection\_](EShapeFile.md#featurecollection_)
- [projection\_](EShapeFile.md#projection_)

### Methods

- [downLoadZip](EShapeFile.md#downloadzip)
- [getFeatures](EShapeFile.md#getfeatures)
- [getProjectionWKT](EShapeFile.md#getprojectionwkt)
- [readFile](EShapeFile.md#readfile)
- [readVector](EShapeFile.md#readvector)
- [setFeatures](EShapeFile.md#setfeatures)

## Constructors

### constructor

• **new EShapeFile**(`opt_options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt_options` | `any` |

#### Overrides

OLObject.constructor

## Properties

### cpg\_

• **cpg\_**: `string`

___

### featureCollection\_

• **featureCollection\_**: `Collection`<`any`\>

___

### projection\_

• **projection\_**: `Projection`

## Methods

### downLoadZip

▸ **downLoadZip**(`options`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `any` |  |

#### Returns

`void`

___

### getFeatures

▸ **getFeatures**(): `any`[]

#### Returns

`any`[]

___

### getProjectionWKT

▸ **getProjectionWKT**(): ``"GEOGCS[\"GCS_China_Geodetic_Coordinate_System_2000\",DATUM[\"D_China_2000\",SPHEROID[\"CGCS2000\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]]"`` \| ``"GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433],AUTHORITY[\"EPSG\",4326]]"``

#### Returns

``"GEOGCS[\"GCS_China_Geodetic_Coordinate_System_2000\",DATUM[\"D_China_2000\",SPHEROID[\"CGCS2000\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]]"`` \| ``"GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433],AUTHORITY[\"EPSG\",4326]]"``

___

### readFile

▸ **readFile**(`files`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | `any` |  |

#### Returns

`void`

___

### readVector

▸ **readVector**(`vector`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `any` |  |

#### Returns

`void`

___

### setFeatures

▸ **setFeatures**(`features`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `features` | `any` |  |

#### Returns

`void`
