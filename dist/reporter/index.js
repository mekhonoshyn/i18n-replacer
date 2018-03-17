'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.finalize = exports.initialize = exports.addMissedInCustomIssue = exports.addMissedInDefaultIssue = exports.addNotFoundDynamicIssue = exports.addNotFoundStaticIssue = exports.addNotUsedDynamicIssue = exports.addNotUsedStaticIssue = exports.addFallbackStaticIssue = exports.addReplacementIssue = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _renderer = require('../renderer');

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
        content: [].concat(_toConsumableArray(stats.notFound.static)).map(function (_ref9) {
            var key = _ref9.key;
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notFoundDynamicsSectionContent = stats.notFound.dynamic.size && (0, _renderer.renderReportSection)({
        type: 'error',
        count: stats.notFound.dynamic.size,
        title: 'Dynamics',
        description: 'dynamic keys',
        content: [].concat(_toConsumableArray(stats.notFound.dynamic)).map(function (_ref10) {
            var key = _ref10.key;
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notFoundSectionContent = (notFoundStaticsSectionContent || notFoundDynamicsSectionContent) && (0, _renderer.renderReportSection)({
        type: 'error',
        count: stats.notFound.static.size + stats.notFound.dynamic.size,
        title: 'Not Found',
        description: 'localization keys which were not found (may repeat)',
        content: [notFoundStaticsSectionContent, notFoundDynamicsSectionContent].filter(Boolean).join('')
    });
    var missedInDefaultSectionContent = stats.missedInDefault.static.size && (0, _renderer.renderReportSection)({
        type: 'error',
        count: stats.missedInDefault.static.size,
        title: 'Missed in default build ("' + (0, _config.property)('defaultBuild') + '")',
        description: 'localization keys which are present in custom ("' + (0, _config.property)('customBuild') + '") build, but are absent in default one ("' + (0, _config.property)('defaultBuild') + '")',
        content: [].concat(_toConsumableArray(stats.missedInDefault.static)).map(function (_ref11) {
            var key = _ref11.key;
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notUsedStaticsSectionContent = stats.notUsed.static.size && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.notUsed.static.size,
        title: 'Statics',
        description: 'static keys',
        content: [].concat(_toConsumableArray(stats.notUsed.static)).map(function (_ref12) {
            var key = _ref12.key;
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notUsedDynamicsSectionContent = stats.notUsed.dynamic.size && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.notUsed.dynamic.size,
        title: 'Dynamics',
        description: 'dynamic keys',
        content: [].concat(_toConsumableArray(stats.notUsed.dynamic)).map(function (_ref13) {
            var key = _ref13.key;
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var notUsedSectionContent = (notUsedStaticsSectionContent || notUsedDynamicsSectionContent) && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.notUsed.static.size + stats.notUsed.dynamic.size,
        title: 'Not Used',
        description: 'localization keys which were not used (may repeat)',
        content: [notUsedStaticsSectionContent, notUsedDynamicsSectionContent].filter(Boolean).join('')
    });
    var missedInCustomSectionContent = stats.missedInCustom.static.size && (0, _renderer.renderReportSection)({
        type: 'warn',
        count: stats.missedInCustom.static.size,
        title: 'Missed in custom build ("' + (0, _config.property)('customBuild') + '")',
        description: 'localization keys which are present in default ("' + (0, _config.property)('defaultBuild') + '") build, but are absent in custom one ("' + (0, _config.property)('customBuild') + '")',
        content: [].concat(_toConsumableArray(stats.missedInCustom.static)).map(function (_ref14) {
            var key = _ref14.key;
            return (0, _renderer.renderReportLine)({ content: key });
        }).join('')
    });
    var fallbackSectionContent = stats.fallback.static.size && (0, _renderer.renderReportSection)({
        type: 'info',
        count: stats.fallback.static.size,
        title: 'Fallback',
        description: 'localization keys which were not found for current ("' + (0, _config.property)('customBuild') + '") build, so fallback values were applied',
        content: [].concat(_toConsumableArray(stats.fallback.static)).map(function (_ref15) {
            var key = _ref15.key;
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
        description: 'applied replacements (may repeat)',
        content: Object.entries(stats.replacements).map(function (_ref16) {
            var _ref17 = _slicedToArray(_ref16, 2),
                key = _ref17[0],
                values = _ref17[1];

            return values.length && (0, _renderer.renderReportSection)({
                type: 'log',
                count: values.length,
                title: key,
                content: values.map(function (_ref18) {
                    var match = _ref18.match,
                        result = _ref18.result;

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