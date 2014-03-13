## \{{withBefore}}

> Use all of the items in the collection before the specified count inside a block. Opposite of `withAfter`.

Parameters: count `int` - How many items to omit from the end. (Required)

Data:

```js
var collection = [
  "Amy Wong",
  "Bender",
  "Dr. Zoidberg",
  "Fry",
  "Hermes Conrad",
  "Leela",
  "Professor Farnsworth",
  "Scruffy"
]
```
Template:

```handlebars
\{{#withBefore collection 5}}
    \{{reverse this}}
\{{/withBefore}}
```

Renders to:

```handlebars
gnoW ymA redneB grebdioZ .rD
```
