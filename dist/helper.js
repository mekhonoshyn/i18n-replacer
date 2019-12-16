'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.finalize = exports.initialize = exports.getDynamicValue = exports.getStaticValue = exports.genericHandler = exports.transformSource = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _reporter = require('./reporter');

var _presets = require('./presets');

var _presets2 = _interopRequireDefault(_presets);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var statics = {};
var dynamics = {};

exports.transformSource = transformSource;
exports.genericHandler = genericHandler;
exports.getStaticValue = getStaticValue;
exports.getDynamicValue = getDynamicValue;
exports.initialize = initialize;
exports.finalize = finalize;


function transformSource(source, preset) {
    var rules = Object.assign({}, _presets2.default, (0, _config.property)('customPresets'))[preset];

    return rules.reduce(function (accumulator, rule) {
        return accumulator.replace.apply(accumulator, _toConsumableArray(rule));
    }, source);
}

function getStaticValue(key) {
    var entry = getStaticEntry(key);

    entry.requested = true;

    if (entry.fallback) {
        (0, _reporter.addFallbackStaticIssue)({ key: key });

        return entry.value;
    }

    if (typeof entry.value === 'undefined') {
        (0, _reporter.addNotFoundStaticIssue)({ key: key });
    }

    return typeof entry.value === 'undefined' ? key : entry.value;
}

function getDynamicValue(key) {
    var entry = getDynamicEntry(key);

    entry.requested = true;

    if (typeof entry.value === 'undefined') {
        (0, _reporter.addNotFoundDynamicIssue)({ key: key });
    }

    return typeof entry.value === 'undefined' ? key : entry.value;
}

function initialize() {
    initializeStatics();
    initializeDynamics();
}

function finalize() {
    Object.entries(statics).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            requested = _ref2[1].requested;

        return !requested;
    }).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            key = _ref4[0];

        return (0, _reporter.addNotUsedStaticIssue)({ key: key });
    });
    Object.entries(dynamics).filter(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            requested = _ref6[1].requested;

        return !requested;
    }).forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 1),
            key = _ref8[0];

        return (0, _reporter.addNotUsedDynamicIssue)({ key: key });
    });
}

function initializeStatics() {
    var builds = [].concat(_toConsumableArray(new Set([(0, _config.property)('defaultBuild'), (0, _config.property)('customBuild')])));
    var staticsPath = (0, _config.property)('staticsPath');
    var staticsFiles = builds.reduce(function (accumulator, buildName) {
        return Object.assign(accumulator, _defineProperty({}, buildName, _glob2.default.sync(staticsPath.replace(/\{build}/, buildName), { absolute: true })));
    }, {});
    var staticsEntries = {};

    builds.forEach(function (buildName) {
        var buildEntries = staticsEntries[buildName] = {};

        staticsFiles[buildName].forEach(function (filePath) {
            var fileData = readFileSync(filePath);
            var jsonData = JSON.parse(fileData);
            var shortName = _path2.default.parse(filePath).name;

            Object.entries(jsonData).forEach(function (_ref9) {
                var _ref10 = _slicedToArray(_ref9, 2),
                    key = _ref10[0],
                    value = _ref10[1];

                buildEntries[shortName + '.' + key] = value;
            });
        });
    });

    /* Validate keys presence */
    if ((0, _config.property)('customBuild') !== (0, _config.property)('defaultBuild')) {
        Object.keys(staticsEntries[(0, _config.property)('defaultBuild')]).filter(function (key) {
            return !staticsEntries[(0, _config.property)('customBuild')][key];
        }).forEach(function (key) {
            return (0, _reporter.addMissedInCustomIssue)({ key: key });
        });

        Object.keys(staticsEntries[(0, _config.property)('customBuild')]).filter(function (key) {
            return !staticsEntries[(0, _config.property)('defaultBuild')][key];
        }).forEach(function (key) {
            return (0, _reporter.addMissedInDefaultIssue)({ key: key });
        });
    }

    builds.forEach(function (buildName) {
        var buildEntries = staticsEntries[buildName];

        Object.entries(buildEntries).forEach(function (_ref11) {
            var _ref12 = _slicedToArray(_ref11, 2),
                key = _ref12[0],
                value = _ref12[1];

            setStaticValue(buildName, key, value);
        });
    });
}

function initializeDynamics() {
    var dynamicsPath = (0, _config.property)('dynamicsPath');
    var dynamicsFiles = _glob2.default.sync(dynamicsPath, { absolute: true });
    var dynamicsEntries = {};

    dynamicsFiles.forEach(function (filePath) {
        var fileData = readFileSync(filePath);
        var jsonData = JSON.parse(fileData);

        Object.entries(jsonData).forEach(function (_ref13) {
            var _ref14 = _slicedToArray(_ref13, 2),
                key = _ref14[0],
                value = _ref14[1];

            dynamicsEntries[key] = value;
        });
    });

    Object.entries(dynamicsEntries).forEach(function (_ref15) {
        var _ref16 = _slicedToArray(_ref15, 2),
            key = _ref16[0],
            value = _ref16[1];

        setDynamicValue(key, value);
    });
}

function getStaticEntry(key) {
    return statics[key] || (statics[key] = { defined: false, fallback: false, requested: false });
}

function setStaticValue(build, key, value) {
    var entry = getStaticEntry(key);

    entry.defined = true;
    entry.value = value;
    entry.fallback = (0, _config.property)('customBuild') !== (0, _config.property)('defaultBuild') && build === (0, _config.property)('defaultBuild');
}

function getDynamicEntry(key) {
    return dynamics[key] || (dynamics[key] = { defined: false, fallback: false, requested: false });
}

function setDynamicValue(key, value) {
    var entry = getDynamicEntry(key);

    entry.defined = true;
    entry.value = value;
}

function readFileSync(filePath) {
    return _fs2.default.readFileSync(filePath, 'utf-8');
}

function genericHandler(type, match, result) {
    (0, _reporter.addReplacementIssue)({ type: type, match: match, result: result });

    return result;
}