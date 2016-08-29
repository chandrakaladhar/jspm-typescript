var log = require('./logger');
module.exports = function () {
    var _mainPromiseResolve, _promiseChain = [];
    _promiseChain.push(new Promise(function (resolve, reject) {
        _mainPromiseResolve = resolve;
    }));
    this.add = function (taskName, taskFun) {
        log.info(`Configuring Task:: ${taskName}`);
        var _resolve, _reject;
        var newPromise = new Promise(function (resolve, reject) {
            _resolve = resolve;
            _reject = reject;
        });
        var _index;
        _index = _promiseChain.length;
        _promiseChain[_index - 1].then(function (data) {
            log.info(`Executing Task: ${_index} : ${taskName}`, log.type.inline);
            taskFun(_resolve, _reject, data);
        }).catch(()=> {
            log.error(`Failed Task: ${taskName}`, log.type.inline);
            _reject();
        });
        _promiseChain.push(newPromise);
    };
    this.execute = function (data) {
        _mainPromiseResolve(data);
        return _promiseChain[_promiseChain.length - 1];
    };
};