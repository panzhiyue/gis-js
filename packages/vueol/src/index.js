import * as basic from "./components"
import * as control from "./components/control"
import * as layer from "./components/layer"
import * as source from "./components/source"
import * as geom from "./components/geom"

import * as mixins from "./mixins/index.js"
import * as utils from "./utils/index.js"
export const components = {
  ...basic,
  control,
  layer,
  source,
  geom
}


const install = function (Vue) {
  if (install.installed) return;
  Object.keys(basic).forEach(key => {
    Vue.component(basic[key].name, (basic)[key]);
  });

  Object.keys(control).forEach(key => {
    Vue.component(control[key].name, (control)[key]);
  });

  Object.keys(layer).forEach(key => {
    Vue.component(layer[key].name, (layer)[key]);
  });

  Object.keys(source).forEach(key => {
    Vue.component(source[key].name, (source)[key]);
  });

  Object.keys(geom).forEach(key => {
    Vue.component(geom[key].name, (geom)[key]);
  });
};

if (typeof window !== 'undefined' && (window).Vue) {
  install((window).Vue);
}

const API = {
  install,
  components,
  mixins,
  utils
}

export default API;