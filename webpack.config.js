/* eslint-disable */

import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
    entry: {
        index: path.join(__dirname, process.env.SRC_PATH, 'index.js'),
        'gulp-plugin': path.join(__dirname, process.env.SRC_PATH, 'gulp-plugin.js'),
        'webpack-loader': path.join(__dirname, process.env.SRC_PATH, 'webpack-loader.js')
    },
    output: {
        path: path.join(__dirname, process.env.DIST_PATH),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: [
        nodeExternals()
    ],
    module: {
        rules: [{
            test: /src\/.*\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    target: 'node',
    node: {
        __dirname: false
    },
    bail: true
};
