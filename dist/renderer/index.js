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
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "* {\n  box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  background-color: #ffffff; }\n\n.layout-row {\n  display: flex;\n  flex-direction: row; }\n\n.layout-column {\n  display: flex;\n  flex-direction: column; }\n\n.error {\n  background-color: #fff0f0; }\n\n.warn {\n  background-color: #fffbe6; }\n\n.info {\n  background-color: #f0f0ff; }\n\n.log {\n  background-color: #f0fff0; }\n\n.section .section__header {\n  cursor: pointer;\n  height: 48px;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  box-shadow: 0 1px 1px black; }\n  .section .section__header.error:hover {\n    background-color: #e6d8d8; }\n  .section .section__header.warn:hover {\n    background-color: #e6e2cf; }\n  .section .section__header.info:hover {\n    background-color: #d8d8e6; }\n  .section .section__header.log:hover {\n    background-color: #d8e6d8; }\n  .section .section__header .section__header-title-block {\n    flex: 1; }\n    .section .section__header .section__header-title-block .section__header-title {\n      height: 24px;\n      line-height: 24px;\n      font-weight: bold;\n      padding-left: 4px; }\n    .section .section__header .section__header-title-block .section__header-description {\n      height: 24px;\n      line-height: 24px;\n      font-style: italic;\n      padding-left: 12px; }\n  .section .section__header .section__header-count-block {\n    width: 48px;\n    align-self: center; }\n    .section .section__header .section__header-count-block .section__header-count {\n      align-self: center;\n      font-weight: bold; }\n\n.section .section__frame {\n  min-height: 48px; }\n  .section .section__frame .section__indent {\n    width: 48px;\n    cursor: pointer; }\n    .section .section__frame .section__indent:hover {\n      background-color: #e6e6e6; }\n  .section .section__frame .section__body {\n    flex: 1; }\n    .section .section__frame .section__body .section__body-line {\n      font-family: monospace;\n      margin: 12px 48px 0 0; }\n      .section .section__frame .section__body .section__body-line:last-child {\n        margin-bottom: 12px; }\n      .section .section__frame .section__body .section__body-line > * {\n        white-space: pre-wrap;\n        padding: 4px; }\n        .section .section__frame .section__body .section__body-line > *:nth-child(odd) {\n          background-color: #ffa4a4;\n          padding-bottom: 12px; }\n        .section .section__frame .section__body .section__body-line > *:nth-child(even) {\n          background-color: #a4ffa4;\n          padding-top: 12px; }\n\n.section .section .section__header {\n  top: 48px;\n  z-index: 1; }\n\n.section:not(.section--expanded) > .section__frame {\n  display: none; }\n", ""]);

// exports


/***/ }),
/* 3 */
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


/***/ })
/******/ ]);