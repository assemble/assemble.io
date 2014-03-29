## \{{lte}}

> Conditionally render a block if the value is less or equal than a given number. Opposite of `gte`.

Parameters: value `string|int` - the value to test against.

Data:

```js
number = 5
```

Template:

```handlebars
\{{#lte number 5}}
    Kiss my shiny metal ass!
\{{else}}
    Never mind :(
\{{/lte}}
```

Renders to:

```
Kiss my shiny metal ass!
```