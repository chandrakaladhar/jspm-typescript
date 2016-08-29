const copy = require('copy');
const log = require('../logger');
const _ = require('lodash');
module.exports = (taskMaster, config)=> {
    taskMaster.add('copy', (resolve, reject)=> {
        var copyPromises = [];
        config.forEach((filePair)=> {
            copyPromises.push(new Promise((iResolve, iReject)=> {
                copy(filePair.src, filePair.dst, (err, files) => {
                    log.info("Copying files:  Source: " + filePair.src + " :: Destination: " + filePair.dst);
                    if (!err) {
                        // _(files).forEach(file=> {
                        //     log.success(`match copied to::: ${file.dest}`);
                        // });
                        iResolve();
                    } else {
                        log.error(`Error while copying ${err.stack}`);
                        iReject();
                    }
                });
            }));
        });
        Promise.all(copyPromises).then(values => resolve(), err=> reject());
    });
};