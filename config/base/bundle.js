var base = require('./../init');
var bundleBuildPath = base.path(base.src, base.tmp, base.bundle); //needed dst should be available for less to work
var bundleRelPath = base.path(base.tmp, base.bundle);
var appMainFile = base.path(base.app, base.mainFile);
var excludeAllSrcFiles = `[${base.app}/**/**]`;
module.exports = {
    dst: bundleBuildPath, //directory where temporary bundles are placed
    bundle: {
        rebase: base.bundle, // for dependency cache
        options: {
            mangle: true,
            minify: true,
            sourceMaps: true,
            /** Multi Brand Less based css files; change below has impact on how we minify and bundle css, refer to clean-css.js **/
            less: [
                {
                    extn: '.sgb.css', globals: '@brand: STG; @base: #ffff60;'
                },
                {
                    extn: '.wbc.css', globals: '@brand: WBC; @base: #bbff60;'
                },
                {
                    extn: '.bom.css', globals: '@brand: BOM; @base: #ccee60;'
                }]
        },
        bundles: [
            {
                src: `${appMainFile} - ${excludeAllSrcFiles}`, dst: `${bundleBuildPath}/lib.js`
            }
            , {src: `${appMainFile} - ${bundleRelPath}/lib`, dst: `${bundleBuildPath}/main.js`}
        ]
    },
    systemjs: {
        baseURL: "/",
        // production: true,
        defaultJSExtensions: true,
        paths: {
            "github:*": `jspm_packages/github/*`,
            "npm:*": `jspm_packages/npm/*`
        },
        packages: {
            "app": {
                "main": "main",
                "defaultExtension": "ts"
            }
        }
    }
};


// bundle: {
//     options: {
//         mangle: true,
//         minify: true,
//         sourceMaps: true
//     },
//     bundles: [
//         {
//             src: 'app/main - [app/**/**] - [app/**/*.less!]', dst: 'app/bundle/lib.js',
//             options: {minify: true}
//         },
//         {src: 'app/main - app/bundle/lib - [app/**/*.less!]', dst: 'app/bundle/main.js'},
//         {src: 'app/main - app/bundle/lib - app/bundle/main', dst: 'app/bundle/onlyless.js'}
//     ]
// },