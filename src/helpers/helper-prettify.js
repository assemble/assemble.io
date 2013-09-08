/**
 * {{prettify}} by Jon Schlinkert
 * http://github.com/jonschlinkert
 * Copyright (c) 2013 Jon Schlinkert
 * MIT License
 */

var _ = require('lodash');

module.exports.register = function(Handlebars, options) {
  var prettify = require('js-beautify').html;
  var assembleOptions = options;

  /**
   * Prettify HTML output
   * @example:
   *   {{#prettify indent="2"}}
   *     {{> body }}
   *   {{/prettify}}
   */
  Handlebars.registerHelper('prettify', function (options) {
    var hash = _.extend(options.hash, assembleOptions.prettify);
    var content = prettifyHTML(options.fn(this), hash);

    // Reduce multiple newlines to a single newline
    if(assembleOptions.prettify.condense === true) {
      content = content.replace(/(\n|\r){2,}/g, '\n');
    }
    // Add a single newline above code comments.
    if(assembleOptions.prettify.padcomments === true) {
      content = content.replace(/(\s*<!--)/g, '\n$1');
    }
    return content.replace(/(<\/(a|span|strong|h1|h2|h3|h4|h5|h6)>(?!(,|\.|!|\?|;|:)))/g, '$1 ');
  });

  /**
   * Default options passed to js-beautify.
   * @param {hash arguments} [Options received as hash arguments will override defaults.]
   * @param {task options}   [Options defined in the task/target override hash arguments.]
   */
  var defaults = {
    indent_size: 2,
    indent_inner_html: true,
    unformatted: ['code', 'pre', 'em', 'strong']
  };
  defaults = _.extend(assembleOptions.prettify, defaults);
  defaults.indent_size = defaults.indent;

  /**
   * Format HTML with js-beautify, pass in options.
   * @param   {String} source  [The un-prettified HTML.]
   * @param   {Object} options [Object of options passed to js-beautify.]
   * @returns {String}         [Stunning HTML.]
   */
  var prettifyHTML = function(source, options) {
    try {
      return prettify(source, options);
    } catch (e) {
      console.error(e);
      console.warn('HTML beautification failed.');
    }
  };
};
