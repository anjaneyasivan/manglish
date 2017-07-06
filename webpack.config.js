/**
 * Created by anjaneyasivan on 06/07/17.
 */
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'app': './js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [
                    'es2015'
                ],
                plugins: []
            },
            include: [
                path.resolve(__dirname, 'app')
            ]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new BabiliPlugin()
    ],
    resolve: {
        modules: [
            path.join(process.cwd(), 'app'),
            'node_modules'
        ],
        extensions: ['.js']
    },
    devtool: false
};