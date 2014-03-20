/**
 * Handlebars Helpers: {{list}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

module.exports.register = function (Handlebars) {

  Handlebars.registerHelper('nav', function (name, context, options) {
    var fn = Handlebars.compile(Handlebars.partials[name]);

    var frame = Handlebars.createFrame(context.data);
    for (var prop in options.hash) {
      frame[prop] = options.hash[prop];
    }

    var template = fn(context, {data: frame});
    return new Handlebars.SafeString(template);
  });
};