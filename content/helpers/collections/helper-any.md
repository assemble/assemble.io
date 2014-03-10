## \{{any}}

> Conditionally render a block if the collection isn't empty. Opposite of `empty`

Parameters: `none`

Data:

```json
"collection": ["Professor Farnswor"]
```
Templates:

```handlebars
\{{#any collection}}
  Good news everyone!
\{{else}}
  Bad news everyone!
\{{/any}}
```

Renders to:

```
Good news everyone!
```