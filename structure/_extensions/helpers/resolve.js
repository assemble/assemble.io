/**
 * Handlebars Helpers: {{resolve}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

// Node.js
var path = require('path');
var _ = require('lodash');
var relative = require('relative');

module.exports.register = function (Handlebars, options) {

  /**
   * Resolves the path to the actual destination file,
   * to ensure that it's always correct. This even works with
   * permalinks.
   *
   * A context is not required when {{resolve}} is used at the
   * root of the context, however, you will need to pass
   * in the root context when the helper is nested. Thus, we're
   * passing the context in using the {{context}} helper.
   *
   * @usage: <a href="{{resolve 'about'}}>About</a>
   */

  Handlebars.registerHelper('resolve', function (name, context) {
    name = path.basename(name, path.extname(name));
    var url = '';

    context = context || {};
    var self = _.extend({}, this, context);

    self.pages.forEach(function(page) {
      if (page.src.indexOf(name) !== -1) {
        url += relative(self.page.dest, page.dest);
      }
    });
    return url;
  });
};