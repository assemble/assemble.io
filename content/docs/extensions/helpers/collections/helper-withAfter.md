## \{{withAfter}}

> Use all of the items in the collection after the specified count inside a block.

Parameters: count `int` - How many items to omit from the beginning. (Required)

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
\{{#withAfter collection 5}}
    \{{titleize this}}
\{{/withAfter}}

```

Renders to:

```handlebars
Leela Professor Farnsworth Scruffy
```
