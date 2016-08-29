var base = require('./../init');
var bundleBuildPath = base.path(base.src, base.tmp, base.bundle); //needed dst should be available for less to work
module.exports = {
    options: {
        sourceMap: true,
        rebase: false,
    },
    files: [
        {
            src: [`${bundleBuildPath}/**/*.sgb.css`, `${bundleBuildPath}/**/lib.css`],
            dst: `${bundleBuildPath}/gui/SGB/assets/css/lib.sgb.min.css`
        }, {
            src: [`${bundleBuildPath}/**/*.wbc.css`, `${bundleBuildPath}/**/lib.css`],
            dst: `${bundleBuildPath}/gui/WBC/assets/css/lib.wbc.min.css`
        }, {
            src: [`${bundleBuildPath}/**/*.bom.css`, `${bundleBuildPath}/**/lib.css`],
            dst: `${bundleBuildPath}/gui/BOM/assets/css/lib.bom.min.css`
        }]
};