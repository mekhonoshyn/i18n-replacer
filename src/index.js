import path from 'path';
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

const gulpPluginPath = path.join(__dirname, 'gulp-plugin');
const webpackLoaderPath = path.join(__dirname, 'webpack-loader');

export default {
    gulpPluginPath,
    webpackLoaderPath,

    initialize,
    finalize
};

function initialize(options) {
    configInitialize(options);
    helperInitialize();
    reporterInitialize();
}

function finalize() {
    configFinalize();
    helperFinalize();
    reporterFinalize();
}
