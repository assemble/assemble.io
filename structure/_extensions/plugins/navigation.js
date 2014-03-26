/**
* https://github.com/assemble/assemble-contrib-navigation
*
* Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
*
* @param {[type]} params [description]
* @param {Function} callback [description]
* @return {[type]} [description]
 */


var options = {
  stage: 'render:post:page'
};

var path = require('path');
var template = require('template');
var chalk = require('chalk');
var cheerio = require('cheerio');
var _ = require('lodash');

var warn = chalk.yellow;

/**
 * Anchor Plugin
 * @param  {Object}   params
 * @param  {Function} callback
 */
module.exports = function (params, callback) {
  'use strict';

  // load current page content
  var $ = cheerio.load(params.content);

  var anchorOpts = params.assemble.options.anchors || {};
  var navOpts = params.assemble.options.navigation || {};

  // get all the anchor tags from inside the headers
  var headings = $('h1[id],h2[id]');
  var navigation = [];
  var duplicateChecker = {};
  var dupesFound = false;

  function findLocation(navigation, depth) {
    if (depth === 1) {
      return navigation;
    }
    var loc = navigation[navigation.length - 1];
    if (!loc) {
      loc = {
        children: []
      };
      navigation.push(loc);
    } else if (!loc.children) {
      loc.children = [];
    }
    return findLocation(loc.children, depth - 1);
  }

  headings.map(function (i, e) {
    var $e = $(e);
    var text = $e.text().trim();
    var link = $e.attr('id');
    var node = {
      text: text,
      link: link,
      $e: $e
    };
    var level = parseInt(e.name.replace(/h/gi, ''), 10);
    var depth = level <= 1 ? 1 : 2;
    var location = findLocation(navigation, depth);
    location.push(node);
  });

  /**
   * Build the HTML for side navigation.
   * @param   {[type]}  navigation   [description]
   * @param   {[type]}  first        [description]
   * @param   {[type]}  sParentLink  [description]
   * @return  {[type]}               [description]
   */

  function buildHTML(navigation, first, sParentLink) {
    return '<ul class="nav' + (first ? ' sidenav' : '') + '">' + navigation.map(function (loc) {

      loc.link = (sParentLink ? sParentLink + '-' : '') + loc.link;
      loc.$e.attr('id', loc.link);

      if (!duplicateChecker[loc.link]) {
        duplicateChecker[loc.link] = loc;
      } else {
        console.error(warn('\n>> Duplicate found ') + '[text]:"' + duplicateChecker[loc.link].text + '" and "' + loc.text + '", [link]: ' + loc.link);
        dupesFound = true;
      }

      return '<li><a href="#' + loc.link + '">' + loc.text + '</a>' + (loc.children ? buildHTML(loc.children, false, loc.link) : '') + '</li>';
    }).join('\n') + '</ul>';
  }

  // if (dupesFound) {
  //   throw new Error("Stopping, duplicates found.");
  // }

  $(navOpts.id || '#navigation').append(buildHTML(navigation, true));

  //
  var anchorTemplate = require('./lib/template.js');

  // If an anchor template is specified in the options, use that instead.
  if(anchorOpts && anchorOpts.template) {
    anchorOpts.template = path.resolve(anchorOpts.template);
    anchorTemplate = require(anchorOpts.template);
  }

  headings.map(function (i, e) {
    var $e = $(e);
    var id = $e.attr('id');

    // Anchor template
    var anchor = template(anchorTemplate, {id: id});
    $(this).append(anchor);

    // Adjust heading
    $(this).removeAttr('id').addClass('docs-heading');

    if($(this).prev().children().hasClass('source-link')) {
      var sourceLink = $(this).prev().children('.source-link');
      $(this).append(sourceLink);
    }
  });

  params.content = $.html();
  callback();
};

module.exports.options = options;