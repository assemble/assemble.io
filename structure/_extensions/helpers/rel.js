/**
 * Handlebars Helpers: {{rel}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

// Node.js
var path = require('path');
// var file = require('fs-utils');
var _ = require('lodash');

// Export helpers
module.exports.register = function (Handlebars, options) {

  /**
   * Generate a relative link from the "current page" to the specified page
   * @usage: <a href="{{rel 'dist/foo.html'}}>Foo</a>
   */
  Handlebars.registerHelper('rel', function (to) {
    var context = _.extend({}, options, options.data, this);

    // If the `site` obj exists in the config, and `site.root`
    // exists, then join the `site.root` to each filename
    var destBase = context.site.root || context.site.base;
    to = context.site ? path.join(destBase, to) : to;

    var from = path.dirname(context.page.dest);
    var filename = path.basename(to);

    var relativePath = path.relative(from, path.dirname(to));
    var dest = path.join(relativePath, filename).replace(/\\/g, '/');
    return new Handlebars.SafeString(dest);
  });
};