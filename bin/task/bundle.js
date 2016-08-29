const Rx = require('rx');
const _ = require('lodash');
const jspm = require('jspm');
const path = require('path');
const log = require('../logger');
jspm.setPackagePath('.'); // optional
var _jspmDefaultOptions = {
    minify: true,
    mangle: true,
};

var _processBundle = (jspmBuilder, config) => {
    var bundleObservers = [];
    _.forEach(config.bundles, (bundle)=> {
        bundleObservers.push(Rx.Observable.of(bundle)
            .flatMap((bundle)=>
                jspmBuilder.bundle(bundle.src, bundle.dst, _.merge(_.clone(_jspmDefaultOptions), config.options, bundle.options))));
    });
    return Rx.Observable.concat(bundleObservers);
};
var _rebaseBundleName = (basedir, bundleName)=> {
    if (!basedir) return bundleName;
    var extn = path.extname(bundleName);
    var fileName = path.basename(bundleName, extn);
    return path.join(basedir, fileName);
};
module.exports = (taskMaster, bundleConfig)=> {
    var jspmBuilder = new jspm.Builder();
    var finalConfig = {bundles: {}, depCache: {}};
    taskMaster.add('bundle', (resolve, reject) => {
        _processBundle(jspmBuilder, bundleConfig)
            .subscribe((bundle) => {
                    var bdname = _rebaseBundleName(bundleConfig.rebase, bundle.bundleName);
                    finalConfig.bundles[bdname] = bundle['modules'];
                    finalConfig.depCache[bdname] = jspmBuilder.getDepCache(bundle.tree);
                }, (err) => {
                    log.error('Bundle Creation Error: ' + err);
                    reject(err);
                },
                ()=> {
                    log.success('Completed:: Final Config:::' + JSON.stringify(finalConfig));
                    resolve(finalConfig);
                });
    });
};