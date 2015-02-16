/**
 * Handlebars Helpers: {{isActive}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

const _ = require('lodash');


module.exports = function (config) {
  var Handlebars = config.Handlebars;
  var opts = config.options || {};

  var helpers = {};

  /**
   * Add `active` class for current page.
   * Customize the class in the options hash.
   * @example: {{isActive class="current"}}
   *
   * @usage: {{isActive}}
   */

  helpers.isActive = function (current, options) {
    var context = _.extend({}, opts, this);
    options = options || {};

    var modifier = (options.hash && options.hash.class) ? options.hash.class : 'active';
    context.page = context.page || {};
    if(context.page.basename === current) {
      modifier = ' class="' + modifier + '"';
    } else {
      modifier = '';
    }
    return new Handlebars.SafeString(modifier);
  };

  return helpers;
};
