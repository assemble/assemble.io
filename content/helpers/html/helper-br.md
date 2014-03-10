## \{{br}}

> Renders `<br>` elements in the output, based on the number given as a parameter. Not really recommended for general use, but it's here if you need it.

Parameters: `Integer|Count`, `Optional`

The number of `br` elements to render.

`template.hbs`

```handlebars
\{{br 5}}
```

renders to:

```handlebars
`<br><br><br><br><br>`
```
