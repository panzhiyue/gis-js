const CopyPlugin = require('copy-webpack-plugin');
const ExampleBuilder = require('./example-builder');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..');

//筛选所有html文件
const examples = fs.readdirSync(src)
    .filter(name => /^(?!index|editor).*\.html$/.test(name))
    .map(name => name.replace(/\.html$/, ''));
//构建包含所有js的对象
const entry = {};
examples.forEach(example => {
    entry[example] = `./${example}.js`;
});


module.exports = {
    context: src,
    target: 'web',
    entry: entry,
    module: {
        rules: [{
            //use: {
            //    loader: 'buble-loader'
            //},
            test: /\.js$/,
            include: [
                path.join(__dirname, '..', '..', 'src'),
                path.join(__dirname, '..')
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],//取消后缀  引入文件路径就不用加文件后缀了
        alias: {
            '@': path.resolve('src'),
            'utilscesium': path.resolve('src'), //自己新建 要从src开始写文件路径
        }
    },
    //optimization: {
    //    runtimeChunk: {
    //        name: 'common'
    //    },
    //    splitChunks: {
    //        name: 'common',
    //        chunks: 'initial',
    //        minChunks: 2
    //    }
    //},
    plugins: [
        //创建文件
        new ExampleBuilder({
            templates: path.join(__dirname, '..', 'template'),
            // common: 'common'
        }),
        new CopyPlugin([
            { from: '../../build/utilscesium.js', to: 'js' },
            { from: 'template', to: 'template' },
            { from: 'js', to: 'js' },
            { from: 'img', to: 'img' },
            { from: 'images', to: 'images' },
            { from: 'css', to: 'css' },
            { from: 'resources', to: 'resources' },
            { from: 'index.html', to: 'index.html' },
            { from: 'editor.html', to: 'editor.html' }
            //,{ from: 'index.js', to: 'index.js' }
        ])
    ]
    ,
    devtool: 'source-map'
    ,
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', '..', '..', 'build', 'examples')
    }
};
