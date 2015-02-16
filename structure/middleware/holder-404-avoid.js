/*
 * Adapted from holder-404-avoid.js
 * github.com/less/less-docs
 * @lukeapage
 *
 */


var cheerio = require('cheerio');


module.exports = function (assemble) {
  var middleware = function (params, next) {
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

    next();
  };


  middleware.event = 'page:after:render';
  return {
    'assemble-404-avoid': middleware
  };
};
