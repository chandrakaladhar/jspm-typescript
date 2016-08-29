const log = require('../logger');
const fs = require('fs-extra');
const _ = require('lodash');
module.exports = (taskMaster, dstDir, systemjsConfig)=> {
    taskMaster.add('config', (resolve, reject, data) => {
        log.info(`Writing config file:: ${dstDir}/config.js`);
        fs.outputFile(dstDir + '/config.js', 'System.config(' + JSON.stringify(_.merge(_.clone(systemjsConfig), data)) + ');', (err)=> {
            if (!err) {
                log.success(`Config file written successfully:: ${dstDir}/config.js`);
                resolve(data);
            } else {
                log.error(`Config file creation Error: ${err.stack}`);
                reject();
            }
        });
    });
};