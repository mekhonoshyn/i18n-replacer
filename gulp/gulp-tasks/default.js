/* eslint-disable */

import gulp from 'gulp';
import {sequence} from './utils';

gulp.task('default', sequence('clean', 'webpack'));
