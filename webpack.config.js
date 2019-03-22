const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    mode: NODE_ENV,
    devServer: {
        historyApiFallback: true,
    },
    entry: path.join(__dirname, "src/index.js"),
    output: {
        path: __dirname + "/dist",
        filename: "app-[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            inject: true,
        }),
    ],
}
