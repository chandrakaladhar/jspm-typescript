/**
 * Source directory where application resides
 * @type {string}
 * @private
 */
var _src = 'src';
/**
 * Temporary Build location; @there is dependency to place the temporary directory beneath src directory
 * @type {string}
 * @private
 */
var _tmp = 'build';
/**
 * Final destination directory where files have to be placed
 * @type {string}
 * @private
 */
var _dst = 'dst'; // final destination directory where files have to put in
/**
 * Directory where application resides
 * @type {string}
 * @private
 */
var _app = 'app';
/**
 * Directory for coverage
 * @type {string}
 */
var _coverage = 'coverage/phantomjs';
/**
 *
 * @type {string}
 * @private
 */
var _mainFile = 'main'; // main entry file under the source directory
/**
 * Location of bundling; directory under which created bundles are placed
 * @type {string}
 * @private
 */
var _bundleDir = 'bundle';

/*****************Modify base configuration above****************************/
var _path = function () {
    var sep = '/';
    var args = Array.prototype.slice.call(arguments);
    return args.join(sep);
};
module.exports = {
    src: _src,
    tmp: _tmp,
    dst: _dst,
    app: _app,
    coverage: _coverage,
    mainFile: _mainFile,
    bundle: _bundleDir,
    path: _path
};