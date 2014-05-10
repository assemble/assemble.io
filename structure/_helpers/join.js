/**
 * Handlebars Helpers: {{join}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports = function (config) {
  var Handlebars = config.Handlebars;

  var helpers = {};
  helpers.join = function (arr, sep) {
    return new Handlebars.SafeString(arr.join(sep));
  };

  return helpers;
};
