const bodyTemplate = `
    <html>
        <head>
            <style>${require('./styling.scss')}</style>
        </head>
        <body>{content}</body>
    </html>
`;

const sectionTemplate = `
    <div id="{id}"
       class="section layout-column">
        <div class="section__header {type} layout-row"
           onclick="{onclick}">
            <div class="section__header-title-block layout-column">
                <div class="section__header-title">{title}</div>
                <div class="section__header-description">{description}</div>
            </div>
            <div class="section__header-count-block layout-column">
                <div class="section__header-count">{count}</div>
            </div>
        </div>
        <div class="section__frame layout-row">
            <div class="section__indent"
               onclick="{onclick}"></div>
            <div class="section__body layout-column {type}">{content}</div>
        </div>
    </div>
`;

const lineTemplate = `
    <div class="section__body-line">{content}</div>
`;

const divTemplate = `
    <div>{content}</div>
`;

export {
    bodyTemplate,
    sectionTemplate,
    lineTemplate,
    divTemplate
};
