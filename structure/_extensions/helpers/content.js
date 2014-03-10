/**
 * Handlebars Helper: {{content}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

var file = require('fs-utils');
var marked = require('marked');
var extras = require('marked-extras');
var matter = require('gray-matter');
var _ = require('lodash');


module.exports.register = function (Handlebars, options) {
  options = options || {};
  options.marked = options.marked || {};

  // Add `contentOpts` to the options.
  var contentOpts = options.contentOpts || {};

  // Initialize `marked-extras`
  extras.init(options.marked);

  // Extend defaults from `marked-extras` with Gruntfile options
  var markedOpts = _.extend({}, extras.markedDefaults, options.marked);

  // Set marked.js options
  marked.setOptions(markedOpts);

  Handlebars.registerHelper('content', function(name, context, opts) {
    opts = opts || {};

    _.extend(opts, opts.hash || {});

    var filepath = this;
    var str = file.readFileSync(filepath);
    var page = matter(str);
    var content = page.content;
    var metadata = page.context;

    var data = Handlebars.createFrame({filepath: filepath});

    // Prepend or append any content in the given partial to the output
    _.extend(contentOpts, context.data.root.contentOpts || {});

    var append = '';
    var prepend = '';

    if(contentOpts.prepend) {
      prepend = Handlebars.partials[contentOpts.prepend];
    }
    if(contentOpts.append) {
      append = Handlebars.partials[contentOpts.append];
    }

    _.defaults(metadata, context.data.root);
    var sections = [prepend, content, append].join('\n\n');

    var fn = Handlebars.compile(sections);
    var output = fn(metadata, {data: data});

    return new Handlebars.SafeString(marked(output));
  });
};
