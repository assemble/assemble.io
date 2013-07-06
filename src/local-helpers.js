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

    Handlebars.registerHelper('links-gh-json', function(str, dir) {
      var links = {};
      var content = grunt.file.expand(str).map(function(link) {
        var file = path.basename(link).replace(/\.hbs/g, '');
        return '"' + file.toLowerCase() + '": "[' + file + ']: ' + file + '.html"' ;
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

    Handlebars.registerHelper('links-wiki-json', function(str, dir) {
      var links = {};
      var content = grunt.file.expand(str).map(function(link) {
        var file = path.basename(link).replace(/\.hbs/g, '');
        return '"' + file.toLowerCase().replace(/\s/g, '').replace(/\./g, '') + '": "[' + file + ']:  https://github.com/assemble/assemble/wiki/' + file + '.html"' ;
      });
      result = '{' + content + '}';
      if(isUndefined(dir)) {
        dir = 'src/data/wiki-links.json';
      } else {
        dir = dir;
      }
      result = JSON.stringify(JSON.parse(result), null, 2);
      grunt.file.write(dir, result);
    });

    Handlebars.registerHelper('links-gh-pages', function(str) {
      var content = grunt.file.expand(str).map(function(link) {
        var file = path.basename(link).replace(/\.md\.hbs/g, '');
        return '[' + file.toLowerCase().replace(/\s/g, '-').replace(/\./g, '-') + ']: ' + file + '.html' ;
      });
      return new Handlebars.SafeString(content.join('\n'));
    });

    Handlebars.registerHelper('links-docs', function(str) {
      var content = grunt.file.expand(str).map(function(link) {
        var file = path.basename(link).replace(/\.hbs/g, '');
        var wiki = '';
        if(options.wiki) {
          var wiki = 'https://github.com/assemble/assemble/wiki/';
        }
        return '[' + file + ']: ' + wiki + file + '.html' ;
      });
      return new Handlebars.SafeString(content.join('\n'));
    });

    Handlebars.registerHelper('links-wiki', function(str) {
      var content = grunt.file.expand(str).map(function(link) {
        var file = path.basename(link).replace(/\.hbs/g, '');
        return '[' + file + ']: https://github.com/assemble/assemble/wiki/' + file + '.html' ;
      });
      return new Handlebars.SafeString(content.join('\n'));
    });

  };

}).call(this);
