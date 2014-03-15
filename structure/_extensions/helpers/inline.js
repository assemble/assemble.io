/**
 * Handlebars Helper: {{inline}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

var matter = require('gray-matter');
var _ = require('lodash');


module.exports.register = function (Handlebars, options) {
  options = options || {};

  // Add `inline` to assemble's options.
  var inline = options.inline || {};


  Handlebars.registerHelper('inline', function(filepath, context) {
    var append = '',
      prepend = '';

    var page = matter.read(filepath);
    var data = Handlebars.createFrame({filepath: filepath});

    _.extend(inline, context.data.root.inline || {});

    // Prepend or append any content in the given partial to the output
    prepend = inline.prepend ? Handlebars.partials[inline.prepend] : '';
    append = inline.append ? Handlebars.partials[inline.append] : '';

    _.defaults(page.context, context.data.root);
    var sections = [prepend, page.content, append].join('\n\n');
    var template = Handlebars.compile(sections);
    var result = template(page.context, {data: data});
    return new Handlebars.SafeString(result);
  });
};