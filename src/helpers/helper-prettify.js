/**
 * {{prettify}} by Jon Schlinkert
 * http://github.com/jonschlinkert
 * Copyright (c) 2013 Jon Schlinkert
 * MIT License
 */

var _ = require('lodash');

module.exports.register = register = function(Handlebars, options) {
  var prettify = require('js-beautify').html;

  /**
   * Prettify HTML output
   * @param   {indent} hash [the level to indent output HTML] @default [2]
   * @example:
   *   {{#prettify indent="6"}}
   *     {{> body }}
   *   {{/prettify}}
   */
  Handlebars.registerHelper('prettify', function (options) {
    var hash = options.hash;
    opts = _.extend(hash, opts);
    // reduce multiple newlines to a single newline then add a newline above each comment.
    return prettifyHTML(options.fn(this).replace(/(\n|\r){2,}/g, '\n').replace(/(\s*<!--)/g, '\n$1'),
      _.extend(opts, options.hash)
    );
  });

  /**
   * Default options passed to js-beautify.
   * @param {hash arguments} [Options received as hash arguments will override these defaults.]
   * @param {task options}   [Options defined in the Assemble task/target overrides hash arguments.]
   */
  var opts = {
    condense: true,
    indent_size: 2,
    indent_char: " ",
    indent_inner_html: true,
    indent_scripts: "normal",
    brace_style: "expand",
    preserve_newline: false,
    max_preserve_newline: 0
  };
  opts = _.extend(opts, options.prettify);

  // Alias
  opts.indent_size = opts.indent;

  // Format HTML with js-beautify, pass in options.
  var prettifyHTML = function(source, opts) {
    try {
      return prettify(source, opts);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('HTML beautification failed.');
    }
  };
};
