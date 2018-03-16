'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

var _helper = require('./helper');

var _reporter = require('./reporter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulpPluginPath = _path2.default.join(__dirname, 'gulp-plugin');
var webpackLoaderPath = _path2.default.join(__dirname, 'webpack-loader');

exports.default = {
    gulpPluginPath: gulpPluginPath,
    webpackLoaderPath: webpackLoaderPath,

    initialize: initialize,
    finalize: finalize
};


function initialize(options) {
    (0, _config.initialize)(options);
    (0, _helper.initialize)();
    (0, _reporter.initialize)();
}

function finalize() {
    (0, _config.finalize)();
    (0, _helper.finalize)();
    (0, _reporter.finalize)();
}