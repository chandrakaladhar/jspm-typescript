/**
 * Created by l067164 on 5/08/2016.
 */
module.exports = function (config) {
    'use strict';
    config.set({
        browserNoActivityTimeout: 60000000,
        autoWatch: false,
        singleRun: true,
        browsers: ['PhantomJS'],
        concurrency: Infinity,
        basePath: '',
        plugins: ['karma-jspm', 'karma-phantomjs-launcher', 'karma-typescript-preprocessor', 'karma-coverage', 'karma-jasmine'],
        frameworks: ['jspm', 'jasmine'],
        files: [],
        typescriptPreprocessor: {
            transformPath: function (filepath) {
                return filepath.replace(/\.ts$/, '.ts');
            }
        },
        jspm: {
            defaultJSExtensions: true,
            stripExtension: true,
            config: 'src/config.js',
            packages: 'src/jspm_packages',
            loadFiles: [
                'src/app/**/*.spec.ts'
            ],
            serveFiles: [
                'src/app/**/!(*spec).ts',
                'src/**/!(*spec).ts',
                'src/**/!(*spec).js',
                'src/app/!(*spec).ts',
                'src/app/!(*spec).css',
                'src/app/!(*spec).less'
            ]
        },
        proxies: {
            '/src/': '/base/src/',
            '/jspm_packages/': '/src/jspm_packages/'
        },

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'src/app/**/*.spec.ts': ['typescript'],
            'src/app/*.spec.ts': ['typescript'],
            'src/app/**/!(*spec).ts': ['typescript', 'coverage'],
            'src/app/!(*spec).ts': ['typescript', 'coverage']
            // 'src/app/**/*.spec.ts': ['typescript', 'coverage']
        },
        //logLevel: config.LOG_DEBUG,
        coverageReporter: {
            instrumenters: {isparta: require('isparta')},
            instrumenter: {
                '**/*.ts': 'isparta'
            },

            reporters: [
                {
                    type: 'text-summary',
                    subdir: normalizationBrowserName
                },
                {
                    type: 'html',
                    dir: 'coverage/',
                    subdir: normalizationBrowserName
                }
            ]
        }
    });

    function normalizationBrowserName(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
    }
};
