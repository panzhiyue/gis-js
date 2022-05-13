# Quick Start

## Hello Map!

vue2ol为Openlayers提供了vue映射组件，允许以简单地声明式映射构造。

::: demo

``` vue 
<vue2ol-map>
	<vue2ol-view center='[120,28]' zoom='10'>
    </vue2ol-view>
    <vue2ol-layer-tile>
    	<vue2ol-source-osm></vue2ol-source-osm>
    </vue2ol-layer-tile>
</vue2ol-map>
```

:::