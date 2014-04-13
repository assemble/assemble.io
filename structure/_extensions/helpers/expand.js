/**
 * Handlebars Helpers: {{expand}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

var file = require('fs-utils');
var log = require('verbalize');

var helperError = function(name, msg) {
  name = '\n  The {{' + name + '}} helper';
  throw new Error(log.bold(name, log.red(msg)));
};

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("expand", function(patterns) {

    // Throw an error if invalid patterns are passed
    if(!/string|array/.test(typeof patterns)) {
      helperError('expand', 'expects an array or string of glob patterns.', this);
    }

    // Expand files.
    var files = file.expand(patterns);

    // Throw an error if no files are returned.
    if(!files.length) {
      helperError('expand', 'tried to expand "' + patterns + '" but did not find any files.', this);
    }

    return new Handlebars.SafeString(files);
  });
};