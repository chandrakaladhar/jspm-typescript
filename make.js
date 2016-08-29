var config = require('./config/main');
var Builder = require('./bin/build');
var logger = require('./bin/logger');
//build the bundles
var jspmConfig = config.require('bundle');
var filesToCopy = config.require('copy');
var filesToRemove = config.require('clean');
var cssFilesMinify = config.require('clean-css');
var tsLintConfig = config.require('tslint');
var base = require('./config/init');
var buildNow = function () {
    "use strict";
    var builder = new Builder();
    return builder.tsLint(tsLintConfig)
        .test()
        .clean(filesToRemove)
        .bundle(jspmConfig)
        .minifyCSS(cssFilesMinify)
        .copy(filesToCopy)
        .clean([base.path(base.src, base.tmp)])//optional
        .execute();
};
// var builder = new Builder();
// builder.tsLint(tsLintConfig)
//     .execute().then((data)=> {
//     logger.success('Successfully executed the tasks', logger.type.inline);
// }, ()=> {
//     logger.error('Job Failed:::', logger.type.inline);
// });
if (config.args.watch === "false") { // watch by default
    buildNow();
} else { //else just build
    var watchFiles = config.require('watch');
    Builder.watch('Build Report', '9090', [`${base.coverage}/**/*.*`], base.coverage);
    Builder.rxWatch('Build Server', '8080', watchFiles, base.dst, () => {
        return buildNow();
    }, 10000);
}

