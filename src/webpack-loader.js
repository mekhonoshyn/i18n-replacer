import loaderUtils from 'loader-utils';
import {transformSource} from './helper';

const IS_RAW = true;

export {
    i18nReplacerLoader as default,
    IS_RAW as raw
};

function i18nReplacerLoader(source) {
    this.cacheable();

    const {preset} = loaderUtils.getOptions(this);

    return transformSource(source.toString(), preset);
}
