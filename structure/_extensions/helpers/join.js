/**
 * Handlebars Helpers: {{join}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper("join", function(arr, sep) {
    return new Handlebars.SafeString(arr.join(sep));
  });
};