/**
 * Handlebars Helper: {{inline}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

const matter = require('gray-matter');
const _ = require('lodash');


module.exports = function (config) {
  var Handlebars = config.Handlebars;
  var helpers = {};

  var options = config.options || {};
  options.data = options.data || {};

  // Add `inline` to assemble's options.
  var inline = _.extend(options.inline || {}, options.data.inline || {});


  helpers.inline = function (filepath, context) {
    context.data = context.data || {};
    var append = '',
      prepend = '';

    var page = matter.read(filepath);
    var data = Handlebars.createFrame({filepath: filepath});

    _.defaults(page.context, context.data.root || {});

    // Prepend or append any content in the given partial to the output
    prepend = inline.prepend ? Handlebars.partials[inline.prepend] : '';
    append = inline.append ? Handlebars.partials[inline.append] : '';

    var sections = [prepend, page.content, append].join('\n\n');

    var template = Handlebars.compile(sections);
    var result = template(page.context, {data: data});
    return new Handlebars.SafeString(result);
  };

  return helpers;
};
