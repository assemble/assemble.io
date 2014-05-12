> Solutions to common issues


### "Warning: You must pass a string or Handlebars AST to Handlebars.compile. You passed undefined."

In other words, Handlebars can't find any content to compile for a given template. This could be a partial or a page, but often it's a helper. The `\{{md}}` helper is a good example of one that could cause the issue, since it allows you to specify the name of a partial as a parameter, e.g. `\{{md 'foo'}}`. If `foo` isn't found, Handlebars will throw this error.