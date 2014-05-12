const _str = require('underscore.string');


module.exports = function () {
  var helpers = {};

  helpers.unescape = function (options) {
    if (options.fn && typeof options.fn === 'function') {
      return _str.unescapeHTML(options.fn(this));
    }
    return _str.unescapeHTML(options);
  };

  return helpers;
};

