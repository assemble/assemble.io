/**
 * Handlebars Helpers: {{expand}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

const file = require('fs-utils');
const log = require('verbalize');


var helperError = function(name, msg) {
  name = '\n  {{' + name + '}} helper:';
  log.warn(name, log.red(msg));
  throw new Error(log.bold(name, log.red(msg)));
};



module.exports = function () {
  var helpers = {};

  helpers.expand = function (patterns) {

    // Throw an error if invalid patterns are passed
    if(!/string|array/.test(typeof patterns)) {
      helperError('expand', 'expects an array, string or glob patterns.', this);
    }

    // Expand files.
    var files = file.expand(patterns);

    // Throw an error if no files are returned.
    if(!files.length) {
      helperError('expand', 'tried to expand "' + patterns + '" but no files were returned.', this);
    }

    return files;
  };

  return helpers;
};
