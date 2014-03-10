/**
 * Handlebars Helper: {{logging}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

var chalk = require('chalk');

module.exports.register = function (Handlebars) {

  Handlebars.registerHelper("success", function(msg, context) {
    console.log(chalk.green(msg), context);
  });

  Handlebars.registerHelper("warn", function(msg, context) {
    console.log(chalk.yellow(msg), context);
  });
};