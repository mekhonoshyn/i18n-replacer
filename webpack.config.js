/* eslint-disable */

import path from 'path';

export default {
    entry: path.join(__dirname, process.env.SRC_PATH, 'index.js'),
    output: {
        path: path.join(__dirname, process.env.DIST_PATH),
        filename: 'index.js'
    },
    externals: [
        /^(?!\.|\/).+/i
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
    bail: true
};
