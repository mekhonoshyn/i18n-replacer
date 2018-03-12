module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var config = {};

exports.property = property;
exports.initialize = initialize;
exports.finalize = finalize;


function property(key) {
    return config[key];
}

function initialize(options) {
    Object.entries(options).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        Object.defineProperty(config, key, { enumerable: true, value: value });
    });
}

function finalize() {}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.finalize = exports.initialize = exports.addMissedInCustomIssue = exports.addMissedInDefaultIssue = exports.addNotFoundDynamicIssue = exports.addNotFoundStaticIssue = exports.addNotUsedDynamicIssue = exports.addNotUsedStaticIssue = exports.addFallbackStaticIssue = exports.addReplacementIssue = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = __webpack_require__(2);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

var _config = __webpack_require__(1);

var _renderer = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Stats object
 *
 * accumulates reported issues
 */
var stats = {
    replacements: {},
    fallback: { static: new Set() },
    notUsed: { static: new Set(), dynamic: new Set() },
    notFound: { static: new Set(), dynamic: new Set() },
    missedInDefault: { static: new Set() },
    missedInCustom: { static: new Set() }
};

exports.addReplacementIssue = addReplacementIssue;
exports.addFallbackStaticIssue = addFallbackStaticIssue;
exports.addNotUsedStaticIssue = addNotUsedStaticIssue;
exports.addNotUsedDynamicIssue = addNotUsedDynamicIssue;
exports.addNotFoundStaticIssue = addNotFoundStaticIssue;
exports.addNotFoundDynamicIssue = addNotFoundDynamicIssue;
exports.addMissedInDefaultIssue = addMissedInDefaultIssue;
exports.addMissedInCustomIssue = addMissedInCustomIssue;
exports.initialize = initialize;
exports.finalize = finalize;


function addReplacementIssue(_ref) {
    var type = _ref.type,
        match = _ref.match,
        result = _ref.result;

    if (!stats.replacements[type]) {
        stats.replacements[type] = [];
    }

    stats.replacements[type].push({ match: match, result: result });
}

function addFallbackStaticIssue(_ref2) {
    var key = _ref2.key;

    stats.fallback.static.add({ key: key });
}

function addNotUsedStaticIssue(_ref3) {
    var key = _ref3.key;

    stats.notUsed.static.add({ key: key });
}

function addNotUsedDynamicIssue(_ref4) {
    var key = _ref4.key;

    stats.notUsed.dynamic.add({ key: key });
}

function addNotFoundStaticIssue(_ref5) {
    var key = _ref5.key;

    stats.notFound.static.add({ key: key });
}

function addNotFoundDynamicIssue(_ref6) {
    var key = _ref6.key;

    stats.notFound.dynamic.add({ key: key });
}

function addMissedInDefaultIssue(_ref7) {
    var key = _ref7.key;

    stats.missedInDefault.static.add({ key: key });
}

function addMissedInCustomIssue(_ref8) {
    var key = _ref8.key;

    stats.missedInCustom.static.add({ key: key });
}

function initialize() {}

function finalize() {
    generateReport();
}

function generateReport() {
    var reportRootDirectory = _path2.default.join(process.cwd(), (0, _config.property)('reportDirectory'));
    var reportDirectory = _path2.default.join(reportRootDirectory, '_' + Date.now());
    var reportFile = _path2.default.join(reportDirectory, 'i18n.html');

    try {
        _fs2.default.mkdirSync(reportRootDirectory);
    } catch (error) {}

    _fs2.default.mkdirSync(reportDirectory);

    writeFileSync(reportFile, renderReport());
}

