## \{{isnt}}

> Conditionally render a block if the condition is false. Opposite of `is`.

Parameters: value `string|int` - the value to test against.

Data:
```js
number = 5
```

Template:
```handlebars
\{{#isnt number 5}}
    Kiss my shiny metal ass!
\{{else}}
    Never mind :(
\{{/isnt}}
```

Renders to:
```
Never mind :(
```