/**
 * Handlebars Helpers: {{isPermalink}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper("isPermalink", function(value, fallback) {
    return options.permalinks ? value : fallback + (value.lastIndexOf('.') > 0 ? '' : options.ext);
  });
};