const path = require("path");
const EncodingPlugin = require("webpack-encoding-plugin");
module.exports = {
  entry: "./src/index.js",
  //开发环境dev下, 设置为`eval`能提高最快速度, 但是缺点是不能正确显示行号, Debug会有点影响
  //devtool: 'source-map',
  devtool: "eval",
  // 关闭生产环境的sourceMap, 不懂是啥的话可以看下面的文章
  // 阮一峰 - JavaScript Source Map 详解(http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
  //productionSourceMap: false,
  //mode: 'production',
  // 开发环境设置本地服务器，实现热更新
  devServer: {
    contentBase: path.resolve(__dirname, "dist/js"),
    // 提供给外部访问
    host: "0.0.0.0",
    port: 8388,
    // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // 设置热替换
    hot: true,
    // 设置页面引入
    inline: true,
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/js"),
  },
  resolve: {
    extensions: [".js", ".vue", ".json"], //取消后缀  引入文件路径就不用加文件后缀了
    alias: {
      "@": path.resolve("src"),
      utilscesium: path.resolve("src"), //自己新建 要从src开始写文件路径
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory=true",
      },

      //{ test: /\.js$/, exclude: /node_modules/ }
    ],
  },
  plugins: [
    new EncodingPlugin({
      encoding: "utf8",
    }),
  ],
};
