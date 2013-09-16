/*
 * assemble-manifest
 * https://github.com/assemble/assemble-manifest
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function(grunt) {
  var _ = grunt.util._; // lodash
  var exports = {};

  _.mixin({

    uppercase: function(str) {
      return str.toUpperCase();
    },

    expand: function(obj) {
      return grunt.file.expand(obj);
    },

    readJSON: function(obj) {
      return grunt.file.readJSON(obj);
    },

    sortObject: function(o) {
      var sorted = {},
      key, a = [];
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          a.push(key);
        }
      }
      a.sort();
      for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
      }
      return sorted;
    },

    /**
     * Read optional JSON from Ben Alman,
     * https://gist.github.com/2876125
     */
    readOptionalJSON: function(filepath) {
      var data = {};
      try {
        data = grunt.file.readJSON(filepath);
      } catch (e) {}
      return data;
    },
    readOptionalYAML: function(filepath) {
      var data = {};
      try {
        data = grunt.file.readYAML(filepath);
      } catch (e) {}
      return data;
    },

    /**
     * Function from assemble:
     * https://github.com/assemble/assemble
     */
    readData: function(ext) {
      var reader = grunt.file.readJSON;
      switch (ext) {
        case '.json':
          reader = grunt.file.readJSON;
          break;

        case '.yml':
        case '.yaml':
          reader = grunt.file.readYAML;
          break;
      }
      return reader;
    },


  });
  return exports;
};