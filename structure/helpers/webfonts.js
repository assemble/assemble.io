/**
 * Handlebars Helpers: {{webfonts}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports = function (assemble) {

  var Handlebars = assemble.Handlebars;
  var helpers = {};

  helpers.webfonts = function (context) {
    return new Handlebars.SafeString('"' + context.join('", "') + '"');
  };

  return helpers;
};
