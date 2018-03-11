import path from 'path';
import gulpPlugin from './gulp-plugin';
import {
    initialize as configInitialize,
    finalize as configFinalize
} from './config';
import {
    initialize as helperInitialize,
    finalize as helperFinalize
} from './helper';
import {
    initialize as reporterInitialize,
    finalize as reporterFinalize
} from './reporter';

const webpackLoaderPath = path.join(__dirname, 'webpack-loader');

export {
    gulpPlugin,
    webpackLoaderPath,

    initialize,
    finalize
};

function initialize(options) {
    configInitialize(options);
    helperInitialize();
    reporterInitialize();
}

function finalize(options) {
    configFinalize(options);
    helperFinalize();
    reporterFinalize();
}
