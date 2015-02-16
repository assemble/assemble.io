const cheerio = require('cheerio');

/**
 * Aggregate scripts from the body to a single
 * script tag in the head
 */

module.exports = function (assemble) {

  var middleware = function (params, next) {
    'use strict';

    // Load current page content
    var $ = cheerio.load(params.content);
    var arr = [];

    // Find the script tags in the body
    $('body script').each(function (i, ele) {
      arr.push($(ele).html());
      $(ele).remove();
    });

    // Append them to the head
    $('head').append('\n<script>\n' + arr.join('\n') + '\n</script>\n');
    params.content = $.html();

    next();
  };

  middleware.event = 'page:after:render';
  return {
    'assemble-middleware-scripts': middleware
  };
};
