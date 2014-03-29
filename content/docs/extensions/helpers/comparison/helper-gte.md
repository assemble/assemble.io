## \{{gte}}

> Conditionally render a block if the value is greater or equal than a given number (If x >= y)

Parameters: value `string|int` - the value to test against.

```js
var number = 5
```

Template:

```handlebars
\{{#gte number 5}}
  Kiss my shiny metal ass!
\{{else}}
  Never mind :(
\{{/gte}}
```

Renders to:

```
Kiss my shiny metal ass!
```
{{#todo}}**Same as `if_gteq`, consider consolidating**{{/todo}}