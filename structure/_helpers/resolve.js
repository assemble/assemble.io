/**
 * Handlebars Helpers: {{resolve}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

const path = require('path');
const file = require('fs-utils');
const _ = require('lodash');
const relative = require('relative');


module.exports = function (config) {
  var Handlebars = config.Handlebars;
  var options = config.options || {};
  var site = options.site || {};

  var helpers = {};
  helpers.resolve = function (name, context) {
    var basename = path.basename(name, path.extname(name));
    var url = '';

    context = context || {};
    var self = _.extend({}, this, context);

    self.components.forEach(function (page) {
      if (page.src.indexOf(basename) !== -1) {
        url = relative(self.page.dest, page.dest);
      }
    });

    if (!url) {
      var dest = file.normalizeSlash(path.join(site.dest, name));
      url = relative.toBase(url, dest);
    }

    return new Handlebars.SafeString(url);
  };

  helpers.rel = function (to, context) {
    if (context.data.dest) {
      return relative(to, context.data.dest)
    }
    return to;
    // return new Handlebars.SafeString(relative(from, to));
  };


  return helpers;
};

