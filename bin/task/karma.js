const log = require('../logger');
var Server = require('karma').Server;
var path = require('path');
module.exports = (taskMaster, configFile) => {
    taskMaster.add('unit tests', (resolve, reject)=> {
        try {
            var confFilePath = path.resolve(configFile || 'karma.conf.js');
            var _server = new Server({
                configFile: confFilePath,
                singleRun: true
            }, (exitCode)=> {
                //process.exit(exitCode)
                resolve(exitCode);
            });
            _server.on('run_complete', function (browsers, results) {
                if (results.error || results.failed) {
                    log.error(`Test Cases have failed; aborting: Total Errors::${results.failed}`);
                    reject();
                }
            });
            _server.start();
        } catch (e) {
            log.error(e.stack);
            reject();
        }
    });
};