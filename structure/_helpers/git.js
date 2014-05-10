/**
 * Handlebars Helpers: Git branch and remote origin URL
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

const branch = require('git-branch');
const repoUrl = require('github-repo-url');

module.exports = function (assemble) {
  var Handlebars = assemble.Handlebars;
  var helpers = {};

  /**
   * Current branch of the project's git repository
   * @return  {String}
   */

  helpers.branch = function () {
    return new Handlebars.SafeString(branch);
  };


  /**
   * Remote origin url of the project's git repository.
   * @return  {String}
   */

  helpers.origin = function () {
    return new Handlebars.SafeString(repoUrl);
  };

  return helpers;
};

