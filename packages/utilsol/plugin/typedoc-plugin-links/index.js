"use strict";
exports.__esModule = true;
exports.load = void 0;
var typedoc_1 = require("typedoc");
var openlayers_1 = require("./openlayers");
var typescript_1 = require("./typescript");
var version = typedoc_1.Application.VERSION.split(/[\.-]/);
var supportsObjectReturn = +version[1] > 23 || +version[2] >= 26;
function load(app) {
   
    var failed = new Set();
    app.options.addDeclaration({
        name: "resolveUtilityTypes",
        defaultValue: true,
        help: "[typedoc-plugin-links]: Resolve references to Partial, Omit, etc to the TypeScript website.",
        type: typedoc_1.ParameterType.Boolean
    });
    var resolvers = [
        openlayers_1.resolveOpenlayersName
    ];
    function resolveName(name) {
        for (var _i = 0, resolvers_1 = resolvers; _i < resolvers_1.length; _i++) {
            var res = resolvers_1[_i];
            var result = res(name);
            if (result)
                return result;
        }
    }
    // app.converter.on(typedoc_1.Converter.EVENT_BEGIN, function () {
    //     if (app.options.getValue("resolveUtilityTypes")) {
    //         resolvers.push(typescript_1.resolveTsType);
    //     }
    // });
    app.converter.addUnknownSymbolResolver(function (declaration) {
        var _a, _b;
        if (declaration.moduleSource === "typescript" ||
            (!declaration.moduleSource &&
                declaration.resolutionStart === "global")) {
            var name_1 = (_b = (_a = declaration.symbolReference) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.map(function (path) { return path.path; }).join(".");
            if (!name_1)
                return;
            var result = resolveName(name_1);
            if (!result && !failed.has(name_1)) {
                failed.add(name_1);
                app.logger.verbose("[typedoc-plugin-links]: Failed to resolve type: ".concat(name_1));
            }
            if (supportsObjectReturn && result) {
                return {
                    target: result,
                    caption: name_1
                };
            }
            return result;
        }
    });
}
exports.load = load;
