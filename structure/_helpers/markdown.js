/**
 * Markdown Helper {{markdown}}
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

// const file = require('fs-utils');
const marked = require('marked');
const extras = require('marked-extras');
const strip = require('strip-indent');
const _ = require('lodash');


module.exports = function (config) {
  var Handlebars = config.Handlebars;
  config.options = config.options || {};
  var opts = _.extend(config.options, config.options.data || {});
  var helpers = {};

  // file.expand(opts.content).map(function(filepath) {
  //   var name = file.base(filepath).toLowerCase();
  //   var template = file.readFileSync(filepath);
  //   Handlebars.registerPartial(name, template);
  // });

  opts.marked = opts.marked || {};

  // Initialize `marked-extras`
  extras.init(opts.marked);

  // Extend defaults from `marked-extras` with Gruntfile options
  var markedOpts = _.extend({}, extras.markedDefaults, opts.marked);

  // Set marked.js options
  marked.setOptions(markedOpts);

  helpers.markdown = function (options) {
    var content = strip(options.fn(this));
    return new Handlebars.SafeString(marked(content));
  };

  helpers.md = function (name, context) {
    var ctx = _.extend(this, context || {});
    var template = Handlebars.partials[name];
    var fn = Handlebars.compile(template);
    return new Handlebars.SafeString(marked(fn(ctx)));
  };

  return helpers;
};
