/* eslint-disable */

import path from 'path';

export default {
    entry: {
        renderer: path.join(__dirname, process.env.SRC_PATH, 'renderer')
    },
    output: {
        path: path.join(__dirname, process.env.DIST_PATH),
        filename: 'renderer/index.js',
        libraryTarget: 'commonjs2'
    },
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
    bail: true
};
