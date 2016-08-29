const log = require('../logger');
const fs = require('fs-extra');
module.exports = (taskMaster, directory)=> {
    taskMaster.add('create bundle directory', (resolve, reject) => {
        if (directory) {
            fs.mkdirs(directory, function (err) {
                if (err) {
                    log.error(e.stack);
                    reject();
                }
                else {
                    log.info(`Creating directory: ${directory}`);
                    resolve();
                }
                // dir has now been created, including the directory it is to be placed in
            });
            log.info(`Created directory: ${directory}`);
        }
    });
};