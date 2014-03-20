/*
 * HTML validation plugin for Assemble
 */

'use strict';

var file = require('fs-utils');
var w3cjs = require('w3cjs');

module.exports = function (params, callback) {
  var options = params.assemble.options.validation || {};

  var report = options.report;

  w3cjs.validate({
    input: params.content,
    output: 'json',   // Defaults to 'json', other option includes html
    doctype: 'HTML5', // Defaults false for autodetect
    charset: 'utf-8', // Defaults false for autodetect
    callback: function (res) {
      callback(console.log(res));
      file.writeJSONSync(report, res);
      // depending on the output type, res will either be a json object or a html string
    }
  });

  callback();
};

module.exports.options = {
  stage: 'render:post:page'
};