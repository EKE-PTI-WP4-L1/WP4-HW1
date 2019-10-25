const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
const host = process.env.HOST || 'localhost';

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['./src/js/index.js', './src/scss/index.scss'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: resolveAppPath('public'),
        compress: false,
        hot: false,
        host,
        port: 3000,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // For Font Awesome
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                    }
                }]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolveAppPath('public/index.html')
        })
    ]
};