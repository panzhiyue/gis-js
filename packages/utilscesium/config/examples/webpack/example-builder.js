const frontMatter = require("front-matter");
const fs = require("fs");
const handlebars = require("handlebars");
const marked = require("marked");
const path = require("path");
const pkg = require("../../../package.json");
const promisify = require("util").promisify;
const RawSource = require("webpack-sources").RawSource;

const readFile = promisify(fs.readFile);
const isCssRegEx = /\.css$/;
const isJsRegEx = /\.js(\?.*)?$/;

handlebars.registerHelper(
  "md",
  (str) => new handlebars.SafeString(marked(str))
);

handlebars.registerHelper("indent", (text, options) => {
  if (!text) {
    return text;
  }
  const count = options.hash.spaces || 2;
  const spaces = new Array(count + 1).join(" ");
  return text
    .split("\n")
    .map((line) => (line ? spaces + line : ""))
    .join("\n");
});

/**
 * 获取js文件代码块
 * @param {Object} chunk Chunk.
 * @param {string} jsName 文件名
 * @return {string} The source.
 */
function getJsSource(chunk, jsName) {
  let jsSource;
  for (let i = 0, ii = chunk.modules.length; i < ii; ++i) {
    const module = chunk.modules[i];
    if (module.modules) {
      jsSource = getJsSource(module, jsName);
      if (jsSource) {
        return jsSource;
      }
    }
    if (module.identifier.endsWith(jsName)) {
      return module.source;
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
ExampleBuilder.prototype.apply = function(compiler) {
  compiler.hooks.emit.tapPromise("ExampleBuilder", async (compilation) => {
    const chunks = compilation
      .getStats()
      .toJson()
      .chunks.filter((chunk) => chunk.names[0] !== this.common);

    const exampleConfig = {};
    var tempDatas = [];
    var datas = [];
    const promises = chunks.map(async (chunk) => {
      const [assets, data] = await this.render(compiler.context, chunk);
      tempDatas.push(data);

      for (const file in assets) {
        compilation.assets[file] = new RawSource(assets[file]);
      }
    });

    await Promise.all(promises);

    //排序
    while (tempDatas.length > 0) {
      var minData = tempDatas[0];
      var minIndex = 0;
      for (let i = 1; i < tempDatas.length; i++) {
        if (tempDatas[i].filename < minData.filename) {
          minData = tempDatas[i];
          minIndex = i;
        }
      }
      datas.push(minData);
      tempDatas.splice(minIndex, 1);
    }
    //生成config配置文件内容
    // datas.sort((a, b) => { console.log(a.filename, b.filename, a.filename > b.filename); return (a.filename > b.filename ? 1 : 0) });
    for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      let name = data.filename;
      name = name.substring(0, data.filename.lastIndexOf("."));
      var nameSplit = name.split("_");

      var tree1 = nameSplit[0];
      var tree2 = nameSplit[1];
      var tree3 = nameSplit[2];

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
        page: name,
      });
    }

    //生成config配置文件
    var configSource = 'var identification = {name: "utilscesium Demo"};';

    configSource += `var exampleConfig = ${JSON.stringify(exampleConfig)};`;

    configSource +=
      'var sideBarIconConfig = {"baseDemo": "fa-edit","map": "fa-map-marker","overlay": "fa-image","control": "fa-cog","popup": "fa-commenting-o","query": "fa-search","theme": " fa-area-chart","analysis": "fa-leanpub","viz": "fa-map", "OGC": "fa fa-globe","others": "fa-th-large"}; ';

    configSource +=
      'var exampleIconConfig = {"baseDemo": "fa-edit","map": "fa-map-marker", "overlay": "fa-image","control": "fa-cog","popup": "fa-commenting-o","query": "fa-search","theme": " fa-area-chart","analysis": "fa-leanpub","viz": "fa-map","OGC": "fa fa-globe","others": "fa-th-large"}; ';
    compilation.assets["js/config.js"] = new RawSource(configSource);
  });
};

/**
 * 渲染页面
 * @param {any} dir 文件夹路径
 * @param {any} chunk
 */
ExampleBuilder.prototype.render = async function(dir, chunk) {
  const name = chunk.names[0];

  const assets = {};
  const readOptions = { encoding: "utf8" };

  const htmlName = `${name}.html`;
  const htmlPath = path.join(dir, htmlName);
  //html源码
  const htmlSource = await readFile(htmlPath, readOptions);
  const { attributes, body } = frontMatter(htmlSource);
  const data = Object.assign(attributes, { contents: body });

  data.olVersion = pkg.version;
  data.filename = htmlName;

  // 添加script标签
  const jsName = `${name}.js`;
  console.log(jsName);
  console.log(path.join(dir, jsName));
  let jsSource = getJsSource(chunk, path.join(dir, jsName));

  //jsSource = jsSource.replace(/'\.\.\/src\//g, '\'');
  if (data.cloak) {
    for (const entry of data.cloak) {
      jsSource = jsSource.replace(new RegExp(entry.key, "g"), entry.value);
    }
  }
  data.js = {
    tag: `<script src="js/utilscesium.iife.js"></script>`,
    source: jsSource,
  };

  // 示例css文件
  const cssName = `${name}.css`;
  const cssPath = path.join(dir, cssName);
  let cssSource;
  try {
    cssSource = await readFile(cssPath, readOptions);
  } catch (err) {
    // pass
  }
  if (cssSource) {
    data.css = {
      tag: `<link rel="stylesheet" href="${cssName}">`,
      source: cssSource,
    };
    assets[cssName] = cssSource;
  }

  // add additional resources
  if (data.resources) {
    const resources = [];
    const remoteResources = [];
    const codePenResources = [];
    for (let i = 0, ii = data.resources.length; i < ii; ++i) {
      const resource = data.resources[i];
      const remoteResource =
        resource.indexOf("//") === -1
          ? `https://utilscesium.org/en/v${pkg.version}/examples/${resource}`
          : resource;
      codePenResources[i] = remoteResource;
      if (isJsRegEx.test(resource)) {
        resources[i] = `<script src="${resource}"></script>`;
        remoteResources[i] = `<script src="${remoteResource}"></script>`;
      } else if (isCssRegEx.test(resource)) {
        if (resource.indexOf("bootstrap.min.css") === -1) {
          resources[i] = '<link rel="stylesheet" href="' + resource + '">';
        }
        remoteResources[i] =
          '<link rel="stylesheet" href="' + remoteResource + '">';
      } else {
        throw new Error(
          "Invalid value for resource: " +
            resource +
            " is not .js or .css: " +
            htmlName
        );
      }
    }
    data.extraHead = {
      local: resources.join("\n"),
      remote: remoteResources.join("\n"),
    };
    data.extraResources = data.resources.length
      ? "," + codePenResources.join(",")
      : "";
  }
  const templatePath = path.join(this.templates, attributes.layout);
  const templateSource = await readFile(templatePath, readOptions);

  assets[htmlName] = handlebars.compile(templateSource)(data);
  return [assets, data];
};

module.exports = ExampleBuilder;
