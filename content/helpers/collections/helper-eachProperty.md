## \{{eachProperty}}

> Uses the key and value of each property in an object to render a block.

Parameters: `none`

Data:

```js
var collection = {
  "one": 1,
  "two": 2
}
```
Template:

```handlebars
\{{#eachProperty object}}
    \{{key}} - \{{value}}<br/>
\{{/eachProperty }}
```
Renders to:

```
one - 1
two - 2
```