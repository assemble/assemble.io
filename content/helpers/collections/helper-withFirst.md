## \{{withFirst}}

> Use the first item in a collection inside a block.

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
\{{#withFirst collection}}
  <p>\{{this}} is smart.</p>
\{{/withFirst}}
```

Renders to:

```handlebars
<p>Amy Wong is smart.</p>
```