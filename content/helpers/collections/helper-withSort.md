## \{{withSort}}

> Uses the sorted collection inside the block.

Parameters: field `string` - String name of the field or property to sort by. (Optional)

Data:

```js
var collection = [
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
    "deliveries": -12
  }
]
```
Template:

```handlebars
\{{#withSort collection "deliveries"}}
  \{{name}}: \{{deliveries}} <br>
\{{/withSort}}
```

Renders to:

```handlebars
Fry: -12
Bender: 239
Leela: 8021
```

Also, if you have the sortable variable inside another variable, you can use dot-notation (e.g. `\{{deliveries.value}}`) to sort.

Data:

```js
{
  "collection": [
    {
      "name": "Leela",
      "deliveries": {"value": 8021, "priority": "high"}
    },
    {
      "name": "Bender",
      "deliveries": {"value": 239, "priority": "normal"}
    },
    {
      "name": "Fry",
      "deliveries": {"value": -12, "priority": "low"}
    }
  ]
}
```

Template:

```handlebars
\{{#withSort collection "deliveries.value"}}
  \{{name}}: \{{deliveries.value}} <br>
\{{/withSort}}
```

Renders to:

```
Fry: -12
Bender: 239
Leela: 8021
```
