/* eslint-disable */

import path from 'path';
// import nodeExternals from 'webpack-node-externals';

export default {
    entry: {
        renderer: path.join(__dirname, process.env.SRC_PATH, 'renderer')
    },
    output: {
        path: path.join(__dirname, process.env.DIST_PATH, 'renderer'),
        filename: '[name].js',
        // libraryExport: 'default',
        libraryTarget: 'commonjs2'
    },
    externals: [
        // nodeExternals(),
        // './helper',
        // './config',
        // '../config'
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
    // node: {
    //     __dirname: false
    // },
    bail: true
};
