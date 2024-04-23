"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var frontMatter = require("front-matter");

var fs = require("fs");

var handlebars = require("handlebars");

var marked = require("marked");

var path = require("path");

var pkg = require("../../../package.json");

var promisify = require("util").promisify;

var RawSource = require("webpack-sources").RawSource;

var readFile = promisify(fs.readFile);
var isCssRegEx = /\.css$/;
var isJsRegEx = /\.js(\?.*)?$/;
handlebars.registerHelper("md", function (str) {
  return new handlebars.SafeString(marked(str));
});
handlebars.registerHelper("indent", function (text, options) {
  if (!text) {
    return text;
  }

  var count = options.hash.spaces || 2;
  var spaces = new Array(count + 1).join(" ");
  return text.split("\n").map(function (line) {
    return line ? spaces + line : "";
  }).join("\n");
});
/**
 * 获取js文件代码块
 * @param {Object} chunk Chunk.
 * @param {string} jsName 文件名
 * @return {string} The source.
 */

function getJsSource(chunk, jsName) {
  var jsSource;

  for (var i = 0, ii = chunk.modules.length; i < ii; ++i) {
    var _module = chunk.modules[i];

    if (_module.modules) {
      jsSource = getJsSource(_module, jsName);

      if (jsSource) {
        return jsSource;
      }
    }

    if (_module.identifier.endsWith(jsName)) {
      return _module.source;
    }
  }
}
/**
 * 一个用于构建示例文件的webpack 插件
 * @param {Object} config Plugin configuration.  Requires a `templates` property
 * with the path to templates and a `common` property with the name of the
 * common chunk.
 * @constructor
 */


function ExampleBuilder(config) {
  this.templates = config.templates;
  this.common = config.common;
}
/**
 * 由 webpack调用
 * @param {Object} compiler  webpack compiler.
 */