function renderReport() {
    var notFoundStaticsSectionContent = stats.notFound.static.size && (0, _renderer.renderReportSection)({
        type: 'error',
        count: stats.notFound.static.size,
        title: 'Statics',
        description: 'static keys',
        content: [].concat(_toConsumableArray(stats.notFound.static)).map(function (key) {
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notFoundDynamicsSectionContent = stats.notFound.dynamic.size && (0, _renderer.renderReportSection)({
        type: 'error',
        count: stats.notFound.dynamic.size,
        title: 'Dynamics',
        description: 'dynamic keys',
        content: [].concat(_toConsumableArray(stats.notFound.dynamic)).map(function (key) {
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notFoundSectionContent = (notFoundStaticsSectionContent || notFoundDynamicsSectionContent) && (0, _renderer.renderReportSection)({
        type: 'error',
        count: stats.notFound.static.size + stats.notFound.dynamic.size,
        title: 'Not Found',
        description: 'localization keys which were not found',
        content: [notFoundStaticsSectionContent, notFoundDynamicsSectionContent].filter(Boolean).join('')
    });
    var missedInDefaultSectionContent = stats.missedInDefault.static.size && (0, _renderer.renderReportSection)({
        type: 'error',
        count: stats.missedInDefault.static.size,
        title: 'Missed in default build ("' + (0, _config.property)('defaultBuild') + '")',
        description: 'localization keys which are present in custom ("' + (0, _config.property)('customBuild') + '") build, but are absent in default one ("' + (0, _config.property)('defaultBuild') + '")',
        content: [].concat(_toConsumableArray(stats.missedInDefault.static)).map(function (key) {
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notUsedStaticsSectionContent = stats.notUsed.static.size && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.notUsed.static.size,
        title: 'Statics',
        description: 'static keys',
        content: [].concat(_toConsumableArray(stats.notUsed.static)).map(function (key) {
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notUsedDynamicsSectionContent = stats.notUsed.dynamic.size && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.notUsed.dynamic.size,
        title: 'Dynamics',
        description: 'dynamic keys',
        content: [].concat(_toConsumableArray(stats.notUsed.dynamic)).map(function (key) {
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notUsedSectionContent = (notUsedStaticsSectionContent || notUsedDynamicsSectionContent) && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.notUsed.static.size + stats.notUsed.dynamic.size,
        title: 'Not Used',
        description: 'localization keys which were not used',
        content: [notUsedStaticsSectionContent, notUsedDynamicsSectionContent].filter(Boolean).join('')
    });
    var missedInCustomSectionContent = stats.missedInCustom.static.size && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.missedInCustom.static.size,
        title: 'Missed in custom build ("' + (0, _config.property)('customBuild') + '")',
        description: 'localization keys which are present in default ("' + (0, _config.property)('defaultBuild') + '") build, but are absent in custom one ("' + (0, _config.property)('customBuild') + '")',
        content: [].concat(_toConsumableArray(stats.missedInCustom.static)).map(function (key) {
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var fallbackSectionContent = stats.fallback.static.size && (0, _renderer.renderReportSection)({
        type: 'info',
        count: stats.fallback.static.size,
        title: 'Fallback',
        description: 'localization keys which were not found for current ("' + (0, _config.property)('customBuild') + '") build, so fallback values were applied',
        content: [].concat(_toConsumableArray(stats.fallback.static)).map(function (_ref9) {
            var key = _ref9.key;
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var replacementsSectionContent = Object.values(stats.replacements).reduce(function (sum, value) {
        return sum + value.length;
    }, 0) && (0, _renderer.renderReportSection)({
        type: 'log',
        count: Object.values(stats.replacements).reduce(function (sum, value) {
            return sum + value.length;
        }, 0),
        title: 'Replacements',
        description: 'applied replacements',
        content: Object.entries(stats.replacements).map(function (_ref10) {
            var _ref11 = _slicedToArray(_ref10, 2),
                key = _ref11[0],
                values = _ref11[1];

            return values.length && (0, _renderer.renderReportSection)({
                type: 'log',
                count: values.length,
                title: key,
                content: values.map(function (_ref12) {
                    var match = _ref12.match,
                        result = _ref12.result;

                    return (0, _renderer.renderReportLine)({
                        content: '' + (0, _renderer.renderReportCell)(match) + (0, _renderer.renderReportCell)(result)
                    });
                }).join('')
            });
        }).filter(Boolean).join('')
    });

    return (0, _renderer.renderReportBody)({
        content: [notFoundSectionContent, missedInDefaultSectionContent, notUsedSectionContent, missedInCustomSectionContent, fallbackSectionContent, replacementsSectionContent].filter(Boolean).join('')
    });
}

function writeFileSync(filePath, fileData) {
    return _fs2.default.writeFileSync(filePath, fileData, 'utf-8');
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.finalize = exports.initialize = exports.getDynamicValue = exports.getStaticValue = exports.transformSource = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = __webpack_require__(2);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

var _glob = __webpack_require__(5);

var _glob2 = _interopRequireDefault(_glob);

var _reporter = __webpack_require__(3);

var _config = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var statics = {};
var dynamics = {};

exports.transformSource = transformSource;
exports.getStaticValue = getStaticValue;
exports.getDynamicValue = getDynamicValue;
exports.initialize = initialize;
exports.finalize = finalize;


function transformSource(source, rules) {
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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderReportSection = exports.renderReportCell = exports.renderReportLine = exports.renderReportBody = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templates = __webpack_require__(7);

/**
 * Escape mapping
 *
 * some localized texts are true html code, so to have possibility add it to report as it is, we have to escape some html-specific chars
 */
var ESCAPE_MAPPING = {
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

/**
 * Unique id generator
 */
var generateUniqueId = function () {
    var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();

    return $new;

    function $new() {
        var id = '_' + Math.random().toString(36).slice(2, 12).toUpperCase();

        if (cache.has(id)) {
            return $new();
        }

        cache.add(id);

        return id;
    }
}();

exports.renderReportBody = renderReportBody;
exports.renderReportLine = renderReportLine;
exports.renderReportCell = renderReportCell;
exports.renderReportSection = renderReportSection;

/**
 * Renders report body
 *
 * @param {Object} params
 * @param {string} params.content
 * @return {string}
 */

function renderReportBody(params) {
    return renderHtml(_templates.bodyTemplate, params);
}

/**
 * Renders report line
 *
 * @param {Object} params
 * @param {string} params.content
 * @return {string}
 */
function renderReportLine(params) {
    return renderHtml(_templates.lineTemplate, params);
}

/**
 * Renders report cell
 *
 * @param {string} content
 * @return {string}
 */
function renderReportCell(content) {
    return renderHtml(_templates.divTemplate, { content: escapeCode(content) });
}

/**
 * Renders report section
 *
 * @param {Object} params
 * @param {string} params.type - (error|warn|info|log) defines background color of section
 * @param {string} params.count - number of lines in section
 * @param {string} params.title
 * @param {string} [params.description]
 * @param {string} params.content
 * @return {string}
 */
function renderReportSection(params) {
    var id = generateUniqueId();
    var additionalParams = {
        id: id,
        onclick: 'document.querySelector(\'#' + id + '\').classList.toggle(\'section--expanded\') || document.querySelectorAll(\'#' + id + ' .section--expanded\').forEach(({classList}) => classList.remove(\'section--expanded\'))'
    };

    if (!params.description) {
        // Get part of title enclosed to inline comment tags: "some title /* some description */"
        var _params$title$match = params.title.match(/\s*\/\*\s+([\s\S]*)\s+\*\//),
            _params$title$match2 = _slicedToArray(_params$title$match, 2),
            fullMatch = _params$title$match2[0],
            descriptionMatch = _params$title$match2[1];

        additionalParams.title = params.title.replace(fullMatch, '');
        additionalParams.description = descriptionMatch.trim();
    }

    var extendedParams = Object.assign({}, params, additionalParams);

    return renderHtml(_templates.sectionTemplate, extendedParams);
}

/**
 * Renders html, based on provided template and parameters
 *
 * @param {string} template
 * @param {Object} params
 * @return {string}
 */
function renderHtml(template, params) {
    return template.replace(/\{(\w+)}/g, function (match, key) {
        return params[key];
    });
}

/**
 * @param {string} source
 * @return {string}
 */
function escapeCode(source) {
    return source.replace(/["&<>]/g, function (char) {
        return ESCAPE_MAPPING[char];
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var bodyTemplate = '\n    <html>\n        <head>\n            <style>' + __webpack_require__(8) + '</style>\n        </head>\n        <body>{content}</body>\n    </html>\n';

var sectionTemplate = '\n    <div id="{id}"\n       class="section layout-column">\n        <div class="section__header {type} layout-row"\n           onclick="{onclick}">\n            <div class="section__header-title-block layout-column">\n                <div class="section__header-title">{title}</div>\n                <div class="section__header-description">{description}</div>\n            </div>\n            <div class="section__header-count-block layout-column">\n                <div class="section__header-count">{count}</div>\n            </div>\n        </div>\n        <div class="section__frame layout-row">\n            <div class="section__indent"\n               onclick="{onclick}"></div>\n            <div class="section__body layout-column {type}">{content}</div>\n        </div>\n    </div>\n';

var lineTemplate = '\n    <div class="section__body-line">{content}</div>\n';

var divTemplate = '\n    <div>{content}</div>\n';

exports.bodyTemplate = bodyTemplate;
exports.sectionTemplate = sectionTemplate;
exports.lineTemplate = lineTemplate;
exports.divTemplate = divTemplate;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  background-color: #ffffff; }\n\n.layout-row {\n  display: flex;\n  flex-direction: row; }\n\n.layout-column {\n  display: flex;\n  flex-direction: column; }\n\n.error {\n  background-color: #fff0f0; }\n\n.warn {\n  background-color: #fffbe6; }\n\n.info {\n  background-color: #f0f0ff; }\n\n.log {\n  background-color: #f0fff0; }\n\n.section .section__header {\n  cursor: pointer;\n  height: 48px;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  box-shadow: 0 1px 1px black; }\n  .section .section__header.error:hover {\n    background-color: #e6d8d8; }\n  .section .section__header.warn:hover {\n    background-color: #e6e2cf; }\n  .section .section__header.info:hover {\n    background-color: #d8d8e6; }\n  .section .section__header.log:hover {\n    background-color: #d8e6d8; }\n  .section .section__header .section__header-title-block {\n    flex: 1; }\n    .section .section__header .section__header-title-block .section__header-title {\n      height: 24px;\n      line-height: 24px;\n      font-weight: bold;\n      padding-left: 4px; }\n    .section .section__header .section__header-title-block .section__header-description {\n      height: 24px;\n      line-height: 24px;\n      font-style: italic;\n      padding-left: 12px; }\n  .section .section__header .section__header-count-block {\n    width: 48px;\n    align-self: center; }\n    .section .section__header .section__header-count-block .section__header-count {\n      align-self: center;\n      font-weight: bold; }\n\n.section .section__frame {\n  min-height: 48px; }\n  .section .section__frame .section__indent {\n    width: 48px;\n    cursor: pointer; }\n    .section .section__frame .section__indent:hover {\n      background-color: #e6e6e6; }\n  .section .section__frame .section__body {\n    flex: 1; }\n    .section .section__frame .section__body .section__body-line {\n      font-family: monospace;\n      margin: 12px 48px 0 0; }\n      .section .section__frame .section__body .section__body-line:last-child {\n        margin-bottom: 12px; }\n      .section .section__frame .section__body .section__body-line > * {\n        white-space: pre-wrap;\n        padding: 4px; }\n        .section .section__frame .section__body .section__body-line > *:nth-child(odd) {\n          background-color: #ffa4a4;\n          padding-bottom: 12px; }\n        .section .section__frame .section__body .section__body-line > *:nth-child(even) {\n          background-color: #a4ffa4;\n          padding-top: 12px; }\n\n.section .section .section__header {\n  top: 48px;\n  z-index: 1; }\n\n.section:not(.section--expanded) > .section__frame {\n  display: none; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _reporter = __webpack_require__(3);

var _helper = __webpack_require__(4);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {

    /* This preset is used for "/\.html$/" rule only*/
    html: [

    /**
     * "static" localizations, located in folder {PROJECT_ROOT}/i18n/{BUILD_NAME}/{LANGUAGE}/
     *
     * input example: ${{i18n-dict.I18N_KEY}}$
     * output example: some localized text
     */
    function () {
        var type = 'static, server-side localization /* ${{i18n-dict.I18N_KEY}}$ */';
        var pattern = /\${{([\w.-]+)}}\$/g;
        var handler = function handler(match, key) {
            return genericHandler(type, match, (0, _helper.getStaticValue)(key));
        };

        return [pattern, handler];
    }(),

    /**
     * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
     *
     * usage case: interpolated translation filter
     *
     * input example: {{'some text' | translate}}
     * output example: some localized text
     */
    function () {
        var type = 'dynamic, interpolation, filter translation /* {{\'some text\' | translate}} */';
        var pattern = /\{\{\s*(?:::)*\s*(['"])([\w\s/()-]+)\1\s*\|\s*translate\s*}}/g;
        var handler = function handler(match, quote, key) {
            return genericHandler(type, match, (0, _helper.getDynamicValue)(key));
        };

        return [pattern, handler];
    }(),

    /**
     * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
     *
     * usage case: one-time binded (optionally) expression with translation filter
     *
     * input example: ::('some text' | translate)
     * output example: ::'some localized text'
     */
    function () {
        var type = 'dynamic, probably one-time binded, expression, filter translation /* ::(\'some text\' | translate) */';
        var pattern = /(::)?\s*\(\s*(['"])([\w\s/()-]+)\2\s*\|\s*translate\s*\)/g;
        var handler = function handler(match) {
            var oneTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var quote = arguments[2];
            var key = arguments[3];
            return genericHandler(type, match, '' + oneTime + quote + (0, _helper.getDynamicValue)(key) + quote);
        };

        return [pattern, handler];
    }(),

    /**
     * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
     *
     * usage case: one-time binded (optionally) expression with translation filter defined as "ng-bind" value
     *
     * input example: ng-bind="::'some text' | translate"
     * output example: ng-bind="::'some localized text'"
     */
    function () {
        var type = 'dynamic, ng-bind, probably one-time binded, expression, filter translation /* ng-bind="::\'some text\' | translate" */';
        var pattern = /ng-bind="(::)?'([\w\s/()-]+)'\s*\|\s*translate"/g;
        var handler = function handler(match) {
            var oneTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var key = arguments[2];
            return genericHandler(type, match, 'ng-bind="' + oneTime + '\'' + (0, _helper.getDynamicValue)(key) + '\'"');
        };

        return [pattern, handler];
    }()],

    /* This preset is used for "/\.js$/" rule only*/
    js: [

    /**
     * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
     *
     * usage case: asynchronous, promisable localization; via $translate service; with defined callbacks for successful and failed results
     *
     * input example: $translate('some text').then(handler, handler);
     * output example: handler('some localized text');
     */
    function () {
        var type = 'dynamic, asynchronous, service translation /* $translate("some text").then(handler, handler); */';
        var pattern = /\$translate\((['"])([\w\s'-]+)\1\)\s*\.then\(([\w.]+),\s*\3\);/g;
        var handler = function handler(match, quote, key, callback) {
            return genericHandler(type, match, callback + '(\'' + (0, _helper.getDynamicValue)(key) + '\');');
        };

        return [pattern, handler];
    }(),

    /**
     * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
     *
     * usage case: synchronous localization; via $translate service
     *
     * input example: $translate.instant('some text')
     * output example: 'some localized text'
     */
    function () {
        var type = 'dynamic, synchronous, service translation /* $translate.instant("some text") */';
        var pattern = /\$translate\.instant\((['"])([\w\s-]+)\1\)/g;
        var handler = function handler(match, quote, key) {
            return genericHandler(type, match, '\'' + (0, _helper.getDynamicValue)(key) + '\'');
        };

        return [pattern, handler];
    }(),

    /**
     * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
     *
     * usage case: asynchronous, promisable, parametric localization; via $translate service; with defined callbacks for successful and failed results
     *
     * input example: $translate('some parametric text', {
     *                  param: some.value
     *                }).then(handler, handler);
     * output example: handler(((param) => `some localized ${param}etric text`)(some.value));
     */
    function () {
        var type = 'dynamic, asynchronous, parametric, service translation /* $translate("some parametric text", {\n  param: some.value\n}).then(handler, handler); */';
        var pattern = /\$translate\(\s*(['"])([\w\s-]+)\1,\s*(\{\s*[\w\s\[\]$.,:]+})\s*\)\s*\.then\(([\w.]+),\s*\4\);/g;
        var handler = function handler(match, quote, key, locals, callback) {
            var _locals$match$reduce = locals.match(/\s*[\w]+:\s*[\w\[\]$.]+,?\s*/g).reduce(function (_ref, instance) {
                var _ref2 = _slicedToArray(_ref, 2),
                    _ref2$ = _ref2[0],
                    hasDiffs = _ref2$ === undefined ? false : _ref2$,
                    _ref2$2 = _ref2[1],
                    mapping = _ref2$2 === undefined ? {} : _ref2$2;

                var _instance$match = instance.match(/\s*([\w]+):\s*([\w\[\]$.]+),?\s*/),
                    _instance$match2 = _slicedToArray(_instance$match, 3),
                    key = _instance$match2[1],
                    value = _instance$match2[2];

                if (key !== value) {
                    Object.assign(mapping, _defineProperty({}, key, value));
                }

                return [hasDiffs || key !== value, mapping];
            }, []),
                _locals$match$reduce2 = _slicedToArray(_locals$match$reduce, 2),
                localsHasDiffs = _locals$match$reduce2[0],
                localsMapping = _locals$match$reduce2[1];

            var mappingExpression = localsHasDiffs ? getIIFEExpression(key, localsMapping) : getStringExpression(key);
            var result = callback + '(' + mappingExpression + ');';

            return genericHandler(type, match, result);
        };

        return [pattern, handler];

        function getStringExpression(key) {
            return '`' + (0, _helper.getDynamicValue)(key).replace(/\{\{\s*([^{}]+)\s*}}/g, '${$1}') + '`';
        }

        function getIIFEExpression(key, locals) {
            return '((' + Object.keys(locals).join(', ') + ') => ' + getStringExpression(key) + ')(' + Object.values(locals).join(', ') + ')';
        }
    }(),

    /**
     * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
     *
     * usage case: asynchronous, promisable localization; via $translate service; with defined anonymous callback for successful results
     *
     * input example: $translate('some text').then(function (translation) {
     *                  $scope.translation = translation;
     *                });
     * output example: (function (translation) {
     *                   $scope.translation = translation;
     *                 })('some localized text');
     */
    function () {
        var type = 'dynamic, asynchronous, anonymous callback, service translation /* $translate("some text").then(function (translation) {\n  $scope.translation = translation;\n}); */';
        var pattern = /\$translate\((['"])([\w\s'-]+)\1\)\s*\.then\(([\w\s(){}=;$.]+?)\);/g;
        var handler = function handler(match, quote, key, callback) {
            return genericHandler(type, match, '(' + callback + ')(\'' + (0, _helper.getDynamicValue)(key) + '\');');
        };

        return [pattern, handler];
    }()]
};


function genericHandler(type, match, result) {
    (0, _reporter.addReplacementIssue)({ type: type, match: match, result: result });

    return result;
}

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.raw = exports.default = undefined;

var _loaderUtils = __webpack_require__(16);

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _helper = __webpack_require__(4);

var _presets = __webpack_require__(10);

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

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("loader-utils");

/***/ })
/******/ ])["default"];