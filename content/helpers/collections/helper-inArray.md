## \{{inArray}}

> Conditionally render a block if a specified value is in the collection.

Parameters: value `string|int` - A value to test against. (Required)

Data:

```js
var collection = ["Professor Farnsworth", "Fry", "Bend"]
```
Template:

```handlebars
\{{#inArray collection "Fry"}}
  I'm walking on sunshine!
\{{else}}
  I'm walking on darkness.
\{{/inArray}}
```

Renders to:

```handlebars
I'm walking on sunshine!
```

