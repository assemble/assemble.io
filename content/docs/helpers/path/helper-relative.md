## \{{relative}}

> Calculate the relative path from one **absolute path** to another (e.g from path A, to path B).

<br>Parameters: `string` (the value to test against)
<br>Default: `none`

Example:

```handlebars
\{{relative "from" "to"}}
```
Template:

```handlebars
<a href="\{{relative "src" "dist"}}/assets/css/styles.css"></a>
```

Renders to:

```handlebars
<a href="../../dist/assets/css/styles.css"></a>
```