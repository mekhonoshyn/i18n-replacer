import fs from 'fs';
import path from 'path';
import glob from 'glob';
import {
    addFallbackStaticIssue,
    addNotUsedStaticIssue,
    addNotUsedDynamicIssue,
    addNotFoundStaticIssue,
    addNotFoundDynamicIssue,
    addMissedInDefaultIssue,
    addMissedInCustomIssue
} from './reporter';
import predefinedPresets from './presets';
import {property as configProperty} from './config';
import {addReplacementIssue} from './reporter';

const statics = {};
const dynamics = {};

export {
    transformSource,

    genericHandler,

    getStaticValue,
    getDynamicValue,

    initialize,
    finalize
};

function transformSource(source, preset) {
    const rules = Object.assign({}, predefinedPresets, configProperty('customPresets'))[preset];

    return rules.reduce((accumulator, rule) => accumulator.replace(...rule), source);
}

function getStaticValue(key) {
    const entry = getStaticEntry(key);

    entry.requested = true;

    if (entry.fallback) {
        addFallbackStaticIssue({key});

        return entry.value;
    }

    if (typeof entry.value === 'undefined') {
        addNotFoundStaticIssue({key});
    }

    return typeof entry.value === 'undefined' ? key : entry.value;
}

function getDynamicValue(key) {
    const entry = getDynamicEntry(key);

    entry.requested = true;

    if (typeof entry.value === 'undefined') {
        addNotFoundDynamicIssue({key});
    }

    return typeof entry.value === 'undefined' ? key : entry.value;
}

function initialize() {
    initializeStatics();
    initializeDynamics();
}

function finalize() {
    Object.entries(statics).filter(([, {requested}]) => !requested).forEach(([key]) => addNotUsedStaticIssue({key}));
    Object.entries(dynamics).filter(([, {requested}]) => !requested).forEach(([key]) => addNotUsedDynamicIssue({key}));
}

function initializeStatics() {
    const builds = [...new Set([configProperty('defaultBuild'), configProperty('customBuild')])];
    const staticsPath = configProperty('staticsPath');
    const staticsFiles = builds.reduce((accumulator, buildName) => Object.assign(accumulator, {[buildName]: glob.sync(staticsPath.replace(/\{build}/, buildName), {absolute: true})}), {});
    const staticsEntries = {};

    builds.forEach((buildName) => {
        const buildEntries = staticsEntries[buildName] = {};

        staticsFiles[buildName]
            .forEach((filePath) => {
                const fileData = readFileSync(filePath);
                const jsonData = JSON.parse(fileData);
                const shortName = path.parse(filePath).name;

                Object.entries(jsonData)
                    .forEach(([key, value]) => {
                        buildEntries[`${shortName}.${key}`] = value;
                    });
            });
    });

    /* Validate keys presence */
    if (configProperty('customBuild') !== configProperty('defaultBuild')) {
        Object.keys(staticsEntries[configProperty('defaultBuild')])
            .filter((key) => !staticsEntries[configProperty('customBuild')][key])
            .forEach((key) => addMissedInCustomIssue({key}));

        Object.keys(staticsEntries[configProperty('customBuild')])
            .filter((key) => !staticsEntries[configProperty('defaultBuild')][key])
            .forEach((key) => addMissedInDefaultIssue({key}));
    }

    builds.forEach((buildName) => {
        const buildEntries = staticsEntries[buildName];

        Object.entries(buildEntries).forEach(([key, value]) => {
            setStaticValue(buildName, key, value);
        });
    });
}

function initializeDynamics() {
    const dynamicsPath = configProperty('dynamicsPath');
    const dynamicsFiles = glob.sync(dynamicsPath, {absolute: true});
    const dynamicsEntries = {};

    dynamicsFiles
        .forEach((filePath) => {
            const fileData = readFileSync(filePath);
            const jsonData = JSON.parse(fileData);

            Object.entries(jsonData)
                .forEach(([key, value]) => {
                    dynamicsEntries[key] = value;
                });
        });

    Object.entries(dynamicsEntries).forEach(([key, value]) => {
        setDynamicValue(key, value);
    });
}

function getStaticEntry(key) {
    return statics[key] || (statics[key] = {defined: false, fallback: false, requested: false});
}

function setStaticValue(build, key, value) {
    const entry = getStaticEntry(key);

    entry.defined = true;
    entry.value = value;
    entry.fallback = configProperty('customBuild') !== configProperty('defaultBuild') && build === configProperty('defaultBuild');
}

function getDynamicEntry(key) {
    return dynamics[key] || (dynamics[key] = {defined: false, fallback: false, requested: false});
}

function setDynamicValue(key, value) {
    const entry = getDynamicEntry(key);

    entry.defined = true;
    entry.value = value;
}

function readFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

function genericHandler(type, match, result) {
    addReplacementIssue({type, match, result});

    return result;
}
