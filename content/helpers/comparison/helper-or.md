## \{{or}}

> Conditionally render a block if one of the values is truthy.

Parameters: values `string|int` - the values to test against.

Data:

```js
great = no
magnificent = true
```

Template:

```handlebars
\{{#or great magnificent}}
    Kiss my shiny metal ass!
\{{else}}
    Never mind :(
\{{/or}}
```

Renders to:

```
Kiss my shiny metal ass!
```