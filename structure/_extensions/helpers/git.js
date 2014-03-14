/**
 * Handlebars Helpers: {{expand}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

var shell = require('shelljs');
var origin = require('remote-origin-url');
var branch = shell.exec('git rev-parse --abbrev-ref HEAD', {silent:true}).output;
var url = origin.url().replace(/\.git$/, '');



module.exports.register = function (Handlebars) {

  /**
   * Current branch of the project's git repository
   * @return  {String}
   */

  Handlebars.registerHelper("branch", function() {
    return branch;
  });

  /**
   * Remote origin url of the project's git repository.
   * @return  {String}
   */

  Handlebars.registerHelper("origin", function() {
    return url;
  });
};
