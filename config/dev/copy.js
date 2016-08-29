var base = require('./../init');
var appSrc = base.path(base.src, base.app);
module.exports = [
    {src: `${appSrc}/**/**.js`, dst: base.path(base.dst,base.app)},
];