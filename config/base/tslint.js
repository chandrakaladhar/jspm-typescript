var base = require('./../init');
var appSrc = base.path(base.src, base.app);
module.exports = {
    files: [`${appSrc}/**/*.ts`],
    options: {
        configuration: "tslint.json",
        // If set to true, tslint errors will be reported, but not fail the task
        // If set to false, tslint errors will be reported, and the task will fail
        force: true,
        formatter: 'stylish'
    }
};