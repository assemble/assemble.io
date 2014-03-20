## \{{after}}

> Returns all of the items in the collection after the specified count.

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
\{{after collection 5}}
```

Renders to:

```handlebars
Leela, Professor Farnsworth, Scruffy
```
