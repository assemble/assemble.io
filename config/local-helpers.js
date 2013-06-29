var grunt  = require('grunt');
var path   = require('path');
var bower  = require('bower');
var finder = require('findit').find(__dirname);
var _      = require('lodash');

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


    // The "dumptruck" and "destroy" helpers are used to move files
    // into assets during development, and then delete them in
    // production mode. Use with caution. 
    // Handlebars.registerHelper('dumptruck', function(a, b) {
    //   var bowerrc = grunt.file.readJSON('.bowerrc');
    //   var vendor = bowerrc.directory;
    //   var main = path.join(vendor + a);
    //   var dest = path.join(options.assets + b);
    //   return grunt.file.copy(main, dest);
    // });
    // Handlebars.registerHelper('destroy', function(file) {
    //   return grunt.file.delete(options.assets + file);
    // });

    // Handlebars.registerHelper('testtt', function(a) {
    //   // Get the current components directory
    //   if(!grunt.file.exists('.bowerrc')) {
    //     // if bowerrc doesn't exist a value may be provided
    //     var bowerrc = a;
    //   } else {
    //     var bowerrc = grunt.file.readJSON('.bowerrc').directory;
    //   }

    //   var bowerjson = grunt.file.readJSON('bower.json');
    //   var deps = Object.keys(bowerjson.dependencies);
    //   // Get the .json package files listed in the dependencies
    //   var pkgFiles = bowerrc + '/{' + deps + '}/*{bower,component,package}.json';
    //   var manifest = grunt.file.expand({filter: 'isFile'}, pkgFiles);
    //   var content = manifest.map(grunt.file.read);

    //   grunt.file.write('manifest.json', JSON.stringify(manifest, null, 2));
    //   // return new Handlebars.SafeString(_.merge(content));
    // });

    // Handlebars.registerHelper('manifest', function(a) {
    //   // Get the current components directory
    //   if(!grunt.file.exists('.bowerrc')) {
    //     // if bowerrc doesn't exist a value may be provided
    //     var bowerrc = a;
    //   } else {
    //     var bowerrc = grunt.file.readJSON('.bowerrc').directory;
    //   }
    //   var bowerjson = grunt.file.readJSON('bower.json');
    //   var deps = Object.keys(bowerjson.dependencies);
    //   // Get the .json package files listed in the dependencies
    //   var pkgFiles = bowerrc + '/{' + deps + '}/*{bower,component,package}.json';
    //   var manifest = grunt.file.expand(pkgFiles);
    //   grunt.file.write('manifest.json', JSON.stringify(manifest, null, 2));
    // });

    // Handlebars.registerHelper('bootstrap', function(str) {
    //   var content = grunt.file.expand(str).map(grunt.file.read).join('')
    //   // .replace(/layout: .*/g, '')
    //   .replace(/({% highlight )(.*)( %})/g, '<pre><code class="lang-$2">\n')
    //   .replace(/({%)(.*)(%})/g, '</code></pre>\n');
    //   return new Handlebars.SafeString(content);
    // });
    var globFiles = function(src, compare_fn) {
      var content, index;

      content = void 0;
      compare_fn = compare_fn || function(a, b) {
        if (a.index >= b.index) {
          return 1;
        } else {
          return -1;
        }
      };
      index = 0;
      return content = grunt.file.expand(src).map(function(path) {
        index += 1;
        return {
          index: index,
          path: path,
          content: grunt.file.read(path)
        };
      }).sort(compare_fn).map(function(obj) {
        return obj.content;
      }).join(grunt.util.normalizelf(grunt.util.linefeed));
    };


    Handlebars.registerHelper('inline', function(str, lang) {
      var output;
      str = path.join(options.snippets, str);

      var content = globFiles(str);
      var ext = path.extname(str).replace(/^(\.)/gm, '');
      if (isUndefined(lang)) {
        lang = ext;
      } else {
        lang = lang;
      }
      switch (ext) {
        case "md":
        case "markdown":
        case "mdown":
          output = content.replace(/^(```)/gm, '&#x60;&#x60;&#x60;');
          ext = "md";
          break;
        case "txt":
          ext = "text";
          output = content;
          break;
        case "hbs":
        case "hbars":
          output = content.replace(/^(---)/gm, '---');
          ext = "html";
          break;
        case "less":
          ext = "scss";
          output = content;
          break;
        case void 0:
          ext = "";
          output = content;
          break;
        default:
          ext = "";
          output = content;
      }
      var result = '``` ' + lang + '\n' + output + '\n```\n';
      return new Handlebars.SafeString(result);
    });

  };

}).call(this);
