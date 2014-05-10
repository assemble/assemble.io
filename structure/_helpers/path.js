/**
 * Handlebars Helper: {{basename}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

const path = require('path');


module.exports = function () {
  var helpers = {};

  helpers.basename = function (filepath) {
    return path.basename(filepath);
  };

  return helpers;
};

