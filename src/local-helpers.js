var grunt  = require('grunt');
var path   = require('path');
var _      = require('lodash');

// These are some really brittle experimental helpers. I'm just having some fun
// playing around for our docs, but I strongly recommend you not use these on
// your own projects. - Jon

(function() {

  module.exports.register = function(Handlebars, options) {

    var urlNormalize = function(filepath) {
      return filepath.replace(/\\/g, "/");
    };

    var toString = function(val) {
      if (val == null) {
        return "";
      } else {
        return val.toString();
      }
    };

    var isUndefined = function(value) {
      return value === 'undefined' || toString.call(value) === '[object Function]' || (value.hash != null);
    };


    Handlebars.registerHelper('links-gh-pages', function(str) {
      var content = grunt.file.expand(str).map(function(link) {
        var page = path.basename(link).replace(/\.md\.hbs/g, '');
        return '[' + page.toLowerCase().replace(/\s/g, '-').replace(/\./g, '-') + ']: ' + page + '.html' ;
      });
      return new Handlebars.SafeString(content.join('\n'));
    });

    Handlebars.registerHelper('links-docs', function(str) {
      var content = grunt.file.expand(str).map(function(link) {
        var page = path.basename(link).replace(/\.hbs/g, '');
        var docs = '';
        if(options.docs) {
          var docs = 'http://assemble.io/docs/';
        }
        return '[' + page + ']: ' + docs + page + '.html' ;
      });
      return new Handlebars.SafeString(content.join('\n'));
    });
    Handlebars.registerHelper('links-gh-json', function(str, dir) {
      var links = {};
      var content = grunt.file.expand(str).map(function(link) {
        var page = path.basename(link).replace(/\.hbs/g, '');
        return '"' + page.toLowerCase() + '": "[' + page + ']: ' + page + '.html"' ;
      });
      result = '{' + content + '}';
      if(isUndefined(dir)) {
        dir = 'src/data/gh-pages-links.json';
      } else {
        dir = dir;
      }
      // result = ;
      result = JSON.stringify(JSON.parse(result), null, 2);
      grunt.file.write(dir, result);
    });


    Handlebars.registerHelper('links-docs', function(str) {
      var content = grunt.file.expand(str).map(function(link) {
        var file = path.basename(link).replace(/\.hbs/g, '');
        return '[' + file + ']: http://assemble.io/docs/' + file + '.html' ;
      });
      return new Handlebars.SafeString(content.join('\n'));
    });
    Handlebars.registerHelper('links-docs-json', function(str, dir) {
      var links = {};
      var content = grunt.file.expand(str).map(function(link) {
        var page = path.basename(link).replace(/\.hbs/g, '');
        return '"' + page.toLowerCase().replace(/\s/g, '').replace(/\./g, '') + '": "[' + page + ']: http://assemble.io/docs/' + page + '.html"' ;
      });
      result = '{' + content + '}';
      if(isUndefined(dir)) {
        dir = 'src/data/docs-links.json';
      } else {
        dir = dir;
      }
      result = JSON.stringify(JSON.parse(result), null, 2);
      grunt.file.write(dir, result);
    });

  };

}).call(this);
