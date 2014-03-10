/**
 * Handlebars Helper: {{basename}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper("basename", function(filepath) {
    return require('fs-utils').name(filepath);
  });
};