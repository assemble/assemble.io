## \{{gt}}

> Conditionally render a block if the value is greater than a given number (If x > y).

Parameters: value `string|int` - the value to test against.

Data:

```js
var number = 5
```

Template:

```handlebars
\{{#gt number 8}}
    Kiss my shiny metal ass!
\{{else}}
    Never mind :(
\{{/gt}}
```

Renders to:

```
Never mind :(
```
{{#todo}}**Same as `if_gt`, consider consolidating**{{/todo}}