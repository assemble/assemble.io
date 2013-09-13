/**
 * Markdown helpers
 * Copyright (c) Assemble
 */


var fs = require('fs')
  , path = require('path')
  , _ = require('lodash')

module.exports.register = function(Handlebars, options) {

  var Utils = require('../utils/utils')
    , hljs = require('highlight.js');


  /**
   * Default options to pass to Marked.js
   * @type {Object}
   */
  var opts = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    mentions: true,
    silent: false,
    smartLists: true,
    langPrefix: "language-",
    highlight: function(code, lang) {
      var res;
      res = void 0;
      if (!lang) {
        return code;
      }
      switch (lang) {
        case "js":
          lang = "javascript";
      }
      try {
        return res = hljs.highlight(lang, code).value;
      } finally {
        return res || code;
      }
    }
  };


  // Extend the default options with options defined in the Gruntfile
  opts = _.extend(opts, options.marked);
  var isServer = typeof process !== 'undefined';
  var Markdown = require('../utils/markdown').Markdown(opts);

  /**
   * {{#markdown}} block helper.
   * @param  {String} options [pass in markdown content]
   * @return {String}         [returns HTML]
   */
  Handlebars.registerHelper("markdown", function(options) {
    var content = options.fn(Handlebars.Utils.escapeExpression(this));
    var result = Markdown.convert(content);
    if(options.mentions) {
      result = result.replace(/gh@([a-zA-Z0-9]+)/g, " <a href='http://github.com/$1'>@$1</a>");
    }
    return result;
  });

  if (isServer) {

    /**
     * {{md}} helper.
     * @param  {String|Array} path [Paths and/or glob patterns to file(s)]
     * @return {String}            [returns HTML]
     * @example:
     *   {{md 'path/to/*.md'}}
     */
    Handlebars.registerHelper("md", function(path) {
      var content = Utils.globFiles(path)
        , tmpl = Handlebars.compile(content)
        , md = tmpl(this)
        , html = Markdown.convert(md);
      return Utils.safeString(html);
    });

  }
  return this;
};

var toc = function(src, toc) {
  var toc = "",
    marked = require("marked"),
    tokens = marked.lexer(src),
    links = tokens.links;

  if (generateToc) {
    tokens.filter(function(item) {
      if (item.type !== "heading") {
        return false;
      }

      // Store original text and create an id for linking
      item.tocText = item.text;
      item.tocId = item.text
        .replace(/\W+/g, "-")
        .replace(/^-+|-+$/, "")
        .toLowerCase();

      // Convert to HTML
      item.type = "html";
      item.pre = false;

      // Insert the link
      item.text = "<h" + item.depth + " class='toc-linked'>" +
        "<a href='#" + item.tocId + "' id='" + item.tocId + "' class='icon-link'>" +
        "<span class='visuallyhidden'>link</span>" +
        "</a> " + item.text + "</h" + item.depth + ">";

      return true;
    }).forEach(function(item) {
      toc += new Array((item.depth - 1) * 2 + 1).join(" ") + "* " +
        "[" + item.tocText + "](#" + item.tocId + ")\n";
    });

    tokens = marked.lexer(toc).concat(tokens);
    // The TOC never generates links, so we can just copy the links directly
    // from the original tokens.
    tokens.links = links;
  }
  return marked.parser(tokens);
};



  // case 'heading': {
  //   var internal = '';
  //   if (this.options.gfm) {
  //     var link = this.token.text
  //       .toLowerCase()
  //       .replace(/\s/g, '-')
  //       .replace(/[^a-z0-9-_\:\.]/g, '');

  //     // Check if ID starts with a letter, otherwise make sure it does.
  //     link = /^[a-z]/.test(link) ? link : 'a-' + link;
  //     internal = '<a class="anchor" href="#' + link + '" id="' + link + '"></a>';
  //   }

  //   return '<h'
  //     + this.token.depth
  //     + '>'
  //     + internal
  //     + this.inline.output(this.token.text)
  //     + '</h'
  //     + this.token.depth
  //     + '>\n';
  // }