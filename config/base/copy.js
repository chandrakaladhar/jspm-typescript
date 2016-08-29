var base = require('./../init');
var appSrc = base.path(base.src, base.app);
var bundleBuildPath = base.path(base.src, base.tmp, base.bundle); //needed dst should be available for less to work
var dstBundlePath = base.path(base.dst, base.bundle); //needed dst should be available for less to work
var srcJspmPack = base.path(base.src, 'jspm_packages');
var dstJspmPack = base.path(base.dst, 'jspm_packages');

module.exports = [
    {src: `${bundleBuildPath}/**/*.js`, dst: dstBundlePath},
    {src: `${bundleBuildPath}/**/*.js.map`, dst: dstBundlePath},
    {src: `${bundleBuildPath}/gui/**/*.css`, dst: dstBundlePath},
    {src: `${bundleBuildPath}/gui/**/*.css.map`, dst: dstBundlePath},
    {src: `${srcJspmPack}/system*.js`, dst: dstJspmPack},
    {src: `${srcJspmPack}/system*.js.map`, dst: dstJspmPack},
    {src: `${appSrc}/**/**.html`, dst: base.dst},
    {src: `${appSrc}/**/**.js`, dst: base.path(base.dst,base.app)},
    {src: `${base.src}/gui/**/assets/css/symbols*.css`, dst: dstBundlePath},
    {src: `${base.src}/gui/**/assets/font/**.*`, dst: dstBundlePath},
    {src: `${base.src}/gui/**/assets/img/**.*`, dst: dstBundlePath}
];