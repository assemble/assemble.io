## \{{before}}

> Returns all of the items in the collection before the specified count. Opposite of `after`.

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
\{{before collection 5}}

```

Renders to:

```handlebars
Amy Wong, Bender, Dr. Zoidberg
```
