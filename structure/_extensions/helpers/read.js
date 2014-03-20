/**
 * Handlebars Helper: {{read}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

var matter = require('gray-matter');
var _ = require('lodash');

module.exports.register = function (Handlebars) {

  Handlebars.registerHelper("read", function(filepath, context) {
    context.data = context.data || {};
    var page = matter.read(filepath);
    var metadata = _.extend(context.data.root, page.context);
    var template = Handlebars.compile(page.content);
    return new Handlebars.SafeString(template(metadata));
  });
};
