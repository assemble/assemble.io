/*
 * Assemble Contrib Plugin: postprocess
 * https://github.com/assemble/assemble-contrib-postprocess
 * Assemble is the 100% JavaScript static site generator for Node.js, Grunt.js, and Yeoman.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

var options = {
  stage: 'render:post:page'
};

/**
 * postprocess
 * @param  {Object}   params
 * @param  {Function} callback
 */
module.exports = function (params, callback) {
  'use strict';

  var grunt = params.grunt;

  grunt.verbose.subhead('Running:'.bold, '"assemble-contrib-postprocess"');
  grunt.verbose.writeln('Stage:  '.bold, '"render:post:page"\n');

  var content = params.content;
  var p = params.assemble.options.postprocess;

  function postprocess(src, fn) {return fn(src);}
  var processFn = function(src) {return src;};

  params.content = postprocess(content, p || processFn);
  callback();
};

module.exports.options = options;