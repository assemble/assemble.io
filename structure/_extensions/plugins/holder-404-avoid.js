/*
 * Adapted from holder-404-avoid.js
 * github.com/less/less-docs
 * @lukeapage
 *
 */

var options = {
  stage: 'render:post:page'
};

var cheerio = require('cheerio');


module.exports = function (params, callback) {
  'use strict';

  // Load current page content
  var $ = cheerio.load(params.content);

  // Get all the anchor tags from inside the headers
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