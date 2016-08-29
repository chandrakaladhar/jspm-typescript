var base = require('./../init');
var appSrc = base.path(base.src, base.app);
//module.exports = [`${appSrc}/**/*.*`];
/** use below to watch specific files **/
module.exports = [`${appSrc}/**/*.html`, `${appSrc}/**/*.css`, `${appSrc}/**/*.less`, `${appSrc}/**/*.js`, `${appSrc}/**/*.ts`];