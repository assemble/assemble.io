## \{{withLast}}

> Use the last item in a collection inside a block. Opposite of `withFirst`.

Parameters: `none`

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
\{{#withLast collection}}
  <p>\{{this}} is lazy.</p>
\{{/withLast}}
```

Renders to:

```handlebars
<p>Scruffy is lazy.</p>
```
