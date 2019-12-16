'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _pluginError = require('plugin-error');

var _pluginError2 = _interopRequireDefault(_pluginError);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = i18nReplacerPlugin;


var PLUGIN_NAME = 'gulp-i18n-replacer';

function i18nReplacerPlugin(_ref) {
    var preset = _ref.preset;

    return _through2.default.obj(function (fileObject, encoding, callback) {
        if (!fileObject.isBuffer()) {
            return callback(new _pluginError2.default(PLUGIN_NAME, 'Non-Buffer content is not supported'));
        }

        try {
            var content = (0, _helper.transformSource)(fileObject.contents.toString(), preset);

            fileObject.contents = Buffer.from(content);

            this.push(fileObject);

            return callback();
        } catch (error) {
            return callback(new _pluginError2.default(PLUGIN_NAME, error));
        }
    });
}