var log = require('./logger');
var jspmBundleTask = require('./task/bundle');
var writeJSPMConfigTask = require('./task/config');
var mkdirTask = require('./task/mkdir');
var minifyCSSTask = require('./task/clean-css');
var cleanTask = require('./task/clean');
var copyTask = require('./task/copy');
var runKarma = require('./task/karma');
var lintTask = require('./task/eslint');
var tsLintTask = require('./task/tslint');
var TaskMaster = require('./taskman');
const Rx = require('rx');

var Builder = function () {
    this.taskMaster = new TaskMaster();
};
/**
 * Builds the bundle and writes the configuration
 * @param config Configuration of the bundle and System config
 * @returns {Builder}
 */
Builder.prototype.bundle = function (config) {
    mkdirTask(this.taskMaster, config.dst);
    jspmBundleTask(this.taskMaster, config.bundle);
    writeJSPMConfigTask(this.taskMaster, config.dst, config.systemjs);
    return this;
};
/**
 * Remove the directories/files
 * @param filesToDelete
 * @returns {Builder}
 */
Builder.prototype.clean = function (filesToDelete) {
    cleanTask(this.taskMaster, filesToDelete);
    return this;
};
/**
 * Copy files from one directory to another
 * @param config
 * @returns {Builder}
 */
Builder.prototype.copy = function (config) {
    copyTask(this.taskMaster, config);
    return this;
};
/**
 * Combine and Minify the css
 * @param config
 * @returns {Builder}
 */
Builder.prototype.minifyCSS = function (config) {
    minifyCSSTask(this.taskMaster, config);
    return this;
};
/**
 * Run the tests using Karma and JSPM
 * @param configFile
 * @returns {Builder}
 */
Builder.prototype.test = function (configFile) {
    runKarma(this.taskMaster, configFile);
    return this;
};
/**
 * JS Lint the files and fix them based on options
 * @param configFile
 * @returns {Builder}
 */
Builder.prototype.tsLint = function (configFile) {
    tsLintTask(this.taskMaster, configFile.files, configFile.options);
    return this;
};
/**
 * JS Lint the files and fix them based on options
 * @param configFile
 * @returns {Builder}
 */
Builder.prototype.lint = function (configFile) {
    lintTask(this.taskMaster, configFile.files, configFile.options);
    return this;
};

/**
 * Sequential Watch with Rx.JS
 * @param serverName Name of the server
 * @param port Port number
 * @param filesToWatch File Patterns to watch
 * @param dirToServe Directory to watch
 * @param cb Callback method to execute on change
 */
Builder.rxWatch = function (serverName, port, filesToWatch, dirToServe, cb) {
    var bs = require("browser-sync").create(serverName || 'Dev Server');
    var config = {server: dirToServe || '.'};
    if (port && !isNaN(parseInt(port))) {
        config.port = port;
        config.ui = {};
        config.ui.port = parseInt(port) + 1;
    }
    bs.init(config);
    var _inProgress = false;// not a right way to do this....
    var source = Rx.Observable.create(function (observer) {
        bs.watch(filesToWatch, function (event) {
            if (event === "change" && !_inProgress) {
                observer.onNext(0);
                _inProgress = true;
            }
        });
    });

    var executeCallback = ()=> {
        var _start = new Date().getTime();
        var _end;
        log.info(`Kick starting the Job:::${new Date()}`, log.type.block);
        cb().then(()=> {
            _end = new Date().getTime();
            log.success(`Job complete::: time taken:: ${(_end - _start) / 1000} seconds`, log.type.block);
            bs.reload();
            _inProgress = false;
        }).catch(()=> {
            _end = new Date().getTime();
            log.error(`Build generation failed::: time taken:: ${(_end - _start) / 1000} seconds`, log.type.block);
            _inProgress = false;
        });
    };
    source.subscribe(executeCallback);
    executeCallback();
};

/**
 * General Watch: For example - used to Watch Report Directory
 * @param serverName
 * @param port
 * @param filesToWatch Files to watch
 * @param dirToServe directory to watch for
 * @param cb Callback to execute
 */
Builder.watch = function (serverName, port, filesToWatch, dirToServe, cb) {
    var bs = require("browser-sync").create(serverName || 'Generic');
    var config = {server: dirToServe || '.'};
    if (port && !isNaN(parseInt(port))) {
        config.port = port;
        config.ui = {};
        config.ui.port = parseInt(port) + 1;
    }
    bs.init(config);
    bs.watch(filesToWatch, function (event) {
        if (event === "change") {
            bs.reload();
            if (cb)cb();
        }
    });
};
/**
 * Hook to kick start the execution
 * @param data
 * @returns {*}
 */
Builder.prototype.execute = function (data) {
    var chain = this.taskMaster.execute(data);
    this.taskMaster = new TaskMaster();
    return chain;
};
module.exports = Builder;