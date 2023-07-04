"use strict";
exports.__esModule = true;
exports.resolveTsType = void 0;
var utilityTypes = new Map([
    ["Awaited", "awaitedtype"],
    ["Partial", "partialtype"],
    ["Required", "requiredtype"],
    ["Readonly", "readonlytype"],
    ["Record", "recordkeys-type"],
    ["Pick", "picktype-keys"],
    ["Omit", "omittype-keys"],
    ["Exclude", "excludeuniontype-excludedmembers"],
    ["Extract", "extracttype-union"],
    ["NonNullable", "nonnullabletype"],
    ["Parameters", "parameterstype"],
    ["ConstructorParameters", "constructorparameterstype"],
    ["ReturnType", "returntypetype"],
    ["InstanceType", "instancetypetype"],
    ["ThisParameterType", "thisparametertypetype"],
    ["OmitThisParameter", "omitthisparametertype"],
    ["ThisType", "thistypetype"],
]);
var templateLiteralTypes = new Map([
    ["Uppercase", "uppercasestringtype"],
    ["Lowercase", "lowercasestringtype"],
    ["Capitalize", "capitalizestringtype"],
    ["Uncapitalize", "uncapitalizestringtype"],
]);
function resolveTsType(name) {
    var utilHash = utilityTypes.get(name);
    if (utilHash) {
        return "https://www.typescriptlang.org/docs/handbook/utility-types.html#".concat(utilHash);
    }
    var templateHash = templateLiteralTypes.get(name);
    if (templateHash) {
        return "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#".concat(templateHash);
    }
}
exports.resolveTsType = resolveTsType;
