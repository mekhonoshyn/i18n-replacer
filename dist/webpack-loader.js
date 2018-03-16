'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.raw = exports.default = undefined;

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _helper = require('./helper');

var _presets = require('./presets');

var _presets2 = _interopRequireDefault(_presets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_RAW = true;

exports.default = i18nReplacerLoader;
exports.raw = IS_RAW;


function i18nReplacerLoader(source) {
    this.cacheable();

    var _loaderUtils$getOptio = _loaderUtils2.default.getOptions(this),
        preset = _loaderUtils$getOptio.preset;

    return (0, _helper.transformSource)(source.toString(), _presets2.default[preset]);
}