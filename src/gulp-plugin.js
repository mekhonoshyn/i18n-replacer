import through2 from 'through2';
import PluginError from 'plugin-error';
import {transformSource} from './helper';

export default i18nReplacerPlugin;

const PLUGIN_NAME = 'gulp-i18n-replacer';

function i18nReplacerPlugin({preset}) {
    return through2.obj(function (fileObject, encoding, callback) {
        if (!fileObject.isBuffer()) {
            return callback(new PluginError(PLUGIN_NAME, 'Non-Buffer content is not supported'));
        }

        try {
            const content = transformSource(fileObject.contents.toString(), preset);

            fileObject.contents = Buffer.from(content);

            this.push(fileObject);

            return callback();
        } catch (error) {
            return callback(new PluginError(PLUGIN_NAME, error));
        }
    });
}
