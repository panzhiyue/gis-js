"use strict";
exports.__esModule = true;
exports.resolveOpenlayersName = void 0;
var canvasPages = new Set(["Feature"]);
function resolveOpenlayersName(name) {
  if (name.indexOf("Feature")>-1) {
    console.log(name);
  }
  if (canvasPages.has(name)) {
    return "https://openlayers.org/en/latest/apidoc/module-ol_"
      .concat(name, "-")
      .concat(name, ".html");
  }
}
exports.resolveOpenlayersName = resolveOpenlayersName;
