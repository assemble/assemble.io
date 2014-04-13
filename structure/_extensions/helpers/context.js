/**
 * Handlebars Helpers: {{context}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

module.exports.register = function (Handlebars) {

  /**
   * {{context}}
   *
   * This helper passes the given context into the block,
   * allowing outer contexts to be used in nested blocks.
   * This is accomplished using Handlebars.createFrame, which
   * exposes private variables inside a block using the `@foo`
   * syntax.
   */

  Handlebars.registerHelper("context", function(options) {
    var frame = Handlebars.createFrame(options.data);
    for (var prop in options.hash) {
      frame[prop] = options.hash[prop];
    }
    return options.fn(this, {data: frame});
  });
};