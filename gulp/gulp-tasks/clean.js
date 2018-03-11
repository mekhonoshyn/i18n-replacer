/* eslint-disable */

import del from 'del';
import gulp from 'gulp';
import {DIST_PATH} from './config';

gulp.task('clean', cleanBuild);

function cleanBuild() {
    return del([`${DIST_PATH}/**`, `!${DIST_PATH}`]);
}
