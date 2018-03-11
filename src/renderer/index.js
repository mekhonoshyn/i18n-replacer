import {bodyTemplate, sectionTemplate, lineTemplate, divTemplate} from './templates';

/**
 * Escape mapping
 *
 * some localized texts are true html code, so to have possibility add it to report as it is, we have to escape some html-specific chars
 */
const ESCAPE_MAPPING = {
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

/**
 * Unique id generator
 */
const generateUniqueId = ((cache = new Set()) => {
    return $new;

    function $new() {
        const id = `_${Math.random().toString(36).slice(2, 12).toUpperCase()}`;

        if (cache.has(id)) {
            return $new();
        }

        cache.add(id);

        return id;
    }
})();

export {
    renderReportBody,
    renderReportLine,
    renderReportCell,
    renderReportSection
};

/**
 * Renders report body
 *
 * @param {Object} params
 * @param {string} params.content
 * @return {string}
 */
function renderReportBody(params) {
    return renderHtml(bodyTemplate, params);
}

/**
 * Renders report line
 *
 * @param {Object} params
 * @param {string} params.content
 * @return {string}
 */
function renderReportLine(params) {
    return renderHtml(lineTemplate, params);
}

/**
 * Renders report cell
 *
 * @param {string} content
 * @return {string}
 */
function renderReportCell(content) {
    return renderHtml(divTemplate, {content: escapeCode(content)});
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
    const id = generateUniqueId();
    const additionalParams = {
        id,
        onclick: `document.querySelector('#${id}').classList.toggle('section--expanded') || document.querySelectorAll('#${id} .section--expanded').forEach(({classList}) => classList.remove('section--expanded'))`
    };

    if (!params.description) {
        // Get part of title enclosed to inline comment tags: "some title /* some description */"
        const [fullMatch, descriptionMatch] = params.title.match(/\s*\/\*\s+([\s\S]*)\s+\*\//);

        additionalParams.title = params.title.replace(fullMatch, '');
        additionalParams.description = descriptionMatch.trim();
    }

    const extendedParams = Object.assign({}, params, additionalParams);

    return renderHtml(sectionTemplate, extendedParams);
}

/**
 * Renders html, based on provided template and parameters
 *
 * @param {string} template
 * @param {Object} params
 * @return {string}
 */
function renderHtml(template, params) {
    return template.replace(/\{(\w+)}/g, (match, key) => params[key]);
}

/**
 * @param {string} source
 * @return {string}
 */
function escapeCode(source) {
    return source.replace(/["&<>]/g, (char) => ESCAPE_MAPPING[char]);
}
