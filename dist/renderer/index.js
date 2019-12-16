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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderReportSection = exports.renderReportCell = exports.renderReportLine = exports.renderReportBody = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templates = __webpack_require__(1);

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var bodyTemplate = '\n    <html>\n        <head>\n            <style>' + __webpack_require__(2) + '</style>\n        </head>\n        <body>{content}</body>\n    </html>\n';

var sectionTemplate = '\n    <div id="{id}"\n       class="section layout-column">\n        <div class="section__header {type} layout-row"\n           onclick="{onclick}">\n            <div class="section__header-title-block layout-column">\n                <div class="section__header-title">{title}</div>\n                <div class="section__header-description">{description}</div>\n            </div>\n            <div class="section__header-count-block layout-column">\n                <div class="section__header-count">{count}</div>\n            </div>\n        </div>\n        <div class="section__frame layout-row">\n            <div class="section__indent"\n               onclick="{onclick}"></div>\n            <div class="section__body layout-column {type}">{content}</div>\n        </div>\n    </div>\n';

var lineTemplate = '\n    <div class="section__body-line">{content}</div>\n';

var divTemplate = '\n    <div>{content}</div>\n';

exports.bodyTemplate = bodyTemplate;
exports.sectionTemplate = sectionTemplate;
exports.lineTemplate = lineTemplate;
exports.divTemplate = divTemplate;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Missing binding /media/sergii_mekhonoshyn/DATA/PETS/i18n-replacer/node_modules/node-sass/vendor/linux-x64-48/binding.node\nNode Sass could not find a binding for your current environment: Linux 64-bit with Node.js 6.x\n\nFound bindings for the following environments:\n  - Linux 64-bit with Node.js 8.x\n\nThis usually happens because your environment has changed since running `npm install`.\nRun `npm rebuild node-sass --force` to build the binding for your current environment.\n    at module.exports (/media/sergii_mekhonoshyn/DATA/PETS/i18n-replacer/node_modules/node-sass/lib/binding.js:15:13)\n    at Object.<anonymous> (/media/sergii_mekhonoshyn/DATA/PETS/i18n-replacer/node_modules/node-sass/lib/index.js:14:35)\n    at Module._compile (module.js:541:32)\n    at Module._extensions..js (module.js:550:10)\n    at Object.require.extensions.(anonymous function) [as .js] (/media/sergii_mekhonoshyn/DATA/PETS/i18n-replacer/node_modules/babel-register/lib/node.js:152:7)\n    at Module.load (module.js:456:32)\n    at tryModuleLoad (module.js:415:12)\n    at Function.Module._load (module.js:407:3)\n    at Module.require (module.js:466:17)\n    at require (internal/module.js:20:19)");

/***/ })
/******/ ]);