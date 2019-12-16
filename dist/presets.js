'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _reporter = require('./reporter');

var _helper = require('./helper');

var _config = require('./config');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var presets = {
    /* This preset is used for "/\.json$/" rule only*/
    json: [

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
    }()],

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
     * usage case: synchronous, parametric localization; via $translate service
     *
     * input example: $translate.instant('some text', inputObject)
     * output example: `some localized ${inputObject.param}etric text`
     */
    function () {
        var type = 'dynamic, synchronous, parametric, service translation /* $translate.instant(\'some text\', inputObject) */';
        var pattern = /\$translate\.instant\((['"])([\w\s?.-]+)\1,\s*([\w\[\].]+)\s*\)/g;
        var handler = function handler(match, quote, key, iifeInput) {
            var expression = '`' + (0, _helper.getDynamicValue)(key).replace(/\{\{\s*([^{}]+)\s*}}/g, '${' + iifeInput + '.$1}') + '`';

            return genericHandler(type, match, expression);
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

var customPresets = (0, _config.property)('customPresets')({ getStaticValue: _helper.getStaticValue, getDynamicValue: _helper.getDynamicValue, genericHandler: genericHandler });

exports.default = Object.assign({}, presets, customPresets);


function genericHandler(type, match, result) {
    (0, _reporter.addReplacementIssue)({ type: type, match: match, result: result });

    return result;
}