## Lo-Dash

> Use Lo-Dash methods as Handlebars helpers

All enumerable properties on the Lo-Dash object are exposed as Handlebars helpers and may be used anywhere in your templates.

Lo-Dash helpers have the same name as their Lo-Dash equivalent, except helper names are prefixed with a hard-coded `_`.

For example

* `\{{_keys}}` => `_.keys`
* `\{{_isObject}}` => `_.isObject`

And so on.

### Pro tip

These Lo-Dash methods come in super handy when used as subexpressions:

```html
{{#foo (_isObject val)}}
Do something
{{/foo}}
```

Consult the [Lo-Dash API documentation](http://lodash.com/docs) for help with usage and to see all of the available methods and options.