import * as components from "./components/index.js";
import "./styles/index.css";

const install = function(Vue) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const API = {
  install,
};

export default API;
export * from "./components/index.js";
export * from "./utils/index.js";
