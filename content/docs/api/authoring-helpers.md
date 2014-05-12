

```js
module.exports = function (config) {
  var Handlebars = config.Handlebars;
  var helpers = {};


  helpers.resolve = function (name, context) {

    // Get the context for the page being rendered.
    var ctx = config.context();


    return foo;
  };
  return helpers;
};
```

