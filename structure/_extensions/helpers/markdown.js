/**
 * Markdown Helper {{markdown}}
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

'use strict';

var marked = require('marked');
var extras = require('marked-extras');
var _ = require('lodash');


module.exports.register = function (Handlebars, opts) {
  opts = opts || {};
  opts.marked = opts.marked || {};

  // Initialize `marked-extras`
  extras.init(opts.marked);

  // Extend defaults from `marked-extras` with Gruntfile options
  var markedOpts = _.extend({}, extras.markedDefaults, opts.marked);

  // Set marked.js options
  marked.setOptions(markedOpts);


  Handlebars.registerHelper("markdown", function (options) {
    return marked(options.fn(this));
  });
};