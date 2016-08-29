var base = require('./../init');
var appSrc = base.path(base.src, base.app);
module.exports = {
    files: [appSrc],
    options: {
        envs: ["browser", "jasmine"],
        formatter: require('eslint-tap'),
        useEslintrc: false,
        parser: "esprima",
        fix: false,
        parserOptions: {
            ecmaVersion: 6,
            sourceType: "module",
            ecmaFeatures: {
                jsx: false
            }
        },
        rules: {
            semi: 2
        }
    }
};

// The CLIEngine is a constructor, and you can create a new instance by passing in the options you want to use. The available options are:
//     allowInlineConfig - Set to false to disable the use of configuration comments (such as /*eslint-disable*/). Corresponds to --no-inline-config.
//     baseConfig - Set to false to disable use of base config. Could be set to an object to override default base config as well.
//     cache - Operate only on changed files (default: false). Corresponds to --cache.
//     cacheFile - Name of the file where the cache will be stored (default: .eslintcache). Corresponds to --cache-file. Deprecated: use cacheLocation instead.
//     cacheLocation - Name of the file or directory where the cache will be stored (default: .eslintcache). Corresponds to --cache-location.
//     configFile - The configuration file to use (default: null). Corresponds to -c.
//     cwd - Path to a directory that should be considered as the current working directory.
//     envs - An array of environments to load (default: empty array). Corresponds to --env.
//     extensions - An array of filename extensions that should be checked for code. The default is an array containing just ".js". Corresponds to --ext.
//     fix - True indicates that fixes should be included with the output report, and that errors and warnings should not be listed if they can be fixed. However, the files on disk will not be changed. To persist changes to disk, call outputFixes().
//     globals - An array of global variables to declare (default: empty array). Corresponds to --global.
//     ignore - False disables use of .eslintignore, ignorePath and ignorePattern (default: true). Corresponds to --no-ignore.
//     ignorePath - The ignore file to use instead of .eslintignore (default: null). Corresponds to --ignore-path.
//     ignorePattern - Glob patterns for paths to ignore. String or array of strings.
//     parser - Specify the parser to be used (default: espree). Corresponds to --parser.
//     parserOptions - An object containing parser options (default: empty object). Corresponds to --parser-options.
//     plugins - An array of plugins to load (default: empty array). Corresponds to --plugin.
//     rulePaths - An array of directories to load custom rules from (default: empty array). Corresponds to --rulesdir.
//     rules - An object of rules to use (default: null). Corresponds to --rule.
//     useEslintrc - Set to false to disable use of .eslintrc files (default: true). Corresponds to --no-eslintrc.