const log = require('../logger');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const _ = require('lodash');
var CleanCSS = require('clean-css');
module.exports = (taskMaster, config)=> {
    taskMaster.add('minify-less-css', (resolve, reject, data) => {
        try {
            _.forEach(config.files, (fileSet)=> {
                var matchFiles = [];
                _.forEach(fileSet.src, (pattern)=> {
                    matchFiles = _.concat(matchFiles, glob.sync(pattern, config.options || {}));
                });
                var minified = new CleanCSS(config.options).minify(matchFiles);
                var compiledCssString = minified.styles;
                if (config.options.sourceMap) {
                    compiledCssString += '\n' + '/*# sourceMappingURL=' + path.basename(fileSet.dst) + '.map */';
                    fs.outputFileSync(fileSet.dst + '.map', minified.sourceMap.toString());
                }
                fs.outputFileSync(fileSet.dst, compiledCssString);
            });
            resolve();
            log.success(`Minification and Cleaning of CSS files successful`);
        } catch (e) {
            log.error(e.stack);
            reject();
        }
    });
};
