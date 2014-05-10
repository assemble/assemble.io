module.exports = function (config) {
  var Handlebars = config.Handlebars;

  var helpers = {};
  helpers.context = function (options) {
    var frame = Handlebars.createFrame(options.data);
    for (var prop in options.hash) {
      frame[prop] = options.hash[prop];
    }
    return options.fn(this, {data: frame});
  };

  return helpers;
};

