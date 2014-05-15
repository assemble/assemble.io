# Authoring Middleware



## Component types

* `pages`:
* `layout`:
* `partials`:


## stages




## Add a component to the Assemble options

```js
module.exports = function (assemble) {
  var options = assemble.options.post;
  var middleware = function (params, next) {
    'use strict';

    // Do someting
    next();
  };

  middleware.event = 'page:after:render';

  return {
    'assemble-middleware-foo': middleware
  };
};
```