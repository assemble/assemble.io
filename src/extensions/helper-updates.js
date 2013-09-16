module.exports.register = function(Handlebars, options) {

  var grunt = require('grunt');
  var _ = grunt.util._;
  var toString = Object.prototype.toString;
  var isUndefined = function(value) {
    return value === 'undefined' || toString.call(value) === '[object Function]' || (value.hash != null);
  };

  // Customize this helper
  Handlebars.registerHelper("news", function(news) {
    if (isUndefined(news)) {
      news = grunt.file.readYAML('./src/news.yml');
    } else {
      news = grunt.file.readYAML(news);
    }
    var source = "{{#each .}}* {{date}}\t\t\t{{{@key}}}\t\t\t{{#each updates}}{{{.}}}  {{/each}}\n{{/each}}";
    var template = Handlebars.compile(source);
    return new Handlebars.SafeString(template(news));
  });


  // Customize this helper
  Handlebars.registerHelper("updates", function(updates) {

    return new Handlebars.SafeString(template(updates));
  });

};
