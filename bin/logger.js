const chalk = require('chalk');
var _pad = (delimiter, length)=> {
    var padString = '';
    for (var i = 0; i < length; i++) {
        padString += delimiter;
    }
    return padString;
};
var _log = function (msg, format, color, colorDefault, delimiter, length) {
    length = length ? isNaN(length) ? 80 : length : 100;
    delimiter = delimiter || ':';
    if (color) {
        color = color || colorDefault;
    } else {
        color = chalk[color] ? color : colorDefault;
    }
    switch (format) {
        case 1:
            length = length - 2;
            var head = Math.round(msg.length > length ? 0 : (length - msg.length) / 2);
            console.log(chalk[color](`${_pad(delimiter, head)} ${msg} ${_pad(delimiter, length - head - msg.length)}`));
            break;
        case 2:
            console.log(chalk[color](_pad(delimiter, length)));
            console.log(chalk[color](msg));
            console.log(chalk[color](_pad(delimiter, length)));
            break;
        default:
            console.log(chalk[color](msg));
    }
};
var _formatColors = {
    success: ['yellow', 'green', 'green'],
    warn: ['red', 'red', 'red'],
    error: ['red', 'red', 'red'],
    info: ['magenta', 'cyan', 'blue'],
};
var _getDefaultColor = (type, format)=> {
    if (format === void 0) format = 0;
    return _formatColors[type][format];
};
module.exports = {
    type: {
        inline: 1,
        block: 2
    },
    length: 100,
    delimiter: ':',
    success: function (msg, format, color) {
        _log(msg, format, color, _getDefaultColor('success', format), this.delimiter, this.length);
    },
    warn: function (msg, format, color) {
        _log(msg, format, color, _getDefaultColor('warn', format), this.delimiter, this.length);
    },
    error: function (msg, format, color) {
        _log(msg, format, color, _getDefaultColor('error', format), this.delimiter, this.length);
    },
    info: function (msg, format, color) {
        _log(msg, format, color, _getDefaultColor('info', format), this.delimiter, this.length);
    }
};