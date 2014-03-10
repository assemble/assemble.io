## \{{debug}}

> Simple `console.debug()` that shows the current context.

Parameters: `none`

Data:

```js
{
  "collection": [
    {
      "name": "Leela",
      "deliveries": 8021
    },
    {
      "name": "Bender",
      "deliveries": 239
    },
    {
      "name": "Fry",
      "deliveries": 1
    }
  ]
}
```

Template:

```handlebars
\{{#withFirst collection}}
   \{{debug name}}
\{{/withFirst}}
```

Renders to:

```js
Context: { deliveries: 8021, name: "Leela" }
Value: Leela
```
