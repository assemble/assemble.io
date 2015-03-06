module.exports = function (config) {
  var Handlebars = config.Handlebars;

  var helpers = {};
  helpers.nav = function (name, context, options) {
    var fn = Handlebars.compile(Handlebars.partials[name]);

    var frame = Handlebars.createFrame(context.data);
    for (var prop in options.hash) {
      frame[prop] = options.hash[prop];
    }

    var template = fn(context, {data: frame});
    return new Handlebars.SafeString(template);
  };

  return helpers;
};

