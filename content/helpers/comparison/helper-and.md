## \{{and}}

> Conditionally render a block if both values are truthy.

Parameters: values `string|int` - the values to test against.

Data:

```js
var great = true
var magnificent = true
```

Template:

```handlebars
\{{#and great magnificent}}
    Kiss my shiny metal ass!
\{{else}}
    Never mind :(
\{{/and}}
```

Renders to:

```
Kiss my shiny metal ass!
```