ExampleBuilder.prototype.apply = function (compiler) {
  var _this = this;

  compiler.hooks.emit.tapPromise("ExampleBuilder", function _callee2(compilation) {
    var chunks, exampleConfig, tempDatas, datas, promises, minData, minIndex, i, _i2, data, name, nameSplit, tree1, tree2, tree3, configSource;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            chunks = compilation.getStats().toJson().chunks.filter(function (chunk) {
              return chunk.names[0] !== _this.common;
            });
            exampleConfig = {};
            tempDatas = [];
            datas = [];
            promises = chunks.map(function _callee(chunk) {
              var _ref, _ref2, assets, data, file;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(_this.render(compiler.context, chunk));

                    case 2:
                      _ref = _context.sent;
                      _ref2 = _slicedToArray(_ref, 2);
                      assets = _ref2[0];
                      data = _ref2[1];
                      tempDatas.push(data);

                      for (file in assets) {
                        compilation.assets[file] = new RawSource(assets[file]);
                      }

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
            _context2.next = 7;
            return regeneratorRuntime.awrap(Promise.all(promises));

          case 7:
            //排序
            while (tempDatas.length > 0) {
              minData = tempDatas[0];
              minIndex = 0;

              for (i = 1; i < tempDatas.length; i++) {
                if (tempDatas[i].filename < minData.filename) {
                  minData = tempDatas[i];
                  minIndex = i;
                }
              }

              datas.push(minData);
              tempDatas.splice(minIndex, 1);
            } //生成config配置文件内容
            // datas.sort((a, b) => { console.log(a.filename, b.filename, a.filename > b.filename); return (a.filename > b.filename ? 1 : 0) });


            for (_i2 = 0; _i2 < datas.length; _i2++) {
              data = datas[_i2];
              name = data.filename;
              name = name.substring(0, data.filename.lastIndexOf("."));
              nameSplit = name.split("_");
              tree1 = nameSplit[0];
              tree2 = nameSplit[1];
              tree3 = nameSplit[2];

              if (exampleConfig[tree1] == undefined) {
                exampleConfig[tree1] = {};
                exampleConfig[tree1].name = tree1;
                exampleConfig[tree1].name_en = tree1;
                exampleConfig[tree1].content = {};
              }

              if (exampleConfig[tree1].content[tree2] == undefined) {
                exampleConfig[tree1].content[tree2] = {};
                exampleConfig[tree1].content[tree2].name = tree2;
                exampleConfig[tree1].content[tree2].name_en = tree2;
                exampleConfig[tree1].content[tree2].content = [];
              }

              exampleConfig[tree1].content[tree2].content.push({
                name: tree3,
                name_en: tree3,
                thumbnail: data.icon,
                fileName: name,
                page: name
              });
            } //生成config配置文件


            configSource = 'var identification = {name: "utilscesium Demo"};';
            configSource += "var exampleConfig = ".concat(JSON.stringify(exampleConfig), ";");
            configSource += 'var sideBarIconConfig = {"baseDemo": "fa-edit","map": "fa-map-marker","overlay": "fa-image","control": "fa-cog","popup": "fa-commenting-o","query": "fa-search","theme": " fa-area-chart","analysis": "fa-leanpub","viz": "fa-map", "OGC": "fa fa-globe","others": "fa-th-large"}; ';
            configSource += 'var exampleIconConfig = {"baseDemo": "fa-edit","map": "fa-map-marker", "overlay": "fa-image","control": "fa-cog","popup": "fa-commenting-o","query": "fa-search","theme": " fa-area-chart","analysis": "fa-leanpub","viz": "fa-map","OGC": "fa fa-globe","others": "fa-th-large"}; ';
            compilation.assets["js/config.js"] = new RawSource(configSource);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};
/**
 * 渲染页面
 * @param {any} dir 文件夹路径
 * @param {any} chunk
 */


ExampleBuilder.prototype.render = function _callee3(dir, chunk) {
  var name, assets, readOptions, htmlName, htmlPath, htmlSource, _frontMatter, attributes, body, data, jsName, jsSource, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, cssName, cssPath, cssSource, resources, remoteResources, codePenResources, i, ii, resource, remoteResource, templatePath, templateSource;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          name = chunk.names[0];
          assets = {};
          readOptions = {
            encoding: "utf8"
          };
          htmlName = "".concat(name, ".html");
          htmlPath = path.join(dir, htmlName); //html源码

          _context3.next = 7;
          return regeneratorRuntime.awrap(readFile(htmlPath, readOptions));

        case 7:
          htmlSource = _context3.sent;
          _frontMatter = frontMatter(htmlSource), attributes = _frontMatter.attributes, body = _frontMatter.body;
          data = Object.assign(attributes, {
            contents: body
          });
          data.olVersion = pkg.version;
          data.filename = htmlName; // 添加script标签

          jsName = "".concat(name, ".js");
          console.log(jsName);
          console.log(path.join(dir, jsName));
          jsSource = getJsSource(chunk, path.join(dir, jsName)); //jsSource = jsSource.replace(/'\.\.\/src\//g, '\'');

          if (!data.cloak) {
            _context3.next = 36;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 20;

          for (_iterator = data.cloak[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            entry = _step.value;
            jsSource = jsSource.replace(new RegExp(entry.key, "g"), entry.value);
          }

          _context3.next = 28;
          break;

        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](20);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 28:
          _context3.prev = 28;
          _context3.prev = 29;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 31:
          _context3.prev = 31;

          if (!_didIteratorError) {
            _context3.next = 34;
            break;
          }

          throw _iteratorError;

        case 34:
          return _context3.finish(31);

        case 35:
          return _context3.finish(28);

        case 36:
          data.js = {
            tag: "<script src=\"js/utilscesium.iife.js\"></script>",
            source: jsSource
          }; // 示例css文件

          cssName = "".concat(name, ".css");
          cssPath = path.join(dir, cssName);
          _context3.prev = 39;
          _context3.next = 42;
          return regeneratorRuntime.awrap(readFile(cssPath, readOptions));

        case 42:
          cssSource = _context3.sent;
          _context3.next = 47;
          break;

        case 45:
          _context3.prev = 45;
          _context3.t1 = _context3["catch"](39);

        case 47:
          if (cssSource) {
            data.css = {
              tag: "<link rel=\"stylesheet\" href=\"".concat(cssName, "\">"),
              source: cssSource
            };
            assets[cssName] = cssSource;
          } // add additional resources


          if (!data.resources) {
            _context3.next = 73;
            break;
          }

          resources = [];
          remoteResources = [];
          codePenResources = [];
          i = 0, ii = data.resources.length;

        case 53:
          if (!(i < ii)) {
            _context3.next = 71;
            break;
          }

          resource = data.resources[i];
          remoteResource = resource.indexOf("//") === -1 ? "https://utilscesium.org/en/v".concat(pkg.version, "/examples/").concat(resource) : resource;
          codePenResources[i] = remoteResource;

          if (!isJsRegEx.test(resource)) {
            _context3.next = 62;
            break;
          }

          resources[i] = "<script src=\"".concat(resource, "\"></script>");
          remoteResources[i] = "<script src=\"".concat(remoteResource, "\"></script>");
          _context3.next = 68;
          break;

        case 62:
          if (!isCssRegEx.test(resource)) {
            _context3.next = 67;
            break;
          }

          if (resource.indexOf("bootstrap.min.css") === -1) {
            resources[i] = '<link rel="stylesheet" href="' + resource + '">';
          }

          remoteResources[i] = '<link rel="stylesheet" href="' + remoteResource + '">';
          _context3.next = 68;
          break;

        case 67:
          throw new Error("Invalid value for resource: " + resource + " is not .js or .css: " + htmlName);

        case 68:
          ++i;
          _context3.next = 53;
          break;

        case 71:
          data.extraHead = {
            local: resources.join("\n"),
            remote: remoteResources.join("\n")
          };
          data.extraResources = data.resources.length ? "," + codePenResources.join(",") : "";

        case 73:
          templatePath = path.join(this.templates, attributes.layout);
          _context3.next = 76;
          return regeneratorRuntime.awrap(readFile(templatePath, readOptions));

        case 76:
          templateSource = _context3.sent;
          assets[htmlName] = handlebars.compile(templateSource)(data);
          return _context3.abrupt("return", [assets, data]);

        case 79:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this, [[20, 24, 28, 36], [29,, 31, 35], [39, 45]]);
};

module.exports = ExampleBuilder;