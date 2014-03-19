---
title: Migrating Helpers from Assemble v0.4.0 to Assemble v0.5.0
author: Brian Woodward
---

> This article contains the basic steps to migrate helpers to Assemble v0.5.0

[Assemble v0.5.0](https://github.com/assemble/assemble/tree/v0.5.0) is using [boson](https://github.com/jonschlinkert/boson) for loading helpers and plugins.

The following is a short guide on some of the changes needed to migrate existing helpers to be used with v0.5.0.

## Before v0.5.0
Helpers were required to export a `register` function that manually register helper functions with Handlebars:

```javascript
module.exports.register = function (Handlebars, options, params) {
  Handlebars.registerHelper('foo', function () {
    return 'bar';
  });
};
```

## Now
Using [boson](https://github.com/jonschlinkert/boson) we now just export a function that can optionally take a `config` object. The only requirement is that this function returns an object hash of helpers that will get registered with Handlebars. This lets us use the helpers in other applications that aren't specific to assemble:

```javascript
module.exports = function (config) {
  return {
    'foo': function () {
      return 'bar';
    }
  };
};
```

The `config` object is the current instance of `assemble` so helpers can take advantage of the assemble API and the current `context`. The following is an example of a helper that merges the current assemble context with the context that is passed into a helper:

```javascript
var _ = require('lodash');
module.exports = function (config) {
  var withContext = function (ctx, options) {
    var context = _.extend({}, config.context(), ctx);
    context = config.Handlebars.createFrame(context);
    return options.fn(this, { data: context });
  };

  return {
    'withContext': withContext
  };
};
```
You'll notice that the current instance of `Handlebars` being used is also exposed on the `config` object.
