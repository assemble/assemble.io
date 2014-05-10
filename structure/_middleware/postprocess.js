/*
 * Assemble Contrib Plugin: postprocess
 * https://github.com/assemble/assemble-contrib-postprocess
 * Assemble is the 100% JavaScript static site generator for Node.js, Grunt.js, and Yeoman.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


module.exports = function (assemble) {

  var middleware = function (params, next) {
    'use strict';

    var grunt = params.grunt;

    grunt.verbose.subhead('Running:'.bold, '"assemble-contrib-postprocess"');
    grunt.verbose.writeln('Stage:  '.bold, '"render:post:page"\n');

    var content = params.content;
    var p = params.assemble.options.postprocess;

    function postprocess(src, fn) {return fn(src);}
    var processFn = function(src) {return src;};

    params.content = postprocess(content, p || processFn);
    next();
  };

  middleware.event = 'page:after:render';

  return {
    'assemble-middleware-postprocess': middleware
  };
};
