const del = require('del');
const log = require('../logger');
module.exports = (taskMaster, filesToDelete) => {
    taskMaster.add('clean', (resolve, reject)=> {
        del.sync(filesToDelete);
        log.success("Clean Operation Successful:" + filesToDelete);
        resolve();
    });
};