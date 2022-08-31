## 基础用法

::: demo
```vue
<template>
<vue2ol-map style="height:400px;">
  <vue2ol-view  :center="center" :options="{zoom:2,maxZoom:8,projection:projection}">
  </vue2ol-view>
  <vue2ol-layer-tile>
    <vue2ol-source-osm></vue2ol-source-osm>
  </vue2ol-layer-tile>
  <vue2ol-layer-image>
    <vue2ol-source-imagestatic  :options="{
      url:url,
      imageExtent:extent,
      projection:projection

    }">

    </vue2ol-source-imagestatic>
  </vue2ol-layer-image>
</vue2ol-map>
</template>

<script>
import { getCenter } from 'ol/extent';
import Projection from "ol/proj/Projection"
const extent = [0, 0, 1024, 968];
export default{
  data(){
    return {
      url:"https://imgs.xkcd.com/comics/online_communities.png",
      zoom:2,
      projection:new Projection({
          code: 'xkcd-image',
          units: 'pixels',
          extent: extent,
      }),
      center:getCenter(extent),
      extent
    }
  }
}
</script>
```
:::
