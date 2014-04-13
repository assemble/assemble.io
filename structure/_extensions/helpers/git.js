/**
 * Handlebars Helpers: Git branch and remote origin URL
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
const utils = require('../../../data/_lib/utils');

module.exports.register = function (Handlebars) {


  /**
   * Current branch of the project's git repository
   * @return  {String}
   */

  Handlebars.registerHelper("branch", function() {
    return new Handlebars.SafeString(utils.branch);
  });


  /**
   * Remote origin url of the project's git repository.
   * @return  {String}
   */

  Handlebars.registerHelper("origin", function() {
    return new Handlebars.SafeString(utils.repo_url);
  });
};
