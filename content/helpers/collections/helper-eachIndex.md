## \{{eachIndex}}

> Current implementation of the default Handlebars loop helper \{{#each}} adding index (0-based index) to the loop context.

Parameters: `none`

Data:

```js
var collection = ["Professor Farnsworth", "Fry", "Bend"]
```
Template:

```handlebars
\{{#eachIndex collection}}
  \{{this}} is \{{index}}
\{{/eachIndex}}
```

Renders to:

```
Professor Farnsworth is 0, Fry is 1, Bender is 2
```