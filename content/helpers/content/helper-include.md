## \{{include}}

> Include external files.

<br>Pattern: `\{{include [name] [data]}}`
<br>Parameters:

* name (required): `[string]` - The name or path of the file in which your template is defined. (Required)
* data (optional): `[int|string|collection]` - Data you want to use inside the include.

Data (collection): `planet-express.json`

```js
[
  "Professor Farnsworth",
  "Fry",
  "Bender"
]
```

Include (partial to be "included"): `planet-express.hbs`

```handlebars
\{{sort this}}
```

Template:

```handlebars
<p>\{{include "planet-express.hbs" data}}</p>
```

Renders to:

```handlebars
<p>Bender, Fry, Professor Farnsworth</p>
```