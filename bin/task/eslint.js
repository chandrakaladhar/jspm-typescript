'use strict';
const eslint = require('eslint');
const log = require('../logger');
const fs = require('fs-extra');
const _ = require('lodash');
var _defaultOptions = {
    envs: ["browser", "jasmine"],
    useEslintrc: false,
    rules: {
        semi: 2
    },
    outputFile: false,
    quiet: false,
    maxWarnings: -1
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
        const opts = _.merge(_.clone(_defaultOptions), options);
        if (files.length === 0) {
            log.error('Could not find any files to validate');
            resolve();
            return true;
        }
        const formatter = eslint.CLIEngine.getFormatter(opts.formatter);
        if (!formatter) {
            log.warn(`Could not find formatter ${opts.formatter}`);
            reject();
            return;
        }
        const engine = new eslint.CLIEngine(opts);
        let report;
        try {
            report = engine.executeOnFiles(files);
        } catch (err) {
            log.warn(err);
            reject();
            return false;
        }

        if (opts.fix) {
            eslint.CLIEngine.outputFixes(report);
        }

        let results = report.results;

        if (opts.quiet) {
            results = eslint.CLIEngine.getErrorResults(results);
        }

        const output = formatter(results);

        if (opts.outputFile) {
            fs.outputFileSync(opts.outputFile, output);
        } else if (output) {
            log.info(output);
        }

        const tooManyWarnings = opts.maxWarnings >= 0 && report.warningCount > opts.maxWarnings;

        if (report.errorCount === 0 && tooManyWarnings) {
            log.warn(`ESLint found too many warnings (maximum: ${opts.maxWarnings})`);
        }
        if (report.errorCount === 0) resolve();
    });
};