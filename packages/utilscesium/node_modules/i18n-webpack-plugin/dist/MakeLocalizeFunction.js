'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * @param {object}  localization
 * @returns {Function}
 */
function makeLocalizeFunction(localization, nested) {
  return function localizeFunction(key) {
    return nested ? byString(localization, key) : localization[key];
  };
}

/**
 *
 * @param {object}  localization
 * @param {string}  string key
 * @returns {*}
 */
function byString(object, string) {
  // strip a leading dot
  var stringKey = string.replace(/^\./, '');

  var keysArray = stringKey.split('.');
  for (var i = 0, length = keysArray.length; i < length; ++i) {
    var key = keysArray[i];

    if (!(key in object)) return;

    object = object[key];
  }

  return object;
}

exports.default = makeLocalizeFunction;