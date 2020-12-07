const path = require('path');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
    // JavaScript 执行入口文件
    entry: {
        index: "./src/index.js",
        login: "./src/login/login.js"
    },
    // 模式区分：生产和开发环境
    mode: 'production',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: '[name].js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // 这里主要是配置优化，缩小范围，只处理src文件夹下内容
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        // css代码压缩
        new optimizeCss(),
        // 单独提取CSS文件
        new MiniCssExtractPlugin({
            filename: "main.css",
            chunkFilename: "[id].css"
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin({
            filename: './public/index.html',
            template: './public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json']
    }
};