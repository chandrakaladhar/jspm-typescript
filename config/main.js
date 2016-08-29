const _ = require('lodash');
var path = require('path');
var fs = require('fs-extra');
const log = require('../bin/logger');
var _argv = require('minimist')(process.argv.slice(2));
var _env = _argv.env || 'dev';
log.warn(`Running build process for the environment::${_env}`, log.type.inline);
var _fileExists = function (file) {
    try {
        return fs.statSync(path.resolve(file)).isFile();
    }
    catch (e) {
        if (e.code == 'ENOENT') { // no such file or directory. File really does not exist
            return false;
        }
        log.error(`Exception occurred::${path.resolve(file)}`);
        return false;
    }
};
var _customizer = function (objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
};
var _requireConfig = function (configFile) {
    var baseConf = _fileExists(`./config/base/${configFile}.js`) ? require(`./base/${configFile}.js`) : {};
    var envBasedConf = _fileExists(`./config/${_env}/${configFile}.js`) ? require(`./${_env}/${configFile}.js`) : _.isArray(baseConf) ? [] : {};
    var finalConfig = _.isArray(baseConf) ? baseConf.concat(envBasedConf) : _.mergeWith(baseConf, envBasedConf, _customizer);
    return finalConfig;
};
module.exports = {
    args: _argv,
    require: _requireConfig
};