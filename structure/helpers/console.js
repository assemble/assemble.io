const chalk = require('chalk');

/**
 * Logging helpers
 */

module.exports = function () {
  var helpers = {};

  helpers.success = function (msg, context) {
    console.log(chalk.green('  ' + msg), context);
  };

  helpers.warn = function (msg, context) {
    console.log(chalk.yellow('  ' + msg), context);
  };

  helpers.fail = function (msg, context) {
    console.log(chalk.red('  ' + msg), context);
  };

  return helpers;
};

