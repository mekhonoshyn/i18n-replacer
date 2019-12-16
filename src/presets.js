import {addReplacementIssue} from './reporter';
import {
    getStaticValue,
    getDynamicValue
} from './helper';
import {property as configProperty} from './config';

const presets = {
    /* This preset is used for "/\.json$/" rule only*/
    json: [

        /**
         * "static" localizations, located in folder {PROJECT_ROOT}/i18n/{BUILD_NAME}/{LANGUAGE}/
         *
         * input example: ${{i18n-dict.I18N_KEY}}$
         * output example: some localized text
         */
        (() => {
            const type = 'static, server-side localization /* ${{i18n-dict.I18N_KEY}}$ */';
            const pattern = /\${{([\w.-]+)}}\$/g;
            const handler = (match, key) => genericHandler(type, match, getStaticValue(key));

            return [pattern, handler];
        })()
    ],

    /* This preset is used for "/\.html$/" rule only*/
    html: [

        /**
         * "static" localizations, located in folder {PROJECT_ROOT}/i18n/{BUILD_NAME}/{LANGUAGE}/
         *
         * input example: ${{i18n-dict.I18N_KEY}}$
         * output example: some localized text
         */
        (() => {
            const type = 'static, server-side localization /* ${{i18n-dict.I18N_KEY}}$ */';
            const pattern = /\${{([\w.-]+)}}\$/g;
            const handler = (match, key) => genericHandler(type, match, getStaticValue(key));

            return [pattern, handler];
        })(),

        /**
         * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
         *
         * usage case: interpolated translation filter
         *
         * input example: {{'some text' | translate}}
         * output example: some localized text
         */
        (() => {
            const type = 'dynamic, interpolation, filter translation /* {{\'some text\' | translate}} */';
            const pattern = /\{\{\s*(?:::)*\s*(['"])([\w\s/()-]+)\1\s*\|\s*translate\s*}}/g;
            const handler = (match, quote, key) => genericHandler(type, match, getDynamicValue(key));

            return [pattern, handler];
        })(),

        /**
         * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
         *
         * usage case: one-time binded (optionally) expression with translation filter
         *
         * input example: ::('some text' | translate)
         * output example: ::'some localized text'
         */
        (() => {
            const type = 'dynamic, probably one-time binded, expression, filter translation /* ::(\'some text\' | translate) */';
            const pattern = /(::)?\s*\(\s*(['"])([\w\s/()-]+)\2\s*\|\s*translate\s*\)/g;
            const handler = (match, oneTime = '', quote, key) => genericHandler(type, match, `${oneTime}${quote}${getDynamicValue(key)}${quote}`);

            return [pattern, handler];
        })(),

        /**
         * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
         *
         * usage case: one-time binded (optionally) expression with translation filter defined as "ng-bind" value
         *
         * input example: ng-bind="::'some text' | translate"
         * output example: ng-bind="::'some localized text'"
         */
        (() => {
            const type = 'dynamic, ng-bind, probably one-time binded, expression, filter translation /* ng-bind="::\'some text\' | translate" */';
            const pattern = /ng-bind="(::)?'([\w\s/()-]+)'\s*\|\s*translate"/g;
            const handler = (match, oneTime = '', key) => genericHandler(type, match, `ng-bind="${oneTime}'${getDynamicValue(key)}'"`);

            return [pattern, handler];
        })()
    ],

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
        (() => {
            const type = 'dynamic, asynchronous, service translation /* $translate("some text").then(handler, handler); */';
            const pattern = /\$translate\((['"])([\w\s'-]+)\1\)\s*\.then\(([\w.]+),\s*\3\);/g;
            const handler = (match, quote, key, callback) => genericHandler(type, match, `${callback}('${getDynamicValue(key)}');`);

            return [pattern, handler];
        })(),

        /**
         * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
         *
         * usage case: synchronous localization; via $translate service
         *
         * input example: $translate.instant('some text')
         * output example: 'some localized text'
         */
        (() => {
            const type = 'dynamic, synchronous, service translation /* $translate.instant("some text") */';
            const pattern = /\$translate\.instant\((['"])([\w\s-]+)\1\)/g;
            const handler = (match, quote, key) => genericHandler(type, match, `'${getDynamicValue(key)}'`);

            return [pattern, handler];
        })(),

        /**
         * "dynamic" localizations, located in folder {PROJECT_ROOT}/src/translate/**
         *
         * usage case: synchronous, parametric localization; via $translate service
         *
         * input example: $translate.instant('some text', inputObject)
         * output example: `some localized ${inputObject.param}etric text`
         */
        (() => {
            const type = `dynamic, synchronous, parametric, service translation /* $translate.instant('some text', inputObject) */`;
            const pattern = /\$translate\.instant\((['"])([\w\s?.-]+)\1,\s*([\w\[\].]+)\s*\)/g;
            const handler = (match, quote, key, iifeInput) => {
                const expression = `\`${getDynamicValue(key).replace(/\{\{\s*([^{}]+)\s*}}/g, `\${${iifeInput}.$1}`)}\``;

                return genericHandler(type, match, expression);
            };

            return [pattern, handler];
        })(),

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
        (() => {
            const type = 'dynamic, asynchronous, parametric, service translation /* $translate("some parametric text", {\n  param: some.value\n}).then(handler, handler); */';
            const pattern = /\$translate\(\s*(['"])([\w\s-]+)\1,\s*(\{\s*[\w\s\[\]$.,:]+})\s*\)\s*\.then\(([\w.]+),\s*\4\);/g;
            const handler = (match, quote, key, locals, callback) => {
                const [localsHasDiffs, localsMapping] = locals.match(/\s*[\w]+:\s*[\w\[\]$.]+,?\s*/g)
                    .reduce(([hasDiffs = false, mapping = {}], instance) => {
                        const [, key, value] = instance.match(/\s*([\w]+):\s*([\w\[\]$.]+),?\s*/);

                        if (key !== value) {
                            Object.assign(mapping, {[key]: value});
                        }

                        return [hasDiffs || key !== value, mapping];
                    }, []);
                const mappingExpression = localsHasDiffs
                    ? getIIFEExpression(key, localsMapping)
                    : getStringExpression(key);
                const result = `${callback}(${mappingExpression});`;

                return genericHandler(type, match, result);
            };

            return [pattern, handler];

            function getStringExpression(key) {
                return `\`${getDynamicValue(key).replace(/\{\{\s*([^{}]+)\s*}}/g, '${$1}')}\``;
            }

            function getIIFEExpression(key, locals) {
                return `((${Object.keys(locals).join(', ')}) => ${getStringExpression(key)})(${Object.values(locals).join(', ')})`;
            }
        })(),

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
        (() => {
            const type = 'dynamic, asynchronous, anonymous callback, service translation /* $translate("some text").then(function (translation) {\n  $scope.translation = translation;\n}); */';
            const pattern = /\$translate\((['"])([\w\s'-]+)\1\)\s*\.then\(([\w\s(){}=;$.]+?)\);/g;
            const handler = (match, quote, key, callback) => genericHandler(type, match, `(${callback})('${getDynamicValue(key)}');`);

            return [pattern, handler];
        })()
    ]
};

const customPresets = configProperty('customPresets')({getStaticValue, getDynamicValue, genericHandler});

export default Object.assign({}, presets, customPresets);

function genericHandler(type, match, result) {
    addReplacementIssue({type, match, result});

    return result;
}
