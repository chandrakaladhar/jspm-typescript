'use strict';
var Linter = require("tslint");
const log = require('../logger');
const fs = require('fs-extra');
const _ = require('lodash');
const glob = require('glob');

var _defaultOptions = {
    formatter: "prose",
    force: false
};
var fileExists = function (filePath) {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (err) {
        return false;
    }
};

/**
 * Inspired  from grunt-eslint
 * @param taskMaster
 * @param files
 * @param options
 * @returns {boolean}
 */
module.exports = (taskMaster, files, options)=> {
    taskMaster.add('lint', (resolve, reject) => {
        options = options || {};
        var errCount = 0;
        const opts = _.merge(_.clone(_defaultOptions), options);
        if (files.length === 0) {
            log.error('Could not find any files to validate');
            resolve();
            return true;
        }
        var matchFiles = [];
        for (var i = 0, j = files.length; i < j; i++) {
            matchFiles = _.concat(matchFiles, glob.sync(files[i]));
        }
        var outputString = "";
        var results = '';
        matchFiles.forEach((filePath, index)=> {
            if (fileExists(filePath)) {
                if (options.configuration == null || typeof options.configuration === "string") {
                    opts.configuration = Linter.findConfiguration(options.configuration, filePath);
                }
                var contents = fs.readFileSync(filePath, "utf8");
                var ll = new Linter(filePath, contents, opts);
                var result = ll.lint();
                errCount += result.failureCount;
                if (result.failureCount > 0) {
                    result.output.split('\n').forEach(function (line) {
                        if (line !== '') {
                            results = results.concat((opts.formatter.toLowerCase() === 'json') ? JSON.parse(line) : line);
                            outputString += line + '\n';
                        }
                    });
                }
            }
        });
        if (errCount === 0) {
            resolve();
            return;
        }
        log.error(`Fix the issues: Failed Count::${errCount}`);
        //log.warn(results);
        log.warn(outputString);
        reject();
    });
};
//    // Iterate over all specified file groups, async for 'streaming' output on large projects
//     grunt.util.async.reduce(this.filesSrc, true, function (success, filepath, callback) {
//         if (!grunt.file.exists(filepath)) {
//             grunt.log.warn('Source file "' + filepath + '" not found.');
//         } else {
//             var configuration = specifiedConfiguration;
//             if (configuration == null || typeof configuration === "string") {
//                 configuration = Linter.findConfiguration(configuration, filepath);
//             }
//             options.configuration = configuration;
//
//             var contents = grunt.file.read(filepath);
//             var linter = new Linter(filepath, contents, options);
//             var result = linter.lint();
//
//             if (result.failureCount > 0) {
//                 var outputString = "";
//
//                 failed += result.failureCount;
//
//                 if (outputFile != null && grunt.file.exists(outputFile)) {
//                     if (appendToOutput) {
//                         outputString = grunt.file.read(outputFile);
//                     } else {
//                         grunt.file.delete(outputFile);
//                     }
//                 }
//                 result.output.split("\n").forEach(function (line) {
//                     if (line !== "") {
//                         results = results.concat((options.formatter.toLowerCase() === 'json') ? JSON.parse(line) : line);
//                         if (outputFile != null) {
//                             outputString += line + "\n";
//                         } else {
//                             grunt.log.error(line);
//                         }
//                     }
//                 });
//                 if (outputFile != null) {
//                     grunt.file.write(outputFile, outputString);
//                     appendToOutput = true;
//                 }
//                 success = false;
//             }
//         }
//
//         // Using setTimout as process.nextTick() doesn't flush
//         setTimeout(function () {
//             callback(null, success);
//         }, 1);
//
//     }, function (err, success) {
//         if (err) {
//             done(err);
//         } else if (success) {
//             var okMessage = this.filesSrc.length + " " + grunt.util.pluralize(this.filesSrc.length, "file/files") + " lint free.";
//             grunt.log.ok(okMessage);
//             done();
//         } else {
//             var errorMessage = failed + " " + grunt.util.pluralize(failed, "error/errors") + " in " +
//                 this.filesSrc.length + " " + grunt.util.pluralize(this.filesSrc.length, "file/files");
//             grunt.log.error(errorMessage);
//             done(force);
//         }
//     }.bind(this));
//
// });