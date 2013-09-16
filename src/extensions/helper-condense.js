module.exports.register = function(Handlebars, options) {

  /**
   * Collapse multiple newlines into one.
   * @param   none
   * @example:
   *   {{#condense}}
   *     {{> body }}
   *   {{/condense}}
   */
  Handlebars.registerHelper('condense', function(context) {
    return context.fn(this).replace(/(\n|\r){2,}/g, '\n').replace(/(\s*<!--)/g, '\n$1');
  });
};