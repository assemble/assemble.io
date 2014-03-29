---
title: Migrating Helpers from Assemble v0.4 to Assemble v0.5
author: Brian Woodward
---

The following is a short guide to migrating existing helpers to be compatible with Assemble v0.5.

## Pre-v0.5 Helpers

Helpers were required to export a `register` function that manually register helper functions with Handlebars:

```js
module.exports.register = function (Handlebars, options, params) {
  Handlebars.registerHelper('foo', function () {
    return 'bar';
  });
};
```

## Helpers in v0.5

> The signature for registering helpers has been simplified in Assemble v0.5 to a format that allows helpers to be used in both Assemble and non-Assemble applications.

Assemble now uses [boson](https://github.com/jonschlinkert/boson) internally to register helpers, so you only need to export a function that optionally takes a `config` object. In order for Assemble to register helpers with Handlebars, the only requirement is that _this function must return an object hash of helpers_.

Examples:

```js
module.exports = function (config) {
  return {
    'foo': function () {
      return 'bar';
    }
  };
};
```

Or

```js
module.exports = function (config) {

  var foo = function () {
    return 'bar';
  };

  return {
    'foo': foo
  };
};
```

Or


```js
module.exports = function (config) {

  var helpers = {
    'foo': function () {
      return 'bar';
    },
    'baz': function () {
      return 'quux';
    }
  };

  return helpers;
};
```


### config object

The `config` object is the current instance of `assemble`, so helpers can use the Assemble API to:

* Get the current `context`
* Expose `Handlebars` to the helper


#### Example usage

In this example, the helper merges the current Assemble `context` with the context passed into the helper:

```js
var _ = require('lodash');
module.exports = function (config) {
  var Handlebars = config.Handlebars;

  /**
   * withContext helper
   *
   * @param   {Object}  ctx      [description]
   * @param   {Object}  options  [description]
   * @return  {String}           [description]
   */

  function withContext (ctx, options) {
    var context = _.extend({}, config.context(), ctx);
    context = Handlebars.createFrame(context);
    return options.fn(this, { data: context });
  };

  return {
    'withContext': withContext
  };
};
```
