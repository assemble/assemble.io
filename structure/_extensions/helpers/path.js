/**
 * Handlebars Helper: {{basename}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

var path = require('path');

module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper("basename", function(filepath) {
    return path.basename(filepath);
  });
};