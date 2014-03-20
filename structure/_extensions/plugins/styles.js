/**
 * Move all styles in body > style tags to the head
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 */


var cheerio = require('cheerio');

var options = {
  stage: 'render:post:page'
};

module.exports = function (params, callback) {
  'use strict';

  // Load current page content
  var $ = cheerio.load(params.content);

  var arr = [];
  $('body style').each(function (i, ele) {
    arr.push($(ele).html());
    $(ele).remove();
  });

  $('head').append('\n<style>\n' + arr.join('\n') + '\n</style>\n');

  params.content = $.html();
  callback();
};

module.exports.options = options;