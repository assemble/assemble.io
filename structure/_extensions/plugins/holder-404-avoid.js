/*
 * assemble-docs <https://github.com/assemble/assemble-docs>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

var options = {
  stage: 'render:post:page'
};

var cheerio = require('cheerio');


// Adapted from holder-404-avoid.js from less/less-docs
module.exports = function (params, callback) {
  'use strict';

  // load current page content
  var $ = cheerio.load(params.content);

  // get all the anchor tags from inside the headers
  var images = $('img[src]');

  images.each(function (i, e) {
    var $e = $(e);
    var src = $e.attr("src");
    if (src.indexOf("holder.js") === 0) {
      $e.attr("src", null);
      $e.attr("data-src", src);
    }
  });

  params.content = $.html();
  callback();
};

module.exports.options = options;