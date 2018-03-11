import fs from 'fs';
import path from 'path';
import {property as configProperty} from '../config';
import {
    renderReportBody,
    renderReportLine,
    renderReportCell,
    renderReportSection
} from '../renderer';

/**
 * Stats object
 *
 * accumulates reported issues
 */
const stats = {
    replacements: {},
    fallback: {static: new Set()},
    notUsed: {static: new Set(), dynamic: new Set()},
    notFound: {static: new Set(), dynamic: new Set()},
    missedInDefault: {static: new Set()},
    missedInCustom: {static: new Set()}
};

export {
    addReplacementIssue,
    addFallbackStaticIssue,
    addNotUsedStaticIssue,
    addNotUsedDynamicIssue,
    addNotFoundStaticIssue,
    addNotFoundDynamicIssue,
    addMissedInDefaultIssue,
    addMissedInCustomIssue,

    initialize,
    finalize
};

function addReplacementIssue({type, match, result}) {
    if (!stats.replacements[type]) {
        stats.replacements[type] = [];
    }

    stats.replacements[type].push({match, result});
}

function addFallbackStaticIssue({key}) {
    stats.fallback.static.add({key});
}

function addNotUsedStaticIssue({key}) {
    stats.notUsed.static.add({key});
}

function addNotUsedDynamicIssue({key}) {
    stats.notUsed.dynamic.add({key});
}

function addNotFoundStaticIssue({key}) {
    stats.notFound.static.add({key});
}

function addNotFoundDynamicIssue({key}) {
    stats.notFound.dynamic.add({key});
}

function addMissedInDefaultIssue({key}) {
    stats.missedInDefault.static.add({key});
}

function addMissedInCustomIssue({key}) {
    stats.missedInCustom.static.add({key});
}

function initialize() {}

function finalize() {
    generateReport();
}

function generateReport() {
    const reportRootDirectory = path.join(process.cwd(), configProperty('reportDirectory'));
    const reportDirectory = path.join(reportRootDirectory, `_${Date.now()}`);
    const reportFile = path.join(reportDirectory, 'i18n.html');

    try {
        fs.mkdirSync(reportRootDirectory);
    } catch (error) {}

    fs.mkdirSync(reportDirectory);

    writeFileSync(reportFile, renderReport());
}

function renderReport() {
    const notFoundStaticsSectionContent = stats.notFound.static.size && renderReportSection({
        type: 'error',
        count: stats.notFound.static.size,
        title: 'Statics',
        description: 'static keys',
        content: [...stats.notFound.static].map((key) => renderReportLine({content: key})).join('')
    });
    const notFoundDynamicsSectionContent = stats.notFound.dynamic.size && renderReportSection({
        type: 'error',
        count: stats.notFound.dynamic.size,
        title: 'Dynamics',
        description: 'dynamic keys',
        content: [...stats.notFound.dynamic].map((key) => renderReportLine({content: key})).join('')
    });
    const notFoundSectionContent = (notFoundStaticsSectionContent || notFoundDynamicsSectionContent) && renderReportSection({
        type: 'error',
        count: stats.notFound.static.size + stats.notFound.dynamic.size,
        title: 'Not Found',
        description: 'localization keys which were not found',
        content: [notFoundStaticsSectionContent, notFoundDynamicsSectionContent].filter(Boolean).join('')
    });
    const missedInDefaultSectionContent = stats.missedInDefault.static.size && renderReportSection({
        type: 'error',
        count: stats.missedInDefault.static.size,
        title: `Missed in default build ("${configProperty('defaultBuild')}")`,
        description: `localization keys which are present in custom ("${configProperty('customBuild')}") build, but are absent in default one ("${configProperty('defaultBuild')}")`,
        content: [...stats.missedInDefault.static].map((key) => renderReportLine({content: key})).join('')
    });
    const notUsedStaticsSectionContent = stats.notUsed.static.size && renderReportSection({
        type: 'warn',
        count: stats.notUsed.static.size,
        title: 'Statics',
        description: 'static keys',
        content: [...stats.notUsed.static].map((key) => renderReportLine({content: key})).join('')
    });
    const notUsedDynamicsSectionContent = stats.notUsed.dynamic.size && renderReportSection({
        type: 'warn',
        count: stats.notUsed.dynamic.size,
        title: 'Dynamics',
        description: 'dynamic keys',
        content: [...stats.notUsed.dynamic].map((key) => renderReportLine({content: key})).join('')
    });
    const notUsedSectionContent = (notUsedStaticsSectionContent || notUsedDynamicsSectionContent) && renderReportSection({
        type: 'warn',
        count: stats.notUsed.static.size + stats.notUsed.dynamic.size,
        title: 'Not Used',
        description: 'localization keys which were not used',
        content: [notUsedStaticsSectionContent, notUsedDynamicsSectionContent].filter(Boolean).join('')
    });
    const missedInCustomSectionContent = stats.missedInCustom.static.size && renderReportSection({
        type: 'warn',
        count: stats.missedInCustom.static.size,
        title: `Missed in custom build ("${configProperty('customBuild')}")`,
        description: `localization keys which are present in default ("${configProperty('defaultBuild')}") build, but are absent in custom one ("${configProperty('customBuild')}")`,
        content: [...stats.missedInCustom.static].map((key) => renderReportLine({content: key})).join('')
    });
    const fallbackSectionContent = stats.fallback.static.size && renderReportSection({
        type: 'info',
        count: stats.fallback.static.size,
        title: 'Fallback',
        description: `localization keys which were not found for current ("${configProperty('customBuild')}") build, so fallback values were applied`,
        content: [...stats.fallback.static].map(({key}) => renderReportLine({content: key})).join('')
    });
    const replacementsSectionContent = Object.values(stats.replacements).reduce((sum, value) => sum + value.length, 0) && renderReportSection({
        type: 'log',
        count: Object.values(stats.replacements).reduce((sum, value) => sum + value.length, 0),
        title: 'Replacements',
        description: 'applied replacements',
        content: Object.entries(stats.replacements).map(([key, values]) => {
            return values.length && renderReportSection({
                type: 'log',
                count: values.length,
                title: key,
                content: values.map(({match, result}) => {
                    return renderReportLine({
                        content: `${renderReportCell(match)}${renderReportCell(result)}`
                    });
                }).join('')
            });
        }).filter(Boolean).join('')
    });

    return renderReportBody({
        content: [
            notFoundSectionContent,
            missedInDefaultSectionContent,
            notUsedSectionContent,
            missedInCustomSectionContent,
            fallbackSectionContent,
            replacementsSectionContent
        ].filter(Boolean).join('')
    });
}

function writeFileSync(filePath, fileData) {
    return fs.writeFileSync(filePath, fileData, 'utf-8');
}
