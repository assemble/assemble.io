const relative = require('relative');

module.exports = function () {
  var helpers = {};

  helpers.base = function (context) {
    return relative.toBase(context.data.site.dest, context.data.dest);
  };

  return helpers;
};

