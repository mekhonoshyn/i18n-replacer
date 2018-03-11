/* eslint-disable */

import gulp from 'gulp';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';

gulp.task('webpack', runWebpack);

function runWebpack(done) {
    return webpack(webpackConfig, done);
}
