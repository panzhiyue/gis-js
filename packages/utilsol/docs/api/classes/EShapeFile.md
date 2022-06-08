[@gis-js/utilsol](../README.md) / [Exports](../modules.md) / EShapeFile

# Class: EShapeFile

shapefile文件操作类

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

构造函数

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

下载为ZIP文件

**`example`**
var options = {
    folder: 'myshapes',
    types: {
        point: 'mypoints',
        polygon: 'mypolygons',
        line: 'mylines'
    }
}
downLoadZip(options);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `any` | 压缩包参数 |

#### Returns

`void`

___

### getFeatures

▸ **getFeatures**(): `any`[]

获取要素数组

#### Returns

`any`[]

要素集合

___

### getProjectionWKT

▸ **getProjectionWKT**(): ``"GEOGCS[\"GCS_China_Geodetic_Coordinate_System_2000\",DATUM[\"D_China_2000\",SPHEROID[\"CGCS2000\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]]"`` \| ``"GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433],AUTHORITY[\"EPSG\",4326]]"``

获取坐标系wkt格式字符串

#### Returns

``"GEOGCS[\"GCS_China_Geodetic_Coordinate_System_2000\",DATUM[\"D_China_2000\",SPHEROID[\"CGCS2000\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]]"`` \| ``"GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433],AUTHORITY[\"EPSG\",4326]]"``

坐标系wkt格式字符串

___

### readFile

▸ **readFile**(`files`): `void`

读取文件

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `files` | `any` | file控件上传的文件列表 |

#### Returns

`void`

___

### readVector

▸ **readVector**(`vector`): `void`

读取矢量图层

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `any` | 矢量图层 |

#### Returns

`void`

___

### setFeatures

▸ **setFeatures**(`features`): `void`

获取设置数组

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `features` | `any` | 要素集合 |

#### Returns

`void`
