## \{{empty}}

> Conditionally render a block if the collection is empty.

Parameters: `none`

Data:

```js
var collection = []
```
Template:

```handlebars
\{{#empty collection}}
    Good news everyone!
\{{else}}
    Bad news everyone!
\{{/empty}}
```

Renders to:

```
Good news everyone!
```
